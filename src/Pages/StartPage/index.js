import React, {useState, useEffect} from 'react';

import styles from './StartPage.module.sass';
import { ReactComponent as InfoIcon } from '../../assets/StartPage/info.svg';
import { ReactComponent as ArrowIcon } from '../../assets/StartPage/arrow-point.svg';
import Intro from './Components/Intro';
import UploadFile from './Components/UploadFile';
import Infopage from './Components/InfoPage';
import DownloadFile from './Components/DownloadFile';
import EnterProfile from './Components/EnterProfile';
import RegisterProfile from './Components/RegisterProfile';
import RegistrationSuccess from './Components/RegistrationSuccess';

const StartPage = () => {

    const [pageOption, setPage] = useState('registerSuccess');

    useEffect(() => {
        if(/action=download&fid/.test(window.location.search)) {
            setPage('downloadFile');
        }
        }, []);

    return (
        <div className={`${styles.wrapper} ${pageOption === 'info' && styles.longWrap}`}>
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
                {pageOption === 'init' && <Intro setPage={setPage} />}
                {pageOption === 'sendFile' && <UploadFile setPage={setPage} />}
                {pageOption === 'develop' && <div className={styles.main}>
                    <img className={styles.hubIcon} src='./assets/StartPage/4HUB.svg' alt='4HUB' />
                    <div style={{fontSize: '5vw', margin: '3vw 0'}}>Cтраница в разработке</div>
                    <div className={styles.buttonBack} onClick={() => setPage('init')}> Назад на главную</div>
                </div>}
                {pageOption === 'info' && <Infopage setPage={setPage} />}
                {pageOption === 'downloadFile' && <DownloadFile setPage={setPage} />}
                {pageOption === 'enter' && <EnterProfile setPage={setPage} />}
                {pageOption === 'register' && <RegisterProfile setPage={setPage} />}
                {pageOption === 'registerSuccess' && <RegistrationSuccess setPage={setPage} />}
            </main>
        </div>
    )
};

export default StartPage;
