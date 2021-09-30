import React, {useState} from 'react';
import styles from './BusinessRegistration.module.sass';
import AdminForm from "./AdminForm";
import MainForm from "./MainForm";
import SuccessCreated from "./SuccessCreated";

const BusinessRegistration = () => {

    const [compare, setCompare] = useState({isLogin: false, isPass: false, isCoincidePass: false, isAgreed: false, isСompany: false});
    const [mainFields, setMainFields] = useState({})
    const [step, setStep] = useState('main')

    return (
        <div className={styles.wrapper}>

            <main className={styles.main}>

                {/*<div className={styles.mainTitle}>

                    <div className={styles.logoTitle}>
                        <img src="../../assets/StartPage/logo.svg" alt=""/>
                        <span>(business)</span>
                    </div>

                </div>*/}

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