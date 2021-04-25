import React, { useEffect, useRef } from 'react';

import styles from './WorkBars.module.sass';
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/plus-3.svg';
import FileBar from '../FileBar';

const WorkBars = ({children, setBlob, blob, fileLoading, progress}) => {

    const formRef = useRef(null);
    useEffect(() => {
        if(blob.file === null) formRef.current.reset();
    }, [blob]);
    const onHandleChange = (e) => {
        setBlob({...blob, file: e.target.files[0], show: true});
    };

    return (
        <div className={styles.workBarsWrap}>
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
