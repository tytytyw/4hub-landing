import React, {useEffect, useState} from 'react';

import styles from './CreateSafePassword.module.sass';
import PopUp from '../../../../generalComponents/PopUp';
import {ReactComponent as SafeIcon} from '../../../../assets/PrivateCabinet/safeColored.svg';
import InputField from '../../../../generalComponents/InputField';
import {tags, colors} from '../../../../generalComponents/collections';
import Error from '../../../../generalComponents/Error';
import Colors from '../../../../generalComponents/Elements/Colors';
import '../../../../generalComponents/colors.sass';

const CreateSafePassword = ({onToggle, title, setChosenFolder, chosenFolder}) => {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tagOption, setTagOption] = useState({chosen: '', count: 30});
    const [color, setColor] = useState(colors[0]);
    const [error, setError] = useState(false);

    useEffect(() => {setChosenFolder({...chosenFolder, open: false})}, []); // eslint-disable-line react-hooks/exhaustive-deps

    const renderTags = () => {
        return tags.map((tag, i) => {
            return <div
                key={i}
                onClick={() => onChangeTag(tag)}
            >{tag}</div>;
        })
    };

    const width = window.innerWidth;
    const generateInputWrap = () => {
        if(width >= 1440) {
            return {
              height: '160px',
              marginBottom: '35px'
          }
      } else {
          return {
              height: '110px',
              marginBottom: '15px'
          }
      }
    };

    const closeComponent = () => {
        onToggle(false);
        setError(false);
    };

    const onChangeTag = (chosen) => {
        const count = 30 - chosen.length;
        if(count >= 0) setTagOption({...tagOption, chosen, count});
    };

    return (
        <>
        <PopUp set={onToggle}>
            <div className={styles.createFolderWrap}>
                <span className={styles.cross} onClick={() => onToggle(false)} />
                <span className={styles.title}>{title}</span>
                <div className={styles.folderIconWrap}>
                    <div className={`${styles.folder} ${color.color !== 'grey' ? styles.redCross : undefined}`} onClick={() => setColor(colors[0])}>
                        <SafeIcon className={styles.safeIcon} />
                    </div>
                    <div className={styles.picPreview}>
                        <div className={styles.folderName}>{name === '' ? 'Пароли' : name}</div>
                        {tagOption.chosen && <div
                            className={`${styles.minitag} ${styles.redCross}`}
                            onClick={() => setTagOption({...tagOption, chosen: ''})}
                        ># {tagOption.chosen}</div>}
                    </div>
                </div>
                <div style={generateInputWrap()}
                     className={styles.inputFieldsWrap}
                >
                    <InputField
                        model='text'
                        height={width >= 1440 ? '40px' : '30px'}
                        value={name}
                        set={setName}
                        placeholder='Имя сейфа (по умолчанию Пароли)'
                    />
                    <div className={styles.tagPicker}>
                        <span>#</span>
                        <input
                            className={styles.inputField}
                            type='text'
                            placeholder='Добавте #Тег'
                            value={tagOption.chosen}
                            onChange={(e) => onChangeTag(e.target.value)}
                            onFocus={() => {setTagOption({...tagOption, show: true})}}
                        />
                        <span>{tagOption.count}/30</span>
                        <div className={styles.tagList} >
                            {renderTags()}
                        </div>
                    </div>
                    <InputField
                        model='text'
                        height={width >= 1440 ? '40px' : '30px'}
                        value={phoneNumber}
                        set={setPhoneNumber}
                        placeholder='Введите Ваш номер телефона'
                    />
                </div>
                <span className={styles.description}>На указанный телефон будет приходить код пароль для входа в сейф</span>
                <Colors color={color} setColor={setColor} />
                <span className={styles.additionalInfo}>Текст разьясняющий как работает сейф! далее идет рыбный текст В то время некий безымянный</span>
                <span className={styles.additionalInfo}>печатник создал большую коллекцию размеров и форм</span>
                <div className={styles.buttonsWrap}>
                    <div className={styles.cancel} onClick={() => onToggle(false)}>Отмена</div>
                    <div className={styles.add}>Сохранить</div>
                </div>
            </div>
        </PopUp>
        {error && <Error error={error} set={closeComponent} message='Пароль для сейфа не создан' />}
        </>
    )
}

export default CreateSafePassword;
