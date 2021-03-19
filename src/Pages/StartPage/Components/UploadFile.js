import React, {useState} from 'react';

import styles from './UploadFile.module.sass'

const UploadFile = () => {

    const [password, setPassword] = useState(false);

    return (
        <form className={styles.sendFile}>
            <img className={styles.hubIcon} src='./assets/StartPage/4HUB.svg' alt='4HUB' />
            <div className={styles.uploadWrap}>
                <input
                    type='file'
                    className={styles.inputFile}
                    onChange={e => {
                        console.log(e);
                    }}
                />
                <img src='./assets/StartPage/down-arrow-2.svg' alt='Upload file' />
                <span>Перетащите Файл или Нажмите <span className={styles.download}>Загрузить</span></span>
            </div>
            <div className={styles.fieldsWrap}>
                <div className={`${styles.fields} ${styles.choose}`}>
                    <div>Срок хранения</div>
                    <img src='./assets/StartPage/play-button.svg' alt='Open PopUp' />
                </div>
                <div className={styles.fields}>
                    <div>Установить пароль</div>
                    <div
                        className={password ? styles.switcherActive : styles.switcher}
                        onClick={() => setPassword(!password)}
                    ><div className={password ? styles.switchActive : styles.switch}></div></div>
                </div>
                <input type='email' className={styles.emailField} placeholder='Email получателя' />
                <input type='email' className={styles.emailField} placeholder='Email отправителя' />
            </div>
            <div className={styles.submitButton}>Отправить</div>
        </form>
    )
};

export default UploadFile;