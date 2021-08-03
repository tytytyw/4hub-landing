import React, {useEffect, useState} from 'react'
import classnames from 'classnames'
import {useDispatch, useSelector} from 'react-redux'

import styles from './ContactsData.module.sass'
import {ReactComponent as StarIcon} from '../../../../../../assets/PrivateCabinet/star-2.svg'
import {ReactComponent as StarFillIcon} from '../../../../../../assets/PrivateCabinet/star-fill.svg'
import {ReactComponent as ShareIcon} from '../../../../../../assets/PrivateCabinet/share.svg'
import {ReactComponent as EditIcon} from '../../../../../../assets/PrivateCabinet/pencil.svg'
import {ReactComponent as DeleteIcon} from '../../../../../../assets/PrivateCabinet/delete.svg'

import {ReactComponent as SpeechIcon} from '../../../../../../assets/PrivateCabinet/speech-bubble-2.svg'
import {ReactComponent as PhoneIcon} from '../../../../../../assets/PrivateCabinet/phone-3.svg'
import {ReactComponent as CameraIcon} from '../../../../../../assets/PrivateCabinet/video-camera.svg'
import {ReactComponent as MailIcon} from '../../../../../../assets/PrivateCabinet/mail-3.svg'
import {emptyProfileImage, getContactName, messengersIcons, socialsIcons} from '../consts'

import api from '../../../../../../api'

import ActionApproval from '../../../../../../generalComponents/ActionApproval'
import {onGetContacts} from '../../../../../../Store/actions/PrivateCabinetActions'
import FormContact from '../FormContact/FormContact'
import SendFriend from '../../TellFriends/SendFriend'

