import React, { useState } from 'react';
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

const WorkSpace = ({setBlob, blob, fileLoading, progress}) => {

    const [workElementsView, setWorkElementsView] = useState('bars');
    const [chosenFile, setChosenFile] = useState(null);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);

    const renderFileBar = () => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <FileBar key={i} file={file} setChosenFile={setChosenFile} chosen={chosenFile?.fid === file?.fid} />
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
            />
            {workElementsView === 'bars' ? <WorkBars setBlob={setBlob} blob={blob} fileLoading={fileLoading} progress={progress}>{renderFileBar()}</WorkBars> : null}
            <BottomPanel />
        </div>
    )
}

export default WorkSpace;
