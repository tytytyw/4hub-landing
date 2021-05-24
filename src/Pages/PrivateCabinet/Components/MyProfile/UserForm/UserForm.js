import React, {useEffect, useRef, useState} from 'react'

import styles from './UserForm.module.sass'
import Input from '../Input/Input.js'
import ProfileUpload from './ProfileUpload/ProfileUpload'
import {useDispatch, useSelector} from 'react-redux'
import api from '../../../../../api'
import Button from '../Button/Button'
import {USER_INFO} from '../../../../../Store/types'
import AlertPopup from '../AlertPopup/AlertPopup'
import {formIsValid, isCorrectData} from '../Input/validation'

const UserForm = () => {

    const user = useSelector(state => state.user.userInfo)
    const uid = useSelector(state => state.user.uid)
    const dispatch = useDispatch()

    const [fields, setFields] = useState(user)

    const [formChanged, setFormChanged] = useState(false)
    const [errors, setErrors] = useState({})
    const [submitErrors, setSubmitErrors] = useState({})
    const [blur, setBlur] = useState({})

    const [editForm, setEditForm] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [success, setSuccess] = useState(false)

    const [image, setImage] = useState()
    const [preview, setPreview] = useState()

    const formRef = useRef()

    const uploadImage = event => {
        const file = event.target.files[0] ?? null
        if (file && file.type.substr(0, 5) === 'image') {
            setImage(file)
        } else {
            setImage(null)
        }
    }

    useEffect(() => {
        const profileImage = fields?.icon?.[0] || null
        if (image) {
            setFields({...fields, image})
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result)
            reader.readAsDataURL(image)
        } else {
            setPreview(profileImage)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])

    const requiredInputs = [
        'name',
        'sname',
        'email',
        'pass',
        'password_r',
    ]

    const resetForm = () => {
        setEditForm(false)
        setImage(null)
        setFields(user)
        setBlur({})
        setErrors({})
        setSubmitErrors({})
    }

    const onChangeHandler = event => {

        let {value, name} = event.target

        if (!isCorrectData(value, name, fields, requiredInputs)) {
            setErrors({...errors, [name]: true})
        } else {
            setErrors({...errors, [name]: false})
            setSubmitErrors({...submitErrors, [name]: false})
        }

        setFields({...fields, [name]: value})

    }

    const onBlurHandler = event => {
        const {name} = event.target
        setBlur({...blur, [name]: true})
    }

    const onSubmit = event => {

        event.preventDefault()

        if (formChanged && formIsValid(fields, setSubmitErrors, requiredInputs)) {

            const formData = new FormData(formRef.current)
            formData.append('file', image)

            api.post(`/ajax/user_edit.php?uid=${uid}`, formData)
                .then(() => {
                    setSuccess(true)
                    setEditForm(false)
                    setFormChanged(false)
                    dispatch({
                        type: USER_INFO,
                        payload: {
                            ...fields,
                            icon: [preview]
                        }
                    })
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    const isMistake = name => (errors?.[name] && blur?.[name]) || submitErrors?.[name]

    return (
        <div className={styles.formWrap}>

            <div className={styles.uploadBlock}>
                <ProfileUpload
                    preview={preview}
                    onChange={uploadImage}
                    disabled={!editForm}
                />
            </div>

            <form
                ref={formRef}
                noValidate
                onSubmit={onSubmit}
                onChange={() => setFormChanged(true)}
            >
                <div className={styles.fields}>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                label='Имя'
                                name='name'
                                disabled={!editForm}
                                isMistake={isMistake('name')}
                                value={fields?.name || ''}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
                            />
                        </div>
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                label='Фамилия'
                                name='sname'
                                disabled={!editForm}
                                isMistake={isMistake('sname')}
                                value={fields?.sname || ''}
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
                                isMistake={isMistake('email')}
                                value={fields?.email || ''}
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
                                isMistake={isMistake('pass')}
                                value={fields?.pass || ''}
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
                                isMistake={isMistake('password_r')}
                                value={fields?.password_r || ''}
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
                                value={fields?.tel}
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
            </form>

            {success && <AlertPopup
                set={setSuccess}
                title='Данные успешно обновлены'
                text='В целях безопасности, на Email Вашей учетной записи
                        отправлено подтверждение этого изменения'
            />}

        </div>
    )
}

export default UserForm