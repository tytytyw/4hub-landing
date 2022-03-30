import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import styles from './CreateProject.module.sass'
import api from '../../../../../api'
import PopUp from '../../../../../generalComponents/PopUp'
import InputField from '../../../../../generalComponents/InputField'
import {colors, useTags} from '../../../../../generalComponents/collections'
import Error from '../../../../../generalComponents/Error'
import Colors from '../../../../../generalComponents/Elements/Colors'
import Signs from '../../../../../generalComponents/Elements/Signs'
import Emoji from '../../../../../generalComponents/Elements/Emoji'
import ProjectIcons from '../ProjectIcons/ProjectIcons'
import {onGetProjects} from '../../../../../Store/actions/CabinetActions'
import {useLocales} from "react-localized";

const CreateProject = ({onCreate, title, setLoadingType}) => {
    const { __ } = useLocales();
    const tags = useTags();
    const uid = useSelector(state => state.user.uid);
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
    const [icon, setIcon] = useState('lamp');
    const [error, setError] = useState(false);
    const [visibility, setVisibility] = useState('password');
    const [noNameError, setNoNameError] = useState(false);
    const dispatch = useDispatch();

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
        if(!name) return setNoNameError(true);
        if(showRepeat && password !== passwordRepeat) return setPasswordCoincide(false);
        setLoadingType('squarify')
        api.get(`/ajax/project_add.php/?uid=${uid}&name=${name}&icon=${icon}&tag=${tagOption.chosen}&color=${color.name}&symbol=${sign}&emoji=${emoji}`)
            .then((res) => {
                if (res.data.ok === 1) {
                    dispatch(onGetProjects())
                    closeComponent()
                } else if ((res.data.error === "name exists")) {
					setError( __("Проект с таким именем уже существует") );
                    setNoNameError(true)
				} else {
					setError( __("Что-то пошло не так. Повторите попытку позже") );
				}
            })
            .catch(error => console.log(error))
            .finally(() => setLoadingType(''))
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
                            
                            value={name}
                            set={setName}
                            placeholder={ __('Имя проекта') }
                            mistake={noNameError}
                        />
                    </div>

                    <div className={styles.inputWrap}>
                        <InputField
                            model='text'
                            value={target}
                            set={setTarget}
                            placeholder={ __('Цель проекта') }
                        />
                    </div>

                    <div className={styles.inputWrap}>
                        <InputField
                            model='text'
                            value={members}
                            set={setMembers}
                            
                            placeholder={ __('Участники (введите email или из списка)') }
                        />
                        <img
                            src={`${imageSrc}/assets/PrivateCabinet/input-arrow.svg`}
                            className={styles.arrowInput}
                            alt='Arrow Input'
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
                        <span className={styles.count}>{tagOption.count}/30</span>
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
                            value={password}
                            set={setPassword}
                            placeholder={ __('Установить пароль') }
                            onSwitch={onSwitch}
                            isPass={showRepeat}
                            visibility={visibility}
                            setVisibility={setVisibility}
                        />
                    </div>

                    {showRepeat &&
                    <div className={styles.inputWrap}>
                        <InputField
                            model='password'
                            switcher={false}
                            
                            value={passwordRepeat}
                            set={setPasswordRepeat}
                            placeholder={ __('Повторите пароль') }
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
                    <div className={styles.cancel} onClick={() => onCreate(false)}>{ __('Отмена') }</div>
                    <div className={styles.add} onClick={() => onAddProject()}>{ __('Создать') }</div>
                </div>
            </div>
        </PopUp>
        {error && <Error error={error} set={setError} message={error} />}
        </>
    )
}

export default CreateProject
