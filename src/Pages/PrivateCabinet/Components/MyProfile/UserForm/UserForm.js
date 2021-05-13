import React, {useEffect, useState} from 'react'

import styles from './UserForm.module.sass'
import Input from '../Input/Input.js'
import ProfileUpload from './ProfileUpload/ProfileUpload'
<<<<<<< HEAD
import {useSelector} from 'react-redux'
import Form from '../Form/Form'
import {useInput} from '../Input/validation'
import api from '../../../../../api';

const UserForm = props => {

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
                .catch(err => console.log(err));
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

=======
import {useDispatch, useSelector} from 'react-redux'
import Form from '../Form/Form'
import api from '../../../../../api'
import Button from '../Button/Button'
import PopUp from '../../../../../generalComponents/PopUp'
import {USER_INFO} from '../../../../../Store/types'
import TelInput from "../TelInput/Telinput";

const UserForm = () => {

    const user = useSelector(state => state.user.userInfo)
    const uid = useSelector(state => state.user.uid)
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState(user)
    const [errors, setErrors] = useState({})
    const [submitErrors, setSubmitErrors] = useState({})
    const [blur, setBlur] = useState({})

    const [editForm, setEditForm] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [success, setSuccess] = useState(false)

    const [image, setImage] = useState()
    const [preview, setPreview] = useState()

    const uploadImage = event => {
        const file = event.target.files[0] ?? null
        if (file && file.type.substr(0, 5) === 'image') {
            setImage(file)
        } else {
            setImage(null)
        }
    }

    useEffect(() => {
        if (image) {
            setUserInfo({...userInfo, image})
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result)
            reader.readAsDataURL(image)
        } else {
            setPreview(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])

    const formIsValid = () => {

        let dataErrors = {}
        let isValid = true
        for (let name in requiredInputs) {
            const value = userInfo[name]
            if (!isCorrectData(value, name)) {
                dataErrors = {...dataErrors, [name]: true}
                isValid = false
            } else {
                dataErrors = {...dataErrors, [name]: false}
            }
        }

        setSubmitErrors(dataErrors)

        return isValid
    }

    const resetForm = () => {
        setEditForm(false)
        setImage(null)
        setUserInfo(user)
        setBlur({})
        setErrors({})
        setSubmitErrors({})
    }

    const validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const requiredInputs = {
        name: true,
        sname: true,
        email: true,
        pass: true,
        password_r: true,
    }

    const isCorrectData = (value, name) => {

        switch (true) {
            case name === 'email':
                return validateEmail(value) && !!value
            case name === 'password_r':
                return value === userInfo?.pass && !!value
            case requiredInputs[name]:
                return !!value
            default:
                return true
        }

    }

    const onChangeHandler = event => {

        const {value, name} = event.target

        if (!isCorrectData(value, name)) {
            setErrors({...errors, [name]: true})
        } else {
            setErrors({...errors, [name]: false})
            setSubmitErrors({...errors, [name]: false})
        }

        setUserInfo({...userInfo, [name]: value})

    }

    const onBlurHandler = event => {
        const {name} = event.target
        setBlur({...blur, [name]: true})
    }

    const onSubmit = event => {

        event.preventDefault()

        if (formIsValid()) {
            api.get(`/ajax/user_edit.php`, {
                params: { uid, ...userInfo }
            }).then(res => {
                setSuccess(true)
                dispatch({
                    type: USER_INFO,
                    payload: userInfo
                })
            }).catch(err => console.log(err))
        }
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
    }

    return (
        <div className={styles.formWrap}>

<<<<<<< HEAD
            <ProfileUpload/>
=======
            <div className={styles.uploadBlock}>
                <ProfileUpload
                    preview={preview}
                    onChange={uploadImage}
                    disabled={!editForm}
                />
            </div>
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87

            <Form noValidate onSubmit={onSubmit}>
                <div className={styles.fields}>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                label='Имя'
                                name='name'
<<<<<<< HEAD
                                value={name.value}
                                isMistake={name.isEmpty && name.dirty}
                                onChange={event => name.onChange(event)}
                                onBlur={event => {
                                    name.onBlur(event)
                                    if (isCorrectValue(name, userInfo.name)) {
                                        setUserInfo({...userInfo, name: name.value})
                                    }
                                }}
=======
                                disabled={!editForm}
                                isMistake={(errors?.name && blur?.name) || submitErrors?.name}
                                value={userInfo?.name}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
                            />
                        </div>
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                label='Фамилия'
<<<<<<< HEAD
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
=======
                                name='sname'
                                disabled={!editForm}
                                isMistake={(errors?.sname && blur?.sname) || submitErrors?.sname}
                                value={userInfo?.sname}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <Input
                                type='email'
                                label='Email'
                                name='email'
<<<<<<< HEAD
                                value={email.value}
                                isMistake={!email.isEmail && email.dirty}
                                onChange={event => email.onChange(event)}
                                onBlur={event => {
                                    email.onBlur(event)
                                    if (isCorrectValue(email, userInfo.email, 'email')) {
                                        setUserInfo({...userInfo, email: email.value})
                                    }
                                }}
=======
                                disabled={!editForm}
                                isMistake={(errors?.email && blur?.email) || submitErrors?.email}
                                value={userInfo?.email}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <Input
                                type='password'
                                label='Пароль'
<<<<<<< HEAD
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

=======
                                name='pass'
                                disabled={!editForm}
                                isMistake={(errors?.pass && blur?.pass) || submitErrors?.pass}
                                value={userInfo?.pass ?? ''}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
                                showPass={showPass}
                                setShowPass={setShowPass}
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
                                isMistake={(errors?.password_r && blur?.password_r) || submitErrors?.password_r}
                                value={userInfo?.password_r ?? ''}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
                                showPass={showPass}
                                setShowPass={setShowPass}
                            />
                        </div>
                    </div>}

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <TelInput
                                label='Телефон'
                                name='tel'
                                disabled={!editForm}
                                value={userInfo?.tel}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
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

            {success && <PopUp set={setSuccess}>
                <div className={styles.sendSuccess}>
                    <span className={styles.cross} onClick={() => setSuccess(false)} />
                    <span className={styles.title}>Данные успешно обновлены</span>
                    <div className={styles.imageWrap}>
                        <img src='./assets/StartPage/success-password-edit.svg'
                             alt='computer'
                             className={styles.computer}
                        />
                    </div>
                    <p className={styles.text}>В целях безопасности, на Email Вашей учетной записи
                        отправлено подтверждение этого изменения</p>
                    <div
                        className={styles.closeButton}
                        onClick={() => setSuccess(false)}
                    >Продолжить</div>
                </div>
            </PopUp>}

>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
        </div>
    )
}

export default UserForm