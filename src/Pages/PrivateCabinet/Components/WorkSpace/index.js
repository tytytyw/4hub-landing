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

const WorkSpace = ({setBlob, blob, fileLoading, progress, chosenFolder, listCollapsed}) => {

    const [workElementsView, setWorkElementsView] = useState('bars');
    const [chosenFile, setChosenFile] = useState(null);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);

    useEffect(() => setChosenFile(null), [chosenFolder.path, chosenFolder.subPath]);

    // Types of Files view
    const renderFiles = (Type) => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <Type key={i} file={file} setChosenFile={setChosenFile} chosen={chosenFile?.fid === file?.fid} />
        });
    };

    return (
        <div className={`${styles.workSpaceWrap} ${listCollapsed ? styles.workSpaceWrapCollapsed : undefined}`}>
            <div className={styles.header}>
                <SearchField />
                <div className={styles.infoHeader}>
                    <StorageSize />
                    <Notifications />
                    <Profile />
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
    )
}

export default WorkSpace;
