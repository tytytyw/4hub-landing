import React, { useState } from 'react';

import info from './InfoPage.helper';
import styles from './InfoPage.module.sass';

const InfoPage = ({setPage}) => {

    const [form, setForm] = useState({name: '', email: '', text: ''})

    const renderInfos = () => {
        return info.map(el => {
            return <div key={el.name} className={styles.info}>
                <img src={el.image} alt='img' width={el.width}/>
                <div
                    className={styles.backGroundInfos}
                    style={{margin: el.margin}}
                >
                    <h2>{el.name}</h2>
                    {el.text.map(txt => {
                        return <span>{txt}</span>
                    })}
                </div>
            </div>

        })
    }

  return (
      <div className={styles.infoWrap}>
          <img className={styles.hubIcon} src='./assets/StartPage/4HUB.svg' alt='4HUB' onClick={() => setPage('init')} />
          <div className={styles.title}>Remote WorkSpace</div>
          <div className={styles.infos}>{renderInfos()}</div>
          <h2 className={styles.questions}>Остались вопросы?</h2>
          <form className={styles.form}>
              <div>
                  <input
                      type='name'
                      placeholder='Имя'
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                  <input
                      type='email'
                      placeholder='Email'
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                  />
              </div>
              <textarea
                  name='text'
                  placeholder='Введите Ваш вопрос'
                  cols='30'
                  rows='10'
                  value={form.text}
                  onChange={(e) => setForm({...form, text: e.target.value})}
              />
              <div
                  className={styles.submitButton}
                  // onClick={sendFile}
              >Отправить</div>
          </form>
      </div>
  )
};

export default InfoPage;
