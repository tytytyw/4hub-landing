import React from 'react';

import styles from './Files.module.sass';

const File = ({format}) => {
    const formats = [
        'png', 'jpeg', 'jpg', 'svg', 'doc', 'docx', 'sketch',
        'ai', 'psd', 'mp4', 'mov', 'avi', 'xls', 'xlsx', 'pptx'
    ];

    const isFormat = () => formats.indexOf(format);

    return (
        <div className={styles.file}>
            <div className={`${styles.corner} ${isFormat() > -1 ? styles[format] : styles.others}`}></div>
            <div className={styles.shadow}></div>
            <div className={`${styles.label} ${isFormat() > -1 ? styles[`${format}Big`] : styles.othersBig}`}>{format.toUpperCase()}</div>
        </div>
    )
};

export default File;