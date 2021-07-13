import React, {useEffect, useState} from 'react'

import styles from './ListCalendar.module.sass'
import classNames from "classnames";
import {getDays, getNextMonthDays, getPrevMonthDays} from './helper'
import {months} from "../helper";

const ListCalendar = ({day, setDay, month, year, collapsed = false}) => {

    const date = new Date()
    date.setDate(1);

    const [prevMonthDays, setPrevMonthDays] = useState(getPrevMonthDays(date))
    const [days, setDays] = useState(getDays(date))
    const [nextMonthDays, setNextMonthDays] = useState(getNextMonthDays(date))

    const getAllDays = () => {
        const result = []
        for (let i = 1; i <= 12; i++) {
            for (let j = 1; j <=31; j++) {
                result.push(j)
            }
        }
        return result
    }

    const allDays = getAllDays()

    useEffect(() => {

        if (month !== null || year) {
            month && date.setMonth(month)
            year && date.setFullYear(year)
            setPrevMonthDays(getPrevMonthDays(date))
            setDays(getDays(date))
            setNextMonthDays(getNextMonthDays(date))
        }

        year && date.setFullYear(year)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year, month])

    const weekDays = [
        {id: 1, name: 'Вс'},
        {id: 2, name: 'Пн'},
        {id: 3, name: 'Вт'},
        {id: 4, name: 'Ср'},
        {id: 5, name: 'Чт'},
        {id: 6, name: 'Пт'},
        {id: 7, name: 'Сб'},
    ]

    const getMonthName = () => {
        const monthItem = months?.find(item => item?.id === month)
        return monthItem?.text
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.header}>
                <p className={styles.month}>{getMonthName(month)} {year}</p>
                <img
                    src="./assets/PrivateCabinet/calendar-9.svg"
                    className={styles.calendarIcon}
                    alt="Calendar"
                />
            </div>

            {!collapsed ?
                <div className={styles.content}>

                    {weekDays?.map((weekDay, i) => (
                        <div
                            className={styles.weekDay}
                            key={weekDay.id}
                        >
                            {weekDay.name}
                        </div>
                    ))}

                    {prevMonthDays?.map((itemDay, index) => (
                        <div
                            key={index}
                            className={styles.dayWrap}
                        >
                        <span
                            className={classNames({
                                [styles.day]: true,
                                [styles.anotherDay]: true,
                                [styles.selectedDay]: day === itemDay
                            })}
                            onClick={() => setDay(itemDay)}
                        >
                            {itemDay}
                        </span>
                        </div>
                    ))}

                    {days?.map((itemDay, index) => (
                        <div
                            key={index}
                            className={styles.dayWrap}
                        >
                        <span
                            className={classNames({
                                [styles.day]: true,
                                [styles.selectedDay]: itemDay === day
                            })}
                            onClick={() => setDay(itemDay)}
                        >
                            {itemDay}
                        </span>
                        </div>
                    ))}

                    {nextMonthDays?.map((itemDay, index) => (
                        <div
                            key={index}
                            className={styles.dayWrap}
                        >
                        <span
                            className={classNames({
                                [styles.day]: true,
                                [styles.anotherDay]: true,
                                [styles.selectedDay]: itemDay === day
                            })}
                            onClick={() => setDay(itemDay)}
                        >
                            {itemDay}
                        </span>
                        </div>
                    ))}

                </div> :
                <div className={styles.contentCollapsed}>

                    <div
                        className={styles.weekDay}
                        key={0}
                    >
                        Пн
                    </div>

                    <div className={styles.daysWrap}>
                        {allDays?.map((itemDay, index) => (
                            <div
                                key={index}
                                className={styles.dayWrap}
                            >
                                <span
                                    className={classNames({
                                        [styles.day]: true,
                                        [styles.anotherDay]: true,
                                        [styles.selectedDay]: day === itemDay
                                    })}
                                    onClick={() => setDay(itemDay)}
                                >
                                    {itemDay}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>}

        </div>
    )
}

export default ListCalendar