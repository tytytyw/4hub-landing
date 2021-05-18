import React, {useEffect, useState} from 'react'

import styles from './Contacts.module.sass'

import ContactMenu from './ContactMenu/ContactMenu'
import ContactList from './ContactList/ContactList'
import ContactsData from './ContactsData/ContactsData'
import FormContact from './FormContact/FormContact'
import {useSelector} from 'react-redux'

const Contacts = ({ ...props }) => {

    const [search, setSearch] = useState('')

    const contacts = useSelector(state => state.PrivateCabinet.contactList)

    const [selectedContact, setSelectedContact] = useState(contacts?.[0])
    const [contactPopup, setContactPopup] = useState(false)

    useEffect(() => {
        const newSelectedContact = contacts.find(contact => contact?.id === selectedContact?.id)
        setSelectedContact(newSelectedContact)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contacts])

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

    return (
        <div className={styles.contacts}>

            <div className={styles.contactMenu}>
                <ContactMenu
                    data={menuData}
                />
            </div>

            <div className={styles.contactList}>
                <ContactList
                    data={contacts}
                    search={search}
                    onSearch={onSearch}
                    selectedItem={selectedContact}
                    setSelectedItem={setSelectedContact}
                />
            </div>

            <div className={styles.contactData}>
                <ContactsData
                    contacts={contacts}
                    selectedItem={selectedContact}
                    setSelectedItem={setSelectedContact}
                />
            </div>

            {contactPopup && <FormContact
                contacts={contacts}
                set={setContactPopup}
            />}

        </div>
    )
}

export default Contacts