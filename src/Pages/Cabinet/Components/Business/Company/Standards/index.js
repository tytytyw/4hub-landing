import React, {useRef, useState} from 'react'
import styles from "../Verification/Verification.module.sass";
import {ReactComponent as CaseIcon} from "../../../../../../assets/BusinessCabinet/case.svg";
import ViewStandarts from "./view";

const Standards = ({setPageOption}) => {

    const [success, setSuccess] = useState(false)

    const labelRef = useRef()
    const upload = () => {
        labelRef.current.click()
    }

    return (
        <>
            {success ?
                <ViewStandarts/> :
                <div className={styles.centeredWrapper}>

                    <div className={styles.wrapper}>

                        <div className={styles.header}>
                            <CaseIcon className={styles.icon}/>
                            <p>Стандарты компании</p>
                        </div>

                        <div className={styles.infoBlock}>
                            <p className={styles.labelText}>Добавьте документ стандарты компании</p>
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
                            <button onClick={() => setSuccess(true)}>
                                Подтвердить
                            </button>
                        </div>

                    </div>

                </div>}
        </>
    )
}

export default Standards