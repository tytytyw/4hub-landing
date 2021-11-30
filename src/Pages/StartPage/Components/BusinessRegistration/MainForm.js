import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'
import styles from "./BusinessRegistration.module.sass";
import Input from "../../../Cabinet/Components/MyProfile/Input";
import Select from "./Select";
import {useValidateForm} from "./validation";

const requiredInputs = [
    'company_name'
]

const MainForm = ({mainFields, setMainFields, setStep, compare, setCompare}) => {
    const userInfo = useSelector(state => state.user.userInfo)

    const {
        fields,
        setFields,
        errors,
        onChange,
        checkErrors
    } = useValidateForm({ emp_num: 100, activity_field: '' }, requiredInputs)

    useEffect(() => {
        if (mainFields?.main) {
            setFields(mainFields?.main)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (userInfo) onChange(userInfo.id_company, 'company_name')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    const onSubmit = event => {
        event.preventDefault()

        if (checkErrors()) {
            setMainFields({...mainFields, main: fields})
            setStep('admin')
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
                                {id: 10, text: 'менее 10'},
                                {id: 50, text: 'менее 50'},
                                {id: 100, text: 'менее 100'},
                            ]}
                            placeholder='менее 50'
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

export default MainForm;