import React from 'react'
import styles from './WorkSpace.module.sass'
import {hexToRgb, hours, taskTypesColor} from '../helper'
import TableListTaskItem from '../TableListTaskItem'

const monthNameType = {
    0: 'Января',
    1: 'Февраля',
    2: 'Марта',
    3: 'Апреля',
    4: 'Мая',
    5: 'Июня',
    6: 'Июля',
    7: 'Августа',
    8: 'Сентября',
    9: 'Октября',
    10: 'Ноября',
    11: 'Декабря',
}

const WorkSpaceList = ({taskList, year, month, day}) => {

    const getTask = hour => {
        const task = taskList?.find(item => /*item?.weekDay === day && */item?.hour === hour)
        if (task) {
            return task
        }
        return false
    }

    const renderTask = hour => {
        const task = getTask(hour)
        if (task) {
            return (
                <TableListTaskItem
                    task={task}
                />
            )
        }
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.headerBlock}>

                <p className={styles.date}>{day} {monthNameType?.[month]} {year}г</p>

                <div className={styles.headerBtnWrap}>
                    <button className={styles.headerBtn}>
                        7 задач
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
                    const task = getTask(hour.value)
                    const color = taskTypesColor?.[task?.type]
                    const rgba = hexToRgb(color)
                    return task ? (
                        <div
                            key={index}
                            className={styles.listItemActive}
                            style={{
                                background: `rgba(${rgba?.r}, ${rgba?.g}, ${rgba?.b}, 0.1)`
                            }}
                        >
                            <div className={styles.hour}>{hour.value}</div>
                            <div className={styles.hourItem}>
                                {renderTask(hour.value)}
                            </div>
                        </div>
                    ) : (
                        <div key={index} className={styles.listItem}>
                            <div className={styles.hour}>{hour.value}</div>
                            <div className={styles.hourItem}>
                                {renderTask(hour.value)}
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default WorkSpaceList