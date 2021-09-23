import React from 'react'

import styles from './ListTaskItem.module.sass'
import {hexToRgb, eventTypesColor} from '../helper'
import classNames from 'classnames'
import {imageSrc} from '../../../../../generalComponents/globalVariables';

const ListTaskItem = ({event, collapsed}) => {

    const color = eventTypesColor?.[event?.type]
    const rgba = hexToRgb(color)

    return (
        <>
            {!collapsed ?
                <div
                    className={styles.wrapper}
                    style={{
                        background: `rgba(${rgba?.r}, ${rgba?.g}, ${rgba?.b}, 0.1)`
                    }}
                >

                    <p className={styles.timeBlock}>
                        {event?.ctime}
                    </p>

                    <div className={styles.leftBlock}>
                        <span
                            style={{
                                background: `${color}`
                            }}
                            className={styles.circle}
                        />
                        <img
                            className={styles.avatar}
                            src={`${imageSrc}assets/PrivateCabinet/avatars/${event.avatar}.svg`}
                            alt="Avatar 1"
                        />
                    </div>

                    <div className={styles.rightBlock}>

                        <div className={styles.infoBlock}>

                            <div className={styles.infoItem}>
                                <p className={styles.option}>Имя задачи</p>
                                <p className={styles.value}>{event?.name}</p>
                            </div>

                            <div className={styles.infoItem}>
                                <p className={styles.option}>Сроки</p>
                                <p className={styles.value}>{event?.term}</p>
                            </div>

                            <div className={styles.infoItem}>
                                <p className={styles.option}>Тег</p>
                                <p className={styles.value}>{event?.tag}</p>
                            </div>

                            <div className={styles.infoItem}>
                                <p className={styles.option}>Отправитель</p>
                                <p className={styles.value}>{event?.sender}</p>
                            </div>

                        </div>

                    </div>

                </div> :
                <div
                    className={classNames(styles.wrapper, styles.wrapperCollapsed)}
                    style={{
                        background: `rgba(${rgba?.r}, ${rgba?.g}, ${rgba?.b}, 0.1)`
                    }}
                >

                    <p className={styles.timeBlock}>
                        {event?.ctime}
                    </p>

                    <div className={styles.topBlock}>
                        <span
                            style={{
                                background: `${color}`
                            }}
                            className={styles.circle}
                        />
                    </div>
                    <div className={styles.contentBlock}>
                        <div className={styles.infoBlock}>

                            <div className={styles.infoItem}>
                                <p className={styles.option}>Имя задачи</p>
                                <p className={styles.value}>{event?.name}</p>
                            </div>

                            <div className={styles.infoItem}>
                                <p className={styles.option}>Срок</p>
                                <p className={styles.value}>{event?.term}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottomBlock}>
                        <img
                            className={styles.avatar}
                            src={`${imageSrc}assets/PrivateCabinet/avatars/${event.avatar}.svg`}
                            alt="Avatar 1"
                        />
                    </div>
                </div>}
        </>
    )
}

export default ListTaskItem