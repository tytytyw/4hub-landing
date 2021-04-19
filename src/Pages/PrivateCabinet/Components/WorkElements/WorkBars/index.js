import React from 'react';

import styles from './WorkBars.module.sass';
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/plus-3.svg';

const WorkBars = ({children, setBlob, blob}) => {
    return (
        <div className={styles.workBarsWrap}>
            <div className={styles.addFile}>
                <input type='file' onChange={e => setBlob({...blob, file: e.target.files[0], show: true})} />
                <AddIcon className={styles.addIcon} />
                <span>Перетащите файл или нажмите загрузить</span>
            </div>
            {!children && <img src='./assets/PrivateCabinet/addPropose.png' alt='addFile' className={styles.textAddIcon} />}
            {children}
        </div>
    )
}

export default WorkBars;
