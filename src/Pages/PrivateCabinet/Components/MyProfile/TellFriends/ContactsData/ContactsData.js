import React, {useState} from 'react'

import styles from './ContactsData.module.sass'

import {ReactComponent as PhoneIcon} from '../../../../../../assets/PrivateCabinet/phone-3.svg'
import {ReactComponent as InstagramIcon} from '../../../../../../assets/PrivateCabinet/instagram.svg'
import {ReactComponent as MailIcon} from '../../../../../../assets/PrivateCabinet/mail-3.svg'
import classnames from 'classnames'
import PopUp from '../../../../../../generalComponents/PopUp'
import SendFriend from "../SendFriend/SendFriend";

const icons = {
    facebook: './assets/PrivateCabinet/socials/facebook.svg',
    whatsapp: './assets/PrivateCabinet/socials/whatsapp.svg',
    twitter: './assets/PrivateCabinet/socials/twitter.svg',
    skype: './assets/PrivateCabinet/socials/skype-2.svg',
    viber: './assets/PrivateCabinet/socials/viber.svg',
    linkedin: './assets/PrivateCabinet/socials/linkedin.svg',
    telegram: './assets/PrivateCabinet/socials/telegram.svg',
    brain: './assets/PrivateCabinet/socials/brain.svg',
}

const ContactsData = ({ contact, contactList }) => {

    const [popup, setPopup] = useState(false)

    return (
        <>
            <div className={styles.contactsData}>

                <div className={styles.header}>
                    <div
                        className={styles.profileData}
                    >
                        <img
                            className={styles.profileImg}
                            src={contact?.image}
                            alt={contact?.name}
                        />
                        <p className={styles.profileName}>
                            {contact?.name}
                        </p>
                    </div>
                    {/*<div>
                    <div className={styles.iconButtons}>
                        <div className={styles.iconView}>
                            <StarIcon className={styles.iconSafe} />
                        </div>
                        <div className={styles.iconView}>
                            <ShareIcon className={styles.iconShare} />
                        </div>
                        <div className={styles.iconView}>
                            <DeleteIcon className={styles.iconTrash} />
                        </div>
                    </div>
                </div>*/}
                </div>

                <div className={styles.actionHeader}>

                    <button
                        onClick={() => setPopup(true)}
                        className={styles.actionBtn}
                    >
                        <PhoneIcon className={styles.actionBtnSvg}/>
                    </button>

                    <button className={styles.actionBtn}>
                        <MailIcon className={styles.actionBtnSvg}/>
                    </button>

                    <button className={styles.actionBtn}>
                        <InstagramIcon className={styles.actionBtnSvg}/>
                    </button>

                </div>

                <div className={styles.actionInfo}>
                    <div className={styles.infoItem}>
                        <span className={styles.info}>Телефон:</span>
                        <div className={styles.value}>
                            <span>{contact?.tel}</span>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.info}>Email:</span>
                        <div className={styles.value}>
                            <span>{contact?.email}</span>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.info}>Соц. сеть:</span>
                        <div className={styles.value}>
                            <span>@instagram</span>
                        </div>
                    </div>

                </div>

            </div>

            {popup && <SendFriend data={contactList} set={setPopup}>

            </SendFriend>}
        </>
    )
}

export default ContactsData