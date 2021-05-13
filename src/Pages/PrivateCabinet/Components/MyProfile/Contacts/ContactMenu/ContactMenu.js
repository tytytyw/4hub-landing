import React from 'react'

import styles from './ContactMenu.module.sass'

<<<<<<< HEAD
const ContactMenu = ({ data, onItemClick = () => {} }) => {
=======
const ContactMenu = ({ data }) => {
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87

    return (
        <ul className={styles.menuList}>

            {data.map((item, index) => (
                <li
<<<<<<< HEAD
                    onClick={() => onItemClick(item)}
=======
                    onClick={() => item.onClick && item.onClick(item)}
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
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