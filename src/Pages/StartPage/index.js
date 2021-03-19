import React, {useState} from 'react';

import styles from './StartPage.module.sass';
import { ReactComponent as InfoIcon } from '../../assets/StartPage/info.svg';
import { ReactComponent as ArrowIcon } from '../../assets/StartPage/arrow-point.svg';
import Intro from './Components/Intro';
import UploadFile from './Components/UploadFile';

const StartPage = () => {

    const [pageOption, setPage] = useState('sendFile');

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <InfoIcon className={`${styles.listItem} ${styles.info}`} />
                <div className={`${styles.listItem} ${styles.arrow}`}>
                    <span className={styles.lang}>RU</span>
                    <ArrowIcon className={styles.arrowDown} />
                </div>
                <div className={styles.listItem}>Вход</div>
                <div className={`${styles.registerButton} ${styles.listItem}`}>Регистрация</div>
            </header>
            <main className={styles.main}>
                {pageOption === 'init' && <Intro setPage={setPage} />}
                {pageOption === 'sendFile' && <UploadFile />}
            </main>
        </div>
    )
};

export default StartPage;