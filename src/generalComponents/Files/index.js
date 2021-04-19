import React from 'react';

import styles from './Files.module.sass';

const File = ({format, color}) => {
    const formats = [
        'png', 'jpeg', 'jpg', 'svg', 'doc', 'docx', 'sketch',
        'ai', 'psd', 'mp4', 'mov', 'avi', 'xls', 'xlsx', 'pptx'
    ];

    const isFormat = () => formats.indexOf(format);

    return (
        <div className={styles.file}>
            <div
                className={`${styles.corner} ${isFormat() > -1 ? styles[format] : styles.others}`}
                style={{background: `${color ? `linear-gradient(45deg, ${color} 0%, ${color} 50%, white 51%)` : ''}`}}
            />
            <div className={styles.shadow} />
            <div
                className={`${styles.label} ${isFormat() > -1 ? styles[`${format}Big`] : styles.othersBig}`}
                style={{background: `${color ? color : ''}`}}
            >{format ? format.toUpperCase() : <img src='./assets/PrivateCabinet/down-arrow-2.svg' alt='img' />}</div>
        </div>
    )
};

export default File;