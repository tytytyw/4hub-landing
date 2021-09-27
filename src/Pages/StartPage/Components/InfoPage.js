import React, { useState } from 'react';

import info from './InfoPage.helper';
import styles from './InfoPage.module.sass';
import PopUp from '../../../generalComponents/PopUp';
import {imageSrc} from '../../../generalComponents/globalVariables';

const InfoPage = ({setPage}) => {

    const [form, setForm] = useState({name: '', email: '', text: ''})
    const [success, setSucсess] = useState(false);

    const renderInfos = () => {
        return info.map(el => {
            return <div key={el.name} className={styles.info}>
                <img src={el.image} alt='img' width={el.width}/>
                <div
                    className={styles.backGroundInfos}
                    style={{margin: el.margin}}
                >
                    <h2>{el.name}</h2>
                    {el.text.map((txt, i) => {
                        return <span key={i}>{txt}</span>
                    })}
                </div>
            </div>
        })
    }

    const sendQuestion = () => {
        setSucсess(true);
    }

  return (
      <>
      <div className={styles.infoWrap}>
          <img className={styles.hubIcon} src={imageSrc + 'assets/StartPage/4HUB.svg'} alt='4HUB' onClick={() => setPage('init')} />
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
                  onClick={sendQuestion}
              >Отправить</div>
          </form>
      </div>
          {success && <PopUp set={setSucсess}>
                <div className={styles.sendSuccess}>
                    <span className={styles.cross} onClick={() => setSucсess(false)} />
                    <span className={styles.title}>Запрос успешно отправлен</span>
                    <div className={styles.imageWrap}>
                        <img src={imageSrc + 'assets/StartPage/success-file-send.svg'}
                             alt='computer'
                             className={styles.computer}
                        />
                        <img src={imageSrc + 'assets/StartPage/envelope.svg'}
                             alt='envelope'
                             className={styles.envelope}
                        />
                        <img src={imageSrc + 'assets/StartPage/paper-plane-left.svg'}
                             alt='paper-plane'
                             className={styles.planeLeft}
                        />
                        <img src={imageSrc + 'assets/StartPage/paper-plane-right.svg'}
                             alt='paper-plane'
                             className={styles.planeRight}
                        />
                    </div>
                    <div
                        className={styles.closeButton}
                        onClick={() => setSucсess(false)}
                    >Закрыть</div>
                </div>
          </PopUp>}
      </>
  )
}

export default InfoPage;
