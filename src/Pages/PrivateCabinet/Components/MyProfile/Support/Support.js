import React, {useState} from 'react'

import styles from './Support.module.sass'

import Accordion from '../../Accordion/Accordion'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import api from '../../../../../api'
import AlertPopup from '../AlertPopup/AlertPopup'
import {formIsValid, isCorrectData} from '../Input/validation'
import {useSelector} from "react-redux";

const Support = () => {

    const uid = useSelector(state => state.user.uid)

    const [errors, setErrors] = useState({})
    const [submitErrors, setSubmitErrors] = useState({})

    const [fields, setFields] = useState({})
    const [blur, setBlur] = useState({})
    const [success, setSuccess] = useState(false)

    const resetForm = () => {
        setFields({})
        setBlur({})
        setErrors({})
        setSubmitErrors({})
    }

    const onBlurHandler = event => {
        const {name} = event.target
        setBlur({...blur, [name]: true})
    }

    const onChangeHandler = event => {

        let {value, name} = event.target

        if (!isCorrectData(value, name, fields,['text'])) {
            setErrors({...errors, [name]: true})
        } else {
            setErrors({...errors, [name]: false})
            setSubmitErrors({...submitErrors, [name]: false})
        }

        setFields({...fields, [name]: value})

    }

    const onSubmit = (event) => {

        event.preventDefault()

        if (formIsValid(fields, setSubmitErrors, ['text'])) {
            api.get(`/ajax/admin_send.php`, {
                params: {
                    uid,
                    ...fields
                }
            })
                .then(() => {
                    setSuccess(true)
                    resetForm()
                }).catch(err => {
                    console.log(err)
                })
        }

    }

    const isMistake = name => (errors?.[name] && blur?.[name]) || submitErrors?.[name]

    return (
        <div className={styles.support}>

            <h2 className={styles.title}>Часто задаваемые вопросы</h2>
            <Accordion/>

            <h2 className={styles.title}>Остались вопросы?</h2>
            {/*<QuestionForm/>*/}

            <form noValidate onSubmit={onSubmit} className={styles.wrapper}>
                <div className={styles.fields}>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <Input
                                label='Введите тему'
                                name='subj'
                                isMistake={isMistake('subj')}
                                value={fields?.subj || ''}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
                            />
                        </div>
                        {/*<div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                type='email'
                                name='email'
                                label='Введите Ваш Email'
                                isMistake={isMistake('email')}
                                value={fields?.email}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
                            />
                        </div>*/}
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <Textarea
                                label='Задайте вопрос'
                                name='text'
                                isMistake={isMistake('text')}
                                value={fields?.text || ''}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
                            />
                        </div>
                    </div>

                    <div className={styles.submitBlock}>
                        <Button
                            type='submit'
                        >
                            Отправить
                        </Button>
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

export default Support