import React, {useState} from 'react'

import styles from './ContactsData.module.sass'
import {ReactComponent as StarIcon} from '../../../../../../assets/PrivateCabinet/star-2.svg'
import {ReactComponent as ShareIcon} from '../../../../../../assets/PrivateCabinet/share.svg'
import {ReactComponent as DeleteIcon} from '../../../../../../assets/PrivateCabinet/delete.svg'

import {ReactComponent as SpeechIcon} from '../../../../../../assets/PrivateCabinet/speech-bubble-2.svg'
import {ReactComponent as PhoneIcon} from '../../../../../../assets/PrivateCabinet/phone-3.svg'
import {ReactComponent as CameraIcon} from '../../../../../../assets/PrivateCabinet/video-camera.svg'
import {ReactComponent as MailIcon} from '../../../../../../assets/PrivateCabinet/mail-3.svg'
import Input from '../../Input/Input'
import classnames from 'classnames'
import {socialsIcons} from '../consts'
import ActionApproval from '../../../../../../generalComponents/ActionApproval'

const ContactsData = ({ selectedItem }) => {

    const [favourite, setFavorite] = useState(selectedItem?.favourite)
    const [delConfirm, setDelConfirm] = useState(false)

    const onDeleteConfirm = () => {
        //Todo: request to server for delete contact
    }



    return (
        <div className={styles.contactsData}>

            <div className={styles.header}>
                <div
                    className={styles.profileData}
                >
                    <img
                        className={styles.profileImg}
                        src={selectedItem?.image}
                        alt={selectedItem?.name}
                    />
                    <p className={styles.profileName}>
                        {selectedItem?.name}
                    </p>
                </div>
                <div>
                    <div className={styles.iconButtons}>
                        <div
                            onClick={() => setFavorite(!favourite)}
                            className={classnames({
                                [styles.iconView]: true,
                                [styles.filledIcon]: favourite
                            })}
                        >
                            <StarIcon
                                className={classnames({
                                    [styles.iconStar]: true
                                })}
                            />
                        </div>
                        <div className={styles.iconView}>
                            <ShareIcon className={styles.iconShare} />
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
                            text={`Вы действительно хотите удалить контакт ${selectedItem?.name}?`}
                            set={() => setDelConfirm(false)}
                            callback={onDeleteConfirm}
                        >
                            <img
                                 className={styles.profileImg}
                                 src={selectedItem?.image}
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

                <div className={styles.notes}>
                    <Input placeholder='Добавить заметку'/>
                </div>

                <div className={styles.actionInfo}>
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
                    </div>
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
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.info}>День рождения:</span>
                        <div className={styles.value}>
                            <span>{selectedItem?.date_birth}</span>
                        </div>
                    </div>

                    {selectedItem?.socials &&
                        <div className={styles.infoItem}>
                            <span className={classnames({
                                [styles.info]: true,
                                [styles.links]: true,
                            })}>Профиль соц. сетей:</span>
                            <div className={styles.value}>
                                <ul className={styles.socialsList}>
                                    {selectedItem?.socials.map((item, index) => (
                                        <li key={index}>
                                            <a href={item.link} className={styles.socialsLink}>
                                                <img src={socialsIcons[item.type]} alt={item.type}/>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    }

                    {selectedItem?.messengers &&
                        <div className={styles.infoItem}>
                            <span className={classnames({
                                [styles.info]: true,
                                [styles.links]: true,
                            })}>Мессенджеры:</span>
                            <div className={styles.value}>
                                <ul className={styles.socialsList}>
                                    {selectedItem?.messengers.map((item, index) => (
                                        <li key={index}>
                                            <a href={item.link} className={styles.socialsLink}>
                                                <img src={socialsIcons[item.type]} alt={item.type}/>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    }

                </div>

            </div>

        </div>
    )
}

export default ContactsData