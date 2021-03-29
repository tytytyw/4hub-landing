import React, { useState } from 'react';

import styles from './RegisterProfile.module.sass';

const RegisterProfile = ({setPage}) => {

    const [visibilityFirst, setVisibilityFirst] = useState('password');
    const [visibilitySecond, setVisibilitySecond] = useState('password');

  return (
      <div className={styles.main}>
          <img className={styles.hubIcon} src='./assets/StartPage/4HUB.svg' alt='4HUB' onClick={() => setPage('init')} />
          <div className={styles.registerWrap}>
              <span className={styles.cross} onClick={() => setPage('init')} />
              <span className={styles.title}>Регистрация</span>
              <div className={`${styles.inputWrap} ${styles.marginWrap}`}>
                  <label className={styles.inputName}>Email / Телефон</label>
                  <input className={styles.inputField} type='text' required />
              </div>
              <div className={styles.inputWrap}>
                  <label className={styles.inputName}>Пароль</label>
                  <input className={styles.inputField} type={visibilityFirst} required />
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
                  <input className={styles.inputField} type={visibilitySecond} required />
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
                      <input style={{display: 'none'}} id='agree' type='checkbox' required />
                      <label htmlFor='agree'><img src='./assets/StartPage/tick.svg' alt='tick' /></label>
                  </div>
                  <div className={styles.agreementsText}>
                      Я принимаю<span> Условия использования </span> 4Hub
                      <span> Политику конфиденциальности</span> и
                      <span> Политику интелектуальной собственности</span>
                  </div>
              </div>
              <div className={styles.button}>Создать аккаунт</div>
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
      </div>
  )
};

export default RegisterProfile;
