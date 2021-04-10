import React from 'react';

import styles from './Success.module.sass';
import PopUp from '../PopUp';

const Success = ({success, set, message, title}) => {
    return (
        <>
            {success && <PopUp set={set}>
                <div className={styles.successWrap}>
                    <span className={styles.cross} onClick={() => set(false )} />
                    <span className={styles.title}>{title}</span>
                    <div>
                        <img
                            src='./assets/StartPage/tv.svg'
                            alt='img'
                        />
                        <img
                            src='./assets/StartPage/check.svg'
                            alt='img'
                            className={styles.check}
                        />
                    </div>
                    <div className={styles.infoSuccess}>
                        <span>{message}</span>
                    </div>
                    <div className={styles.button} onClick={() => set(false)}>Продолжить</div>
                </div>
            </PopUp>}
        </>
    )
}

export default Success;
