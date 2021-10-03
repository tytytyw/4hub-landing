import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';

import api from '../../../api';
import { onLog } from '../../../Store/actions/startPageAction';
import styles from './EnterProfile.module.sass';

const EnterProfile = ({setPage}) => {

    const dispatch = useDispatch();
    const [visibility, setVisibility] = useState('password');
    const [info, setInfo] = useState({login: '', pass: ''});
    const [compare, setCompare] = useState({isLogin: false, isPass: false});
    const [enterType, setEnterType] = useState('main')

    const checkLogin = (input) => {
        if(input.value[0] === '+') {
            /^\d+$/.test(input.value.slice(1))
                ? setCompare({...compare, isLogin: false})
                : setCompare({...compare, isLogin: true});
        } else {
            input.value.indexOf('@') > -1
                ? setCompare({...compare, isLogin: false})
                : setCompare({...compare, isLogin: true});
        }
    };

    const checkPass = (input) => {
        input.value === ''
            ? setCompare({...compare, isPass: true})
            : setCompare({...compare, isPass: false})
    };

    const signIn = () => {
        if(info.login && info.pass) {
            api.post(`/ajax/user_login.php?name=${info.login}&pass=${info.pass}`)
                .then(res => {
                    if(res.data.ok === 1) {
                        dispatch(onLog(res.data))
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className={styles.main}>
            <img className={styles.hubIcon} src='./assets/StartPage/4HUB.svg' alt='4HUB' onClick={() => setPage('init')} />
            <div className={styles.enterWrap}>
                <span className={styles.cross} onClick={() => setPage('init')} />
                <span className={styles.title}>Вход</span>

                <div className={styles.buttonsGroup}>
                    <button
                        className={classnames({
                            [styles.toggleBtn]: true,
                            [styles.active]: enterType === 'main'
                        })}
                        onClick={() => setEnterType('main')}
                    >4Hub</button>
                    <button
                        className={classnames({
                            [styles.toggleBtn]: true,
                            [styles.active]: enterType === 'business'
                        })}
                        onClick={() => setEnterType('business')}
                    >4Hub (business)</button>
                </div>

                <div className={`${styles.inputWrap} ${styles.marginWrap}`}>
                    <label className={styles.inputName} htmlFor='login'>
                        Email / Телефон
                        {compare.isLogin && <span> Некорректный ввод данных</span>}
                    </label>
                    <input
                        className={classnames({
                            [styles.inputField]: true,
                            [styles.redBorder]: compare.isLogin,
                            [styles.login]: true
                        })}
                        type='text'
                        id='login'
                        value={info.login}
                        onChange={(e) => {
                            setInfo({...info, login: e.target.value});
                        }}
                        onBlur={e => checkLogin(e.target)}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.inputName} htmlFor='pass'>
                        Пароль
                        {compare.isPass && <span> Некорректный ввод данных</span>}
                    </label>
                    <input
                        className={classnames({
                            [styles.inputField]: true,
                            [styles.redBorder]: compare.isPass
                        })}
                        type={visibility}
                        id='pass'
                        value={info.pass}
                        onChange={(e) => {
                            setInfo({...info, pass: e.target.value});
                            checkPass(e.target);
                        }}
                    />
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
                <div
                    className={styles.remindPassword}
                    onClick={() => setPage('forgotPassword')}
                >Забыли пароль?</div>
                <div className={styles.button} onClick={signIn}>Вход</div>
                <span className={styles.orSpan}>или</span>
                <div className={styles.socialNetworks}>
                    <div className={styles.linkedIn}><img src='./assets/StartPage/linkedIn.svg' alt='lIn' /></div>
                    <div className={styles.facebook}><img src='./assets/StartPage/fb.svg' alt='fb' /></div>
                    <div className={styles.twitter}><img src='./assets/StartPage/twitter.svg' alt='twit' /></div>
                    <div className={styles.google}><img src='./assets/StartPage/google.svg' alt='goog' /></div>
                    <div className={styles.pinterest}><img src='./assets/StartPage/pinterest.svg' alt='p' /></div>
                    <div className={styles.vk}><img src='./assets/StartPage/vk.svg' alt='vk' /></div>
                </div>
                <div className={styles.registration}>У Вас нет аккаунта ?
                    <span onClick={() => setPage('register')}> Регистрация</span>
                </div>
            </div>
        </div>
    )
};

export default EnterProfile;
