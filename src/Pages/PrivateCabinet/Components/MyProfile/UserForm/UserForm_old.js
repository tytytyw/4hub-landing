import React, {useEffect, useState} from 'react'

import styles from './UserForm.module.sass'
import Input from '../Input/Input.js'
import ProfileUpload from './ProfileUpload/ProfileUpload'
import {useSelector} from 'react-redux'
import Form from '../Form/Form'
import {useInput} from '../Input/validation'
import api from '../../../../../api';

const UserForm_old = props => {

    const user = useSelector(state => state.user.userInfo)
    const uid = useSelector(state => state.user.uid)

    const [userInfo, setUserInfo] = useState(user ?? {})

    const [passActive, setPassActive] = useState(false)
    const [phoneActive, setPhoneActive] = useState(false)

    const name = useInput(userInfo?.name, {required: true})
    const fname = useInput(userInfo?.fname, {required: true})
    const password = useInput(userInfo?.password, {required: true})
    const email = useInput(userInfo?.email, {email: true})
    const tel = useInput(userInfo?.tel)

    const formIsValid = () => {
        return !name.isEmpty && !fname.isEmpty && !password.isEmpty && email.isEmail
    }

    const onSubmit = event => event.preventDefault()

    useEffect(() => {

        if (formIsValid()) {
            api.post(`/ajax/user_edit.php?token=${uid}`, userInfo)
                .then(res => {})
                .catch(err => console.log(err))
        } else {
            console.log('Error')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    const isCorrectValue = (input, oldValue, type) => {

        switch (type) {
            case 'email':
                return input.isEmail && oldValue !== input.value
            default:
                return !input.isEmpty && oldValue !== input.value
        }

    }

    return (
        <div className={styles.formWrap}>

            <ProfileUpload/>

            <Form noValidate onSubmit={onSubmit}>
                <div className={styles.fields}>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                label='Имя'
                                name='name'
                                value={name.value}
                                isMistake={name.isEmpty && name.dirty}
                                onChange={event => name.onChange(event)}
                                onBlur={event => {
                                    name.onBlur(event)
                                    if (isCorrectValue(name, userInfo.name)) {
                                        setUserInfo({...userInfo, name: name.value})
                                    }
                                }}
                            />
                        </div>
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                label='Фамилия'
                                name='fname'
                                value={fname.value}
                                isMistake={fname.isEmpty && fname.dirty}
                                onChange={event => fname.onChange(event)}
                                onBlur={event => {
                                    fname.onBlur(event)
                                    if (isCorrectValue(fname, userInfo.fname)) {
                                        setUserInfo({...userInfo, fname: fname.value})
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <Input
                                type='email'
                                label='Email'
                                name='email'
                                value={email.value}
                                isMistake={!email.isEmail && email.dirty}
                                onChange={event => email.onChange(event)}
                                onBlur={event => {
                                    email.onBlur(event)
                                    if (isCorrectValue(email, userInfo.email, 'email')) {
                                        setUserInfo({...userInfo, email: email.value})
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <Input
                                type='password'
                                label='Пароль'
                                name='password'
                                readonly={!passActive}
                                value={password.value}
                                isMistake={password.isEmpty && password.dirty && passActive}
                                onChange={event => password.onChange(event)}
                                onBlur={event => {
                                    password.onBlur(event)
                                    if (isCorrectValue(password, userInfo.password)) {
                                        setUserInfo({...userInfo, password: password.value})
                                    }
                                }}
                            />
                            <div className={styles.action}>
                                <button
                                    onClick={() => setPassActive(true)}
                                    className={styles.button}
                                >
                                    Сменить пароль
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <Input
                                type='text'
                                label='Телефон'
                                name='tel'
                                readonly={!phoneActive}
                                value={tel.value}
                                onChange={event => tel.onChange(event)}
                                onBlur={event => {
                                    tel.onBlur(event)
                                    if (isCorrectValue(tel, userInfo.tel)) {
                                        setUserInfo({...userInfo, tel: tel.value})
                                    }
                                }}
                            />
                            <div className={styles.action}>
                                <button
                                    onClick={() => setPhoneActive(true)}
                                    className={styles.button}
                                >
                                    Сменить телефон
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </Form>

        </div>
    )
}

export default UserForm_old