import React from 'react'
import PopUp from '../../../../../../generalComponents/PopUp'
import {imageSrc} from '../../../../../../generalComponents/globalVariables';

import styles from './ErrorPass.module.sass'
import Button from '../../../MyProfile/Button'

const ErrorPass = ({setError, set, mistake}) => {
    const getTaregtString = () => {
        switch (mistake) {
            case 'code': return 'код';
            default: return 'пароль'
        }
    }

    return (
        <PopUp set={set} setError={setError}>

            <div className={styles.wrapper}>

                <div className={styles.top}>

                    <div className={styles.closeWrap}>
                        <div
                            className={styles.close}
                            onClick={() => setError(false)}
                        >
                            <span className={styles.times}/>
                        </div>
                    </div>

                </div>

                <div className={styles.content}>

                    <div className={styles.titleWrap}>
                        <h4 className={styles.title}>Неверный {getTaregtString()}</h4>
                    </div>

                    <div className={styles.imageWrap}>
                        <img
                            className={styles.image}
                            src={`${imageSrc}/assets/PrivateCabinet/alerts/warning-pc.png`}
                            alt="Warning PC"
                        />
                    </div>

                    <div className={styles.textWrap}>
                        <p className={styles.text}>
                            Неверный {getTaregtString()}. Повторите попытку{mistake === 'password' ? ', восстановите через вкладку "Забыли пароль" или войдите с помощью Вашего номера телефона' : ''}.
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
                            onClick={() => setError(false)}
                        >
                            Повторить
                        </Button>
                    </div>

                </div>
            </div>

        </PopUp>
    )

}

export default ErrorPass
