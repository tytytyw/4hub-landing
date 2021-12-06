import React from 'react'

import styles from './ContactSearch.module.sass'
import {imageSrc} from '../../../../../../../../generalComponents/globalVariables';

const ContactSearch = ({value, onChangeHandler = () => {}, placeholder='Введите имя'}) => {

    return (
        <div className={styles.searchWrap}>
            <img className={styles.icon} src={imageSrc + "assets/PrivateCabinet/magnifying-glass-2.svg"} alt="Search"/>
            <input
                type="search"
                value={value}
                onChange={event => onChangeHandler(event.target.value)}
                className={styles.input}
                placeholder={placeholder}
            />
        </div>
    )
}

export default ContactSearch