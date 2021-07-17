import React, {useState} from 'react'
import PopUp from '../../../../../../generalComponents/PopUp'

import styles from './RecoverPass.module.sass'
import Button from '../../../MyProfile/Button'

const RecoverPass = ({set}) => {

    const [email, setEmail] = useState('')

    return (
        <PopUp set={set}>

            <div className={styles.wrapper}>

                <div className={styles.top}>

                    <div className={styles.closeWrap}>
                        <div
                            className={styles.close}
                            onClick={() => set(false)}
                        >
                            <span className={styles.times}/>
                        </div>
                    </div>

                </div>

                <div className={styles.content}>

                    <div className={styles.titleWrap}>
                        <h4 className={styles.title}>Восстановление пароля</h4>
                    </div>

                    <div className={styles.textWrap}>
                        <p className={styles.text}>
                            Введите Email / Телефон указанный при регистрации, Вам будет
                            направленно письмо с ссылкой для востановления пароля
                        </p>
                    </div>

                    <div className={styles.formItem}>

                        <label
                            htmlFor={styles.inputWrap}
                            className={styles.label}
                        >
                            Email / Телефон
                        </label>

                        <div className={styles.inputWrap}>
                            <input
                                id={styles.inputWrap}
                                className={styles.input}
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.actionBlock}>
                        <Button
                            type='submit'
                            className={styles.submitBtn}
                        >
                            Отправить
                        </Button>
                    </div>

                </div>
            </div>

        </PopUp>
)

}

export default RecoverPass
