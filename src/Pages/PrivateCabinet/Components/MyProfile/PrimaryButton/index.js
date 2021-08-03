import React from 'react'
import classnames from 'classnames'
import styles from '../MyProfile.module.sass'

const PrimaryButton = ({ onClick = () => {}, active = false, ...props }) => (
    <button
        type='button'
        onClick={onClick}
        className={classnames({
            [styles.button]: true,
            [styles.active]: active
        })}
    >
        {props.text}
        {props.icon && <span className={styles.buttonIcon}>{props.icon}</span>}
    </button>
)

export default PrimaryButton