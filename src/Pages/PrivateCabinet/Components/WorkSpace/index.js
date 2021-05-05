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
import FileBarLines from '../WorkElements/FileBarLines';

const WorkSpace = ({setBlob, blob, fileLoading, progress, chosenFolder, setSafePassword}) => {

    const [workElementsView, setWorkElementsView] = useState('bars');
    const [chosenFile, setChosenFile] = useState(null);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);

    useEffect(() => setChosenFile(null), [chosenFolder.path, chosenFolder.subPath]);

    const renderFileBar = () => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <FileBar key={i} file={file} setChosenFile={setChosenFile} chosen={chosenFile?.fid === file?.fid} />
        })
    };

    const renderLinesFileBar = () => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <FileBarLines key={i} file={file} setChosenFile={setChosenFile} chosen={chosenFile?.fid === file?.fid} />
        })
    };

    return (
        <div className={`${styles.workSpaceWrap} ${styles.workSpaceWrapCollapsed}`}>
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
                setSafePassword={setSafePassword}
            />
            {workElementsView === 'bars' ? <WorkBars setBlob={setBlob} blob={blob} fileLoading={fileLoading} progress={progress}>{renderFileBar()}</WorkBars> : null}
            {workElementsView === 'lines' ? <div className={styles.file_list}>{renderLinesFileBar()}</div> : null}

            <BottomPanel />
        </div>
    )
}

export default WorkSpace;
