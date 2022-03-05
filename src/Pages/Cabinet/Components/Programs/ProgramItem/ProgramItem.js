import React from 'react';
import styles from './ProgramItem.module.sass';

function ProgramItem({program}) {
    return (
        <div className={styles.itemWrap}>{program?.name}</div>
    )
}

export default ProgramItem;