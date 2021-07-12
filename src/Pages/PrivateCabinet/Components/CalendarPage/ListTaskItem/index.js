import React from 'react'

import styles from './ListTaskItem.module.sass'
import {hexToRgb, taskTypesColor} from '../helper'

const ListTaskItem = ({task}) => {

    const color = taskTypesColor?.[task?.type]
    const rgba = hexToRgb(color)

    return (
        <div
            className={styles.wrapper}
            style={{
                background: `rgba(${rgba?.r}, ${rgba?.g}, ${rgba?.b}, 0.1)`
            }}
        >

            <div className={styles.leftBlock}>
                <span
                    style={{
                        background: `${color}`
                    }}
                    className={styles.circle}
                />
                <img
                    className={styles.avatar}
                    src={`./assets/PrivateCabinet/avatars/${task.avatar}.svg`}
                    alt="Avatar 1"
                />
            </div>

            <div className={styles.rightBlock}>

                <div className={styles.infoBlock}>

                    <div className={styles.infoItem}>
                        <p className={styles.option}>Имя задачи</p>
                        <p className={styles.value}>{task?.name}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <p className={styles.option}>Срок</p>
                        <p className={styles.value}>{task?.term}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <p className={styles.option}>Тег</p>
                        <p className={styles.value}>{task?.tag}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <p className={styles.option}>Отправитель</p>
                        <p className={styles.value}>{task?.sender}</p>
                    </div>

                </div>

                <p className={styles.timeBlock}>
                    {task?.ctime}
                </p>

            </div>

        </div>
    )
}

export default ListTaskItem