import React, {useState} from 'react'

import styles from './RadioCheck.module.sass'
import classnames from 'classnames'
import {emptyProfileImage, getContactName} from '../../Contacts/consts'

const RadioCheck = ({ item, name, active, onClick = () => {} }) => {

    const htmlFor = `radioCheck-${Math.random()}`

    return (
        <div
            onClick={onClick}
            className={classnames({
                [styles.wrapper]: true,
                [styles.active]: item?.id === active,
            })}
        >
            <input
                id={htmlFor}
                type="radio"
                name={name}
                checked={item?.id === active}
                className={styles.input}
            />
            <label
                className={styles.radioItem}
                htmlFor={htmlFor}
            >
                <span className={styles.icon}>
                    <img src={item?.icon?.[0] || emptyProfileImage} alt={item.id}/>
                </span>
                <p>{getContactName(item)}</p>
            </label>
        </div>
    )
}


export default RadioCheck