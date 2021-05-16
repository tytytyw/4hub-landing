import React from 'react';
import { useSelector } from 'react-redux';
import styles from './WorkSpace.module.sass';
import SearchField from '../../SearchField';
import StorageSize from '../../StorageSize';
import Notifications from '../../Notifications';
import Profile from '../../Profile';
import ServePanel from '../../ServePanel';
import WorkBars from '../../WorkElements/WorkBars';
import BottomPanel from '../../ButtomPanel';
import FileBar from '../../WorkElements/FileBar';
import WorkLines from '../../WorkElements/WorkLines';
import FileLine from '../../WorkElements/FileLine';
import WorkBarsPreview from '../../WorkElements/WorkBarsPreview';
import ContextMenu from '../../../../../generalComponents/ContextMenu';
import {contextMenuFile} from '../../../../../generalComponents/collections';
import ActionApproval from '../../../../../generalComponents/ActionApproval';
import File from '../../../../../generalComponents/Files';

const WorkSpace = ({setBlob, blob, fileLoading, progress, chosenFile, setChosenFile, listCollapsed, setItem, workElementsView, setWorkElementsView, renderMenuItems, mouseParams, setMouseParams, action, setAction, nullifyAction, callbackArrMain, additionalMenuItems, deleteFile}) => {

    const fileList = useSelector(state => state.PrivateCabinet.fileList);

    // Types of Files view
    const renderFiles = (Type) => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <Type key={i} file={file} setChosenFile={setChosenFile} chosen={chosenFile?.fid === file?.fid} setMouseParams={setMouseParams} setAction={setAction} />
        });
    };

    return (<>
        <div className={`${styles.workSpaceWrap} ${listCollapsed ? styles.workSpaceWrapCollapsed : undefined}`}>
            <div className={styles.header}>
                <SearchField />
                <div className={styles.infoHeader}>
                    <StorageSize />
                    <Notifications />
                    <Profile setItem={setItem} />
                </div>
            </div>
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
