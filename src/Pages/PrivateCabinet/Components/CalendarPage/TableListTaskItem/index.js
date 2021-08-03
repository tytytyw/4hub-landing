import React, {useState} from 'react'

import styles from './TableListTaskItem.module.sass'
import {eventTypesColor} from '../helper'
import classNames from "classnames";

const TableListTaskItem = ({task}) => {

    const [collapse, setCollapse] = useState(false)
    const color = eventTypesColor?.[task?.type]

    return (
        <div className={styles.wrapper}>

            <div
                onClick={() => setCollapse(!collapse)}
                className={styles.headBlock}
            >

                <div className={styles.icons}>
                <span
                    style={{
                        background: `${color}`
                    }}
                    className={styles.circle}
                />
                    <img
                        className={styles.suitCase}
                        src="./assets/PrivateCabinet/suitcase.svg"
                        alt="Suitcase"
                    />
                </div>

                <div className={styles.infoBlock}>

                    <div className={classNames(styles.infoItem, styles.infoItemName)}>
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

                    <div className={classNames(styles.infoItem, styles.infoItemSender)}>
                        <img
                            className={styles.avatarImg}
                            src="./assets/PrivateCabinet/avatars/a1.svg"
                            alt="Avatar"
                        />
                        <div>
                            <p className={styles.option}>Отправитель</p>
                            <p className={styles.value}>{task?.sender}</p>
                        </div>
                    </div>

                </div>

                <div className={styles.rightIcons}>
                    <img
                        className={styles.icon}
                        src="./assets/PrivateCabinet/smiles/cool.svg"
                        alt="Notification"
                    />
                    <img
                        className={styles.icon}
                        src="./assets/PrivateCabinet/notification.svg"
                        alt="Notification"
                    />
                </div>

                <div className={styles.arrowWrap}>
                <span className={classNames({
                    [styles.arrow]: true,
                    [styles.active]: !!collapse
                })}/>
                </div>

            </div>


            {collapse &&
            <div className={styles.descWrap}>

                <div className={styles.descBlock}>
                    <p className={styles.descTitle}>Описание задачи</p>
                    <p className={styles.descText}>
                        Текст большую коллекцию размеров и форм шрифтов,
                        используя Lorem Ipsum для распечатки образцов. Lorem Ipsum
                        не только успешно пережил без заметных изменений пять веков
                    </p>
                </div>

                <div className={styles.actionBlock}>
                    <button
                        className={styles.actionBtn}
                    >
                        Перейти к задаче
                    </button>
                </div>

            </div>}

        </div>
    )
}

export default TableListTaskItem