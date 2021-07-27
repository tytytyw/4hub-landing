import React from 'react';

import styles from './General.module.sass';
import File from '../../../../../../../generalComponents/Files';
import InputField from '../../../../../../../generalComponents/InputField';

const General = ({file}) => {
    return (<div className={styles.generalWrap}>
        <div className={styles.nameBlock}>
            <div className={styles.fileWrap}><File format={file.ext} color={file.color} /></div>
            <div className={styles.inputWrap}><InputField height='90%' placeholder={file.fname.slice(0, file.fname.lastIndexOf('.'))} disabled={true} /></div>
        </div>
        <div className={styles.typeBlock}>
            <div className={styles.typeWrap}>
                <span className={styles.name}>Тип файла:</span>
                <span className={styles.value}>{file.ext}</span>
            </div>
            <div className={styles.typeWrap}>
                <span className={styles.name}>Расположение:</span>
                <span className={styles.value}>{file.gdir}</span>
            </div>
        </div>
        <div className={styles.infoBlock}>
            <div className={styles.infoWrap}>
                <span className={styles.name}>Размер:</span>
                <span className={styles.value}>{file.size_now}</span>
            </div>
            <div className={styles.infoWrap}>
                <span className={styles.name}>Дата создание:</span>
                <span className={styles.value}>{file.mtime}</span>
            </div>
            <div className={styles.infoWrap}>
                <span className={styles.name}>Дата изменения:</span>
                <span className={styles.value}>{file.ctime}</span>
            </div>
        </div>
    </div>)
}

export default General;