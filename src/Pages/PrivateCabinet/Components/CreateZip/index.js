import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './CreateZip.module.sass';
import api from '../../../../api';
import PopUp from '../../../../generalComponents/PopUp';
import InputField from '../../../../generalComponents/InputField';
import {tags, colors} from '../../../../generalComponents/collections';
import Error from '../../../../generalComponents/Error';
import Colors from '../../../../generalComponents/Elements/Colors';
import '../../../../generalComponents/colors.sass';
import Signs from '../../../../generalComponents/Elements/Signs';
import Emoji from '../../../../generalComponents/Elements/Emoji';
import File from '../../../../generalComponents/Files';
import {onChooseFiles} from '../../../../Store/actions/PrivateCabinetActions';

const CreateZip = ({ close, title, file }) => {

    const uid = useSelector(state => state.user.uid);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);
    const [name, setName] = useState(file.fname.slice(0, file.fname.lastIndexOf('.')));
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordCoincide, setPasswordCoincide] = useState(false);
    const [showRepeat, setShowRepeat] = useState(true);
    const [color, setColor] = useState(colors[0]);
    const [tagOption, setTagOption] = useState({chosen: '', count: 30});
    const [sign, setSign] = useState('');
    const [emoji, setEmoji] = useState('');
    const [error, setError] = useState(false);
    const [visibility, setVisibility] = useState('password');
    const dispatch = useDispatch();

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
                marginBottom: `${showRepeat ? '10px' : '35px'}`
            }
        } else {
            return {
                height: `${showRepeat ? '150px' : '110px'}`,
                marginBottom: `${showRepeat ? '10px' : '35px'}`
            }
        }
    };

    const onAddFileToZip = () => {

        const fName = `&fName=${name}` ? name : '';
        const fTag = `&tag=${tagOption.chosen}` ? tagOption.chosen : '';
        const pass = password && passwordCoincide ? `&pass=${password}` : '';
        const fColor = `&color=${color}`;
        const fEmoji = emoji ? `&emoji=${emoji}` : '';
        const symbol = sign ? `&symbol=${sign}` : ''

        api.post(`/ajax/file_zip.php?uid=${uid}&fid=${file.fid}&dir=${fileList.path}${fName}${fTag}${pass}${fColor}${fEmoji}${symbol}`)
                .then(() => dispatch(onChooseFiles(fileList.path)))
                .catch(() => setError(true));
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
    };

    const getName = (val) => {
        const i = val.lastIndexOf('.');
        return {
            name: val.substring(0, i),
            format: val.substring(i + 1)
        }
    };

    return (
        <div style={{display: `block`}}>
            <PopUp set={close}>
                <div className={styles.createWrap}>
                    <span className={styles.cross} onClick={close} />
                    <span className={styles.title}>{title}</span>
                    <div className={styles.fileIconWrap}>
                        <div className={`${styles.fileWrap} ${color.color !== 'grey' ? styles.redCross : undefined}`} onClick={() => setColor(colors[0])}>
                            <div className={styles.file}><File color={color.light} format='ZIP' /></div>
                        </div>
                        <div className={styles.picPreview}>
                            <div className={styles.name}>{getName(file.fname).name}</div>
                            <div className={styles.fileOptions}>
                                {tagOption.chosen && <div
                                    className={`${styles.minitag} ${styles.redCross}`}
                                    onClick={() => setTagOption({...tagOption, chosen: ''})}
                                >#{tagOption.chosen}</div>}
                                <div className={styles.circle} style={{background: color.light, border: `1px solid ${color.dark}`}} />
                                {sign && <div className={styles.redCross} onClick={() => setSign('')}><img src={`./assets/PrivateCabinet/signs/${sign}.svg`} alt='emoji' /></div>}
                                {emoji && <div className={styles.redCross} onClick={() => setEmoji('')}><img src={`./assets/PrivateCabinet/smiles/${emoji}.svg`} alt='emoji' /></div>}
                                {passwordCoincide && password.length === passwordRepeat.length && showRepeat && <img className={styles.lock} src='./assets/PrivateCabinet/locked.svg' alt='lock' />}
                            </div>
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
                            placeholder='Имя файла'
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
                            model='password'
                            switcher={true}
                            height={width >= 1440 ? '40px' : '30px'}
                            value={password}
                            set={setPassword}
                            placeholder='Пароль'
                            onSwitch={onSwitch}
                            visibility={visibility}
                            setVisibility={setVisibility}
                            disabled={!showRepeat}
                        />
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
                            mistake={!passwordCoincide}
                        />}
                    </div>
                    <Colors color={color} setColor={setColor} />
                    <Signs sign={sign} setSign={setSign} />
                    <Emoji emoji={emoji} setEmoji={setEmoji} />
                    <div className={styles.buttonsWrap}>
                        <div className={styles.cancel} onClick={close}>Отмена</div>
                        <div className={`${styles.add}`} onClick={onAddFileToZip}>Добавить</div>
                    </div>
                </div>
            </PopUp>
            {error && <Error error={error} set={close} message='Файл не удалось сжать в ZIP архив' />}
        </div>
    )
}

export default CreateZip;
