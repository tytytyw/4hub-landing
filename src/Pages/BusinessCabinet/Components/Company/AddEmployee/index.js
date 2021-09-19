import React, {useState} from 'react'

import styles from './AddEmployee.module.sass'
import successImg from '../../../../../assets/BusinessCabinet/WelcomePage/mail-desktop.svg'
import {ReactComponent as FileIcon} from '../../../../../assets/BusinessCabinet/WelcomePage/file.svg'
import Input from '../../../../Cabinet/Components/MyProfile/Input'
import SuccessPopup from "../../SuccessPopup";

const AddEmployee = ({setPageOption}) => {

    const [success, setSuccess] = useState(false)
    const [emails, setEmails] = useState([])

    const addEmail = e => {
        const value = e.target.value?.trim()
        const existInArr = emails.includes(value)
        if (!!value && !existInArr && e.charCode === 13) {
            setEmails([...emails, value])
            e.target.value = ''
        }
    }

    return (
        <>

            <div className={styles.centeredWrapper}>
                <div className={styles.wrapper}>

                    <div className={styles.header}>
                        <p>Добавить сотрудника (ов)</p>
                    </div>

                    <div className={styles.formWrap}>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor='access_email'>Укажите Email</label>
                            <Input
                                id='access_email'
                                name='email'
                                placeholder='Введите email'
                                onKeyPress={addEmail}
                            />
                        </div>

                        {emails.length > 0 &&
                        <div className={styles.emails}>
                            {emails.map((mail, index) => (
                                <div
                                    key={index}
                                    onClick={() => setEmails(emails.filter(item => item !== mail))}
                                    className={styles.mail}
                                >
                                    {mail}
                                </div>
                            ))}
                        </div>}

                    </div>

                    <div className={styles.uploadBlock}>

                        <label className={styles.uploadLabel} htmlFor='upload_emails'>
                            Загрузить базу Email
                            <input type="file" id='upload_emails'/>
                        </label>

                        <div className={styles.file}>
                            <FileIcon/>
                            <p>Сотрудники Укр Газ</p>
                        </div>

                    </div>

                    <div className={styles.actionBlock}>
                        <button
                            onClick={() => setPageOption('welcome')}
                            className={styles.cancelBtn}
                        >
                            Отмена
                        </button>
                        <button
                            onClick={() => setSuccess(true)}
                        >
                            Отправить
                        </button>
                    </div>

                </div>
            </div>

            {success &&
            <SuccessPopup
                title='Письма успешно отправленны'
                set={setSuccess}
            >
                <img src={successImg} alt="Success"/>
            </SuccessPopup>}

        </>
    )
}

export default AddEmployee