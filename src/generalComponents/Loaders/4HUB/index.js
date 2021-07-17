import React from 'react';

import styles from './FourHUB.module.sass';

const Loader = ({type = 'scale'}) => {
    return (
        <div className={styles.loaderWrap}>
            <div className={styles.container}>
                <div className={`${styles.greenSquare} ${styles[type + 'Green']}`} />
                <div className={`${styles.yellowSquareFirst} ${styles[type + 'First']}`} />
                <div className={`${styles.yellowSquareSecond} ${styles[type + 'Second']}`} />
                <div className={`${styles.yellowSquareThird} ${styles[type + 'Third']}`} />
            </div>
        </div>
    )
}

export default Loader;