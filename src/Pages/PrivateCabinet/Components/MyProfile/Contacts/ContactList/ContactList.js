import React, {useEffect, useState} from 'react'

import styles from './ContacList.module.sass'
import ContactSearch from './ContactSearch/ContactSearch'
import SearchList from './SearchList/SearchList'

const ContactList = ({data = [], onSearch, search, selectedItem, setSelectedItem}) => {

    const [contactList, setContactList] = useState(data)

    useEffect(() => setContactList(data), [data])
    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {

        const searchResult = data.filter(item => {
            const name = item.name.toLowerCase()
            const searchValue = search.toLowerCase()
            return name.includes(searchValue)
        })

        setContactList(searchResult)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    return (
        <div className={styles.content}>

            <div className={styles.search}>
                <ContactSearch
                    onChangeHandler={onSearch}
                />
            </div>

            <div className={styles.contactListWrap}>

                <ul className={styles.contactList}>
                    {getGrouppedArray(contactList).map((contact, index) => (
                        <li key={index}>
                            <p className={styles.group}>{contact.group}</p>
                            <SearchList
                                data={contact.contacts}
                                selectedItem={selectedItem}
                                setSelectedItem={setSelectedItem}
                            />
                        </li>
                    ))}
                </ul>

            </div>


        </div>
    )
}

const getGrouppedArray = initialArray => {

    const groupedArray = []
    let contactsItem = []
    initialArray.forEach(item => {

        let firstLetter = item.name?.charAt(0)
        let findByGroup = groupedArray.find(item => item.group === firstLetter)

        if (!findByGroup) {
            contactsItem = []
            contactsItem.push(item)

            groupedArray.push({
                group: firstLetter,
                contacts: contactsItem
            })
        } else {
            contactsItem.push(item)
        }
    })

    return groupedArray
}

export default ContactList