import React, {useState} from 'react'

import styles from './SendFriend.module.sass'
import PopUp from '../../../../../generalComponents/PopUp'
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import {ReactComponent as ChatIcon} from '../../../../../assets/PrivateCabinet/sms.svg'
import Button from '../Button'
import {useSelector} from 'react-redux'
import {messengersData} from '../Contacts/consts'
import api from '../../../../../api'
import classNames from 'classnames'
import {useLocales} from "react-localized";

const TellFriend = ({ set, contact }) => {
    const { __ } = useLocales()
    const uid = useSelector(state => state.user.uid)

    const [selectedSoc, setSelectedSoc] = useState(null)
    const onSubmit = event => {

        event.preventDefault()

        api.get(`/ajax/contacts_send.php`, {
            params: {
                uid,
                id: contact?.id,
                email: contact?.email
            }
        }).then(() => {
            set(false)
        }).catch(err => {
            console.log(err)
        })

    }

    return (
        <PopUp set={set}>
            <form
                noValidate
                onSubmit={onSubmit}
                className={styles.wrapper}
            >

                <div className={styles.header}>
                    <div className={styles.profileWrap}>
                        <img
                            src={imageSrc + 'assets/PrivateCabinet/logo.svg'}
                            alt='logo'
                        />
                        <span>{ __('Рассказать друзьям') }</span>
                    </div>
                    <span
                        className={styles.close}
                        onClick={() => set(false)}
                    >
                        <span className={styles.times}/>
                    </span>
                </div>

                <div className={styles.share}>
                    <div className={styles.blockTitle}>
                        <span className={styles.titleIcon}><ChatIcon/></span>
                        <span className={styles.info}>{ __('Поделиться с помощью:') }</span>
                    </div>
                    <div className={styles.socials}>
                        <li
                            onClick={() => setSelectedSoc('email')}
                            className={classNames({
                                [styles.socialsItem]: true,
                                [styles.active]: selectedSoc === 'email'
                            })}
                        >
                            <img
                                className={styles.socialIcon}
                                src={imageSrc + 'assets/PrivateCabinet/email.svg'}
                                alt='Email'
                            />
                            <p>Email</p>
                        </li>
                        {messengersData.map((item, index) => (
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
                        ))}
                        <li className={styles.socialsItem}>
                            <img
                                className={styles.socialIcon}
                                src={imageSrc + 'assets/PrivateCabinet/more.svg'}
                                alt='Email'
                            />
                            <p>{ __('Ещё') }</p>
                        </li>
                    </div>
                </div>

                <div className={styles.actionBlock}>
                    <Button
                        type='submit'
                        className={styles.actionBtn}
                    >
                        { __('Отправить') }
                    </Button>
                </div>

            </form>
        </PopUp>
    )
}


export default TellFriend