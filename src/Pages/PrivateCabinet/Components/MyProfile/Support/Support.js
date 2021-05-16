import React, {useState} from 'react'

import styles from './Support.module.sass'

import Accordion from '../../Accordion/Accordion'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import api from '../../../../../api'
import AlertPopup from '../AlertPopup/AlertPopup'

const Support = () => {

    const [errors, setErrors] = useState([])
    const [submitErrors, setSubmitErrors] = useState([])

    const [fields, setFields] = useState([])
    const [blur, setBlur] = useState([])
    const [success, setSuccess] = useState(false)

    const requiredInputs = {
        email: true,
        message: true
    }

    const formIsValid = () => {

        let dataErrors = {}
        let isValid = true
        for (let name in requiredInputs) {
            const value = fields[name]
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
        setFields({})
        setBlur({})
        setErrors({})
        setSubmitErrors({})
    }

    const validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const isCorrectData = (value, name) => {

        switch (true) {
            case name === 'email':
                return validateEmail(value) && !!value
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

        setFields({...fields, [name]: value})

    }

    const onBlurHandler = event => {
        const {name} = event.target
        setBlur({...blur, [name]: true})
    }

    const onSubmit = (event) => {

        event.preventDefault()

        if (formIsValid()) {
            api.get(`/ajax/user_send.php`, {
                params: { ...fields }
            }).then(() => {
                setSuccess(true)
                resetForm()
            }).catch(err => console.log(err))
        } else {
            console.log('Error')
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
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                label='Введите тему'
                                name='theme'
                                isMistake={isMistake('theme')}
                                value={fields?.theme}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
                            />
                        </div>
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                type='email'
                                name='email'
                                label='Введите Ваш Email'
                                isMistake={isMistake('email')}
                                value={fields?.email}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <Textarea
                                label='Задайте вопрос'
                                name='message'
                                isMistake={isMistake('message')}
                                value={fields?.message}
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
                title='Данные успешно обновлены'
                text='В целях безопасности, на Email Вашей учетной записи
                        отправлено подтверждение этого изменения'
            />}

        </div>
    )
}

export default Support