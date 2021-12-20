import React, {useState, useEffect} from 'react'
import styles from "./InviteUser.module.sass";
import Popup from '../../../../../../generalComponents/PopUp'
import timesImg from '../../../../../../assets/BusinessCabinet/times.svg'
import classNames from 'classnames'
import {messengersData} from './consts'

function InviteUser({contact}) {
    const [sentInvite, setSentInvite] = useState(false)
    const [selectedSoc, setSelectedSoc] = useState(null)
    const [messengers, setMessengers] = useState([])

    const onSendInvite = () => {
        if (selectedSoc) {
            console.log(selectedSoc)
        }
    }

    useEffect(() => {
        setMessengers(messengersData)
        if (!contact?.email?.length) setMessengers(messengersData => messengersData.filter(item => item.type !== 'email'))
        if (!contact?.tel?.length) setMessengers(messengersData => messengersData.filter(item => item.type !== "tel"))
    }, [contact]) //eslint-disable-line

    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>
                Данный контакт отсутсвует в системе 4Hub отправьте 
                приглашения что бы Вы могли вести диалог в системе
            </p>
            <div onClick={() => setSentInvite(true)} className={styles.button}>
                Пригласить
            </div>
            {sentInvite ? <Popup set={setSentInvite}>
                <div className={styles.sendInvite}>
                    <div className={styles.contentWrapper}>
                        <img onClick={() => setSentInvite(false)} className={styles.close} src={timesImg} alt="Close"/>
                        <div className={styles.header}>
                            <h4 className={styles.title}>
                                Выберите способ приглашения
                            </h4>
                        </div>
                        <div className={styles.content}>
                            <p className={styles.text}>
                                При отправки через месенжер будет открыто выбранное приложение на Вашем устройстве
                            </p>
                            <div className={styles.socials}>
                                {messengers.map((item, index) => {
                                    return (
                                        <li
                                            onClick={() => setSelectedSoc(item?.type)}
                                            className={classNames({
                                                [styles.socialsItem]: true,
                                                [styles.active]: selectedSoc === item?.type
                                            })}
                                            key={index}
                                        >
                                            <img
                                                className={styles.socialIcon}
                                                src={item.icon}
                                                alt={item.label}
                                            />
                                            <p>{item.label}</p>
                                        </li>
                                    )})
                                }
                            </div>
                            <div className={styles.actionBlock}>
                                <button onClick={onSendInvite} className={classNames({[styles.completeBtn]: true, [styles.disabledBtn]: !selectedSoc})}>
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup> : ''}
        </div>
    )
}

export default InviteUser
