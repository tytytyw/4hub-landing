import React from 'react';
import styles from './SuccessPopup.module.sass'
import Popup from '../../../../../generalComponents/PopUp'
import timesImg from '../../../../../assets/BusinessCabinet/times.svg'
import successImg from '../../../../../assets/BusinessCabinet/WelcomePage/success.svg'
import {useLocales} from "react-localized";

const SuccessPopup = ({title = '', text = '', buttonText, set}) => {
    const { __ } = useLocales();
    if (!buttonText) {
        buttonText = __('Готово')
    }

    return (
        <Popup set={set}>
            <div className={styles.wrapper}>
                <div className={styles.contentWrapper}>
                    <img onClick={set} className={styles.close} src={timesImg} alt="Close"/>
                    <div className={styles.header}>
                        <h4 className={styles.title}>
                            {title}
                        </h4>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.successBlock}>
                            <img src={successImg} alt="Success icon"/>
                        </div>
                        <p className={styles.text}>
                            {text}
                        </p>
                        <div className={styles.actionBlock}>
                            <button onClick={set} className={styles.completeBtn}>
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default SuccessPopup;