import React from 'react';

import styles from './SuccessPopup.module.sass'
import PopUp from "../../../../../generalComponents/PopUp";

const SuccessPopup = ({set, title, children}) => {

    return (
        <PopUp set={set}>
            <div className={styles.wrapper}>

                <div className={styles.header}>
                    <p>{title}</p>
                </div>

                <div className={styles.content}>
                    {children}
                </div>

                <div className={styles.actionBlock}>
                    <button
                        onClick={() => set(false)}
                        className={styles.actionBtn}
                    >
                        Готово
                    </button>
                </div>

            </div>
        </PopUp>
    )
}

export default SuccessPopup