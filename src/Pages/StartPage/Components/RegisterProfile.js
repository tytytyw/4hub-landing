import React, { useState } from 'react';
import classnames from 'classnames';

import api from '../../../api';
import styles from './RegisterProfile.module.sass';
import RegistrationSuccess from "./RegistrationSuccess";
import PopUp from "../../../generalComponents/PopUp";

const RegisterProfile = ({setPage, pageOption}) => {

    const [visibilityFirst, setVisibilityFirst] = useState('password');
    const [visibilitySecond, setVisibilitySecond] = useState('password');
    const [info, setInfo] = useState({login: '', pass: '', repeatPass: ''});
    const [compare, setCompare] = useState({isLogin: false, isPass: false, isCoincidePass: false, isAgreed: false});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Упс.... что-то пошло не так. Попробуй еще раз!')

    const checkLogin = (input) => {
        input.value.indexOf('@') > -1
        ? setCompare({...compare, isLogin: false})
        : setCompare({...compare, isLogin: true});
    };

    const checkPass = (input) => {
        input.value === ''
        ? setCompare({...compare, isPass: true})
        : setCompare({...compare, isPass: false})
    };

    const comparePass = (val) => {
        return info.pass === val
            ? setCompare({...compare, isCoincidePass: false})
            : setCompare({...compare, isCoincidePass: true});
    }

    const sendRequest = () => {
      if(!compare.isLogin && !compare.isPass && !compare.isCoincidePass && compare.isAgreed) {
            api.post(`/ajax/user_reg.php?name=${info.login}&pass=${info.pass}`)
                .then(res => {
                    console.log(res);
                    if(res.data.ok === 1) {
                        setPage('registerSuccess');
                        setInfo({login: '', pass: '', repeatPass: ''});
                        setCompare({isLogin: false, isPass: false, isCoincidePass: false, isAgreed: false});
                    } else {
                        res.data.error
                        ? setErrorMessage(res.data.error)
                        : setErrorMessage('Упс.... что-то пошло не так. Попробуй еще раз!');
                        setError(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setErrorMessage(err);
                    setError(true);
                });
      }
    };

  return (
      <>
      {pageOption === 'register' && <div className={styles.main}>
          <img className={styles.hubIcon} src='./assets/StartPage/4HUB.svg' alt='4HUB' onClick={() => setPage('init')} />
          <div className={styles.registerWrap}>
              <span className={styles.cross} onClick={() => setPage('init')} />
              <span className={styles.title}>Регистрация</span>
              <div className={`${styles.inputWrap} ${styles.marginWrap}`}>
                  <label className={styles.inputName}>Email / Телефон</label>
                  <input
                      className={classnames({
                          [styles.inputField]: true,
                          [styles.redBorder]: compare.isLogin
                      })}
                      type='text'
                      value={info.login}
                      onChange={(e) => {
                          setInfo({...info, login: e.target.value});
                          checkLogin(e.target);
                      }}
                  />
              </div>
              <div className={styles.inputWrap}>
                  <label className={styles.inputName}>Пароль</label>
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
                  <label className={styles.inputName}>Повторите пароль</label>
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
              <div className={styles.agreementWrap}>
                  <div className={styles.agreement}>
                      <div
                          onClick={() => setCompare({...compare, isAgreed: !compare.isAgreed})}
                      >{compare.isAgreed && <img src='./assets/StartPage/tick.svg' alt='tick' />}</div>
                  </div>
                  <div className={styles.agreementsText}>
                      Я принимаю<span> Условия использования </span> 4Hub
                      <span> Политику конфиденциальности</span> и
                      <span> Политику интелектуальной собственности</span>
                  </div>
              </div>
              <div className={styles.button} onClick={() => sendRequest()}>Создать аккаунт</div>
              <span className={styles.orSpan}>или</span>
              <div className={styles.socialNetworks}>
                  <div className={styles.facebook}><img src='./assets/StartPage/fb.svg' alt='fb' /></div>
                  <div className={styles.twitter}><img src='./assets/StartPage/twitter.svg' alt='twit' /></div>
                  <div className={styles.google}><img src='./assets/StartPage/google.svg' alt='goog' /></div>
                  <div className={styles.linkedIn}><img src='./assets/StartPage/linkedIn.svg' alt='lIn' /></div>
                  <div className={styles.vk}><img src='./assets/StartPage/vk.svg' alt='vk' /></div>
                  <div className={styles.pinterest}><img src='./assets/StartPage/pinterest.svg' alt='p' /></div>
              </div>
              <div className={styles.registration}>У Вас уже есть аккаунт ?
                  <span onClick={() => setPage('enter')}> Логин</span>
              </div>
          </div>
      </div>}
      {error && <PopUp set={setError}>
          <div style={{
              width: 'max-content',
              padding: '20px'
          }}>{errorMessage}</div>
      </PopUp>}
      {pageOption === 'registerSuccess' && <RegistrationSuccess setPage={setPage} />}
      </>
  )
}

export default RegisterProfile;
