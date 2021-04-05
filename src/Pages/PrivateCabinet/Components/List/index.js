import React from 'react';

import styles from './List.module.sass';

const List = ({title, src, children}) => {

    return (
        <div className={styles.listWrap}>
            <div className={styles.header}>
                <span>{title}</span>
                <div className={styles.imgWrap}>
                <img
                    className={styles.playButton}
                    src='./assets/PrivateCabinet/play-grey.svg'
                    alt='play'
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
