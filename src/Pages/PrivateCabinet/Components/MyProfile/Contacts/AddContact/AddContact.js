import React, {useEffect, useState} from 'react'

import styles from './AddContact.module.sass'

import AddSocials from './AddSocials'
import PopUp from '../../../../../../generalComponents/PopUp'
import ProfileUpload from '../../UserForm/ProfileUpload/ProfileUpload'
import arrowImage from '../../../../../../assets/PrivateCabinet/signs-2.svg'
import calendarImage from '../../../../../../assets/PrivateCabinet/calendar-6.svg'
import classnames from 'classnames'
import Calendar from '../../../../../StartPage/Components/Calendar'
import Button from '../../Button/Button'

const socialsIcons = {
    facebook: './assets/PrivateCabinet/socials/facebook.svg',
    whatsapp: './assets/PrivateCabinet/socials/whatsapp.svg',
    twitter: './assets/PrivateCabinet/socials/twitter.svg',
    skype: './assets/PrivateCabinet/socials/skype-2.svg',
    viber: './assets/PrivateCabinet/socials/viber.svg',
    linkedin: './assets/PrivateCabinet/socials/linkedin.svg',
    telegram: './assets/PrivateCabinet/socials/telegram.svg',
    brain: './assets/PrivateCabinet/socials/brain.svg',
    instagram: './assets/PrivateCabinet/socials/instagram.svg',
    vk: './assets/PrivateCabinet/socials/vk.svg',
}

const socialsData = [
    {
        label: 'Twitter',
        type: 'twitter',
        icon: './assets/PrivateCabinet/socials/twitter.svg'
    },
    {
        label: 'Linkedin',
        type: 'linkedin',
        icon: './assets/PrivateCabinet/socials/linkedin.svg',
    },
    {
        label: 'Facebook',
        type: 'facebook',
        icon: './assets/PrivateCabinet/socials/facebook.svg',
    },
    {
        label: 'Skype',
        type: 'skype',
        icon: './assets/PrivateCabinet/socials/skype-2.svg',
    },
    {
        label: 'Instagram',
        type: 'instagram',
        icon: './assets/PrivateCabinet/socials/instagram.svg',
    },
    {
        label: 'VK',
        type: 'vk',
        icon: './assets/PrivateCabinet/socials/vk.svg',
    },
]

/*
* {
        id: 12,
        image: './assets/PrivateCabinet/avatars/a4.png',
        name: 'Вангуш Ирина Николаевна',
        email: 'Николаевна@gmail.com',
        tel: '+34234454232',
        socials: [
            {type: 'twitter', link: '#'},
            {type: 'linkedin', link: '#'},
            {type: 'facebook', link: '#'},
        ],
        messengers: [
            {type: 'telegram', link: '#'},
            {type: 'viber', link: '#'},
            {type: 'whatsapp', link: '#'},
            {type: 'skype', link: '#'},
        ]
    },*/

