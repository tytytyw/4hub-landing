import React, {useRef, useState} from 'react'
import PopUp from '../../../../../../generalComponents/PopUp'

import styles from './RefreshPass.module.sass'
import Button from '../../../MyProfile/Button'
import PassInfo from './PassInfo'
import SuccessPass from "../SuccessPass";

const RefreshPass = ({safe, set}) => {

    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [showPass, setShowPass] = useState(false)

    const [success, setSuccess] = useState(false)
    const [enable, setEnable] = useState(false)
    const [showInfo, setShowInfo] = useState(false)

    const getEyeImg = () => showPass ? './assets/StartPage/eye.svg' : './assets/StartPage/invisible.svg'

    const inputRef = useRef()

    const onSubmit = () => {
        if (enable) {
            setSuccess(true)
        }
    }

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

                    <div className={styles.formItem}>

                        <label
                            htmlFor={styles.passInput}
                            className={styles.label}
                        >
                            Новый пароль
                        </label>

                        <div className={styles.inputWrap}>
                            <input
                                ref={inputRef}
                                onFocus={() => setShowInfo(true)}
                                id={styles.passInput}
                                type={showPass ? 'text' : 'password'}
                                className={styles.passInput}
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />

                            {showInfo &&
                            <PassInfo
                                setEnable={setEnable}
                                value={password}
                                inputRef={inputRef}
                                visible={showInfo}
                                setVisible={setShowInfo}
                            />}

                            <img
                                src={getEyeImg()}
                                alt='eye'
                                className={styles.eye}
                                onClick={() => setShowPass(!showPass)}
                            />
                        </div>
                    </div>

                    <div className={styles.formItem}>

                        <label
                            htmlFor={styles.inputWrap}
                            className={styles.label}
                        >
                            Повторить пароль
                        </label>

                        <div className={styles.inputWrap}>
                            <input
                                id={styles.inputWrap}
                                type={showPass ? 'text' : 'password'}
                                className={styles.passInput}
                                value={passwordRepeat}
                                onChange={event => setPasswordRepeat(event.target.value)}
                            />
                            <img
                                src={getEyeImg()}
                                alt='eye'
                                className={styles.eye}
                                onClick={() => setShowPass(!showPass)}
                            />
                        </div>
                    </div>

                    <div className={styles.actionBlock}>
                        <Button
                            type='submit'
                            className={styles.actionBtn}
                            onClick={onSubmit}
                        >
                            Готово
                        </Button>
                    </div>

                </div>
            </div>

            {success && <SuccessPass complete={() => set(false)} set={setSuccess}/>}

        </PopUp>
    )

}

export default RefreshPass
