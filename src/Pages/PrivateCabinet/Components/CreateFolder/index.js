import React, {useState} from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import styles from './CreateFolder.module.sass';
import api from '../../../../api';
import PopUp from '../../../../generalComponents/PopUp';
import {ReactComponent as FolderIcon} from '../../../../assets/PrivateCabinet/folder-2.svg';
import InputField from '../../../../generalComponents/InputField';
import {tags, colors, signs, smiles} from '../../../../generalComponents/collections';

const CreateFolder = ({onCreate, title}) => {

    const uid = useSelector(state => state.user.uid);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [showRepeat, setShowRepeat] = useState(true);
    const [tagOption, setTagOption] = useState({show: false, chosen: 'Добавьте #Тег'});
    const [color, setColor] = useState(colors[0]);
    const [sign, setSign] = useState('');
    const [emoji, setEmoji] = useState('');

    const onSwitch = (boolean) => setShowRepeat(boolean);

    const renderTags = () => {
        return tags.map((tag, i) => {
            return <div
                key={i}
                onClick={() => setTagOption({show: false, chosen: tag})}
            >{tag}</div>;
        })
    };

    const renderColors = () => {
      return colors.map((el, i) => {
          return <div
              key={i}
              className={styles.circleColor}
              style={{
                  background: color?.dark === el.dark ? el.dark : el.light,
                  border: `1px solid ${el.dark}`
              }}
              onClick={() => setColor(el)}
          />
      })
    };

    const renderSigns = () => {
      return signs.map((el, i) => {
          return <div
              key={i}
              className={classnames({
                  [styles.sign]: true,
                  [styles.signChosen]: sign === el
              })}
              onClick={() => setSign(el)}
          ><img src={`./assets/PrivateCabinet/signs/${el}.svg`} alt='sign' />
          </div>
      })
    };

    const renderEmoji = () => {
        return smiles.map((el, i) => {
            return <div
                key={i}
                className={classnames({
                    [styles.emoji]: true,
                    [styles.emojiChosen]: emoji === el
                })}
                onClick={() => setEmoji(el)}
            ><img src={`./assets/PrivateCabinet/smiles/${el}.svg`} alt='smile' />
            </div>
        })
    };

    const width = window.innerWidth;
    const generateInputWrap = () => {
        if(width >= 1440) {
            return {
              height: `${showRepeat ? '190px' : '140px'}`,
              marginBottom: `${showRepeat ? '10px' : '35px'}`
          }
      } else {
          return {
              height: `${showRepeat ? '140px' : '140px'}`,
              marginBottom: `${showRepeat ? '10px' : '35px'}`
          }
      }
    };

    const onAddFolder = () => {
        const params = `uid=${uid}&dir_name=${name}&parent=${'global/all'}`;
      api.post(`/ajax/dir_add.php?${params}`)
          .then(res => console.log(res))
          .catch(err => console.log(err));
    };

    return (
        <PopUp set={onCreate}>
            <div className={styles.createFolderWrap}>
                <span className={styles.cross} onClick={() => onCreate(false)} />
                <span className={styles.title}>{title}</span>
                <div className={styles.folderIconWrap}><FolderIcon className={`${styles.folderIcon} ${styles[color.color]}`} /></div>
                <div style={generateInputWrap()}
                     className={styles.inputFieldsWrap}>
                    <InputField
                        model='text'
                        height={width >= 1440 ? '40px' : '25px'}
                        value={name}
                        set={setName}
                        placeholder='Имя папки'
                    />
                    <div className={styles.tagPicker} onClick={() => {!tagOption.show && setTagOption({...tagOption, show: !tagOption.show})}}>
                        {tagOption.chosen}
                        <div className={classnames({
                            [styles.tagList]: true,
                            [styles.showTagList]: tagOption.show
                        })}>
                            {renderTags()}
                        </div>
                    </div>
                    <InputField
                        model='password'
                        switcher={true}
                        height={width >= 1440 ? '40px' : '25px'}
                        value={password}
                        set={setPassword}
                        placeholder='Пароль'
                        onSwitch={onSwitch}
                    />
                    {showRepeat && <InputField
                        model='password'
                        switcher={false}
                        height={width >= 1440 ? '40px' : '25px'}
                        value={passwordRepeat}
                        set={setPasswordRepeat}
                        placeholder='Повторите пароль'
                    />}
                </div>
                <div className={styles.colorWrap}>
                    <span>Выберите цвет папки</span>
                    <div>{renderColors()}</div>
                </div>
                <div className={styles.signsWrap}>
                    <span>Добавить знак</span>
                    <div>{renderSigns()}</div>
                </div>
                <div className={styles.emojiWrap}>
                    <span>Добавить эмоджи</span>
                    <div>{renderEmoji()}</div>
                </div>
                <div className={styles.buttonsWrap}>
                    <div className={styles.cancel} onClick={() => onCreate(false)}>Отмена</div>
                    <div className={styles.add} onClick={() => onAddFolder()}>Добавить</div>
                </div>
            </div>
        </PopUp>
    )
}

export default CreateFolder;
