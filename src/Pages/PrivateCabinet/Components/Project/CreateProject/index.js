import React, {useState, useEffect, useRef} from 'react'
// import { useSelector, useDispatch } from 'react-redux'

import styles from './CreateProject.module.sass'
// import api from '../../../../../api'
import PopUp from '../../../../../generalComponents/PopUp'
import InputField from '../../../../../generalComponents/InputField'
import {tags, colors} from '../../../../../generalComponents/collections'
import Error from '../../../../../generalComponents/Error'
import Colors from '../../../../../generalComponents/Elements/Colors'
import Signs from '../../../../../generalComponents/Elements/Signs'
import Emoji from '../../../../../generalComponents/Elements/Emoji'
import ProjectIcons from '../ProjectIcons/ProjectIcons'

const CreateProject = ({onCreate, title, info}) => {

    // const uid = useSelector(state => state.user.uid);
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');
    const [members, setMembers] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordCoincide, setPasswordCoincide] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);
    const [tagOption, setTagOption] = useState({chosen: '', count: 30});
    const [color, setColor] = useState(colors[0]);
    const [sign, setSign] = useState('');
    const [emoji, setEmoji] = useState('');
    const [icon, setIcon] = useState('');
    const [error, setError] = useState(false);
    const [visibility, setVisibility] = useState('password');
    const [noNameError, setNoNameError] = useState(false);
    // const dispatch = useDispatch();

    useEffect(() => {if (name) setNoNameError(false)}, [name])

    const onSwitch = (boolean) => setShowRepeat(boolean);

    const renderTags = () => {
        return tags.map((tag, i) => {
            return <div
                key={i}
                onClick={() => onChangeTag(tag)}
            >{tag}</div>;
        })
    };

    const onAddProject = () => {
        // const params = `uid=${uid}&dir_name=${name}&parent=${info.path ? info.path : 'other'}&tag=${tagOption.chosen}&pass=${passwordCoincide ? password : ''}&color=${color.color}&symbol=${sign}&emoji=${emoji}`;
        // TODO - Need to add api
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
            <div className={styles.createFolderWrap}>
                <span className={styles.cross} onClick={() => onCreate(false)} />
                <span className={styles.title}>{title}</span>

                <div className={styles.inputFieldsWrap}>

                    <div className={styles.inputWrap}>
                        <InputField
                            model='text'
                            height={null}
                            value={name}
                            set={setName}
                            placeholder='Имя проекта'
                            mistake={noNameError}
                        />
                    </div>

                    <div className={styles.inputWrap}>
                        <InputField
                            model='text'
                            height={null}
                            value={target}
                            set={setTarget}
                            placeholder='Цель проекта'
                        />
                    </div>

                    <div className={styles.inputWrap}>
                        <InputField
                            model='text'
                            value={members}
                            set={setMembers}
                            height={null}
                            placeholder='Участники (введите email или выбирите из списка)'
                        />
                        <img
                            src={'./assets/PrivateCabinet/input-arrow.svg'}
                            className={styles.arrowInput}
                            alt='Arrow Input'
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
                        <div
                            className={styles.tagList}
                            ref={tagRef}
                            onClick={handleChoose}
                        >
                            {renderTags()}
                        </div>
                    </div>

                    <div className={styles.inputWrap}>
                        <InputField
                            model='password'
                            switcher={true}
                            height={null}
                            value={password}
                            set={setPassword}
                            placeholder='Установить пароль'
                            onSwitch={onSwitch}
                            visibility={visibility}
                            setVisibility={setVisibility}
                        />
                    </div>

                    {showRepeat &&
                    <div className={styles.inputWrap}>
                        <InputField
                            model='password'
                            switcher={false}
                            height={null}
                            value={passwordRepeat}
                            set={setPasswordRepeat}
                            placeholder='Повторите пароль'
                            visibility={visibility}
                            setVisibility={setVisibility}
                            comparePass={comparePass}
                            mistake={!passwordCoincide}
                        />
                    </div>}

                </div>
                <ProjectIcons color={color} icon={icon} setIcon={setIcon} />
                <Colors color={color} setColor={setColor} />
                <Signs sign={sign} setSign={setSign} />
                <Emoji emoji={emoji} setEmoji={setEmoji} />
                <div className={styles.buttonsWrap}>
                    <div className={styles.cancel} onClick={() => onCreate(false)}>Отмена</div>
                    <div className={styles.add} onClick={() => onAddProject()}>Создать</div>
                </div>
            </div>
        </PopUp>
        {error && <Error error={error} set={closeComponent} message='Папка не добавлена' />}
        </>
    )
}

export default CreateProject
