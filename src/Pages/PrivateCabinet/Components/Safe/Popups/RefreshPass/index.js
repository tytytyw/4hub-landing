import React, {useState} from 'react'
import PopUp from '../../../../../../generalComponents/PopUp'

import styles from './RefreshPass.module.sass'
import Input from '../../../MyProfile/Input'
import Button from '../../../MyProfile/Button'
import SafeIcon from '../../SafeIcon'

const RefreshPass = ({safe, set}) => {

    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [showPass, setShowPass] = useState(false)

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
                        <h4 className={styles.title}>Обновите пароль</h4>
                    </div>

                    <div className={styles.inputWrap}>
                        <Input
                            type='password'
                            label='Новый пароль'
                            placeholder='Введите пароль'
                            className={styles.input}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            showPass={showPass}
                            setShowPass={setShowPass}
                        />
                    </div>

                    <div className={styles.inputWrap}>
                        <Input
                            type='password'
                            label='Повторить пароль'
                            placeholder='Введите номер телефона (форма ввода +3 )'
                            name='tel'
                            className={styles.input}
                            value={passwordRepeat}
                            onChange={event => setPasswordRepeat(event.target.value)}
                            showPass={showPass}
                            setShowPass={setShowPass}
                        />

                    </div>

                    <div className={styles.actionBlock}>
                        <Button
                            type='submit'
                            className={styles.actionBtn}
                        >
                            Готово
                        </Button>
                    </div>

                </div>
            </div>

        </PopUp>
    )

}

export default RefreshPass
