import React from 'react'

import styles from './ContactMenu.module.sass'

const ContactMenu = ({ data, onItemClick = () => {} }) => {

    return (
        <ul className={styles.menuList}>

            {data.map((item, index) => (
                <li
                    onClick={() => onItemClick(item)}
                    className={styles.menuItem}
                    key={index}
                >
                    <span className={styles.icon}>
                        <img src={item.icon} alt={item.id}/>
                    </span>
                    <p>{item.label}</p>
                </li>
            ))}

        </ul>
    )
}

export default ContactMenu