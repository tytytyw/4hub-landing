import React, { useState } from 'react';
import classnames from 'classnames';

import api from '../../../api';
import styles from './RenewPassword.module.sass';
import Error from '../../../generalComponents/Error';
import Success from '../../../generalComponents/Success';

const RenewPassword = ({setPage}) => {
    const [visibilityFirst, setVisibilityFirst] = useState('password');
    const [visibilitySecond, setVisibilitySecond] = useState('password');
    const [info, setInfo] = useState({pass: '', repeatPass: ''});
    const [compare, setCompare] = useState({isPass: false, isCoincidePass: false});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('Упс.... что-то пошло не так. Попробуй еще раз!');

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
        if(!compare.isPass && !compare.isCoincidePass && info.pass && info.repeatPass) {
            const mSuccess = 'В целях безопасности, на Email Вашей учетной записи отправлено подтверждение этого изменения';
            setMessage(mSuccess);
            setSuccess(true);
            api.post(`/ajax/123`)
                .then(res => {
                    // if(res.data.ok === 1) {
                    //     setPage('registerSuccess');
                    // } else {
                    //     res.data.error
                    //         ? setErrorMessage(res.data.error)
                    //         : setErrorMessage('Упс.... что-то пошло не так. Попробуй еще раз!');
                    //     setError(true);
                    // }
                })
                // .catch(err => {
                //     console.log(err);
                //     setMessage(err);
                //     setError(true);
                // });
        }
    };

    return (
        <>
            <div className={styles.main}>
                <img className={styles.hubIcon} src='./assets/StartPage/4HUB.svg' alt='4HUB' onClick={() => setPage('init')} />
                <div className={styles.renewWrap}>
                    <span className={styles.cross} onClick={() => setPage('init')} />
                    <span className={styles.title}>Обновите пароль</span>
                    <div className={styles.inputWrap}>
                        <label className={styles.inputName}>
                            Пароль
                            {compare.isPass && <span> Некорректный ввод данных</span>}
                        </label>
                        <input
                            className={classnames({
                                [styles.inputField]: true,
                                [styles.redBorder]: compare.isPass
                            })}
                            type={visibilityFirst}
                            value={info.pass}
                            onChange={(e) => {
                                setInfo({...info, pass: e.target.value});
                                checkPass(e.target);
                            }}
                        />
                        {visibilityFirst === 'password' && <img
                            src='./assets/StartPage/invisible.svg'
                            alt='eye'
                            className={styles.invisible}
                            onClick={() => setVisibilityFirst('text')}
                        />}
                        {visibilityFirst === 'text' && <img
                            src='./assets/StartPage/eye.svg'
                            alt='eye'
                            className={styles.eye}
                            onClick={() => setVisibilityFirst('password')}
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
                            type={visibilitySecond}
                            value={info.repeatPass}
                            onChange={(e) => {
                                setInfo({...info, repeatPass: e.target.value});
                                comparePass(e.target.value);
                            }}
                        />
                        {visibilitySecond === 'password' && <img
                            src='./assets/StartPage/invisible.svg'
                            alt='eye'
                            className={styles.invisible}
                            onClick={() => setVisibilitySecond('text')}
                        />}
                        {visibilitySecond === 'text' && <img
                            src='./assets/StartPage/eye.svg'
                            alt='eye'
                            className={styles.eye}
                            onClick={() => setVisibilitySecond('password')}
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
                set={setSuccess}
                message={message}
                title='Ваш пароль обновлён'
            />}
        </>
    )
}

export default RenewPassword;
