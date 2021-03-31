import React from 'react';

import styles from './RegistrationSuccess.module.sass';

const RegistrationSuccess = ({setPage, sendRequest}) => {

    return (
        <div className={styles.main}>
            <img className={styles.hubIcon} src='./assets/StartPage/4HUB.svg' alt='4HUB' onClick={() => setPage('init')} />
            <div className={styles.successWrap}>
            <span className={styles.cross} onClick={() => setPage('init')} />
            <span className={styles.title}>Регистрация прошля успешно</span>
            <div className={styles.imageWrap}>
                <img src='./assets/StartPage/success-file-send.svg'
                     alt='computer'
                     className={styles.computer}
                />
                <img src='./assets/StartPage/envelope.svg'
                     alt='envelope'
                     className={styles.envelope}
                />
                <img src='./assets/StartPage/paper-plane-left.svg'
                     alt='paper-plane'
                     className={styles.planeLeft}
                />
                <img src='./assets/StartPage/paper-plane-right.svg'
                     alt='paper-plane'
                     className={styles.planeRight}
                />
            </div>
            <span className={styles.info}>
                Для подтверждения Email Вам было отправлено контрольное письмо,
                перейдя по ссылке Вы сможете завершить <br />процес регистрации
            </span>
            <div className={styles.repeat}>
                Не пришло письмо ?
                <span onClick={() => sendRequest()}> Отправить заново</span>
            </div>
            </div>
        </div>
    )
}

export default RegistrationSuccess;
