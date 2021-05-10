import React from 'react';
import {useSelector} from 'react-redux';

import styles from './StorageSize.module.sass';

const StorageSize = () => {

    const user = useSelector(state => state.user.userInfo);

    const setSize = (size) => {
        if(size / 1000000000 > 1) size = `${(size / 1000000000).toFixed()} GB`;
        if(size / 1000000 > 1) size = `${(size / 1000000).toFixed()} MB`;
        if(size / 1000 > 1) size = `${(size / 1000).toFixed()} KB`;
        return size;
    };

    const width = `${(user.used * 100) / user.total}%`;

    return (
        <div className={styles.storageWrap}>
            <img
                src='./assets/PrivateCabinet/pie-chart-5.svg'
                alt='pie-chart'
            />
            <div className={styles.storageInfo}>
                <div className={styles.fullSize}><span className={styles.realSize} style={{width}} /></div>
                <span className={styles.info}>{setSize(user.used)} из {setSize(user.total)}</span>
            </div>
        </div>
    )
};

export default StorageSize;
