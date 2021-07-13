import React from 'react'

import styles from './SuccessCreated.module.sass'

import PopUp from '../../../../../../generalComponents/PopUp'

const SuccessCreated = ({set, event}) => {

    return (
        <PopUp set={set}>
            <div className={styles.wrapper}>

                <div className={styles.titleWrap}>
                    <h4 className={styles.title}>Задача успешно создана</h4>
                </div>

                <div className={styles.content}>

                    <div className={styles.itemBlock}>
                        <p className={styles.option}>Имя задачи</p>
                        <div className={styles.infoWrap}>
                            <p className={styles.value}>{event?.name}</p>
                            <div className={styles.icons}>
                                {event?.sign &&
                                <img
                                    className={styles.icon}
                                    src={`./assets/PrivateCabinet/signs/${event.sign}.svg`}
                                    alt="Sign"
                                />}
                                {event?.emoji &&
                                <img
                                    className={styles.icon}
                                    src={`./assets/PrivateCabinet/smiles/${event.emoji}.svg`}
                                    alt="Emoji"
                                />}
                                {event?.color &&
                                <span
                                    style={{
                                        background: `${event.color?.dark}`
                                    }}
                                    className={styles.circle}
                                />}
                            </div>
                        </div>
                    </div>


                    <div className={styles.itemBlock}>
                        <p className={styles.option}>Срок Выполнения</p>
                        <div className={styles.infoWrap}>
                            <div className={styles.valueWrap}>
                                <p className={styles.option}>С:</p>
                                <p className={styles.value}>{event?.dateFrom}</p>
                            </div>
                            <div className={styles.valueWrap}>
                                <p className={styles.option}>До:</p>
                                <p className={styles.value}>{event?.dateTo}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.itemBlock}>
                        <p className={styles.option}>Получатель</p>
                        <div className={styles.infoWrap}>
                            <img
                                className={styles.avatar}
                                src="./assets/PrivateCabinet/avatars/a1.svg"
                                alt="Avatar"
                            />
                            <p className={styles.value}>Мангуш Ирина Николаевна</p>
                        </div>
                    </div>

                    <div className={styles.itemBlock}>
                        <p className={styles.option}>Тег</p>
                        <div className={styles.infoWrap}>
                            <p className={styles.value}>{event?.tagOption?.chosen}</p>
                        </div>
                    </div>

                    <div className={styles.itemBlock}>
                        <p className={styles.option}>Сопроводительный текст</p>
                        <div className={styles.infoWrap}>
                            <p className={styles.value}>{event?.desc}</p>
                        </div>
                    </div>

                </div>

                <div className={styles.actionBlock}>
                    <button
                        onClick={() => set(false)}
                        className={styles.actionBtn}
                    >
                        Готово
                    </button>
                </div>

            </div>
        </PopUp>
    )
}

export default SuccessCreated