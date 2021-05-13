import React, {useEffect, useState} from 'react'

import styles from './UserForm.module.sass'
import Input from '../Input/Input.js'
import ProfileUpload from './ProfileUpload/ProfileUpload'
import {useDispatch, useSelector} from 'react-redux'
import Form from '../Form/Form'
import {useInput} from '../Input/validation'
import api from '../../../../../api'
import Button from '../Button/Button'
import PopUp from '../../../../../generalComponents/PopUp'
import {USER_INFO} from '../../../../../Store/types'

const UserForm2 = () => {

    const user = useSelector(state => state.user.userInfo)
    const uid = useSelector(state => state.user.uid)
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState(user)
    const [editForm, setEditForm] = useState(false)
    const [passCheck, setPassCheck] = useState(false)
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

    const name = useInput(user?.name, {required: true})
    const sname = useInput(user?.sname, {required: true})
    const pass = useInput(user?.pass, {required: true})
    const password_r = useInput('', {required: true})
    const email = useInput(user?.email, {email: true})
    const tel = useInput(user?.tel)

    const formIsValid = () => {
        return !name.isEmpty &&
            !sname.isEmpty &&
            !pass.isEmpty &&
            email.isEmail &&
            passCheck
    }

    const resetForm = () => {
        setEditForm(false)
        setUserInfo(user)
        setImage(null)
        name.reset()
        sname.reset()
        pass.reset()
        password_r.reset()
        email.reset()
        tel.reset()
    }

    const onSubmit = event => {
        event.preventDefault()
        if (formIsValid()) {
            api.get(`/ajax/user_edit.php`, {
                params: {
                    uid,
                    ...userInfo
                }
            })
                .then(res => {
                    setSuccess(true)
                    dispatch({
                        type: USER_INFO,
                        payload: userInfo
                    })
                })
                .catch(err => console.log(err))
        } else {
            console.log('Error')
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
                                value={name.value}
                                disabled={!editForm}
                                isMistake={name.isEmpty && name.dirty}
                                onChange={event => name.onChange(event)}
                                onBlur={event => {
                                    name.onBlur(event)
                                    setUserInfo({...userInfo, name: name.value})
                                }}
                            />
                        </div>
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                label='Фамилия'
                                name='sname'
                                value={sname.value}
                                disabled={!editForm}
                                isMistake={sname.isEmpty && sname.dirty}
                                onChange={event => sname.onChange(event)}
                                onBlur={event => {
                                    sname.onBlur(event)
                                    setUserInfo({...userInfo, sname: sname.value})
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
                                    setUserInfo({...userInfo, email: email.value})
                                }}
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
                                value={pass.value}
                                isMistake={pass.isEmpty && pass.dirty}
                                onChange={event => pass.onChange(event)}
                                onBlur={event => {
                                    pass.onBlur(event)
                                    setUserInfo({...userInfo, pass: pass.value})
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
                                    if (password_r.value === pass.value) {
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
                                    setUserInfo({...userInfo, tel: tel.value})
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

        </div>
    )
}

export default UserForm2