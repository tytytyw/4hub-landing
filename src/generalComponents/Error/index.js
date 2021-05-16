import React from 'react';

import styles from './Error.module.sass';
import PopUp from '../PopUp';

const Error = ({error, set, message}) => {
    return (
        <>
            {error && <PopUp set={set}>
                <div className={styles.errorWrap}>
                    <span className={styles.cross} onClick={() => set(false )} />
                    <span className={styles.title}>Ошибка</span>
                    <div>
                        <img
                            src='./assets/StartPage/tv.svg'
                            alt='img'
                         />
                        <img
                            src='./assets/StartPage/warning.svg'
                            alt='img'
                            className={styles.warning}
                        />
                    </div>
                    <div className={styles.infoError}>
                        <span>{message}</span>
                    </div>
                    <div className={styles.button} onClick={() => set(false)}>Закрыть</div>
                </div>
            </PopUp>}
        </>
    )
}

export default Error;
