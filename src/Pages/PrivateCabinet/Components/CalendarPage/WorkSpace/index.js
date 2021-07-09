import React from 'react'
import styles from './WorkSpace.module.sass'

const WorkSpace = () => {

    const days = [
        {day: 'Вт', number: '11'},
        {day: 'Ср', number: '12'},
        {day: 'Чт', number: '13'},
        {day: 'Пн', number: '14'},
        {day: 'Сб', number: '15'},
        {day: 'Вс', number: '16'},
    ]

    const hours = [
        {value: '9:00'},
        {value: '10:00'},
        {value: '11:00'},
        {value: '12:00'},
        {value: '13:00'},
        {value: '14:00'},
        {value: '15:00'},
        {value: '16:00'},
        {value: '17:00'},
        {value: '18:00'},
        {value: '19:00'},
        {value: '20:00'},
        {value: '21:00'},
        {value: '22:00'},
        {value: '23:00'},
    ]

    return (
        <div className={styles.wrapper}>

            <div className={styles.topBlockWrap}>
                <div className={styles.topBlock}>
                    <ul className={styles.daysList}>
                        {days?.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {}}
                                className={styles.dayItem}
                            >
                                <span className={styles.day}>{item.day}</span>
                                <h4 className={styles.dayNumber}>{item.number}</h4>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.leftBlockWrap}>
                <ul className={styles.hoursList}>
                    {hours?.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {}}
                            className={styles.hourItem}
                        >
                            <span className={styles.hour}>{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>


            <table className={styles.table}>

                <tr className={styles.row}>
                    <td className={styles.firstCell}/>
                    <td className={styles.cell}/>
                    <td className={styles.cell}/>
                    <td className={styles.cell}/>
                    <td className={styles.cell}/>
                    <td className={styles.cell}/>
                    <td className={styles.cell}/>
                </tr>
                {hours?.map((item, index) => (
                    <tr key={index} className={styles.row}>
                        <td className={styles.firstCell}/>
                        {days?.map((day, dayIndex) => (
                            <td key={dayIndex} className={styles.cell}>

                            </td>
                        ))}
                    </tr>
                ))}

            </table>

        </div>
    )
}

export default WorkSpace