import React, {useState} from 'react';
import classnames from 'classnames';

import api from '../../../../api';
import styles from './RegisterProfile.module.sass';
import RegistrationSuccess from '../RegistrationSuccess';
import Error from '../../../../generalComponents/Error';

const RegisterProfile = ({setPage, pageOption}) => {

    const regTypes = [
        {title: '4Hub', name: 'Обычная версия'},
        {title: '4Hub (business)', name: 'Бизнес версия'}
    ];
    const [visibility, setVisibility] = useState('password');
    const [info, setInfo] = useState({login: '', pass: '', repeatPass: '', company: '', regType: regTypes[0].name, openRegType: false});
    const [compare, setCompare] = useState({isLogin: false, isPass: false, isCoincidePass: false, isAgreed: false, isСompany: false});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Упс.... что-то пошло не так. Попробуй еще раз!')

    const renderRegTypes = () => (
        regTypes.map((el, i) => (
            /*<span
                key={i}
                className={`${styles.regTypeEl} ${el.name === info.regType ? styles.chosenReg : ''}`}
                onClick={() => setInfo({...info, regType: el.name, openRegType: false})}
            >{el.name}</span>*/
            <button
                key={i}
                className={classnames({
                    [styles.toggleBtn]: true,
                    [styles.active]: el.name === info.regType
                })}
                onClick={() => setInfo({...info, regType: el.name})}
            >{el.title}</button>
        ))
    );

    const setLogin = (val) => {
        let number;
        if(val[0] === '+') {
            const newVal = val.replace(/(\+)*(\()*(\))*\s*(-)*/g, '');
            const length = newVal.length;
            number = `+${newVal.substring(0, 2)}${length > 2 ? ' (' + newVal.substring(2, 5) : newVal.substring(2, 5)}${ length > 5 ? ') ' + newVal.substring(5, 8) : newVal.substring(5, 8)}${ length > 8 ? '-' + newVal.substring(8, 10) : newVal.substring(8, 10)}${length > 10 ? '-' + newVal.substring(10, newVal.length) : newVal.substring(10, newVal.length)}`;
        } else {
            number = val
        }
        setInfo({...info, login: number});
    };

    const checkLogin = (input) => {
        let boolean = false;
        if(input.value[0] === '+') {
            const newVal = input.value.replace(/(\+)*(\()*(\))*\s*-*/g, '');
            if(/\D/.test(newVal)) boolean = true;
        } else {
            if(input.value.indexOf('@') === -1) boolean = true;
        }
        setCompare({...compare, isLogin: boolean});
    };

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
    };

    const checkCompany = (input) => {
        if(input.value === '') return setCompare({...compare, isСompany: true});
        return setCompare({...compare, isСompany: false});
    }

    const sendRequest = (retry) => {
      if(!compare.isLogin && !compare.isPass && !compare.isCoincidePass && compare.isAgreed) {
          const login = info.login.indexOf('@') > -1 ? info.login : info.login.replace(/(\()*(\))*\s*-*/g, '');
          const company = info.regType === "Бизнес версия" ? `&company=${info.company}` : '';
            api.post(`/ajax/user_reg.php?name=${login}&pass=${info.pass}${retry ? retry : ''}${company}`)
                .then(res => {
                    if(res.data.ok === 1) {
                        setPage('registerSuccess');
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
          {/*<div className={styles.registrationType}>
              <span
                  onClick={() => {setInfo({...info, openRegType: !info.openRegType})}}
                  className={styles.fieldReg}
              >{info.regType}</span>
              <div
                  style={{display: `${info.openRegType ? 'flex' : 'none'}`}}
                  className={styles.regList}
              >{renderRegTypes()}</div>
          </div>*/}
          <div className={`${styles.registerWrap} ${info.regType === "Бизнес версия" ? styles.business : ''}`}>
              <span className={styles.cross} onClick={() => setPage('init')} />
              <span className={styles.title}>Регистрация</span>

              <div className={styles.buttonsGroup}>
                  {renderRegTypes()}
              </div>

              {info.regType === "Бизнес версия" ? <div className={`${styles.inputWrap} ${styles.marginWrap}`}>
                  <label className={styles.inputName}>
                      Имя компании
                      {compare.isСompany && <span> Некорректный ввод данных</span>}
                  </label>
                  <input
                      className={classnames({
                          [styles.inputField]: true,
                          [styles.redBorder]: compare.isСompany
                      })}
                      type='text'
                      value={info.company}
                      onChange={e => {
                          setInfo({...info, company: e.target.value})
                          checkCompany(e.target)
                      }}
                      onBlur={e => checkCompany(e.target)}
                  />
              </div> : null}
              <div className={`${styles.inputWrap} ${styles.marginWrap}`}>
                  <label className={styles.inputName}>
                      Email / Телефон
                      {compare.isLogin && <span> Некорректный ввод данных</span>}
                  </label>
                  <input
                      className={classnames({
                          [styles.inputField]: true,
                          [styles.redBorder]: compare.isLogin
                      })}
                      type='text'
                      autocomplete="new-password"
                      value={info.login}
                      onChange={e => setLogin(e.target.value)}
                      onBlur={e => checkLogin(e.target)}
                  />
              </div>
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
                      type={visibility}
                      autocomplete="new-password"
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
                      autocomplete="new-password"
                      value={info.repeatPass}
                      onChange={(e) => {
                          setInfo({...info, repeatPass: e.target.value});
                          comparePass(e.target.value);
                      }}
                  />
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
                  <div className={styles.linkedIn}><img src='./assets/StartPage/linkedIn.svg' alt='lIn' /></div>
                  <div className={styles.facebook}><img src='./assets/StartPage/fb.svg' alt='fb' /></div>
                  <div className={styles.twitter}><img src='./assets/StartPage/twitter.svg' alt='twit' /></div>
                  <div className={styles.google}><img src='./assets/StartPage/google.svg' alt='goog' /></div>
                  <div className={styles.pinterest}><img src='./assets/StartPage/pinterest.svg' alt='p' /></div>
                  <div className={styles.vk}><img src='./assets/StartPage/vk.svg' alt='vk' /></div>
              </div>
              <div className={styles.registration}>У Вас уже есть аккаунт ?
                  <span onClick={() => setPage('enter')}> Вход</span>
              </div>
          </div>
      </div>}
      {pageOption === 'registerSuccess' && <RegistrationSuccess setPage={setPage} sendRequest={sendRequest} />}
      <Error error={error} set={setError} message={errorMessage} />
      </>
  )
}

export default RegisterProfile;
