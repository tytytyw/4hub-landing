import React, {useEffect, useState} from 'react'

import styles from './ContacList.module.sass'
import ContactSearch from './ContactSearch/ContactSearch'
import SearchList from './SearchList/SearchList'

const getGrouppedArray = initialArray => {

    const groupedArray = []

    let contactsItem = []

    initialArray.sort((a, b) => a.name.localeCompare(b.name))

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

const ContactList = ({data = [], onItemClick, onSearch, search, selectedItem}) => {

    const [contactList, setContactList] = useState(getGrouppedArray(data))

    useEffect(() => {
<<<<<<< HEAD
=======
        setContactList(getGrouppedArray(data))
    }, [data])

    useEffect(() => {
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87

        const filterArray = data.filter(item => {
            const name = item.name.toLowerCase()
            const searchValue = search.toLowerCase()
            return name.includes(searchValue)
        })

        setContactList(getGrouppedArray(filterArray))

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
                    {contactList.map((item, index) => (
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

export default ContactList