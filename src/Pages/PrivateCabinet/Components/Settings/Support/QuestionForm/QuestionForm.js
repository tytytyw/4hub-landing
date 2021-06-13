import React, {useState} from 'react'

import styles from './QuestionForm.module.sass'
import Input from '../../Input/Input'
import Textarea from '../../Textarea/Textarea'
import {useInput} from '../../Input/validation'
import Button from '../../Button/Button'

const QuestionForm = () => {

    const [fields, setFields] = useState({})
    const message = useInput('', {required: true})
    const email = useInput('', {email: true})

    const formIsValid = () => {
        return email.isEmail && !message.isEmpty
    }

    const onSubmit = (event) => {
        event.preventDefault()

        if (formIsValid()) {
            console.log('Success', fields)
        } else {
            console.log('Error')
        }
    }

    return (
        <div className={styles.wrapper}>

            <form noValidate onSubmit={onSubmit}>
                <div className={styles.fields}>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                label='Введите тему'
                                name='theme'
                                onChange={event => {
                                    setFields({...fields, name: event.target.value})
                                }}
                            />
                        </div>
                        <div className={`${styles.field} ${styles.flex50}`}>
                            <Input
                                type='email'
                                label='Введите Ваш Email'
                                name='email'
                                value={email.value}
                                onChange={event => {
                                    email.onChange(event)
                                    setFields({...fields, email: event.target.value})
                                }}
                                onBlur={event => email.onBlur(event)}
                                isMistake={!email.isEmail && email.dirty}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.flex100}`}>
                            <Textarea
                                label='Задайте вопрос'
                                name='message'
                                value={message.value}
                                onChange={event => {
                                    message.onChange(event)
                                    setFields({...fields, message: message.value})
                                }}
                                onBlur={event => message.onBlur(event)}
                                isMistake={message.isEmpty && message.dirty}
                            />
                        </div>
                    </div>

                    <div className={styles.submitBlock}>
                        <Button
                            type='submit'
                            disabled={!formIsValid()}
                        >
                            Отправить
                        </Button>
                    </div>

                </div>
            </form>

        </div>
    )
}

export default QuestionForm