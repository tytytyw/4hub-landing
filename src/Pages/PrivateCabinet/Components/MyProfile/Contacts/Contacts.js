import React, {useState} from 'react'

import styles from './Contacts.module.sass'

import ContactMenu from './ContactMenu/ContactMenu'
import ContactList from './ContactList/ContactList'
import ContactsData from './ContactsData/ContactsData'

const menuData = [
    {
        id: 'new_contact',
        icon: './assets/PrivateCabinet/plus-3.svg',
        label: 'Добавить контакт'
    },
    {
        id: 'favorites',
        icon: './assets/PrivateCabinet/star-2.svg',
        label: 'Избранное'
    },
    {
        id: 'favorites',
        icon: './assets/PrivateCabinet/contact-book.svg',
        label: 'Все контакты'
    },
    {
        id: 'favorites',
        icon: './assets/PrivateCabinet/phone-call-2.svg',
        label: 'Контакты 4 Hub'
    },
]

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

const Contacts = () => {

    const [search, setSearch] = useState('')
    const [contactItem, setContactItem] = useState(contactList[0])
    /*const [menuItem, setMenuItem] = useState('')
    console.log(menuItem)*/

    const onSearch = value => setSearch(value)
    //const onMenuClick = item => setMenuItem(item)
    const onContactClick = item => setContactItem(item)

    return (
        <div className={styles.contacts}>

            <div className={styles.contactMenu}>
                <ContactMenu
                    //onItemClick={onMenuClick}
                    data={menuData}
                />
            </div>

            <div className={styles.contactList}>
                <ContactList
                    data={contactList}
                    search={search}
                    selectedItem={contactItem}
                    onSearch={onSearch}
                    onItemClick={onContactClick}
                />
            </div>

            <div className={styles.contactData}>
                <ContactsData
                    contact={contactItem}
                />
            </div>

        </div>
    )
}

export default Contacts