import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './WorkSpace.module.sass';
import SearchField from '../SearchField';
import StorageSize from '../StorageSize';
import Notifications from '../Notifications';
import Profile from '../Profile';
import ServePanel from '../ServePanel';
import WorkBars from '../WorkElements/WorkBars';
import BottomPanel from '../ButtomPanel';
import FileBar from '../WorkElements/FileBar';
import WorkLines from '../WorkElements/WorkLines';
import FileLine from '../WorkElements/FileLine';
import WorkBarsPreview from '../WorkElements/WorkBarsPreview';
import WorkLinesPreview from '../WorkElements/WorkLinesPreview';
import FileLineShort from '../WorkElements/FileLineShort';
import ContextMenu from '../../../../generalComponents/ContextMenu';
import {contextMenuFile} from '../../../../generalComponents/collections';
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem';
import {fileDelete} from '../../../../generalComponents/fileMenuHelper';
import {onDeleteFile} from '../../../../Store/actions/PrivateCabinetActions';
import ActionApproval from '../../../../generalComponents/ActionApproval';
import File from '../../../../generalComponents/Files';
import RecentFiles from '../RecentFiles';

const WorkSpace = ({setBlob, blob, fileLoading, progress, chosenFolder, listCollapsed, setItem}) => {

    const dispatch = useDispatch();
    const [workElementsView, setWorkElementsView] = useState('bars');
    const [chosenFile, setChosenFile] = useState(null);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);
    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles);
    const [mouseParams, setMouseParams] = useState(null);
    const [action, setAction] = useState({type: '', name: '', text: ''});
    const nullifyAction = () => setAction({type: '', name: '', text: ''});

    const callbackArrMain = ['', '', '', '', '', '', '', '', '', '', '', ''];
    const additionalMenuItems = [
        {type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`}
    ];
    const deleteFile = () => {fileDelete(chosenFile, dispatch, onDeleteFile); nullifyAction(); setChosenFile(null)};

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={() => setAction(type[i])}
                imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    useEffect(() => setChosenFile(null), [chosenFolder.path, chosenFolder.subPath]);

    // Types of Files view
    const renderFiles = (Type) => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <Type key={i} file={file} setChosenFile={setChosenFile} chosen={chosenFile?.fid === file?.fid} setMouseParams={setMouseParams} setAction={setAction} />
        });
    };

    return (<>
        <div className={`${styles.workSpaceWrap} ${typeof listCollapsed === 'boolean' ? listCollapsed ? styles.workSpaceWrapCollapsed : styles.workSpaceWrapUncollapsed : undefined}`}>
            <div className={styles.header}>
                <SearchField />
                <div className={styles.infoHeader}>
                    <StorageSize />
                    <Notifications />
                    <Profile setItem={setItem} />
                </div>
            </div>
            {recentFiles?.length > 0 && <RecentFiles />}
            <ServePanel
                setBlob={setBlob}
                blob={blob}
                setView={setWorkElementsView}
                view={workElementsView}
                chosenFile={chosenFile}
                setAction={setAction}
            />
            {workElementsView === 'bars' ? <WorkBars setBlob={setBlob} blob={blob} fileLoading={fileLoading} progress={progress}>{renderFiles(FileBar)}</WorkBars> : null}
            {workElementsView === 'lines' ? <WorkLines fileLoading={fileLoading} progress={progress}>{renderFiles(FileLine)}</WorkLines> : null}
            {workElementsView === 'preview' ? <WorkBarsPreview file={chosenFile}>{renderFiles(FileBar)}</WorkBarsPreview> : null}
            {workElementsView === 'workLinesPreview' ? <WorkLinesPreview file={chosenFile}>{renderFiles(FileLineShort)}</WorkLinesPreview> : null}
            <BottomPanel />
        </div>
        {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
            <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFile.main, callbackArrMain)}</div>
            <div className={styles.additionalMenuItems}>{renderMenuItems(contextMenuFile.additional, additionalMenuItems)}</div>
        </ContextMenu> : null}
        {action.type === 'delete' ? <ActionApproval name={action.name} text={action.text} set={nullifyAction} callback={deleteFile}>
            <div className={styles.fileActionWrap}><File format={chosenFile?.ext} color={chosenFile?.color} /></div>
        </ActionApproval> : null}
    </>)
}

export default WorkSpace;