const ContactsData = ({data = [], selectedItem, setSelectedItem}) => {

    const dispatch = useDispatch()
    const uid = useSelector(state => state.user.uid)

    const getFavourites = contacts => {
        const favouritesData = []
        contacts?.forEach(contact => {
            if (contact?.is_fav === '1') {
                favouritesData.push(contact?.id)
            }
        })
        return favouritesData
    }

    const [favourites, setFavorites] = useState(getFavourites(data))
    const [delConfirm, setDelConfirm] = useState(false)

    useEffect(() => setFavorites(getFavourites(data)), [data])

    const [contactPopup, setContactPopup] = useState(false)
    const [sendPopup, setSendPopup] = useState(false)

    const selectOtherContact = () => {

        const newContacts = []
        data.forEach(contactItem => {
            if (contactItem.id !== selectedItem.id) {
                newContacts.push(contactItem)
            }
        })

        setSelectedItem(newContacts?.[0])
    }

    const addToFavourite = () => {

        const isFav = favourites.includes(selectedItem?.id) ? '0' : '1'

        api.get(`/ajax/contacts_fav.php`, {
            params: {
                uid,
                id: selectedItem?.id,
                is_fav: isFav
            }
        }).then(() => {
            dispatch(onGetContacts())
        }).catch(error => {
            console.log(error)
        })
    }

    const onDeleteConfirm = () => {
        api.get(`/ajax/contacts_del.php`, {
            params: {
                uid,
                id: selectedItem?.id
            }
        }).then(() => {
            dispatch(onGetContacts())
            selectOtherContact()
            setDelConfirm(false)
        }).catch(error => {
            console.log(error)
        })
    }

    const profileImage = selectedItem?.icon?.[0] || emptyProfileImage

    const getDate = date => {
        return date ? (new Date(date)).toLocaleDateString() : 'Не задан'
    }

    return (
        <div className={styles.contactsData}>

            <div className={styles.header}>
                <div
                    className={styles.profileData}
                >
                    <img
                        className={styles.profileImg}
                        src={profileImage}
                        alt={selectedItem?.name}
                    />
                    <div>
                        <p className={styles.profileName}>
                            {getContactName(selectedItem)}
                        </p>
                        <span className={styles.date}>
                            Дата добавления: {getDate(selectedItem?.ut)}
                        </span>
                    </div>
                </div>
                <div>
                    <div className={styles.iconButtons}>

                        <div
                            onClick={addToFavourite}
                            className={styles.iconView}
                        >
                            {!favourites.includes(selectedItem?.id) ?
                                <StarIcon className={styles.iconStar}/> :
                                <StarFillIcon className={styles.iconStar}/>}
                        </div>

                        <div
                            onClick={() => setSendPopup(true)}
                            className={styles.iconView}
                        >
                            <ShareIcon className={styles.iconShare}/>
                        </div>

                        <div
                            onClick={() => setContactPopup(true)}
                            className={styles.iconView}
                        >
                            <EditIcon className={styles.iconShare}/>
                        </div>

                        <div
                            onClick={() => setDelConfirm(true)}
                            className={styles.iconView}
                        >
                            <DeleteIcon className={styles.iconTrash}/>
                        </div>

                        {delConfirm &&
                        <ActionApproval
                            name='Удаление контакта'
                            approve='Удалить'
                            text={`Вы действительно хотите удалить контакт ${getContactName(selectedItem)}?`}
                            set={() => setDelConfirm(false)}
                            callback={onDeleteConfirm}
                        >
                            <img
                                className={styles.profileImg}
                                src={profileImage}
                                alt='Contact'
                            />
                        </ActionApproval>}
                    </div>
                </div>
            </div>

            <div className={styles.actionHeader}>

                <button className={styles.actionBtn}>
                    <SpeechIcon className={styles.actionBtnSvg}/>
                </button>

                <button className={styles.actionBtn}>
                    <PhoneIcon className={styles.actionBtnSvg}/>
                </button>

                <button className={styles.actionBtn}>
                    <CameraIcon className={styles.actionBtnSvg}/>
                </button>

                <button className={styles.actionBtn}>
                    <MailIcon className={styles.actionBtnSvg}/>
                </button>

            </div>

            <div className={styles.actionData}>

                {selectedItem?.prim &&
                <div className={styles.notes}>
                    <p>{selectedItem?.prim}</p>
                </div>}

                <div className={styles.actionInfo}>

                    {selectedItem?.tel?.length > 0 &&
                    <div className={styles.infoItem}>
                        <span className={styles.info}>Телефон:</span>
                        <div className={styles.value}>
                            <span>
                                {selectedItem?.tel &&
                                <ul className={styles.valueList}>
                                    {selectedItem?.tel.map((tel, index) => (
                                        <li key={index}>{tel}</li>
                                    ))}
                                </ul>}
                            </span>
                        </div>
                    </div>}

                    {selectedItem?.email?.length > 0 &&
                    <div className={styles.infoItem}>
                        <span className={styles.info}>Email:</span>
                        <div className={styles.value}>
                            <span>
                                {selectedItem?.email &&
                                <ul className={styles.valueList}>
                                    {selectedItem?.email.map((mail, index) => (
                                        <li key={index}>{mail}</li>
                                    ))}
                                </ul>}
                            </span>
                        </div>
                    </div>}

                    {selectedItem?.bdate &&
                    <div className={styles.infoItem}>
                        <span className={styles.info}>День рождения:</span>
                        <div className={styles.value}>
                            <span>{selectedItem?.bdate}</span>
                        </div>
                    </div>}

                    {selectedItem?.company &&
                    <div className={styles.infoItem}>
                        <span className={styles.info}>Компания:</span>
                        <div className={styles.value}>
                            <span>{selectedItem?.company}</span>
                        </div>
                    </div>}

                    {selectedItem?.soc?.length > 0 &&
                    <div className={styles.infoItem}>
                            <span className={classnames({
                                [styles.info]: true,
                                [styles.links]: true,
                            })}>Профиль соц. сетей:</span>
                        <div className={styles.value}>
                            <ul className={styles.socialsList}>
                                {selectedItem?.soc.map((item, index) => (
                                    <li key={index}>
                                        <a href={item?.link} className={styles.socialsLink}>
                                            <img src={socialsIcons[item?.type]} alt={item?.type}/>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>}

                    {selectedItem?.mes?.length > 0 &&
                    <div className={styles.infoItem}>
                            <span className={classnames({
                                [styles.info]: true,
                                [styles.links]: true,
                            })}>Мессенджеры:</span>
                        <div className={styles.value}>
                            <ul className={styles.socialsList}>
                                {selectedItem?.mes.map((item, index) => (
                                    <li key={index}>
                                        <a href={item?.link} className={styles.socialsLink}>
                                            <img src={messengersIcons[item?.type]} alt={item?.type}/>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>}

                </div>

            </div>

            {contactPopup && <FormContact
                type='edit'
                set={setContactPopup}
                selectedItem={selectedItem}
            />}

            {sendPopup && <SendFriend
                set={setSendPopup}
                selectedItem={selectedItem}
            />}

        </div>
    )
}

export default ContactsData