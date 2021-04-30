import React, {useState} from 'react'

import styles from './UserForm.module.sass'
import Input from '../Input/Input.js'
import ProfileUpload from './ProfileUpload/ProfileUpload'
import {useSelector} from 'react-redux'

const UserForm = props => {

    const user = useSelector(state => state.user.userInfo)
    const [userInfo, setUserInfo] = useState(user ?? {})
    const [errors, setErrors] = useState({})

    const [passActive, setPassActive] = useState(false)
    const [phoneActive, setPhoneActive] = useState(false)

    const checkRequired = (value, name) => {
        setErrors({...errors, [name]: value === ''})
    }

    const checkEmail = (value, name) => {
        setErrors({...errors, [name]: !validateEmail(value) || value === ''})
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    return (
        <div className={styles.formWrap}>

            <ProfileUpload/>

            <div className={styles.fields}>

                <div className={styles.row}>
                    <div className={`${styles.field} ${styles.flex50}`}>
                        <Input
                            label='Имя'
                            value={userInfo?.name}
                            onChange={(event) => {
                                setUserInfo({...userInfo, name: event.target.value})
                            }}
                            name='name'
                            isMistake={errors?.name}
                            onBlur={(event) => checkRequired(event.target.value, 'name')}
                        />
                    </div>
                    <div className={`${styles.field} ${styles.flex50}`}>
                        <Input
                            label='Фамилия'
                            value={userInfo?.fname}
                            onChange={(event) => {
                                setUserInfo({...userInfo, fname: event.target.value})
                            }}
                            name='fname'
                            isMistake={errors?.fname}
                            onBlur={(event) => checkRequired(event.target.value, 'fname')}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={`${styles.field} ${styles.flex100}`}>
                        <Input
                            type='email'
                            label='Email'
                            value={userInfo?.email}
                            onChange={(event) => {
                                setUserInfo({...userInfo, email: event.target.value})
                            }}
                            name='email'
                            isMistake={errors?.email}
                            onBlur={(event) => checkEmail(event.target.value, 'email')}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={`${styles.field} ${styles.flex100}`}>
                        <Input
                            type='password'
                            label='Пароль'
                            value={userInfo?.password}
                            onChange={(event) => {
                                setUserInfo({...userInfo, password: event.target.value})
                            }}
                            readonly={!passActive}
                            name='password'
                            onBlur={(event) => checkRequired(event.target.value, 'password')}
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
                            value={userInfo?.phone}
                            onChange={(event) => {
                                setUserInfo({...userInfo, phone: event.target.value})
                            }}
                            readonly={!phoneActive}
                            name='phone'
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

        </div>
    )
}

export default UserForm