import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import api from '../../../../api';
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
import {onDeleteFile, onAddRecentFiles, onChooseFiles} from '../../../../Store/actions/PrivateCabinetActions';
import ActionApproval from '../../../../generalComponents/ActionApproval';
import File from '../../../../generalComponents/Files';
import RecentFiles from '../RecentFiles';
import CustomizeFile from "../CustomizeFile";
import OptionButtomLine from "../WorkElements/OptionButtomLine";
import {logDOM} from "@testing-library/react";

const WorkSpace = ({setBlob, blob, fileLoading, chosenFile, setChosenFile,
                   chosenFolder, listCollapsed, setItem, setFilePreview, filePreview,
                   fileSelect, action, setAction
                  }) => {

    const dispatch = useDispatch();
    const [workElementsView, setWorkElementsView] = useState('bars');
    const uid = useSelector(state => state.user.uid);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);
    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles);
    const [mouseParams, setMouseParams] = useState(null);
    //TODO - Need to add to different file views
    const [filePick, setFilePick] = useState({show: false, files: [], customize: false});
    const nullifyAction = () => setAction({type: '', name: '', text: ''});
    const nullifyFilePick = () => setFilePick({show: false, files: [], customize: false});

    const callbackArrMain = [
        {type: 'resend', name: '', text: ``, callback: ''},
        {type: 'share', name: '', text: ``, callback: ''},
        {type: 'openInApp', name: '', text: ``, callback: ''},
        {type: 'copyLink', name: '', text: ``, callback: ''},
        {type: 'customize', name: 'Редактирование файла', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'customizeSeveral', name: `Редактирование файлов`, text: ``, callback: (list, index) => setFilePick({...filePick, show: true})},
        {type: 'archive', name: '', text: ``, callback: ''},
        {type: 'intoZip', name: 'Сжать в ZIP', text: ``, callback: () => intoZIP()},
        {type: 'info', name: '', text: ``, callback: ''},
        {type: 'download', name: 'Загрузка файла', text: ``, callback: () => document.downloadFile.submit()},
        {type: 'print', name: 'Распечатать файл', text: ``, callback: () => printFile()},
        ];
    const additionalMenuItems = [
        {type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`, callback: (list, index) => setAction(list[index])}
    ];
    const deleteFile = () => {fileDelete(chosenFile, dispatch, onDeleteFile); nullifyAction(); setChosenFile(null); dispatch(onAddRecentFiles())};

    const intoZIP = () => {
        api.post(`/ajax/file_zip.php?uid=${uid}&fid=${chosenFile.fid}&dir=${fileList.path}`)
            .then(res => dispatch(onChooseFiles(fileList.path)))
            .catch(err => console.log(err));
    };

    const printFile = () => {
        console.log(chosenFile);
    };

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={() => type[i]?.callback(type, i)}
                imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    useEffect(() => setChosenFile(null), [chosenFolder.path, chosenFolder.subPath]); // eslint-disable-line react-hooks/exhaustive-deps

    // Types of Files view
    const renderFiles = (Type) => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <Type
                key={i}
                file={file}
                setChosenFile={setChosenFile}
                chosen={filePick.show ? filePick.files.findIndex(el => el === file.fid) >= 0 : chosenFile?.fid === file?.fid}
                setMouseParams={setMouseParams}
                setAction={setAction}
                setFilePreview={setFilePreview}
                filePreview={filePreview}
                filePick={filePick}
                setFilePick={setFilePick}
            />
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
            {recentFiles?.length > 0 && <RecentFiles
                setFilePreview={setFilePreview}
                filePreview={filePreview}
            />}
            <ServePanel
                setBlob={setBlob}
                blob={blob}
                setView={setWorkElementsView}
                view={workElementsView}
                chosenFile={chosenFile}
                setAction={setAction}
                fileSelect={fileSelect}
            />
            {workElementsView === 'bars' ? <WorkBars
                fileLoading={fileLoading}
                fileSelect={fileSelect}
                filePick={filePick}
            >{renderFiles(FileBar)}</WorkBars> : null}
            {workElementsView === 'lines' ? <WorkLines
                fileLoading={fileLoading}
            >{renderFiles(FileLine)}</WorkLines> : null}
            {workElementsView === 'preview' ? <WorkBarsPreview
                file={chosenFile}
            >{renderFiles(FileBar)}</WorkBarsPreview> : null}
            {workElementsView === 'workLinesPreview' ? <WorkLinesPreview
                file={chosenFile}
            >{renderFiles(FileLineShort)}</WorkLinesPreview> : null}
            {filePick.show ? <OptionButtomLine
                filePick={filePick}
                setFilePick={setFilePick}
                actionName={'Редактировать'}
                setAction={nullifyFilePick}
            /> : null}
            <BottomPanel />
        </div>
        {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
            <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFile.main, callbackArrMain)}</div>
            <div className={styles.additionalMenuItems}>{renderMenuItems(contextMenuFile.additional, additionalMenuItems)}</div>
        </ContextMenu> : null}
        {action.type === 'delete' ? <ActionApproval name={action.name} text={action.text} set={nullifyAction} callback={deleteFile} approve={'Удалить'}>
            <div className={styles.fileActionWrap}><File format={chosenFile?.ext} color={chosenFile?.color} /></div>
        </ActionApproval> : null}
        {action.type === 'customize' || filePick.customize ? <CustomizeFile
            title={filePick.customize ? `Редактировать ${filePick.files.length} файла` : action.name }
            info={chosenFolder}
            file={chosenFile}
            // TODO - Check Cancellation for FilePick
            close={filePick.customize ? nullifyFilePick : nullifyAction}
            filePick={filePick}
            setFilePick={setFilePick}
        /> : null}
        <form style={{display: 'none'}} name='downloadFile' action='/ajax/download.php' method='post'>
            <input style={{display: 'none'}} name='fid' value={chosenFile?.fid || ''} readOnly />
        </form>
    </>)
}

export default WorkSpace;
