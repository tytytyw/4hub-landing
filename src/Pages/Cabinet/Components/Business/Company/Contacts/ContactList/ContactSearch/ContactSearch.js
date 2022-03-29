import React from 'react'

import styles from './ContactSearch.module.sass'
import {imageSrc} from '../../../../../../../../generalComponents/globalVariables';
import {useLocales} from "react-localized";

const ContactSearch = ({value, onChangeHandler = () => {}, placeholder}) => {
    const { __ } = useLocales()
    if(!placeholder) {
        placeholder = __('Введите имя');
    }
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