const AddContact = ({ set }) => {

    const [numbers, setNumbers] = useState([])
    const [mails, setMails] = useState([])

    const [socPopup, setSocPopup] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const [dateValue, setDateValue] = useState('')

    const [socials, setSocials] = useState([])

    const [image, setImage] = useState()
    const [preview, setPreview] = useState()

    const uploadImage = event => {
        const file = event.target.files[0] ?? null
        if (file && file.type.substr(0, 5) === 'image') {
            setImage(file)
        } else {
            setImage(null)
        }
    }

    useEffect(() => {
        if (image) {
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result)
            reader.readAsDataURL(image)
        } else {
            setPreview(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])

/*
    const onSubmit = event => {
        event.preventDefault()
    }
*/

    return (
        <PopUp set={set}>
            <div className={styles.wrapper}>

                <div className={styles.top}>
                    <span
                        className={styles.close}
                        onClick={() => set(false)}
                    >
                        <span className={styles.times}/>
                    </span>
                </div>

                <div className={styles.content}>

                    <div className={styles.header}>
                        <p className={styles.title}>Добавить контакт</p>
                        <div className={styles.uploadBlock}>
                            <ProfileUpload
                                preview={preview}
                                onChange={uploadImage}
                            />
                        </div>
                    </div>

                    <div className={styles.formContent}>

                        <div className={styles.formItem}>
                            <div className={styles.formBlock}>
                                <span className={styles.info}>Имя:</span>
                                <input
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.formItem}>
                            <div className={styles.formBlock}>
                                <span className={styles.info}>Фамилия:</span>
                                <input
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.formItem}>
                            <div className={styles.formBlock}>
                                <span className={styles.info}>Компания:</span>
                                <input
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.formItem}>
                            {numbers.map((number, index) => (
                                <div className={styles.formBlock} key={index}>
                                <span
                                    onClick={() => {
                                        numbers.splice(index, 1)
                                        setNumbers([...numbers])
                                    }}
                                    className={styles.minusBtn}
                                />
                                    <span className={styles.info}>Введите номер телефона:</span>
                                    <input
                                        type="number"
                                        onChange={event => {
                                            numbers[index] = event.target.value
                                            setNumbers([...numbers])
                                        }}
                                        className={styles.input}
                                        value={number}
                                    />
                                </div>
                            ))}
                            <div
                                className={classnames({
                                    [styles.formBlock]: true,
                                    [styles.clickable]: true
                                })}
                                onClick={() => setNumbers([...numbers, ''])}
                            >
                                <img
                                    className={styles.infoImg}
                                    src="./assets/PrivateCabinet/plus-3.svg"
                                    alt="new_contact"
                                />
                                <span className={styles.info}>Добавить номер телефона:</span>
                            </div>
                        </div>

                        <div className={styles.formItem}>
                            {mails.map((mail, index) => (
                                <div className={styles.formBlock} key={index}>
                                <span
                                    onClick={() => {
                                        mails.splice(index, 1)
                                        setMails([...mails])
                                    }}
                                    className={styles.minusBtn}
                                />
                                    <span className={styles.info}>Введите @mail:</span>
                                    <input
                                        type="email"
                                        onChange={event => {
                                            mails[index] = event.target.value
                                            setMails([...mails])
                                        }}
                                        className={styles.input}
                                        value={mail}
                                    />
                                </div>
                            ))}
                            <div
                                className={classnames({
                                    [styles.formBlock]: true,
                                    [styles.clickable]: true
                                })}
                                onClick={() => setMails([...mails, ''])}
                            >
                                <img
                                    className={styles.infoImg}
                                    src="./assets/PrivateCabinet/plus-3.svg"
                                    alt="new_contact"
                                />
                                <span className={styles.info}>Добавить @mail:</span>
                            </div>
                        </div>

                        <div className={styles.formItem}>
                            <div className={styles.formBlock}>
                                <span className={styles.info}>Добавить день рождения:</span>
                                <input
                                    name='date_birth'
                                    onChange={() => {}}
                                    value={dateValue}
                                    className={styles.input}
                                />
                                <div
                                    onClick={() => setShowCalendar(true)}
                                    className={styles.icon}
                                >
                                    <img src={calendarImage} alt='Calendar'/>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formItem}>
                            <div className={styles.formBlock}>
                                <span className={styles.info}>Добавить профиль соц.сети:</span>
                                <ul className={styles.socialsList}>
                                    {socials.map((item, index) => !!item.link && (
                                        <li key={index}>
                                            <a href={item.link} className={styles.socialsLink}>
                                                <img
                                                    src={socialsIcons[item.type]}
                                                    alt={item.type}
                                                />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div
                                    onClick={() => setSocPopup(true)}
                                    className={styles.icon}
                                >
                                    <img src={arrowImage} alt='Arrow'/>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div className={styles.submitBlock}>
                    <Button
                        className={styles.cancelBtn}
                        onClick={() => set(false)}
                    >
                        Отмена
                    </Button>
                    <Button
                        type='submit'
                        className={styles.submitBtn}
                    >
                        Сохранить
                    </Button>
                </div>

            </div>

            {socPopup && <AddSocials
                values={socials}
                setValues={setSocials}
                data={socialsData}
                set={setSocPopup}
            />}

            {showCalendar && <PopUp set={setShowCalendar} zIndex={102}>
                <Calendar
                    setShowCalendar={setShowCalendar}
                    setDateValue={setDateValue}
                />
            </PopUp>}

        </PopUp>
    )
}

export default AddContact