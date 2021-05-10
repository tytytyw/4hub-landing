import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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

const WorkSpace = ({setBlob, blob, fileLoading, progress, chosenFolder, listCollapsed, setItem}) => {

    const [workElementsView, setWorkElementsView] = useState('bars');
    const [chosenFile, setChosenFile] = useState(null);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);
    const [mouseParams, setMouseParams] = useState(null);
    const renderMenuItems = (target) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    useEffect(() => setChosenFile(null), [chosenFolder.path, chosenFolder.subPath]);

    // Types of Files view
    const renderFiles = (Type) => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <Type key={i} file={file} setChosenFile={setChosenFile} chosen={chosenFile?.fid === file?.fid} setMouseParams={setMouseParams} />
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
            />
            {workElementsView === 'bars' ? <WorkBars setBlob={setBlob} blob={blob} fileLoading={fileLoading} progress={progress}>{renderFiles(FileBar)}</WorkBars> : null}
            {workElementsView === 'lines' ? <WorkLines fileLoading={fileLoading} progress={progress}>{renderFiles(FileLine)}</WorkLines> : null}
            {workElementsView === 'preview' ? <WorkBarsPreview file={chosenFile}>{renderFiles(FileBar)}</WorkBarsPreview> : null}
            {workElementsView === 'workLinesPreview' ? <WorkLinesPreview file={chosenFile}>{renderFiles(FileLineShort)}</WorkLinesPreview> : null}
            <BottomPanel />
        </div>
        {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
            <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFile.main)}</div>
            <div className={styles.additionalMenuItems}>{renderMenuItems(contextMenuFile.additional)}</div>
        </ContextMenu> : null}
    </>)
}

export default WorkSpace;
