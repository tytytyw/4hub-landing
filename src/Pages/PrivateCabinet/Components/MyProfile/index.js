import React, {useState} from 'react'

import styles from './MyProfile.module.sass'
import uploadIcon from '../../../../assets/PrivateCabinet/upload.svg'

import SearchField from '../SearchField'
import StorageSize from '../StorageSize'
import Notifications from '../Notifications'
import Profile from '../Profile'
import UserForm from './UserForm/UserForm'
import BottomPanel from '../ButtomPanel'
import classnames from 'classnames'
import Support from './Support/Support'
import TariffPlan from './TariffPlan/TariffPlan'
import Contacts from './Contacts/Contacts'
import Programs from './Programs/Programs'
import TellFriends from './TellFriends/TellFriends'
import SendFriend from "./TellFriends/SendFriend/SendFriend";

const MyButton = ({ text, icon, alt, onClick = () => {}, active = false }) => (
    <button
        onClick={onClick}
        className={classnames({
            [styles.button]: true,
            [styles.active]: active
        })}
    >
        {text} {icon ?
        <span className={styles.buttonIcon}>
            <img src={icon} alt={alt}/>
        </span> : null}
    </button>
)

const contactList = [
    {
        id: 1,
        image: './assets/PrivateCabinet/avatars/a1.png',
        name: 'Аедельская Алина Квиталина',
        email: 'Квиталина@gmail.com',
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
    },
    {
        id: 2,
        image: './assets/PrivateCabinet/avatars/a2.png',
        name: 'Аангуш Ирина Николаевна',
        email: 'Квиталина@gmail.com',
        tel: '+355654565555',
        socials: [
            {type: 'twitter', link: '#'},
            {type: 'linkedin', link: '#'},
            {type: 'facebook', link: '#'},
        ],
        messengers: [
            {type: 'viber', link: '#'},
            {type: 'whatsapp', link: '#'},
            {type: 'skype', link: '#'},
            {type: 'brain', link: '#'},
        ]
    },
    {
        id: 3,
        image: './assets/PrivateCabinet/avatars/a3.png',
        name: 'Аангуш Ирина Николаевна',
        email: 'Аангуш@gmail.com',
        tel: '+33333333333333',
        socials: [
            {type: 'twitter', link: '#'},
            {type: 'linkedin', link: '#'},
        ],
        messengers: [
            {type: 'telegram', link: '#'},
            {type: 'whatsapp', link: '#'},
            {type: 'skype', link: '#'},
        ]
    },
    {
        id: 4,
        image: './assets/PrivateCabinet/avatars/a4.png',
        name: 'Аангуш Ирина Николаевна',
        email: 'Николаевна@gmail.com',
        tel: '+3456777777',
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
    },
    {
        id: 5,
        image: './assets/PrivateCabinet/avatars/a1.png',
        name: 'Бедельская Алина Квиталина',
        email: 'Квиталина@gmail.com',
        tel: '+33333333333333',
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
    },
    {
        id: 6,
        image: './assets/PrivateCabinet/avatars/a2.png',
        name: 'Бангуш Ирина Николаевна',
        email: 'Квиталина@gmail.com',
        tel: '+35555555555555555',
        socials: [
            {type: 'twitter', link: '#'},
            {type: 'linkedin', link: '#'},
            {type: 'facebook', link: '#'},
        ],
        messengers: [
            {type: 'viber', link: '#'},
            {type: 'whatsapp', link: '#'},
            {type: 'skype', link: '#'},
            {type: 'brain', link: '#'},
        ]
    },
    {
        id: 7,
        image: './assets/PrivateCabinet/avatars/a3.png',
        name: 'Бангуш Ирина Николаевна',
        email: 'Бангуш@gmail.com',
        tel: '+3666666666',
        socials: [
            {type: 'twitter', link: '#'},
            {type: 'linkedin', link: '#'},
        ],
        messengers: [
            {type: 'telegram', link: '#'},
            {type: 'whatsapp', link: '#'},
            {type: 'skype', link: '#'},
        ]
    },
    {
        id: 8,
        image: './assets/PrivateCabinet/avatars/a4.png',
        name: 'Бангуш Ирина Николаевна',
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
    },
    {
        id: 9,
        image: './assets/PrivateCabinet/avatars/a1.png',
        name: 'Ведельская Алина Квиталина',
        email: 'Квиталина@gmail.com',
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
    },
    {
        id: 10,
        image: './assets/PrivateCabinet/avatars/a2.png',
        name: 'Вангуш Ирина Николаевна',
        email: 'Квиталина@gmail.com',
        tel: '+34234454232',
        socials: [
            {type: 'twitter', link: '#'},
            {type: 'linkedin', link: '#'},
            {type: 'facebook', link: '#'},
        ],
        messengers: [
            {type: 'viber', link: '#'},
            {type: 'whatsapp', link: '#'},
            {type: 'skype', link: '#'},
            {type: 'brain', link: '#'},
        ]
    },
    {
        id: 11,
        image: './assets/PrivateCabinet/avatars/a3.png',
        name: 'Вангуш Ирина Николаевна',
        email: 'Вангуш@gmail.com',
        tel: '+34234454232',
        socials: [
            {type: 'twitter', link: '#'},
            {type: 'linkedin', link: '#'},
        ],
        messengers: [
            {type: 'telegram', link: '#'},
            {type: 'whatsapp', link: '#'},
            {type: 'skype', link: '#'},
        ]
    },
    {
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
    },
]

const MyProfile = () => {

    const [pageOption, setPageOption] = useState('personal_data')
    const [popup, setPopup] = useState(false)

    return (
        <div className={styles.wrapper}>

            <div className={styles.header}>
                <SearchField/>
                <div className={styles.infoHeader}>
                    <StorageSize/>
                    <Notifications/>
                    <Profile/>
                </div>
            </div>

            <div className={styles.content}>

                <div className={styles.buttons}>
                    <div className={styles.buttonsList}>
                        <MyButton
                            text='Личные данные'
                            active={pageOption === 'personal_data'}
                            onClick={() => setPageOption('personal_data')}
                        />
                        <MyButton
                            text='Служба поддержки'
                            active={pageOption === 'support'}
                            onClick={() => setPageOption('support')}
                        />
                        <MyButton
                            text='Тарифный план'
                            active={pageOption === 'tariff_plan'}
                            onClick={() => setPageOption('tariff_plan')}
                        />
                        <MyButton
                            text='Контакты'
                            active={pageOption === 'contacts'}
                            onClick={() => setPageOption('contacts')}
                        />
                        <MyButton
                            text='Подключенные прораммы'
                            active={pageOption === 'programs'}
                            onClick={() => setPageOption('programs')}
                        />
                        <div className={styles.buttonsRight}>
                            <MyButton
                                text='Рассказать друзьям'
                                icon={uploadIcon}
                                alt='Upload'
                                active={popup}
                                onClick={() => setPopup(true)}
                            />
                        </div>
                    </div>
                </div>

                {pageOption === 'personal_data' && <UserForm/>}
                {pageOption === 'support' && <Support/>}
                {pageOption === 'tariff_plan' && <TariffPlan/>}
                {pageOption === 'contacts' && <Contacts/>}
                {pageOption === 'programs' && <Programs/>}

            </div>

            {popup && <SendFriend data={contactList} set={setPopup}>

            </SendFriend>}

            <BottomPanel/>

        </div>
    )


}

export default MyProfile