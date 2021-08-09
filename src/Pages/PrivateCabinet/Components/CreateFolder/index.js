import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './CreateFolder.module.sass';
import api from '../../../../api';
import PopUp from '../../../../generalComponents/PopUp';
import {ReactComponent as FolderIcon} from '../../../../assets/PrivateCabinet/folder-2.svg';
import InputField from '../../../../generalComponents/InputField';
import {tags, colors} from '../../../../generalComponents/collections';
import Error from '../../../../generalComponents/Error';
import { onGetFolders } from '../../../../Store/actions/PrivateCabinetActions';
import Colors from '../../../../generalComponents/Elements/Colors';
import '../../../../generalComponents/colors.sass';
import Signs from '../../../../generalComponents/Elements/Signs';
import Emoji from '../../../../generalComponents/Elements/Emoji';

const CreateFolder = ({onCreate, title, info, setChosenFolder, chosenFolder}) => {

    const uid = useSelector(state => state.user.uid);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordCoincide, setPasswordCoincide] = useState(false);
    const [showRepeat, setShowRepeat] = useState(true);
    const [tagOption, setTagOption] = useState({chosen: '', count: 30});
    const [color, setColor] = useState(colors[0]);
    const [sign, setSign] = useState('');
    const [emoji, setEmoji] = useState('');
    const [error, setError] = useState(false);
    const [noNameError, setNoNameError] = useState(false);
    const [visibility, setVisibility] = useState('password');
    const dispatch = useDispatch();

    useEffect(() => {setChosenFolder({...chosenFolder, open: false})}, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onAddName = (name) => {
        setNoNameError(false);
        setName(name);
    }
    const onSwitch = (boolean) => setShowRepeat(boolean);

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
              height: `${showRepeat ? '190px' : '140px'}`,
              marginBottom: `${showRepeat ? '5px' : '35px'}`
          }
      } else {
          return {
              height: `${showRepeat ? '150px' : '110px'}`,
              marginBottom: `${showRepeat ? '5px' : '35px'}`
          }
      }
    };

    const onAddFolder = () => {
        if(name) {
            const params = `uid=${uid}&dir_name=${name}&parent=${info.path ? info.path : 'other'}&tag=${tagOption.chosen}&pass=${passwordCoincide ? password : ''}&color=${color.color}&symbol=${sign}&emoji=${emoji}`;
            api.post(`/ajax/dir_add.php?${params}`)
                .then(res => {if(res.data.ok === 1) {
                    onCreate(false);
                } else {setError(true)}
                })
                .catch(() => {setError(true)})
                .finally(() => {dispatch(onGetFolders())}); // TODO - NEED TO REVIEW AFTER CHANGED FOLDERS STRUCTURE
        } else {
            setNoNameError(true)
        }
    };

    const closeComponent = () => {
        onCreate(false);
        setError(false);
    };

    const onChangeTag = (chosen) => {
        const count = 30 - chosen.length;
        if(count >= 0) setTagOption({...tagOption, chosen, count});
    };

    const comparePass = (val) => {
        const pass = password.split('');
        const passRepeat = val.split('');
        let boolean = true;
        passRepeat.forEach((el, i) => {if(el !== pass[i]) boolean = false});
        setPasswordCoincide(boolean);
    }

    return (
        <>
        <PopUp set={onCreate}>
            <div className={styles.createFolderWrap}>
                <span className={styles.cross} onClick={() => onCreate(false)} />
                <span className={styles.title}>{title}</span>
                <div className={styles.folderIconWrap}>
                    <div className={`${styles.folder}`}>
                        <FolderIcon className={`${styles.folderIcon} ${colors.filter(el => el.color === color.color)[0]?.name}`} />
                    </div>
                    <div className={styles.picPreview}>
                        <div className={styles.folderName}>{name}</div>
                        <div className={styles.folderOptions}>
                            {tagOption.chosen && <div
                                className={`${styles.minitagWrap} ${styles.redCross}`}
                                onClick={() => setTagOption({...tagOption, chosen: ''})}
                            >
                                <div
                                    className={`${styles.minitag}`}
                                >#{tagOption.chosen}</div>
                            </div>}
                            <div className={`${styles.colorWrap} ${color.color !== 'grey' ? styles.colorWrapTap : ''} ${color.color !== 'grey' ?  styles.redCross : ''}`} onClick={() => setColor(colors[0])}>
                                <div className={styles.circle} style={{background: color.light, border: `1px solid ${color.dark}`}} />
                            </div>
                            {sign && <div className={styles.redCross} onClick={() => setSign('')}><img src={`./assets/PrivateCabinet/signs/${sign}.svg`} alt='emoji' /></div>}
                            {emoji && <div className={styles.redCross} onClick={() => setEmoji('')}><img src={`./assets/PrivateCabinet/smiles/${emoji}.svg`} alt='emoji' /></div>}
                            {passwordCoincide && password.length === passwordRepeat.length && showRepeat && <img className={styles.lock} src='./assets/PrivateCabinet/locked.svg' alt='lock' />}
                        </div>
                    </div>
                </div>
                <div style={generateInputWrap()}
                     className={styles.inputFieldsWrap}
                >
                    <div className={styles.inputWrap}>
                        <InputField
                            model='text'
                            height={width >= 1440 ? '40px' : '30px'}
                            value={name}
                            set={onAddName}
                            placeholder='Имя папки'
                            mistake={noNameError}
                        />
                    </div>
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
                    <div className={styles.inputWrap}>
                        <InputField
                            model='password'
                            switcher={true}
                            height={width >= 1440 ? '40px' : '30px'}
                            value={password}
                            set={setPassword}
                            placeholder='Пароль'
                            onSwitch={onSwitch}
                            visibility={visibility}
                            setVisibility={setVisibility}
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        {showRepeat && <InputField
                                model='password'
                                switcher={false}
                                height={width >= 1440 ? '40px' : '30px'}
                                value={passwordRepeat}
                                set={setPasswordRepeat}
                                placeholder='Повторите пароль'
                                visibility={visibility}
                                setVisibility={setVisibility}
                                comparePass={comparePass}
                            />}
                    </div>
                </div>
                <Colors color={color} setColor={setColor} />
                <Signs sign={sign} setSign={setSign} />
                <Emoji emoji={emoji} setEmoji={setEmoji} />
                <div className={styles.buttonsWrap}>
                    <div className={styles.cancel} onClick={() => onCreate(false)}>Отмена</div>
                    <div className={styles.add} onClick={() => onAddFolder()}>Добавить</div>
                </div>
            </div>
        </PopUp>
        {error && <Error error={error} set={closeComponent} message='Папка не добавлена' />}
        </>
    )
}

export default CreateFolder;
