import React, {useState} from 'react';
import styles from './BusinessRegistration.module.sass';
import {ReactComponent as InfoIcon} from "../../../../assets/StartPage/info.svg";
import {ReactComponent as ArrowIcon} from "../../../../assets/StartPage/arrow-point.svg";
import AdminForm from "./AdminForm";
import MainForm from "./MainForm";
import SuccessCreated from "./SuccessCreated";

const BusinessRegistration = () => {

    const [page, setPage] = useState('init')
    const [compare, setCompare] = useState({isLogin: false, isPass: false, isCoincidePass: false, isAgreed: false, isСompany: false});
    const [mainFields, setMainFields] = useState({})
    const [step, setStep] = useState('complete')

    console.log(page)

    return (
        <div className={styles.wrapper}>

            <header className={styles.header}>
                <InfoIcon className={`${styles.listItem} ${styles.info}`} onClick={() => setPage('info')} />
                <div className={`${styles.listItem} ${styles.arrow}`}>
                    <span className={styles.lang}>RU</span>
                    <ArrowIcon className={styles.arrowDown} />
                </div>
                <div className={styles.listItem} onClick={() => setPage('enter')}>Вход</div>
                <div className={`${styles.registerButton} ${styles.listItem}`} onClick={() => setPage('register')}>Регистрация</div>
            </header>

            <main className={styles.main}>

                <div className={styles.mainTitle}>

                    <div className={styles.logoTitle}>
                        <img src="../../assets/StartPage/logo.svg" alt=""/>
                        <span>(business)</span>
                    </div>

                </div>

                {step === 'main' &&
                <MainForm
                    compare={compare}
                    setCompare={setCompare}
                    mainFields={mainFields}
                    setMainFields={setMainFields}
                    setStep={setStep}
                />}

                {step === 'admin' &&
                <AdminForm
                    compare={compare}
                    setCompare={setCompare}
                    mainFields={mainFields}
                    setMainFields={setMainFields}
                    setStep={setStep}
                />}

                {step === 'complete' &&
                <SuccessCreated
                    mainFields={mainFields}
                    setMainFields={setMainFields}
                    setStep={setStep}
                />}

            </main>

        </div>
    );
};

export default BusinessRegistration;