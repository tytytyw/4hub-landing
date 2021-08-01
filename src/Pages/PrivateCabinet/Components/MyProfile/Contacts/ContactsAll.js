import React, {useEffect, useState} from 'react'
import styles from './Contacts.module.sass'

import ContactList from './ContactList/ContactList'
import ContactsData from './ContactsData/ContactsData'


const ContactsAll = ({data = []}) => {

    const [selectedContact, setSelectedContact] = useState(data?.[0])

    useEffect(() => {
        const newSelectedContact = data?.find(contact => contact?.id === selectedContact?.id)
        newSelectedContact && setSelectedContact(newSelectedContact)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <>
            <div className={styles.contactList}>
                <ContactList
                    data={data}
                    selectedItem={selectedContact}
                    setSelectedItem={setSelectedContact}
                />
            </div>

            <div className={styles.contactData}>
                <ContactsData
                    data={data}
                    selectedItem={selectedContact}
                    setSelectedItem={setSelectedContact}
                />
            </div>
        </>
    )

}


export default ContactsAll