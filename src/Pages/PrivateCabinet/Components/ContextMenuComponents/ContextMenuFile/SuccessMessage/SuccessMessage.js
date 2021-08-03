import React, { useEffect } from 'react'
import styles from './SuccessMessage.module.sass'

function SuccessMessage({ showSuccessMessage, setShowSuccessMessage }) {

    useEffect(() => {
        setTimeout(() => setShowSuccessMessage(false), 3000)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.wrap}>
            <div className={styles.message}>
                {showSuccessMessage}
            </div>
        </div>
    )
}

export default SuccessMessage