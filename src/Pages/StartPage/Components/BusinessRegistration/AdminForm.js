import React, {useEffect, useState} from 'react';
import styles from "./BusinessRegistration.module.sass";
import Input from "../../../Cabinet/Components/MyProfile/Input";
import {useValidateForm} from "./validation";
import AdminSelect from "./AdminSelect";

import arrowImg from '../../../../assets/BusinessCabinet/arrow.svg'

const requiredInputs = [
    'admin',
    'surname',
    'name',
    'middle_name',
    'phone',
    'email',
    'password',
    'password_r'
]

const AdminForm = ({mainFields, setMainFields, setStep, compare, setCompare}) => {

    const [confirmPass, setConfirmPass] = useState(true)
    const [showPass, setShowPass] = useState(false)

    const {
        fields,
        setFields,
        errors,
        onChange,
        checkErrors
    } = useValidateForm({ admin: 1 }, requiredInputs)

    useEffect(() => {
        if (mainFields?.admin) {
            setFields(mainFields?.admin)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = event => {
        event.preventDefault()

        if (checkErrors()) {
            setMainFields({...mainFields, admin: fields})
            setStep('complete')
        }
    }

    const checkConfirmPass = event => {
        const value = event.target.value
        setConfirmPass(value === getValue('password'))
        onChange(value, 'password_r')
    }

    const backStep = () => {
        setMainFields({...mainFields, admin: fields})
        setStep('main')
    }

    const getValue = name => fields?.[name] || ''

    return (
        <div className={styles.formWrap}>

            <h4 className={styles.formTitle}>Администратор</h4>

            <form noValidate onSubmit={onSubmit}>

                <div className={styles.formItem}>
                    <label className={styles.label}>
                        Передача прав Администратора
                        {requiredInputs.includes('admin') && <span className={styles.required}>*</span>}
                    </label>
                    <AdminSelect
                        initValue={getValue('admin')}
                        error={errors?.includes('admin')}
                        onSelect={value => onChange(value, 'name')}
                        data={[
                            {
                                id: 1,
                                text: 'Назначить меня администратором Компании',
                                info: `Вы сможете самостоятельно верифицировать компанию, добавлять и 
                                редактировать информацию, открывать и закрывать вакансии и добавлять 
                                кандидатов.`
                            },
                            {
                                id: 2,
                                text: 'Назначить другого человека администратором Компании',
                                info: `Вы будете добавлены в Компанию как обычный сотрудник. Ваши 
                                полномочия и права доступа сможет определить указанный 
                                Администратор. Указанный Администратор получит на почту 
                                уведомление о назначении.`
                            }
                        ]}
                        placeholder='Назначить меня администратором Компании'
                    />
                </div>

                <div className={styles.row}>

                    <div className={styles.formItem}>
                        <Input
                            required={requiredInputs.includes('surname')}
                            isMistake={errors.includes('surname')}
                            className={styles.input}
                            label='Фамилия'
                            placeholder='Фамилия'
                            name='surname'
                            value={getValue('surname')}
                            onChange={e => onChange(e.target.value, 'surname')}
                        />
                    </div>

                    <div className={styles.formItem}>
                        <Input
                            required={requiredInputs.includes('name')}
                            isMistake={errors.includes('name')}
                            className={styles.input}
                            label='Имя'
                            placeholder='Имя'
                            name='name'
                            value={getValue('name')}
                            onChange={e => onChange(e.target.value, 'name')}
                        />
                    </div>

                    <div className={styles.formItem}>
                        <Input
                            required={requiredInputs.includes('middle_name')}
                            isMistake={errors.includes('middle_name')}
                            className={styles.input}
                            label='Отчество'
                            placeholder='Отчество'
                            name='middle_name'
                            value={getValue('middle_name')}
                            onChange={e => onChange(e.target.value, 'middle_name')}
                        />
                    </div>

                </div>

                <div className={styles.formItem}>
                    <Input
                        phone={true}
                        required={requiredInputs.includes('phone')}
                        isMistake={errors.includes('phone')}
                        className={styles.input}
                        label='Телефон'
                        placeholder='Телефон'
                        name='phone'
                        value={getValue('phone')}
                        onChange={e => onChange(e.target.value, 'phone')}
                    />
                </div>

                <div className={styles.formItem}>
                    <Input
                        required={requiredInputs.includes('email')}
                        isMistake={errors.includes('email')}
                        className={styles.input}
                        label='Email'
                        placeholder='Email'
                        name='email'
                        value={getValue('email')}
                        onChange={e => onChange(e.target.value, 'email')}
                    />
                </div>

                <div className={styles.formItem}>
                    <Input
                        required={requiredInputs.includes('password')}
                        isMistake={errors.includes('password')}
                        className={styles.input}
                        label='Пароль'
                        placeholder='Пароль'
                        name='password'
                        type='password'
                        value={getValue('password')}
                        onChange={e => onChange(e.target.value, 'password')}
                        showPass={showPass}
                        setShowPass={setShowPass}
                    />
                </div>

                <div className={styles.formItem}>
                    <Input
                        required={requiredInputs.includes('password_r')}
                        isMistake={errors.includes('password_r') || !confirmPass}
                        className={styles.input}
                        label='Подтвердите пароль'
                        placeholder='Подтвердите пароль'
                        name='password_r'
                        type='password'
                        value={getValue('password_r')}
                        onChange={checkConfirmPass}
                        showPass={showPass}
                        setShowPass={setShowPass}
                    />
                </div>

                <div className={styles.agreementWrap}>
                    <div className={styles.agreement}>
                        <div onClick={() => setCompare({...compare, isAgreed: !compare.isAgreed})}>
                            {compare.isAgreed && <img src='./assets/StartPage/tick.svg' alt='tick' />}
                        </div>
                    </div>
                    <div className={styles.agreementsText}>
                        Я принимаю<span> Условия использования </span> 4Hub
                        <span> Политику конфиденциальности</span> и
                        <span> Политику интелектуальной собственности</span>
                    </div>
                </div>

                <div className={styles.actionBlock}>
                    <button
                        type='button'
                        onClick={backStep}
                        className={styles.roundBtn}
                    >
                        <img src={arrowImg} alt="Arrow"/>
                    </button>
                    <button type='submit' className={styles.submitBtn}>
                        Сохранить и продолжить
                    </button>
                </div>

            </form>

        </div>
    );
};

export default AdminForm;