import React from 'react'

import styles from './ListTaskItem.module.sass'

const ListTaskItem = () => {

    return (
        <div className={styles.wrapper}>

            <div className={styles.leftBlock}>
                <span className={styles.circle}/>
                <img
                    className={styles.avatar}
                    src="./assets/PrivateCabinet/avatars/a1.svg"
                    alt="Avatar 1"
                />
            </div>

            <div className={styles.rightBlock}>

                <div className={styles.infoBlock}>

                    <div className={styles.infoItem}>
                        <p className={styles.option}>Имя задачи</p>
                        <p className={styles.value}>Сдать задачу за 2020 год</p>
                    </div>

                    <div className={styles.infoItem}>
                        <p className={styles.option}>Срок</p>
                        <p className={styles.value}>С 12 августа По 16 августа 2020</p>
                    </div>

                    <div className={styles.infoItem}>
                        <p className={styles.option}>Тег</p>
                        <p className={styles.value}>Отчет</p>
                    </div>

                    <div className={styles.infoItem}>
                        <p className={styles.option}>Отправитель</p>
                        <p className={styles.value}>Недельская Алина Квиталина</p>
                    </div>

                </div>

                <p className={styles.timeBlock}>
                    14:45
                </p>

            </div>

        </div>
    )
}

export default ListTaskItem