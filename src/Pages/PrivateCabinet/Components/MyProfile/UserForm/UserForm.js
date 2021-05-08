import React, {useEffect, useState} from 'react'

import styles from './UserForm.module.sass'
import Input from '../Input/Input.js'
import ProfileUpload from './ProfileUpload/ProfileUpload'
import {useSelector} from 'react-redux'
import Form from '../Form/Form'
import {useInput} from '../Input/validation'
import api from '../../../../../api';
import Button from "../Button/Button";

const UserForm = props => {

    const user = useSelector(state => state.user.userInfo)
    const uid = useSelector(state => state.user.uid)

    const [userInfo, setUserInfo] = useState(user ?? {})
    const [editForm, setEditForm] = useState(false)
    const [passCheck, setPassCheck] = useState(false)

    const name = useInput(user?.name, {required: true})
    const fname = useInput(user?.fname, {required: true})
    const password = useInput(user?.password, {required: true})
    const password_r = useInput('', {required: true})
    const email = useInput(user?.email, {email: true})
    const tel = useInput(user?.tel)

    const formIsValid = () => {
        return !name.isEmpty &&
            !fname.isEmpty &&
            !password.isEmpty &&
            email.isEmail &&
            passCheck
    }

    const resetForm = () => {
        setEditForm(false)
        setUserInfo(user)
        name.reset()
        fname.reset()
        password.reset()
        password_r.reset()
        email.reset()
        tel.reset()
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
                                disabled={!editForm}
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
                                disabled={!editForm}
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
                                disabled={!editForm}
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
                                disabled={!editForm}
                                value={password.value}
                                isMistake={password.isEmpty && password.dirty}
                                onChange={event => password.onChange(event)}
                                onBlur={event => {
                                    password.onBlur(event)
                                    if (isCorrectValue(password, userInfo.password)) {
                                        setUserInfo({...userInfo, password: password.value})
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {editForm && <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <Input
                                type='password'
                                label='Повторите Пароль'
                                name='password_r'
                                disabled={!editForm}
                                value={password_r.value}
                                isMistake={(!passCheck || password_r.isEmpty) && password_r.dirty}
                                onChange={event => password_r.onChange(event)}
                                onBlur={event => {
                                    password_r.onBlur(event)
                                    if (password_r.value === password.value) {
                                        setPassCheck(true)
                                    } else {
                                        setPassCheck(false)
                                    }
                                }}
                            />
                        </div>
                    </div>}

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <Input
                                type='text'
                                label='Телефон'
                                name='tel'
                                disabled={!editForm}
                                value={tel.value}
                                onChange={event => tel.onChange(event)}
                                onBlur={event => {
                                    tel.onBlur(event)
                                    if (tel.value !== userInfo.tel) {
                                        setUserInfo({...userInfo, tel: tel.value})
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.submitBlock}>
                        {editForm && <>
                            <Button
                                className={styles.cancelBtn}
                                onClick={() => resetForm()}
                            >
                                Отмена
                            </Button>
                            <Button
                                type='submit'
                                className={styles.submitBtn}
                            >
                                Сохранить
                            </Button>
                        </>}
                        {!editForm && <Button
                            className={styles.editBtn}
                            onClick={() => setEditForm(true)}
                        >
                            Редактировать
                        </Button>}
                    </div>

                </div>
            </Form>

        </div>
    )
}

export default UserForm