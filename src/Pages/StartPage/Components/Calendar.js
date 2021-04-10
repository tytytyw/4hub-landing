import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import styles from './Calendar.module.sass';
import { getDate, daysOfWeeks, generateCalendar, areEqual, months } from '../../../generalComponents/CalendarHelper';

const Calendar = ({setShowCalendar, setDateValue}) => {

    const [date, setDate] = useState(getDate());
    const [daysInMonth, setDaysInMonth] = useState(generateCalendar(6, date));
    const today = getDate();
    const chooseDate = (e) => {
        const newDate = {...date, day: Number(e.target.innerHTML)};
        setDate(newDate);
    }

    const cannotInterAct = () => false;
    const switchMonth = (e) => {
        const day = e?.target?.innerHTML ? Number(e.target.innerHTML) : e;
        if(day >= 15) {
            if(date.month === '1') return setDate({day: day && day <= 31 ? day : '', month: '12', year: date.year - 1});
            return setDate({...date, day: day && day <= 31 ? day : '', month: String(Number(date.month) - 1)});
        } else {
            if(date.month === '12') return setDate({day: day && day <= 31 ? day : '', month: '1', year: date.year + 1});
            return setDate({...date, day: day && day <= 31 ? day : '', month: String(Number(date.month) + 1)});
        }
    };

    const switchYear = (status) => {
        status === 'increase' ? setDate({...date, year: date.year + 1}) : setDate({...date, year: date.year - 1});
    }

    const renderCal = (obj, classCustom, func, canInteract) => {
        return obj.map(day => {
            const eachDate = {...date, day};
           return (
               <div
                   key={day + Math.random()}
                   className={classnames({
                       [styles[classCustom]]: true,
                       [styles.today]: canInteract(today, eachDate),
                       [styles.chosen]: canInteract(date, eachDate),
                   })}
                   onClick={e => func(e)}
               >{day}</div>
           )
        });
    };

    const changeDate = () => {
        if(date.day) {
            let newDate = {
                ...date,
                day: date.day < 10 ? `0${date.day}` : date.day,
                month: Number(date.month) < 10 ? `0${date.month}` : date.month
            }
            setDateValue(Object.values(newDate).join('.'));
            setShowCalendar(false);
        }
    }

    useEffect(() => setDaysInMonth(generateCalendar(6, date)), [date]);

    return(
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.calendarPic}>
                    <img src='./assets/StartPage/Calendar.svg' alt='file' />
                    <span>Календарь</span>
                </div>
                <div className={styles.yearPicker}>
                    <div className={styles.yearDecrease} onClick={() => switchYear()} />
                    <span>{date.year}</span>
                    <div className={styles.yearIncrease} onClick={() => switchYear('increase')} />
                </div>
                <span className={styles.cross} onClick={() => setShowCalendar(false)}></span>
            </div>
            <div className={styles.main}>
                <div className={styles.switcher}>
                    <img src='./assets/StartPage/play-3.svg' alt='Previous' onClick={() => switchMonth(32)} />
                    <div className={styles.month}>{months(date.year)[date.month - 1].name}</div>
                    <img className={styles.switchReverse} src='./assets/StartPage/play-3.svg' alt='Next' onClick={() => switchMonth(0)} />
                </div>
                <div className={styles.calendarBox}>
                    <div className={styles.daysOfWeekWrap}>{renderCal(daysOfWeeks.short, '', cannotInterAct, cannotInterAct)}</div>
                    <div className={styles.days}>
                        {renderCal(daysInMonth[0], '', switchMonth, cannotInterAct)}
                        {renderCal(daysInMonth[1], 'current', chooseDate, areEqual)}
                        {renderCal(daysInMonth[2], '', switchMonth, cannotInterAct)}
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div
                    className={styles.approve}
                    onClick={changeDate}
                >Готово</div>
            </div>
        </div>
    )
};

export default Calendar;
