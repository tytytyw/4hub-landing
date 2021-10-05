import React, {useEffect, useState} from 'react';
import classnames from 'classnames';

import api from '../../../api';
import styles from './RenewPassword.module.sass';
import Error from '../../../generalComponents/Error';
import Success from '../../../generalComponents/Success';
import {imageSrc} from '../../../generalComponents/globalVariables';

const RenewPassword = ({setPage}) => {

    const [visibility, setVisibility] = useState('password');
    const [info, setInfo] = useState({pass: '', repeatPass: ''});
    const [compare, setCompare] = useState({isPass: false, isCoincidePass: false});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('Упс.... что-то пошло не так. Попробуй еще раз!');
    const [userInfo, setUserInfo] = useState({confirm: '', login: ''});

    useEffect(() => {
        const confirm = window.location.search.match(/confirm_pass=\d*/)[0].split('=')[1];
        const login = window.location.search.match(/name=.*/)[0].split('=')[1];
        setUserInfo({...userInfo, confirm, login});
        return () => window.history.pushState('', '', "/");
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const checkPass = (input) => {
        input.value === ''
            ? setCompare({...compare, isPass: true})
            : setCompare({...compare, isPass: false})
    };

    const comparePass = (val) => {
        const pass = info.pass.split('');
        const passRepeat = val.split('');
        let boolean = false
        passRepeat.forEach((el, i) => {if(el !== pass[i]) boolean = true});
        setCompare({...compare, isCoincidePass: boolean});
    }

    const sendRequest = () => {
        const isFilled = !compare.isPass && !compare.isCoincidePass && info.pass && info.repeatPass && userInfo.confirm && userInfo.login;
        if(isFilled) {
            api.post(`/ajax/user_pass_renew.php?name=${userInfo.login}&pass=${info.pass}&confirm_pass=${userInfo.confirm}`)
                .then(res => {
                    if(res.data.ok === 1) {
                        setMessage('Пароль успешно обновлен');
                        setSuccess(true);
                    } else {
                        setMessage(res.data.toString());
                        setError(true);
                    }
                })
                .catch(err => {
                    setMessage(err.toString());
                    setError(true);
                });
        }
    };

    const backToEnterProfile = (boolean) => {
        setSuccess(boolean);
        setPage('enter');
    }

    return (
        <>
            <div className={styles.main}>
                <img className={styles.hubIcon} src={imageSrc + 'assets/StartPage/4HUB.svg'} alt='4HUB' onClick={() => setPage('init')} />
                <div className={styles.renewWrap}>
                    <span className={styles.cross} onClick={() => setPage('init')} />
                    <span className={styles.title}>Обновите пароль</span>
                    <div className={styles.inputWrap}>
                        <label className={styles.inputName}>
                            Новый пароль
                            {compare.isPass && <span> Некорректный ввод данных</span>}
                        </label>
                        <input
                            className={classnames({
                                [styles.inputField]: true,
                                [styles.redBorder]: compare.isPass
                            })}
                            type={visibility}
                            value={info.pass}
                            onChange={(e) => {
                                setInfo({...info, pass: e.target.value});
                                checkPass(e.target);
                            }}
                        />
                        {visibility === 'password' && <img
                            src={imageSrc + 'assets/StartPage/invisible.svg'}
                            alt='eye'
                            className={styles.invisible}
                            onClick={() => setVisibility('text')}
                        />}
                        {visibility === 'text' && <img
                            src={imageSrc + 'assets/StartPage/eye.svg'}
                            alt='eye'
                            className={styles.eye}
                            onClick={() => setVisibility('password')}
                        />}
                    </div>
                    <div className={styles.inputWrap}>
                        <label className={styles.inputName}>
                            Повторите пароль
                            {compare.isCoincidePass && <span> Некорректный ввод данных</span>}
                        </label>
                        <input
                            className={classnames({
                                [styles.inputField]: true,
                                [styles.redBorder]: compare.isCoincidePass
                            })}
                            type={visibility}
                            value={info.repeatPass}
                            onChange={(e) => {
                                setInfo({...info, repeatPass: e.target.value});
                                comparePass(e.target.value);
                            }}
                        />
                        {visibility === 'password' && <img
                            src={imageSrc + 'assets/StartPage/invisible.svg'}
                            alt='eye'
                            className={styles.invisible}
                            onClick={() => setVisibility('text')}
                        />}
                        {visibility === 'text' && <img
                            src={imageSrc + 'assets/StartPage/eye.svg'}
                            alt='eye'
                            className={styles.eye}
                            onClick={() => setVisibility('password')}
                        />}
                    </div>
                    <div className={styles.button} onClick={() => sendRequest()}>Готово</div>
                </div>
            </div>
            {error && <Error
                error={error}
                set={setError}
                message={message}
            />}
            {success && <Success
                success={success}
                set={backToEnterProfile}
                message={message}
                title='Ваш пароль обновлён'
            />}
        </>
    )
}

export default RenewPassword;
