import React from 'react';

import styles from './WorkSpace.module.sass';
import SearchField from '../SearchField';
import StorageSize from '../StorageSize';
import Notifications from '../Notifications';
import Profile from '../Profile';
import ServePanel from '../ServePanel';
import WorkBars from '../WorkElements/WorkBars';
import BottomPanel from '../ButtomPanel';

const WorkSpace = ({setBlob, blob}) => {
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
            <ServePanel setBlob={setBlob} blob={blob} />
            <WorkBars setBlob={setBlob} blob={blob}></WorkBars>
            <BottomPanel />
        </div>
    )
};

export default WorkSpace;
