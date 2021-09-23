import React from 'react';
import {useSelector} from 'react-redux';
import {imageSrc} from '../../../../generalComponents/globalVariables';
import styles from './StorageSize.module.sass';

const StorageSize = () => {

    const user = useSelector(state => state.user.userInfo);

    const setSize = (size) => {
        if(size / 1000000000 > 1) size = `${(size / 1000000000).toFixed()} GB`;
        if(size / 1000000 > 1) size = `${(size / 1000000).toFixed()} MB`;
        if(size / 1000 > 1) size = `${(size / 1000).toFixed()} KB`;
        return size;
    };

    const width = user ? `${(user.used * 100) / user.total}%` : '0%';

    return (
        <div className={styles.storageWrap}>
            <img
                src={imageSrc + 'assets/PrivateCabinet/pie-chart-5.svg'}
                alt='pie-chart'
            />
            <div className={styles.storageInfo}>
                <div className={styles.fullSize}><span className={styles.realSize} style={{width}} /></div>
                <span className={styles.info}>{user ? setSize(user.used) : '0 GB'} из {user ? setSize(user.total) : '0 GB'}</span>
            </div>
        </div>
    )
};

export default StorageSize;
