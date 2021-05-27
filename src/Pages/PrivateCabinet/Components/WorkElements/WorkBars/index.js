import React from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkBars.module.sass';
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/plus-3.svg';

const WorkBars = ({children, setBlob, blob, fileSelect}) => {

    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles)

    return (

        <div
            className={styles.workBarsWrap}
            style={{height: `${recentFiles?.length > 0 ? 'calc(100% - 90px - 55px - 78px)' : 'calc(100% - 90px - 55px)'}`}}
            onClick={fileSelect}
        >
            <div className={styles.addFile}>
                {/*<form className={styles.form} ref={formRef}><input type='file' onChange={onHandleChange} /></form>*/}
                <AddIcon className={styles.addIcon} />
                <span>Перетащите файл или нажмите загрузить</span>
            </div>
            {!children && <img src='./assets/PrivateCabinet/addPropose.png' alt='addFile' className={styles.textAddIcon} />}
            {children}
        </div>
    )
}

export default WorkBars;
