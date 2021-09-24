import React, {useState} from 'react';
import styles from "../BusinessRegistration.module.sass";
import Input from "../../../../Cabinet/Components/MyProfile/Input";
import Select from "../Select";
import {useValidateForm} from "../validation";

const requiredInputs = [
    'company_name'
]

const FirstStep = ({mainFields, setMainFields, setStep}) => {

    const [compare, setCompare] = useState({isLogin: false, isPass: false, isCoincidePass: false, isAgreed: false, isСompany: false});

    const {
        fields,
        errors,
        onChange,
        checkErrors
    } = useValidateForm({ emp_num: 2 }, requiredInputs)

    const onSubmit = event => {
        event.preventDefault()

        if (checkErrors()) {
            console.log('success submit')
        }
    }

    const getValue = name => fields?.[name] || ''

    return (
        <div className={styles.formWrap}>

            <h4 className={styles.formTitle}>Общее</h4>

            <form noValidate onSubmit={onSubmit}>

                <div className={styles.formItem}>
                    <Input
                        required={requiredInputs.includes('company_name')}
                        isMistake={errors.includes('company_name')}
                        className={styles.input}
                        label='Название компании'
                        placeholder='ООО Компании'
                        name='company_name'
                        value={getValue('company_name')}
                        onChange={e => onChange(e.target.value, 'company_name')}
                    />
                </div>

                <div className={styles.formItem}>
                    <label className={styles.label}>Количество сотрудников в компании</label>
                    <div className={styles.selectWrap}>
                        <Select
                            data={[
                                {id: 1, text: 'Более 30'},
                                {id: 2, text: 'Более 40'},
                                {id: 3, text: 'Более 50'},
                            ]}
                            className={styles.select}
                            classNameSelect={styles.selectValue}
                            placeholder='Более 50'
                            initValue={getValue('emp_num')}
                            onChange={value => onChange(value, 'emp_num')}
                        />
                    </div>
                </div>

                <div className={styles.formItem}>
                    <Input
                        className={styles.input}
                        label='Сфера деятельности'
                        placeholder='IT'
                        name='activity_field'
                        value={getValue('activity_field')}
                        onChange={e => onChange(e.target.value, 'activity_field')}
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
                    <button className={styles.submitBtn}>
                        Сохранить и продолжить
                    </button>
                </div>

            </form>

        </div>
    );
};

export default FirstStep;