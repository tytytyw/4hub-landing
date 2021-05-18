import React, { useEffect, useRef } from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkBars.module.sass';
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/plus-3.svg';
import FileBar from '../FileBar';

const WorkBars = ({children, setBlob, blob, fileLoading, progress}) => {

    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles)
    const formRef = useRef(null);
    useEffect(() => {
        if(blob.file === null) formRef.current.reset();
    }, [blob]);
    const onHandleChange = (e) => {
        setBlob({...blob, file: e.target.files[0], show: true});
    };

    return (

        <div className={styles.workBarsWrap} style={{height: `${recentFiles?.length > 0 ? 'calc(100% - 90px - 55px - 78px)' : 'calc(100% - 90px - 55px)'}`}}>
            <div className={styles.addFile}>
                <form className={styles.form} ref={formRef}><input type='file' onChange={onHandleChange} /></form>
                <AddIcon className={styles.addIcon} />
                <span>Перетащите файл или нажмите загрузить</span>
            </div>
            {!children && <img src='./assets/PrivateCabinet/addPropose.png' alt='addFile' className={styles.textAddIcon} />}
            {fileLoading.isLoading ? <FileBar file={fileLoading.file} isLoading={fileLoading.isLoading} progress={progress} /> : null}
            {children}
        </div>
    )
}

export default WorkBars;
