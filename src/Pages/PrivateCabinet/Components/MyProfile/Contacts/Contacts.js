import React, {useState} from 'react'
import {useSelector} from 'react-redux'

import styles from './Contacts.module.sass'

import ContactMenu from './ContactMenu/ContactMenu'
import FormContact from './FormContact/FormContact'
import ContactsAll from './ContactsAll'
import ContactsFav from './ContactsFav'

const Contacts = () => {

    const contacts = useSelector(state => state.PrivateCabinet.contactList)

    const [pageOption, setPageOption] = useState('ContactsAll')
    const [contactPopup, setContactPopup] = useState(false)

    const menuData = [
        {
            id: 'NewContact',
            icon: './assets/PrivateCabinet/plus-3.svg',
            label: 'Добавить контакт',
            onClick: () => setContactPopup(true)
        },
        {
            id: 'ContactsFav',
            icon: './assets/PrivateCabinet/star-2.svg',
            label: 'Избранное',
            onClick: () => setPageOption('ContactsFav')
        },
        {
            id: 'ContactsAll',
            icon: './assets/PrivateCabinet/contact-book.svg',
            label: 'Все контакты',
            onClick: () => setPageOption('ContactsAll')
        }
    ]

    return (
        <div className={styles.contacts}>

            <div className={styles.contactMenu}>
                <ContactMenu
                    pageOption={pageOption}
                    data={menuData}
                />
            </div>

            {pageOption === 'ContactsAll' && <ContactsAll data={contacts}/>}
            {pageOption === 'ContactsFav' && <ContactsFav data={contacts}/>}

            {contactPopup && <FormContact
                set={setContactPopup}
                setPageOption={setPageOption}
            />}

        </div>
    )
}

export default Contacts