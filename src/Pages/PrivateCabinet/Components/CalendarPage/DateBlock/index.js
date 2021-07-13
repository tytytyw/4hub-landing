import React from 'react'
import styles from './DateBlock.module.sass'
import Select from '../../../../../generalComponents/Select/Select'
import {getDays, getYears, months} from '../helper'
import classNames from 'classnames'

const DateBlock = ({search, setSearch, month, setMonth, setYear, setDay}) => {

    return (
        <div className={styles.wrapper}>

            <div className={styles.searchWrap}>

                <div className={styles.selectsWrap}>
                    <div className={styles.yearSelect}>
                        <Select
                            placeholder='Выбрать год'
                            className={styles.select}
                            classNameSelect={styles.selectContentYear}
                            data={getYears()}

                            onChange={value => setYear(value)}
                        />
                    </div>

                    <div className={styles.daySelect}>
                        <Select
                            placeholder='Выбрать день'
                            className={styles.select}
                            classNameSelect={styles.selectContent}
                            data={getDays()}

                            onChange={value => setDay(value)}
                        />
                    </div>
                </div>

            </div>

            <div className={styles.buttonsWrap}>

                {months?.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setMonth(item.id)}
                        className={classNames({
                            [styles.button]: true,
                            [styles.active]: item.id === month
                        })}
                    >
                        {item.text}
                    </button>
                ))}

            </div>

        </div>
    )
}

export default DateBlock