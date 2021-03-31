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
import { ReactComponent as InvisibleIcon } from '../../../assets/StartPage/invisible.svg';

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

    const renderExpireDate = () => {
        return dateValue
        ? `${dateValue} ${timeValue.hours ? setTime(timeValue.hours, 24) : '00'}:${timeValue.minutes ? setTime(timeValue.minutes, 60) : '00'}`
        : 'Без ограничений';
    }

    const setTime = (time, limit) => {
        return time < limit
        ? time < 10 ? `0${time}` : time
        : time[0];
    }

    const sendFile = () => {
        if(blob) {
            let form = new FormData();
            form.append('file', blob);
            form.append('pass', password.active ? password.text : '');
            form.append('sender', email.sender);
            form.append('recipient', email.receiver);
            form.append('deadline', `${dateValue} ${timeValue.hours ? setTime(timeValue.hours, 24) : '00'}:${timeValue.minutes ? setTime(timeValue.minutes, 60) : '00'}`);

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
        } else { setError(true) }
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
                    <span className={styles.cross} onClick={() => setBlob('')} />
                    <div className={styles.fileWrap}><File format={setFormat().toLowerCase()} /></div>
                    <div className={styles.fileName}>{blob.name}</div>
                    <div className={styles.fileSize}>{setSize()}</div>
                </div>}
                <div className={styles.fieldsWrap}>
                    <div className={styles.fieldWrapper}>
                        <span>Срок хранения</span>
                        <div className={`${styles.fields} ${styles.choose}`} onClick={() => setShowPeriod(!showPeriod)}>
                            <div>{renderExpireDate()}</div>
                            <img src='./assets/StartPage/play-button.svg' alt='Open PopUp' />
                        </div>
                    </div>
                    <div className={styles.fieldWrapper}>
                        <span>Установить пароль</span>
                        <div className={styles.fields}>
                            {!password.active && <div>Установить пароль</div>}
                            {password.active && <>
                                <input
                                type={visibility}
                                placeholder='Введите пароль'
                                onChange={(e) => setPassword({...password, text: e.target.value})}
                                value={password.text} />
                                {visibility === 'text' && <EyeIcon className={styles.eyeIcon} onClick={() => setVisibility('password')} />}
                                {visibility === 'password' && <InvisibleIcon className={styles.invisible} onClick={() => setVisibility('text')} />}
                                </>}
                            <div
                                className={password.active ? styles.switcherActive : styles.switcher}
                                onClick={() => setPassword({...password, active: !password.active})}
                            ><div className={password.active ? styles.switchActive : styles.switch} /></div>
                        </div>
                    </div>
                    <div className={styles.fieldWrapper}>
                        <span>Email получателя</span>
                        <input
                            value={email.receiver}
                            onChange={(e) => setEmail({...email, receiver: e.target.value})}
                            type='email'
                            className={styles.emailField}
                            placeholder='Email получателя'
                        />
                    </div>
                    <div className={styles.fieldWrapper}>
                        <span>Email отправителя</span>
                        <input
                            value={email.sender}
                            onChange={(e) => setEmail({...email, sender: e.target.value})}
                            type='email'
                            className={styles.emailField}
                            placeholder='Email отправителя'
                        />
                    </div>
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
