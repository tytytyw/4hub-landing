import React from 'react'

import styles from './Programs.module.sass'
import ContactMenu from '../Contacts/ContactMenu/ContactMenu'

const menuData = [
    {
        id: 'all_contact',
        icon: './assets/PrivateCabinet/idea-2.svg',
        label: 'Все контакты'
    },
    {
        id: 'art',
        icon: './assets/PrivateCabinet/brush.svg',
        label: 'Творчество'
    },
    {
        id: 'office',
        icon: './assets/PrivateCabinet/folder-2.svg',
        label: 'Офис'
    },
]

const Programs = () => {


    return (
        <div className={styles.wrapper}>

            <div className={styles.contactMenu}>
                <ContactMenu
                    data={menuData}
                />
            </div>

            <div className={styles.mainContent}>

                

            </div>

        </div>
    )
}

export default Programs