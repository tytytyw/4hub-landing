import React from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkBars.module.sass';
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/plus-3.svg';

const WorkBars = ({children, fileSelect, filePick}) => {

    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles)

    return (

        <div
            className={styles.workBarsWrap}
            style={{height: `${recentFiles?.length > 0 
                    ? filePick.show 
                        ? 'calc(100% - 90px - 55px - 78px - 80px)'
                        : 'calc(100% - 90px - 55px - 78px)'
                    : filePick.show 
                        ? 'calc(100% - 90px - 55px - 80px)'
                        : 'calc(100% - 90px - 55px)'
            }`}}
        >
            <div className={styles.addFile} onClick={fileSelect}>
                <AddIcon className={styles.addIcon} />
                <span>Перетащите файл или нажмите загрузить</span>
            </div>
            {!children && <img src='./assets/PrivateCabinet/addPropose.png' alt='addFile' className={styles.textAddIcon} />}
            {children}
        </div>
    )
}

export default WorkBars;
