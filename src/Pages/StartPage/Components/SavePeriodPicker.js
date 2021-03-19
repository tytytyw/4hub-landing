import React, { useState } from 'react';

import styles from './SavePeriodPicker.module.sass';

const SavePeriodPicker = ({set, setShowCalendar}) => {

    const [dateValue, setDateValue] = useState('');
    const onDateChange = (e) => {
        let val = e.target.value.trim();
        let length = e.target.value.length;
        if(/[0-9]/.test(val) || length === 0) {
            if(length === 3) {
                let arr = val.split('');
                if(arr[3] !== '.') arr.splice(2, 0, '.');
                if(arr[3] === '.') arr.splice(2);
                val = arr.join('');
            }
            if(length === 6) {
                let arr = val.split('');
                if(arr[6] !== '.') arr.splice(5, 0, '.');
                if(arr[6] === '.') arr.splice(5);
                val = arr.join('');
            }
            if(val.length <= 10) setDateValue(val);
        }
    };

    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const onTime = (val, set) => {
        if(/[0-9]/.test(val) || val.length === 0) {
            if(val.length < 3) set(val);
        }
    };

    return(
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div>
                    <img src='./assets/StartPage/file-grey.svg' alt='file' />
                    <span>Срок хранения файла</span>
                </div>
                <span className={styles.cross} onClick={() => set(false)}></span>
            </div>
            <div className={styles.main}>
                <div className={styles.titleName}>
                    <img src='./assets/StartPage/calendar-grey.svg' alt='calendar' />
                    <span>Укажите даты хранения</span>
                </div>
                <div className={styles.inputDiv}>
                    <div>
                        <span>До</span>
                        <input type='text' placeholder='_ _._ _._ _ _ _' onChange={(e) => onDateChange(e)} value={dateValue} />
                    </div>
                    <span onClick={() => setShowCalendar(true)}>Открыть календарь</span>
                </div>
                <div className={styles.titleName}>
                    <img src='./assets/StartPage/clock.svg' alt='calendar' />
                    <span>Укажите время хранения</span>
                </div>
                <div className={styles.inputHM}>
                    <input type='text' placeholder='ЧЧ' value={hours} onChange={(e) => onTime(e.target.value, setHours)} />
                    <span> : </span>
                    <input type='text' placeholder='ММ' value={minutes} onChange={(e) => onTime(e.target.value, setMinutes)} />
                </div>
                <div className={styles.notion}>
                    После завершения срока хранения ссылка автоматитески будет недоступна
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.approve}>Готово</div>
            </div>
        </div>
    )
};

export default SavePeriodPicker;
