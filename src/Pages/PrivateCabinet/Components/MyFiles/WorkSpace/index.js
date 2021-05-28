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
import WorkLinesPreview from '../../WorkElements/WorkLinesPreview';
import ContextMenu from '../../../../../generalComponents/ContextMenu';
import {contextMenuFile} from '../../../../../generalComponents/collections';
import ActionApproval from '../../../../../generalComponents/ActionApproval';
import File from '../../../../../generalComponents/Files';
import RecentFiles from '../../RecentFiles';
import PreviewFile from '../../PreviewFile';

const WorkSpace = ({
               setBlob, blob, chosenFile, setChosenFile, listCollapsed, setItem, workElementsView,
               setWorkElementsView, renderMenuItems, mouseParams, setMouseParams, action, setAction, nullifyAction,
               callbackArrMain, additionalMenuItems, deleteFile, setFilePreview, filePreview, fileSelect,
}) => {

    const fileList = useSelector(state => state.PrivateCabinet.fileList);
    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles);


    // Types of Files view
    const renderFiles = (Type) => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <Type key={i} file={file} setChosenFile={setChosenFile} chosen={chosenFile?.fid === file?.fid} setMouseParams={setMouseParams} setAction={setAction} setFilePreview={setFilePreview}/>
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
            {recentFiles?.length > 0 && <RecentFiles
                setFilePreview={setFilePreview}
                filePreview={filePreview} />}
            <ServePanel
                setBlob={setBlob}
                blob={blob}
                setView={setWorkElementsView}
                view={workElementsView}
                chosenFile={chosenFile}
                setAction={setAction}
                fileSelect={fileSelect}
            />
            {workElementsView === 'bars' ? <WorkBars setBlob={setBlob} blob={blob}>{renderFiles(FileBar)}</WorkBars> : null}
            {workElementsView === 'lines' ? <WorkLines>{renderFiles(FileLine)}</WorkLines> : null}
            {workElementsView === 'preview' ? <WorkBarsPreview file={chosenFile}>{renderFiles(FileBar)}</WorkBarsPreview> : null}
            {workElementsView === 'workLinesPreview' ? <WorkLinesPreview file={chosenFile} hideFileList={true}></WorkLinesPreview> : null}
            <BottomPanel />
        </div>
        {filePreview?.view ? <PreviewFile setFilePreview={setFilePreview} file={filePreview?.file} filePreview={filePreview} /> : null}
        {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
            <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFile.main, callbackArrMain)}</div>
            <div className={styles.additionalMenuItems}>{renderMenuItems(contextMenuFile.additional, additionalMenuItems)}</div>
        </ContextMenu> : null}
        {action.type === 'delete' ? <ActionApproval name={action.name} text={action.text} set={nullifyAction} callback={deleteFile} approve={'Удалить'}>
            <div className={styles.fileActionWrap}><File format={chosenFile?.ext} color={chosenFile?.color} /></div>
        </ActionApproval> : null}
    </>)
}

export default WorkSpace;
