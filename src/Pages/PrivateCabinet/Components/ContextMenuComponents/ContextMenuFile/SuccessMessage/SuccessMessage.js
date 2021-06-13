import React, { useEffect } from 'react'
import styles from './SuccessMessage.module.sass'

function SuccessMessage({ message, close }) {

    useEffect(() => {
        setTimeout(() => close(false), 3000)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.wrap}>
            <div className={styles.message}>
                {message}
            </div>
        </div>
    )
}

export default SuccessMessage