import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './CreateFolder.module.sass';
import api from '../../../../api';
import PopUp from '../../../../generalComponents/PopUp';
import {ReactComponent as FolderIcon} from '../../../../assets/PrivateCabinet/folder-2.svg';
import InputField from '../../../../generalComponents/InputField';
import {colors, useFolders, useTags} from '../../../../generalComponents/collections';
import Error from '../../../../generalComponents/Error';
import {onChooseFiles, onGetFolders} from '../../../../Store/actions/CabinetActions';
import Colors from '../../../../generalComponents/Elements/Colors';
import '../../../../generalComponents/colors.sass';
import Signs from '../../../../generalComponents/Elements/Signs';
import Emoji from '../../../../generalComponents/Elements/Emoji';
import {imageSrc} from '../../../../generalComponents/globalVariables';
import SelectFolder from "../../../../generalComponents/SelectFolder/SelectFolder";
import {useLocales} from "react-localized";

const CreateFolder = ({
    onCreate, title, showChoiceFolders = true, chosenFolder, newFolderInfo = {},
    setGLoader, setNewFolderInfo
}) => {
    const { __ } = useLocales();
    const tags = useTags();
    const uid = useSelector(state => state.user.uid);
    const fileList = useSelector(state => state.Cabinet.fileList);
    const search = useSelector(state => state.Cabinet.search);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordCoincide, setPasswordCoincide] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);
    const [tagOption, setTagOption] = useState({chosen: '', count: 30});
    const [color, setColor] = useState(colors[0]);
    const [sign, setSign] = useState('');
    const [emoji, setEmoji] = useState('');
    const [error, setError] = useState(false);
    const [noNameError, setNoNameError] = useState(false);
    const [visibility, setVisibility] = useState('password');
    const [path, setPath] = useState(newFolderInfo?.path ?? chosenFolder?.path)
    const dispatch = useDispatch();
    const folders = useFolders();

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

    const onAddFolder = () => {
        if(name) {
            const modifiedPath = path.split('/').length === 2 && path.split('/')[1] === '' ? path.slice(0, path.indexOf('/')) : path;
            const params = `uid=${uid}&dir_name=${name}&parent=${modifiedPath}&tag=${tagOption.chosen}&pass=${passwordCoincide ? password : ''}&color=${color.color}&symbol=${sign}&emoji=${emoji}`;
            api.post(`/ajax/dir_add.php?${params}`)
                .then(res => {if(res.data.ok === 1) {
                    onCreate(false);
                } else {setError(true)}
                })
                .catch(() => {setError(true)})
                .finally(() => {
                    dispatch(onGetFolders(fileList?.path, folders));
                    dispatch(onChooseFiles(fileList?.path, search, 1, '', setGLoader));
                }); // TODO - NEED TO REVIEW AFTER CHANGED FOLDERS STRUCTURE
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

    // AutoHide .tagList after file is chosen
    const tagRef = useRef(null);
    const handleChoose = () => {
        tagRef.current.style.display = 'none';
        setTimeout(() => {tagRef.current.style.display = ''}, 0);
    }

    return (
        <>
            <PopUp set={onCreate}>
                <div className={`${styles.createFolderWrap} ${showRepeat ? '' : styles.crateFolderMin}`}>
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
                                {sign && <div className={styles.redCross} onClick={() => setSign('')}><img src={`${imageSrc}assets/PrivateCabinet/signs/${sign}.svg`} alt='emoji' /></div>}
                                {emoji && <div className={styles.redCross} onClick={() => setEmoji('')}><img src={`${imageSrc}assets/PrivateCabinet/smiles/${emoji}.svg`} alt='emoji' /></div>}
                                {passwordCoincide && password.length === passwordRepeat.length && showRepeat && <img className={styles.lock} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt='lock' />}
                            </div>
                        </div>
                    </div>
                    <div className={styles.inputFieldsWrap}>
                        <div className={styles.inputWrap}>
                            <InputField
                                model='text'
                                value={name}
                                set={onAddName}
                                placeholder={ __('Имя папки') }
                                mistake={noNameError}
                            />
                        </div>
                        <div className={styles.tagPicker}>
                            <span>#</span>
                            <input
                                className={styles.inputField}
                                type='text'
                                placeholder={ __('Добавьте #Тег') }
                                value={tagOption.chosen}
                                onChange={(e) => onChangeTag(e.target.value)}
                                onFocus={() => {setTagOption({...tagOption, show: true})}}
                            />
                            <span>{tagOption.count}/30</span>
                            <div
                                className={styles.tagList}
                                ref={tagRef}
                                onClick={handleChoose}
                            >
                                {renderTags()}
                            </div>
                        </div>
                        {showChoiceFolders && <div className={styles.inputWrap}>
                            <SelectFolder
                                className={styles.select}
                                path={path}
                                setPath={setPath}
                                initFolder={newFolderInfo?.path}
                                setNewFolderInfo={setNewFolderInfo}
                            />
                        </div>}
                        <div className={styles.inputWrap}>
                            <InputField
                                isPass={showRepeat}
                                model='password'
                                switcher={true}
                                value={password}
                                set={setPassword}
                                placeholder={ __('Пароль') }
                                onSwitch={onSwitch}
                                visibility={visibility}
                                setVisibility={setVisibility}
                                disabled={!showRepeat}
                            />
                        </div>
                        {showRepeat && <div className={styles.inputWrap}>
                            <InputField
                                model='password'
                                switcher={false}
                                value={passwordRepeat}
                                set={setPasswordRepeat}
                                placeholder={ __('Повторите пароль') }
                                visibility={visibility}
                                setVisibility={setVisibility}
                                comparePass={comparePass}
                            />
                        </div>}
                    </div>
                    <Colors color={color} setColor={setColor} />
                    <Signs sign={sign} setSign={setSign} />
                    <Emoji emoji={emoji} setEmoji={setEmoji} />
                    <div className={styles.buttonsWrap}>
                        <div className={styles.cancel} onClick={() => onCreate(false)}>{ __('Отмена') }</div>
                        <div className={styles.add} onClick={() => onAddFolder()}>{ __('Добавить') }</div>
                    </div>
                </div>
            </PopUp>
            {error && <Error error={error} set={closeComponent} message={ __('Папка не добавлена') } />}
        </>
    )
}

export default CreateFolder;
