import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {onChooseFiles} from '../../../../../Store/actions/CabinetActions';

import styles from './RecentFolders.module.sass';
import {ReactComponent as PlayIcon} from '../../../../../assets/PrivateCabinet/play-grey.svg';

const RecentFolders = ({listCollapsed, chosenFolder, setChosenFolder, chosen, renderFolderList}) => {

    const recentFolders = useSelector(state => state.Cabinet.recentFolders);
    const dispatch = useDispatch();

    return (
        <div className={styles.wrapper}>
            <div
                className={`${styles.titleWrap} ${listCollapsed ? styles.titleCollapsed : ''} ${chosen ? styles.titleWrapChosen : ''}`}
                onClick={() => {
                    setChosenFolder({...chosenFolder, path: 'recent', open: true, subPath: recentFolders[0].path});
                    dispatch(onChooseFiles(recentFolders[0].path));
                }}
            >
                <span className={styles.title}>{listCollapsed ? 'Недавние' : 'Недавние Папки'}</span>
                <PlayIcon
                    className={`${styles.playButton} ${chosen && chosenFolder.open ? styles.revert : undefined}`}
                />
            </div>
            <div style={{
                height: `${chosen && chosenFolder.open ? (recentFolders.length * 50) : 0}px`,
                minHeight: `${chosen && chosenFolder.open ? (recentFolders.length * 50) : 0}px`
            }}
                 className={`${styles.innerFolders} ${chosen && chosenFolder.open ? undefined : styles.hidden}`}
            >
                {renderFolderList(recentFolders, true)}
            </div>
        </div>
    )
}

export default RecentFolders;