import React, { useState } from 'react';

import styles from './UploadFile.module.sass'
import PopUp from '../../../generalComponents/PopUp';
import SavePeriodPicker from './SavePeriodPicker';
import Calendar from './Calendar';
import SendSuccess from './SendSuccess';
import { getDate } from '../../../generalComponents/CalendarHelper';
import File from '../../../generalComponents/File';
import api from '../../../api';
import { ReactComponent as EyeIcon } from '../../../assets/StartPage/eye.svg';

const UploadFile = ({ setPage }) => {

    const [password, setPassword] = useState({text: '', active: false});
    const [showPeriod, setShowPeriod] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateValue, setDateValue] = useState(Object.values(getDate(0)).join('.'));
    const [timeValue, setTimeValue] = useState({hours: '', minutes: ''});
    const [blob, setBlob] = useState('');
    const [email, setEmail] = useState({receiver: '', sender: ''});
    const [response, setResponse] = useState('');
    const [error, setError] = useState(false);
    const [visibility, setVisibility] = useState('password');

    const setInitial = () => {
        setPassword({text: '', active: false});
        setShowPeriod(false);
        setShowCalendar(false);
        setDateValue(Object.values(getDate(0)).join('.'));
        setTimeValue({hours: '', minutes: ''});
        setBlob('');
        setEmail({receiver: '', sender: ''});
        setVisibility('password');
    };

    const setFormat = () => {
        const arr = blob.name.split('.');
        return arr[arr.length - 1];
    };

    const setSize = () => {
        let size = blob.size
        if(size / 1000000000 > 1) size = `${(size / 1000000000).toFixed(2)} GB`;
        if(size / 1000000 > 1) size = `${(size / 1000000).toFixed(2)} MB`;
        if(size / 1000 > 1) size = `${(size / 1000).toFixed(2)} KB`;
        return size;
    };

    const sendFile = () => {
        let form = new FormData();
        form.append('file', blob);
        form.append('pass', password.active ? password.text : '');
        form.append('sender', email.sender);
        form.append('recipient', email.receiver);
        form.append('deadline', `${dateValue} ${timeValue.hours}:${timeValue.minutes}`);

        api.post('/ajax/start_add.php', form)
                .then(res => {
                    if(res.status === 200) {
                        setResponse(res.data);
                    } else {
                        setError(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setError(true);
                })
            .finally(() => setInitial());
    };

    return (
        <>
            <form className={styles.sendFile}>
                <img className={styles.hubIcon} src='./assets/StartPage/4HUB.svg' alt='4HUB' onClick={() => setPage('init')} />
                {!blob && <div className={styles.uploadWrap}>
                    <input
                        type='file'
                        className={styles.inputFile}
                        onChange={e => setBlob(e.target.files[0])}
                    />
                    <img src='./assets/StartPage/down-arrow-2.svg' alt='Upload file' />
                    <span>Перетащите Файл или Нажмите <span className={styles.download}>Загрузить</span></span>
                </div>}
                {blob && <div className={styles.uploadWrapFile}>
                    <span className={styles.cross} onClick={() => setInitial()} />
                    <div className={styles.fileWrap}><File format={setFormat().toLowerCase()} /></div>
                    <div className={styles.fileName}>{blob.name}</div>
                    <div className={styles.fileSize}>{setSize()}</div>
                </div>}
                <div className={styles.fieldsWrap}>
                    <div className={`${styles.fields} ${styles.choose}`} onClick={() => setShowPeriod(!showPeriod)}>
                        <div>Срок хранения</div>
                        <img src='./assets/StartPage/play-button.svg' alt='Open PopUp' />
                    </div>
                    <div className={styles.fields}>
                        {!password.active && <div>Установить пароль</div>}
                        {password.active && <>
                            <input
                            type={visibility}
                            placeholder='Установить пароль'
                            onChange={(e) => setPassword({...password, text: e.target.value})}
                            value={password.text} />
                            <EyeIcon className={`${styles.eyeIcon} ${visibility === 'text' && styles.eyeIconShow}`} onClick={() => visibility === 'text' ? setVisibility('password') : setVisibility('text')} />
                            </>}
                        <div
                            className={password.active ? styles.switcherActive : styles.switcher}
                            onClick={() => setPassword({...password, active: !password.active})}
                        ><div className={password.active ? styles.switchActive : styles.switch} /></div>
                    </div>
                    <input
                        value={email.receiver}
                        onChange={(e) => setEmail({...email, receiver: e.target.value})}
                        type='email'
                        className={styles.emailField}
                        placeholder='Email получателя'
                    />
                    <input
                        value={email.sender}
                        onChange={(e) => setEmail({...email, sender: e.target.value})}
                        type='email'
                        className={styles.emailField}
                        placeholder='Email отправителя'
                    />
                </div>
                <div
                    className={styles.submitButton}
                    onClick={sendFile}
                >Отправить</div>
            </form>
            {showPeriod && <PopUp set={setShowPeriod}>
                <SavePeriodPicker
                    set={setShowPeriod}
                    setShowCalendar={setShowCalendar}
                    dateValue={dateValue}
                    setDateValue={setDateValue}
                    setTimeValue={setTimeValue}
                    timeValue={timeValue}
                />
            </PopUp>}
            {showCalendar && <PopUp set={setShowCalendar} zIndex={102}>
                <Calendar setShowCalendar={setShowCalendar} setDateValue={setDateValue}  />
            </PopUp>}
            {error && <PopUp set={setError}>
                <div style={{
                    width: 'max-content',
                    padding: '20px'
                }}>Упс.... что-то пошло не так. Попробуй еще раз!</div>
            </PopUp>}
            {response && <PopUp set={setResponse}>
                <SendSuccess data={response} set={setResponse} />
            </PopUp>}
        </>
    )
};

export default UploadFile;
