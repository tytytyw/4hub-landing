import React, {useEffect, useState} from 'react'

import styles from './UserForm.module.sass'
import Input from '../Input/Input.js'
import ProfileUpload from './ProfileUpload/ProfileUpload'
import {useDispatch, useSelector} from 'react-redux'
import Form from '../Form/Form'
import api from '../../../../../api'
import Button from '../Button/Button'
import {USER_INFO} from '../../../../../Store/types'
import AlertPopup from '../AlertPopup/AlertPopup'

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

        let {value, name} = event.target

        if (!isCorrectData(value, name)) {
            setErrors({...errors, [name]: true})
        } else {
            setErrors({...errors, [name]: false})
            setSubmitErrors({...submitErrors, [name]: false})
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
    }

    return (
        <div className={styles.formWrap}>

            <div className={styles.uploadBlock}>
                <ProfileUpload
                    preview={preview}
                    onChange={uploadImage}
                    disabled={!editForm}
                />
            </div>

            <Form noValidate onSubmit={onSubmit}>
                <div className={styles.fields}>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                label='Имя'
                                name='name'
                                disabled={!editForm}
                                isMistake={(errors?.name && blur?.name) || submitErrors?.name}
                                value={userInfo?.name}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
                            />
                        </div>
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                label='Фамилия'
                                name='sname'
                                disabled={!editForm}
                                isMistake={(errors?.sname && blur?.sname) || submitErrors?.sname}
                                value={userInfo?.sname}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
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
                                isMistake={(errors?.email && blur?.email) || submitErrors?.email}
                                value={userInfo?.email}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <Input
                                type='password'
                                label='Пароль'
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
                            <Input
                                label='Телефон'
                                name='tel'
                                disabled={!editForm}
                                value={userInfo?.tel}
                                phone={true}
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

            {success && <AlertPopup
                title='Данные успешно обновлены'
                text='В целях безопасности, на Email Вашей учетной записи
                        отправлено подтверждение этого изменения'
            />}

        </div>
    )
}

export default UserForm