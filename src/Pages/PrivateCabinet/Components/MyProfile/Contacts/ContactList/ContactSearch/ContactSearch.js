import React from 'react'

import styles from './ContacSearch.module.sass'

const ContactSearch = ({onChangeHandler = () => {}}) => {

    return (
        <div className={styles.searchWrap}>
            <input
                type="search"
                onChange={event => onChangeHandler(event.target.value)}
                className={styles.input}
                placeholder='Введите имя'
            />
            <img className={styles.icon} src="./assets/PrivateCabinet/magnifying-glass-2.svg" alt="Search"/>
        </div>
    )
}

export default ContactSearch