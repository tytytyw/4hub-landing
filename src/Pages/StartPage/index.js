import React, {useState, useEffect} from 'react';

import styles from './StartPage.module.sass';
import { ReactComponent as InfoIcon } from '../../assets/StartPage/info.svg';
import { ReactComponent as ArrowIcon } from '../../assets/StartPage/arrow-point.svg';
import Intro from './Components/Intro';
import UploadFile from './Components/UploadFile';
import Infopage from './Components/InfoPage';
import DownloadFile from './Components/DownloadFile';
import EnterProfile from './Components/EnterProfile';
import RegisterProfile from './Components/RegisterProfile/index';
import ForgotPassword from './Components/ForgotPassword';
import RenewPassword from './Components/RenewPassword';
import Landing from './Components/Landing/Landing'
import DownloadFolder from "./Components/DownloadFolder";

const StartPage = ({setOptions}) => {

    const [pageOption, setPage] = useState('init');
    const [loader, setLoader] = useState(false);
    const minHeight = window.outerWidth >= 1440 ? window.outerHeight * 0.85 : window.outerHeight * 0.75;

    useEffect(() => {
        if(/action=download&fid/.test(window.location.search)) {
            setPage('downloadFile');
        }
        if(/action=pass_remember/.test(window.location.search)) {
            setPage('renewPassword');
        }
        if(/action=forder/.test(window.location.search)) {
            setPage('downloadFolder');
        }
        }, []);

    return (
        <div
            className={`${styles.wrapper} ${pageOption === 'info' && styles.longWrap} ${pageOption === 'landing' && styles.longWrap}`}
            style={{minHeight}}
        >
            <header className={styles.header}>
                {pageOption === 'landing' &&
                <a className={styles.logo} href="./">
                    <img className={styles.logo_img} src='../../assets/StartPage/logo.svg' alt='4hub logo'></img>
                </a>}
                <InfoIcon className={`${styles.listItem} ${styles.info}`} onClick={() => setPage('info')} />
                <div className={`${styles.listItem} ${styles.arrow}`}>
                    <span className={styles.lang}>RU</span>
                    <ArrowIcon className={styles.arrowDown} />
                </div>
                <div className={styles.listItem} onClick={() => setPage('enter')}>Вход</div>
                <div className={`${styles.registerButton} ${styles.listItem}`} onClick={() => setPage('register')}>Регистрация</div>
            </header>
            <main className={styles.main}>
                {pageOption === 'init' && <Intro setPage={setPage} setOptions={setOptions} />}
                {pageOption === 'sendFile' && <UploadFile setPage={setPage} />}
                {pageOption === 'develop' && <div className={styles.main}>
                    <img className={styles.hubIcon} src='./assets/StartPage/4HUB.svg' alt='4HUB' />
                    <div style={{fontSize: '5vw', margin: '3vw 0'}}>Cтраница в разработке</div>
                    <div className={styles.buttonBack} onClick={() => setPage('init')}> Назад на главную</div>
                </div>}
                {pageOption === 'landing' && <Landing />}
                {pageOption === 'info' && <Infopage setPage={setPage} />}
                {pageOption === 'downloadFile' && <DownloadFile setPage={setPage} />}
                {pageOption === 'downloadFolder' && <DownloadFolder setPage={setPage} setOptions={setOptions} loader={loader} setLoader={setLoader} />}
                {pageOption === 'enter' && <EnterProfile setPage={setPage} />}
                {(pageOption === 'register' || pageOption === 'registerSuccess') && <RegisterProfile setPage={setPage} pageOption={pageOption} />}
                {pageOption === 'forgotPassword' && <ForgotPassword setPage={setPage} />}
                {pageOption === 'renewPassword' && <RenewPassword setPage={setPage} />}
            </main>
        </div>
    )
};

export default StartPage;
