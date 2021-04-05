import React from 'react';

import styles from './WorkBars.module.sass';
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/plus-3.svg'
import {ReactComponent as TextAddIcon} from '../../../../../assets/PrivateCabinet/addPropose.svg'

const WorkBars = ({children}) => {
    return (
        <div className={styles.workBarsWrap}>
            <div className={styles.addFile}>
                <input type='file' />
                <AddIcon className={styles.addIcon} />
                <span>Перетащите файл или нажмите загрузить</span>
            </div>
            {!children && <TextAddIcon className={styles.textAddIcon} />}
            {children}
        </div>
    )
}

export default WorkBars;
