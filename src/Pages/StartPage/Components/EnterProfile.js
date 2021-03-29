import React, { useState } from 'react';

import styles from './EnterProfile.module.sass';

const EnterProfile = ({setPage}) => {

    const [visibility, setVisibility] = useState('password')

    return (
        <div className={styles.main}>
            <img className={styles.hubIcon} src='./assets/StartPage/4HUB.svg' alt='4HUB' onClick={() => setPage('init')} />
            <div className={styles.enterWrap}>
                <span className={styles.cross} onClick={() => setPage('init')} />
                <span className={styles.title}>Вход</span>
                <div className={`${styles.inputWrap} ${styles.marginWrap}`}>
                    <label className={styles.inputName}>Email / Телефон</label>
                    <input className={styles.inputField} type='text' />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.inputName}>Пароль</label>
                    <input className={styles.inputField} type={visibility} />
                    {visibility === 'password' && <img
                        src='./assets/StartPage/invisible.svg'
                        alt='eye'
                        className={styles.invisible}
                        onClick={() => setVisibility('text')}
                    />}
                    {visibility === 'text' && <img
                        src='./assets/StartPage/eye.svg'
                        alt='eye'
                        className={styles.eye}
                        onClick={() => setVisibility('password')}
                    />}
                </div>
                <div className={styles.remindPassword}>Забыли пароль?</div>
                <div className={styles.button}>Вход</div>
                <span className={styles.orSpan}>или</span>
                <div className={styles.socialNetworks}>
                    <div className={styles.facebook}><img src='./assets/StartPage/fb.svg' alt='fb' /></div>
                    <div className={styles.twitter}><img src='./assets/StartPage/twitter.svg' alt='twit' /></div>
                    <div className={styles.google}><img src='./assets/StartPage/google.svg' alt='goog' /></div>
                    <div className={styles.linkedIn}><img src='./assets/StartPage/linkedIn.svg' alt='lIn' /></div>
                    <div className={styles.vk}><img src='./assets/StartPage/vk.svg' alt='vk' /></div>
                    <div className={styles.pinterest}><img src='./assets/StartPage/pinterest.svg' alt='p' /></div>
                </div>
                <div className={styles.registration}>У Вас нет аккаунта ?
                    <span onClick={() => setPage('register')}> Регистрация</span>
                </div>
            </div>
        </div>
    )
};

export default EnterProfile;
