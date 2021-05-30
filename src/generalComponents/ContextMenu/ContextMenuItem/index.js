import React from 'react';

import styles from './ContextMenuItem.module.sass';

const ContextMenuItem = ({width, height, text, imageSrc, callback}) => {
    return <div
        className={styles.itemWrap}
        style={{width, height}}
        onClick={() => {
            if(callback) callback();
        }}
    >
        <img src={imageSrc} alt='img' />
        <div>{text}</div>
    </div>
}

export default ContextMenuItem;