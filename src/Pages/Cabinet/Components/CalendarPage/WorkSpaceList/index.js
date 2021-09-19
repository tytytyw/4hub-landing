import React from 'react'
import styles from './WorkSpace.module.sass'
import {hexToRgb, hours, eventTypesColor, monthNameType} from '../helper'
import TableListTaskItem from '../TableListTaskItem'
import {useSelector} from 'react-redux'

const WorkSpaceList = ({events}) => {

    const calendarDate = useSelector(state => state.Cabinet.calendarDate)

    const checkDateEvent = event => {

        if (!event)
            return false

        return event?.date?.getFullYear() === calendarDate.getFullYear() &&
               event?.date?.getMonth() === calendarDate.getMonth() &&
               event?.date?.getDate() === calendarDate.getDate()

    }

    const getTask = hour => {

        const event = events?.find(item => {
            const itemHour = item?.date.getHours()
            return itemHour === hour
        })

        if (checkDateEvent(event)) {
            return event
        }

        return false
    }

    const renderTask = hour => {
        const task = getTask(hour)
        if (task) {
            return <TableListTaskItem task={task}/>
        }
    }

    const getStrDate = () => {
        return `${calendarDate?.getDate()} ${monthNameType?.[calendarDate.getMonth()]}  ${calendarDate.getFullYear()} г`
    }

    const getEventsCount = () => {
        const findEvents = events.filter(event => {
            return event?.date.getDate() === calendarDate.getDate()
        })
        return findEvents?.length
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.headerBlock}>

                <p className={styles.date}>{getStrDate()}</p>

                <div className={styles.headerBtnWrap}>
                    <button className={styles.headerBtn}>
                        {getEventsCount()} задач
                    </button>
                </div>
                <div className={styles.headerBtnWrap}>
                    <button className={styles.headerBtn}>
                        1 новая задача
                    </button>
                    <span className={styles.badge}>3</span>
                </div>
                <div className={styles.headerBtnWrap}>
                    <button className={styles.headerBtn}>
                        1 напоминание
                    </button>
                </div>
            </div>

            <div className={styles.list}>
                {hours?.map((hour, index) => {
                    const event = getTask(hour.value)
                    const color = eventTypesColor?.[event?.type]
                    const rgba = hexToRgb(color)
                    return event ? (
                        <div
                            key={index}
                            className={styles.listItemActive}
                            style={{
                                background: `rgba(${rgba?.r}, ${rgba?.g}, ${rgba?.b}, 0.1)`
                            }}
                        >
                            <div className={styles.hour}>{hour.text}</div>
                            <div className={styles.hourItem}>
                                {renderTask(hour.value)}
                            </div>
                        </div>
                    ) : (
                        <div key={index} className={styles.listItem}>
                            <div className={styles.hour}>{hour.text}</div>
                            <div className={styles.hourItem}>

                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default WorkSpaceList