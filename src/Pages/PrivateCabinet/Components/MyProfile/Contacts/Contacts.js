import React, {useState} from 'react'

import styles from './Contacts.module.sass'

import ContactMenu from './ContactMenu/ContactMenu'
import ContactList from './ContactList/ContactList'
import ContactsData from './ContactsData/ContactsData'
import AddContact from './AddContact/AddContact'

const Contacts = ({ contacts, setContacts }) => {

    const [search, setSearch] = useState('')

    const [contactItem, setContactItem] = useState(contacts[0])
    const [contactPopup, setContactPopup] = useState(false)
    /*const [menuItem, setMenuItem] = useState('')
    console.log(menuItem)*/

    const menuData = [
        {
            id: 'new_contact',
            icon: './assets/PrivateCabinet/plus-3.svg',
            label: 'Добавить контакт',
            onClick: () =>  setContactPopup(true)
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
                    data={contacts}
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

            {contactPopup && <AddContact
                contacts={contacts}
                setContacts={setContacts}
                set={setContactPopup}
            />}

        </div>
    )
}

export default Contacts