import React, {useState} from 'react';

import styles from './StorageSize.module.sass';

const StorageSize = () => {

    //! Need to change sizes
    const [size, ] = useState({full: 100, real: 0})

    const width = `${(size.real * 100) / 100}%`;

    return (
        <div className={styles.storageWrap}>
            <img
                src='./assets/PrivateCabinet/pie-chart-5.svg'
                alt='pie-chart'
            />
            <div className={styles.storageInfo}>
                <div className={styles.fullSize}><span className={styles.realSize} style={{width}} /></div>
                <span className={styles.info}>{size.real} ГБ из {size.full} ГБ</span>
            </div>
        </div>
    )
};

export default StorageSize;
