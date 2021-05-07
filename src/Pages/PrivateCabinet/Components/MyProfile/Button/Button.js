import React from 'react'

import styles from './Button.module.sass'
import classnames from 'classnames'

const Button = ({children, type = 'button', disabled = false, className}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={classnames({
                [styles.button]: true,
                [className]: true
            })}
        >
            {children}
        </button>
    )
}

export default Button