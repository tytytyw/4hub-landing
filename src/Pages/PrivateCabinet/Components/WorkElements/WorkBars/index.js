import React from 'react';

import styles from './WorkBars.module.sass';
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/plus-3.svg';
// import {ReactComponent as TextAddIcon} from '../../../../../../public/assets/PrivateCabinet/addPropose.png';

const WorkBars = ({children}) => {
    return (
        <div className={styles.workBarsWrap}>
            <div className={styles.addFile}>
                <input type='file' />
                <AddIcon className={styles.addIcon} />
                <span>Перетащите файл или нажмите загрузить</span>
            </div>
            {!children && <img src='./assets/PrivateCabinet/addPropose.png' alt='addFile' className={styles.textAddIcon} />}
            {children}
        </div>
    )
}

export default WorkBars;
