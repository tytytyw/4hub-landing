import React from 'react';

import styles from './List.module.sass';

const List = ({title, src, setListCollapsed, listCollapsed, children}) => {

    return (
        <div className={`${styles.listWrap} ${listCollapsed && styles.listWrapCollapsed}`}>
            <div className={styles.header}>
                {!listCollapsed && <span>{title}</span>}
                <div className={styles.imgWrap}>
                <img
                    className={`${styles.playButton} ${listCollapsed && styles.playButtonReverse}`}
                    src='./assets/PrivateCabinet/play-grey.svg'
                    alt='play'
                    onClick={() => setListCollapsed(!listCollapsed)}
                />
                <img
                    className={styles.icon}
                    src={`./assets/PrivateCabinet/${src}`}
                    alt='icon'
                />
                </div>
            </div>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
}

export default List;
