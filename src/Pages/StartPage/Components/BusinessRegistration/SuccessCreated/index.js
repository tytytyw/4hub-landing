import React, {useEffect} from 'react';
import styles from './SuccessCreated.module.sass'
import {useDispatch} from 'react-redux'
import {onGetUserInfo} from "../../../../../Store/actions/startPageAction";
import { useLocales } from 'react-localized';

import timesImg from '../../../../../assets/BusinessCabinet/times.svg'
import successImg from '../../../../../assets/BusinessCabinet/WelcomePage/success.svg'

const SuccessCreated = ({set}) => {

    const { __ } = useLocales()

    const toBusiness = () => {
        set(false)
    }
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(onGetUserInfo())
        }
    }, [])//eslint-disable-line

    return (
        <div className={styles.wrapper}>

            <div className={styles.contentWrapper}>

                <img onClick={toBusiness} className={styles.close} src={timesImg} alt="Close"/>

                <div className={styles.header}>
                    <h4 className={styles.title}>{ __('Регистрация прошла успешно') }</h4>
                </div>

                <div className={styles.content}>

                    <div className={styles.successBlock}>
                        <img src={successImg} alt="Success icon"/>
                    </div>

                    <p className={styles.text}>
                        { __(`Письмо подтверждения регистрации отправлено на Ваш email. 
                        Будьте добры перейти по ссылке для завершения${<br/>} процесса регистрации`) }
                    </p>

                    <p className={styles.info}>
                        Не пришло письмо ?
                        <span className={styles.resend}>{ __('Отправить заново') }</span>
                    </p>

                    <div className={styles.actionBlock}>
                        <button
                            onClick={toBusiness}
                            className={styles.completeBtn}
                        >
                            { __('Готово') }
                        </button>
                    </div>

                </div>



            </div>

        </div>
    );
};

export default SuccessCreated;