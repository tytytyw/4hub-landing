import React from 'react'

import styles from './SuccessSend.module.sass'
import successImg from '../../../../../../assets/BusinessCabinet/WelcomePage/success.svg'

const SuccessSend = ({setPageOption}) => {

    return (
        <div className={styles.centeredWrapper}>

            <div className={styles.wrapper}>

            <div className={styles.header}>
                <img src={successImg} alt="Success"/>
                <p>Письмо отправлено на почту</p>
            </div>

            <div className={styles.infoBlock}>
                <p>
                    Письмо с правами доступа отправленно на указанный вами email
                    mailgmail@gmail.com
                </p>
            </div>

            <div className={styles.actionBlock}>
                <button onClick={() => setPageOption('welcome')}>Готово</button>
            </div>

        </div>

        </div>
    )
}

export default SuccessSend