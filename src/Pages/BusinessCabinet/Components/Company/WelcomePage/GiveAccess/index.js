import React, {useState} from 'react'

import styles from './GiveAccess.module.sass'
import {ReactComponent as KeyImg} from '../../../../../../assets/BusinessCabinet/WelcomePage/key.svg'
import AccessRadio from './AccessRadio'
import Input from "../../../../../Cabinet/Components/MyProfile/Input";

const GiveAccess = ({setPageOption}) => {

    const [fields, setFields] = useState({
        email: '',
        access: null,
    })

    return (
        <div className={styles.centeredWrapper}>

            <div className={styles.wrapper}>

            <div className={styles.header}>
                <KeyImg className={styles.keyImg}/>
                <p>Предоставление доступа</p>
            </div>

            <div className={styles.infoBlock}>
                <p>
                    Предоставления доступа дает возможность третим лицам заполнять
                    данные о компании
                </p>
            </div>

            <div className={styles.formWrap}>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor='access_email'>Укажите Email</label>
                    <Input
                        id='access_email'
                        name='email'
                        placeholder='Введите email'
                        value={fields.email}
                        onChange={e => setFields({...fields, email: e.target.value})}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="access_check">Укажите разрещение доступа</label>

                    <AccessRadio
                        data={[
                            {
                                value: 1,
                                label: 'Предоставить все прова',
                                info: 'предоставление всех прав дает возможность редактировать, изменять удалять всю информацию в системе'
                            },
                            {
                                value: 2,
                                label: 'Доступ на добовления сотрудников',
                                info: 'предоставить доступ для работы с кадрами'
                            },
                            {
                                value: 3,
                                label: 'Доступ на редактирование системных параметров',
                                info: 'предостовление доступа для администрирования ресурса'
                            },
                        ]}
                        name='access_check'
                        onChange={access => setFields({...fields, access})}
                    />

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
                    onClick={() => setPageOption('success-mail')}
                >
                    Отправить
                </button>
            </div>

        </div>

        </div>
    )
}

export default GiveAccess