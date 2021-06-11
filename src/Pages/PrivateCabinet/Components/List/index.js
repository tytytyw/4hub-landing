import React from 'react';

import styles from './List.module.sass';

const List = ({title, src, setListCollapsed, listCollapsed, children, onCreate, icon = true}) => {

    return (
        <div className={`${styles.listWrap} ${listCollapsed ? styles.listWrapCollapsed : undefined}`}>
            <div className={styles.header}>
                {!listCollapsed && <span>{title}</span>}
                <div className={styles.imgWrap}>
                <img
                    className={`${styles.playButton} ${listCollapsed ? styles.playButtonReverse : undefined}`}
                    src='./assets/PrivateCabinet/play-grey.svg'
                    alt='play'
                    onClick={() => setListCollapsed(!listCollapsed)}
                />
                    {!!icon &&
                    <img
                        className={styles.icon}
                        src={`./assets/PrivateCabinet/${src}`}
                        alt='icon'
                        onClick={() => onCreate(true)}
                    />}
                </div>
            </div>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
}

export default List;
