import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './CustomizeFile.module.sass';
import api from '../../../../api';
import PopUp from '../../../../generalComponents/PopUp';
import InputField from '../../../../generalComponents/InputField';
import {tags, colors} from '../../../../generalComponents/collections';
import Error from '../../../../generalComponents/Error';
import { onCustomizeFile, onAddRecentFiles } from '../../../../Store/actions/PrivateCabinetActions';
import Colors from '../../../../generalComponents/Elements/Colors';
import '../../../../generalComponents/colors.sass';
import Signs from '../../../../generalComponents/Elements/Signs';
import Emoji from '../../../../generalComponents/Elements/Emoji';
import File from '../../../../generalComponents/Files';

const CustomizeFile = ({title, close, info, file, fileLoading, setFileLoading, setProgress, onToggleSafePassword }) => {

    const uid = useSelector(state => state.user.uid);
    const [name, setName] = useState(file ? file.name.slice(0, file.name.lastIndexOf('.')) : '');
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);
    const [color, setColor] = useState(colors.find(c => c.color === file.color));
    const [tagOption, setTagOption] = useState({chosen: file.tag, count: 30});
    const [sign, setSign] = useState(file.fig);
    const [emoji, setEmoji] = useState(file.emo);
    const [error, setError] = useState(false);
    const [visibility, setVisibility] = useState('password');
    const dispatch = useDispatch();
    const [display, setDisplay] = useState('block');

    const renderTags = () => {
        return tags.map((tag, i) => {
            return <div
                key={i}
                onClick={() => onChangeTag(tag)}
            >{tag}</div>;
        })
    };

    const width = window.innerWidth;

    const onAddFile = () => {
        if(file.is_pass && !password) return setIsPassword(false);
        const fName = name === file?.name.slice(0, file.name.lastIndexOf('.')) ? '' : `&fileName=${name}`;
        const tag = tagOption.chosen === file.tag ? '' : `&tag=${tagOption.chosen}`;
        const pass = file.is_pass ? `&pass=${password}` : '';
        const col = color?.color === file.color ? '' : `&color=${color.color}`;
        const symbol = sign === file.fig ? '' : `&symbol=${sign}`;
        const emo = emoji === file.emo ? '' : `&emoji=${emoji}`;

        const url = `/ajax/file_edit.php?uid=${uid}&fid=${file.fid}${fName}${tag}${pass}${col}${symbol}${emo}`;

        if(!fName && !tag && !col && !symbol && !emo) return close();

        const newFile = {
            ...file,
            name: fName ? name + file?.name.slice(0, file.name.lastIndexOf('.'))[1] : file.name,
            tag: tag ? tagOption.chosen : file.tag,
            color: col ? color?.color : file.color,
            emo: emo ? emoji : file.emo,
            fig: symbol ? sign : file.fig,
            is_pass: isPassword ? 1 : 0
        }
        api.post(url)
            .then(res => {if(res.data.ok === 1) {
                dispatch(onCustomizeFile(newFile));
                dispatch(onAddRecentFiles());
            } else {setError(true)}
            })
            .catch(err => {setError(true)})
            .finally(() => {
                close();
            });
    };

    const closeComponent = () => {
        close();
        setError(false);
    };

    const onChangeTag = (chosen) => {
        const count = 30 - chosen.length;
        if(count >= 0) setTagOption({...tagOption, chosen, count});
    };

    const getName = (val) => {
        const i = val.lastIndexOf('.');
        return {
            name: val.substring(0, i),
            format: val.substring(i + 1)
        }
    };

    return (
        <div style={{display: `${display}`}}>
            <PopUp set={close}>
                <div
                    className={styles.createFolderWrap}
                    style={{
                        height: file.is_pass ? '720px' : '650px',
                    }}
                >
                    <span className={styles.cross} onClick={close} />
                    <span className={styles.title}>{title}</span>
                    <div className={styles.fileIconWrap}>
                        <div className={`${styles.fileWrap} ${color?.color !== 'grey' ? styles.redCross : undefined}`} onClick={() => setColor(colors[0])}>
                            <div className={styles.file}><File color={color?.light} format={file ? getName(file.name).format : ''} /></div>
                        </div>
                        <div className={styles.picPreview}>
                            <div className={styles.format}>{getName(file.name).format} {file.size_now}</div>
                            <div className={styles.name}>{getName(file.name).name}</div>
                            <div className={styles.fileOptions}>
                                {tagOption.chosen && <div
                                    className={`${styles.minitag} ${styles.redCross}`}
                                    onClick={() => setTagOption({...tagOption, chosen: ''})}
                                >#{tagOption.chosen}</div>}
                                <div className={styles.circle} style={{background: color?.light, border: `1px solid ${color?.dark}`}} />
                                {sign && <div className={styles.redCross} onClick={() => setSign('')}><img src={`./assets/PrivateCabinet/signs/${sign}.svg`} alt='emoji' /></div>}
                                {emoji && <div className={styles.redCross} onClick={() => setEmoji('')}><img src={`./assets/PrivateCabinet/smiles/${emoji}.svg`} alt='emoji' /></div>}
                                {file.is_pass ? <img className={styles.lock} src='./assets/PrivateCabinet/locked.svg' alt='lock' /> : null}
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.inputFieldsWrap} ${file.is_pass ? '' : `${styles.noPassword}`}`}>
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
                        {file.is_pass ? <InputField
                            model='password'
                            switcher={false}
                            height={width >= 1440 ? '40px' : '30px'}
                            value={password}
                            set={setPassword}
                            placeholder='Введите пароль'
                            visibility={visibility}
                            setVisibility={setVisibility}
                            mistake={!isPassword}
                        /> : null}
                    </div>
                    <Colors color={color} setColor={setColor} />
                    <Signs sign={sign} setSign={setSign} />
                    <Emoji emoji={emoji} setEmoji={setEmoji} />
                    <div className={styles.buttonsWrap}>
                        <div className={styles.cancel} onClick={() => close()}>Отмена</div>
                        <div className={`${file ? styles.add : styles.buttonDisabled}`} onClick={() => {if(file) onAddFile()}}>Сохранить</div>
                    </div>
                </div>
            </PopUp>
            {error && <Error error={error} set={closeComponent} message='Файл не изменен' />}
        </div>
    )
}

export default CustomizeFile;
