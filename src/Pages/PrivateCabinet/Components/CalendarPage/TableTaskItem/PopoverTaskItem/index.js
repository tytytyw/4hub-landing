import React from 'react'

import styles from './PopoverTaskItem.module.sass'
import {hexToRgb, taskTypesColor} from '../../helper'

const PopoverTaskItem = ({task}) => {

    const color = taskTypesColor?.[task?.type]
    const rgba = hexToRgb(color)

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.content}
                style={{
                    background: `rgba(${rgba?.r}, ${rgba?.g}, ${rgba?.b}, 0.1)`
                }}
            >

                <div className={styles.flexBlock}>
                    <div className={styles.leftBlock}>
                        <div className={styles.topIcons}>
                            <img src="./assets/PrivateCabinet/suitcase.svg" alt="Suitcase"/>
                            <span
                                style={{
                                    background: `${color}`
                                }}
                                className={styles.circle}
                            />
                        </div>
                        <img
                            className={styles.avatar}
                            src={`./assets/PrivateCabinet/avatars/${task?.avatar}.svg`}
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

                <div className={styles.actionBlock}>
                    <button
                        className={styles.actionBtn}
                        onClick={() => {}}
                    >
                        Перейти к задаче
                    </button>
                </div>

            </div>
        </div>
    )
}

export default PopoverTaskItem