import React, {useRef} from 'react';

import styles from './Verification.module.sass'
import {ReactComponent as SuccessImg} from "../../../../../../assets/BusinessCabinet/WelcomePage/success.svg";

const Verification = ({setPageOption}) => {

    const labelRef = useRef()
    const upload = () => {
        labelRef.current.click()
    }

    return (
        <div className={styles.centeredWrapper}>

            <div className={styles.wrapper}>

                <div className={styles.header}>
                    <SuccessImg className={styles.icon}/>
                    <p>Верефикация компании</p>
                </div>

                <div className={styles.infoBlock}>
                    <p className={styles.labelText}>Фото выписки с ЕДР</p>
                    <div
                        onClick={upload}
                        className={styles.uploadBlock}
                    >
                        <p onClick={e => e.stopPropagation()} className={styles.uploadText}>
                            Перетащите сюда фото или
                            <label ref={labelRef} htmlFor='Verification-upload'> Загрузите</label>
                        </p>
                        <input id='Verification-upload' type="file"/>
                    </div>

                </div>

                <div className={styles.actionBlock}>
                    <button className={styles.cancelBtn}>Отмена</button>
                    <button onClick={() => setPageOption('welcome')}>
                        Подтвердить
                    </button>
                </div>

            </div>

        </div>
    );
};

export default Verification;