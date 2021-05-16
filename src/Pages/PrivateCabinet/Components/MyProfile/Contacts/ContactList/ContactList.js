import React, {useEffect, useState} from 'react'

import styles from './ContacList.module.sass'
import ContactSearch from './ContactSearch/ContactSearch'
import SearchList from './SearchList/SearchList'

const ContactList = ({ data = [], onItemClick, onSearch, search, selectedItem }) => {

    const [contactList, setContactList] = useState([])

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
                    {getGrouppedArray(contactList).map((item, index) => (
                        <li key={index}>
                            <p className={styles.group}>{item.group}</p>
                            <SearchList
                                data={item.contacts}
                                onItemClick={onItemClick}
                                selectedItem={selectedItem}
                            />
                        </li>
                    ))}
                </ul>

            </div>


        </div>
    )
}

const getGrouppedArray = initialArray => {

    initialArray.sort((a, b) => a.name.localeCompare(b.name))

    const groupedArray = []
    let contactsItem = []
    initialArray.forEach(item => {

        let firstLetter = item.name.charAt(0)
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