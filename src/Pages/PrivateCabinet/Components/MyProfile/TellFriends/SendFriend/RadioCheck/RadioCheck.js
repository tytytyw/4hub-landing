import React from 'react'

import styles from './RadioCheck.module.sass'
import classnames from 'classnames'
import {emptyProfileImage} from "../../../Contacts/consts";

const RadioCheck = ({ item, name, ...props }) => {

    //const [active, setActive] = useState(false)

    const htmlFor = `radioCheck-${Math.random()}`

    return (
        <div className={styles.wrapper}>
            <input
                id={htmlFor}
                type="radio"
                name={name}
                className={styles.input}
            />
            <label
                className={classnames({
                    [styles.radioItem]: true,
                    //[styles.activeItem]: active,
                })}
                htmlFor={htmlFor}
            >
                <span className={styles.icon}>
                    <img src={item.image || emptyProfileImage} alt={item.id}/>
                </span>
                <p>{item.name}</p>
            </label>
        </div>
    )
}


export default RadioCheck