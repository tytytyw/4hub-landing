import React from 'react'
import styles from './DateBlock.module.sass'
import Select from '../../../../../generalComponents/Select/Select'
import {getDays, getYears, months} from '../helper'
import classNames from 'classnames'
// import {imageSrc} from '../../../../../generalComponents/globalVariables';

const DateBlock = ({search, setSearch, month, setMonth}) => {

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
                        />
                    </div>

                    <div className={styles.daySelect}>
                        <Select
                            placeholder='Выбрать день'
                            className={styles.select}
                            classNameSelect={styles.selectContent}
                            data={getDays()}
                        />
                    </div>
                </div>

                {/*<div className={styles.search}>
                    <input
                        type='search'
                        value={search || ''}
                        onChange={event => setSearch(event.target.value)}
                        className={styles.input}
                        placeholder='Введите ключевое слово'
                    />
                    <img
                        className={styles.icon}
                        src={imageSrc + 'assets/PrivateCabinet/magnifying-glass-2.svg'}
                        alt='Search'
                    />
                </div>*/}

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