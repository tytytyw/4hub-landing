import React from 'react';

import styles from './FourHUB.module.sass';

const Loader = ({type, position, background, width, height, zIndex}) => {
    return (
        <div
            className={styles.loaderWrap}
            style={{
                position: `${position ?? 'fixed'}`,
                background: `${background ?? 'rgba(0, 0, 0, 0.95)'}`,
                zIndex: `${zIndex ?? 10000}`
            }}
        >
            <div
                className={styles.container}
                style={{
                    width: `${width ?? '500px'}`,
                    height: `${height ?? '500px'}`
                }}
            >
                <div className={`${styles.greenSquare} ${styles[type + 'Green']}`} />
                <div className={`${styles.yellowSquareFirst} ${styles[type + 'First']}`} />
                <div className={`${styles.yellowSquareSecond} ${styles[type + 'Second']}`} />
                <div className={`${styles.yellowSquareThird} ${styles[type + 'Third']}`} />
            </div>
        </div>
    )
}

export default Loader;