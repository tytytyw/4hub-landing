import React from 'react';
import styles from './SuccessCreated.module.sass'

import timesImg from '../../../../../assets/BusinessCabinet/times.svg'
import successImg from '../../../../../assets/BusinessCabinet/WelcomePage/success.svg'

const SuccessCreated = () => {



    return (
        <div className={styles.wrapper}>

            <div className={styles.contentWrapper}>

                <img className={styles.close} src={timesImg} alt="Close"/>

                <div className={styles.header}>
                    <h4 className={styles.title}>Новая Компания успешно создана</h4>
                </div>

                <div className={styles.content}>

                    <div className={styles.successBlock}>
                        <img src={successImg} alt="Success icon"/>
                    </div>

                    <p className={styles.text}>
                        Новая Компания успешно создана и добавлена в базу.
                        <br/>
                        На ваш E-Mail отправлено письмо с ссылкой для потвержения
                    </p>

                    <p className={styles.info}>
                        Не пришло письмо ?
                        <span className={styles.resend}>Отправить заново</span>
                    </p>

                    <div className={styles.actionBlock}>
                        <button
                            className={styles.completeBtn}
                        >
                            Готово
                        </button>
                    </div>

                </div>



            </div>

        </div>
    );
};

export default SuccessCreated;