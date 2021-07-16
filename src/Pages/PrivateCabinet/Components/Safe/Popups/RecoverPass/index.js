import React from 'react'
import PopUp from '../../../../../../generalComponents/PopUp'

import styles from './RecoverPass.module.sass'
import Button from '../../../MyProfile/Button'
import Input from '../../../MyProfile/Input'

const RecoverPass = ({set}) => {

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
                    
                    <div className={styles.inputWrap}>
                        <Input
                            label={'Email / Телефон'}
                        />
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
