import React, {useState} from 'react';

import styles from './UploadFile.module.sass'
import PopUp from '../../../generalComponents/PopUp';
import SavePeriodPicker from './SavePeriodPicker';

const UploadFile = () => {

    const [password, setPassword] = useState({text: '', active: false});
    const [showPeriod, setShowPeriod] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);

    return (
        <>
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
                    <div className={`${styles.fields} ${styles.choose}`} onClick={() => setShowPeriod(!showPeriod)}>
                        <div>Срок хранения</div>
                        <img src='./assets/StartPage/play-button.svg' alt='Open PopUp' />
                    </div>
                    <div className={styles.fields}>
                        {!password.active && <div>Установить пароль</div>}
                        {password.active && <input
                            type='password'
                            placeholder='Установить пароль'
                            onChange={(e) => setPassword({...password, text: e.target.value})}
                            value={password.text} />}
                        <div
                            className={password.active ? styles.switcherActive : styles.switcher}
                            onClick={() => setPassword({...password, active: !password.active})}
                        ><div className={password.active ? styles.switchActive : styles.switch}></div></div>
                    </div>
                    <input type='email' className={styles.emailField} placeholder='Email получателя' />
                    <input type='email' className={styles.emailField} placeholder='Email отправителя' />
                </div>
                <div className={styles.submitButton}>Отправить</div>
            </form>
            {showPeriod && <PopUp set={setShowPeriod}>
                <SavePeriodPicker set={setShowPeriod} setShowCalendar={setShowCalendar} />
            </PopUp>}
            {showCalendar && <div></div>}
        </>
    )
};

export default UploadFile;
