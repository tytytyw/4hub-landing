import React, {useEffect, useState} from 'react'

import styles from './SendFriend.module.sass'
import PopUp from '../../../../../../generalComponents/PopUp'

import {ReactComponent as ChatIcon} from '../../../../../../assets/PrivateCabinet/sms.svg'
import ContactSearch from "../../Contacts/ContactList/ContactSearch/ContactSearch";
import RadioCheck from "./RadioCheck/RadioCheck";
import classnames from "classnames";
import Button from "../../Button/Button";

/*const icons = {
    facebook: './assets/PrivateCabinet/socials/facebook.svg',
    whatsapp: './assets/PrivateCabinet/socials/whatsapp.svg',
    twitter: './assets/PrivateCabinet/socials/twitter.svg',
    skype: './assets/PrivateCabinet/socials/skype-2.svg',
    viber: './assets/PrivateCabinet/socials/viber.svg',
    linkedin: './assets/PrivateCabinet/socials/linkedin.svg',
    telegram: './assets/PrivateCabinet/socials/telegram.svg',
    brain: './assets/PrivateCabinet/socials/brain.svg',
}*/

const socials = [
    {label: 'Viber', icon: './assets/PrivateCabinet/socials/viber.svg'},
    {label: 'WhatsApp', icon: './assets/PrivateCabinet/socials/whatsapp.svg'},
    {label: 'Telegram', icon: './assets/PrivateCabinet/socials/telegram.svg'},
    {label: 'Skype', icon: './assets/PrivateCabinet/socials/skype-2.svg'},
    {label: 'Slack', icon: './assets/PrivateCabinet/socials/brain.svg'},
]

const SendFriend = ({ data, ...props }) => {

    const [search, setSearch] = useState('')
    const [contactList, setContactList] = useState(data)

    useEffect(() => {

        const filterArray = data.filter(item => {
            const name = item.name.toLowerCase()
            const searchValue = search.toLowerCase()
            return name.includes(searchValue)
        })

        setContactList(filterArray)

    }, [search])

    const onSearch = value => setSearch(value)

    return (
        <PopUp set={props.set}>
            <div className={styles.wrapper}>

                <div className={styles.header}>
                    <div className={styles.profileWrap}>
                        <img
                            className={styles.profileImg}
                            src='./assets/PrivateCabinet/profile-noPhoto.svg'
                            alt='pie-chart'
                        />
                        <span> Рассказать друзьям о 4 HUB</span>
                    </div>
                    <span
                        className={styles.close}
                        onClick={() => props.set(false)}
                    >
                        <span className={styles.times}/>
                    </span>
                </div>

                <div className={styles.block}>
                    <span className={styles.info}>Email:</span>
                    <input
                        className={styles.input}
                        placeholder='Электронная почта'
                    />
                </div>

                <div className={styles.block}>
                    <span className={styles.info}>Телефон:</span>
                    <input
                        className={styles.input}
                        placeholder='Введите Ваш номер телефона'
                    />
                </div>

                <div className={styles.share}>
                    <div className={styles.blockTitle}>
                        <span className={styles.titleIcon}><ChatIcon/></span>
                        <span className={styles.info}>Поделиться с помощью:</span>
                    </div>
                    <div className={styles.socials}>
                        {socials.map((item, index) => (
                            <li className={styles.socialsItem} key={index}>
                                <img
                                    className={styles.socialIcon}
                                    src={item.icon}
                                    alt={item.label}
                                />
                                <p>{item.label}</p>
                            </li>
                        ))}
                    </div>
                </div>

                <div className={styles.contacts}>

                    <div className={styles.contactsWrap}>

                        <div className={styles.blockTitle}>
                            <span className={styles.info}>Контакты</span>
                        </div>
                        <div className={styles.search}>
                            <ContactSearch
                                onChangeHandler={onSearch}
                            />
                        </div>

                        <ul className={styles.contactsList}>
                            {contactList.map((item, index) => (
                                <RadioCheck
                                    item={item}
                                    name='user_id'
                                    key={index}
                                />
                            ))}
                        </ul>

                    </div>

                </div>

                <div className={styles.actionBlock}>
                    <Button
                        className={styles.actionBtn}
                    >
                        Отправить
                    </Button>
                </div>

            </div>
        </PopUp>
    )
}


export default SendFriend