import React from 'react'
import PopUp from '../../../../../generalComponents/PopUp'

import styles from './ErrorPass.module.sass'
import Button from '../../MyProfile/Button'

const ErrorPass = ({set}) => {

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
                        <h4 className={styles.title}>Ошибка неверный пароль</h4>
                    </div>

                    <div className={styles.imageWrap}>
                        <img
                            className={styles.image}
                            src="./assets/PrivateCabinet/alerts/warning-pc.png"
                            alt="Warning PC"
                        />
                    </div>

                    <div className={styles.textWrap}>
                        <p className={styles.text}>
                            Неверный пароль повторите попытку или если Вы забыли
                            пароль в можите его востановить через вкладку «забыл пароль»
                            или войдите с помощью Вашего мобильного телефона
                        </p>
                    </div>

                    <div className={styles.actionBlock}>
                        <Button
                            type='submit'
                            className={styles.cancelBtn}
                            onClick={() => set(false)}
                        >
                            Закрыть
                        </Button>
                        <Button
                            type='submit'
                            className={styles.submitBtn}
                        >
                            Войти
                        </Button>
                    </div>

                </div>
            </div>

        </PopUp>
    )

}

export default ErrorPass
