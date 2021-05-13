import React from 'react'

import styles from './Button.module.sass'
import classnames from 'classnames'

<<<<<<< HEAD
const Button = ({children, type = 'button', disabled = false, className}) => {
=======
const Button = ({children, type = 'button', disabled = false, className, onClick = () => {}}) => {
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
    return (
        <button
            type={type}
            disabled={disabled}
            className={classnames({
                [styles.button]: true,
                [className]: true
            })}
<<<<<<< HEAD
=======
            onClick={onClick}
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
        >
            {children}
        </button>
    )
}

export default Button