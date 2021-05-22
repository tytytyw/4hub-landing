import React, {useEffect, useState} from 'react'
import styles from './Contacts.module.sass'

import ContactList from './ContactList/ContactList'
import ContactsData from './ContactsData/ContactsData'

const ContactsFav = ({data = []}) => {

    const [contacts, setContacts] = useState(getFavourites(data))
    const [selectedContact, setSelectedContact] = useState(contacts?.[0])

    useEffect(() => setContacts(getFavourites(data)), [data])

    useEffect(() => {
        const newSelectedContact = data.find(contact => contact?.id === selectedContact?.id)
        newSelectedContact && setSelectedContact(newSelectedContact)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contacts])

    return (
        <>
            <div className={styles.contactList}>
                <ContactList
                    data={contacts}
                    selectedItem={selectedContact}
                    setSelectedItem={setSelectedContact}
                />
            </div>

            <div className={styles.contactData}>
                <ContactsData
                    data={contacts}
                    selectedItem={selectedContact}
                    setSelectedItem={setSelectedContact}
                />
            </div>
        </>
    )

}

const getFavourites = (data = []) => {
    const newData = []
    data.forEach(item => {
        if (item.is_fav === '1') {
            newData.push(item)
        }
    })
    return newData
}

export default ContactsFav