import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './CustomizeProject.module.sass'
import api from '../../../../../../api/index'
import PopUp from '../../../../../../generalComponents/PopUp'
import InputField from '../../../../../../generalComponents/InputField'
import {tags} from '../../../../../../generalComponents/collections'
import Error from '../../../../../../generalComponents/Error'
import Colors from '../../../../../../generalComponents/Elements/Colors'
import Signs from '../../../../../../generalComponents/Elements/Signs'
import Emoji from '../../../../../../generalComponents/Elements/Emoji'
import ProjectIcons from '../../../Project/ProjectIcons/ProjectIcons'
import {onGetProjects} from '../../../../../../Store/actions/PrivateCabinetActions'

const CustomizeProject = ({onCreate, title, project, setLoadingType}) => {

    const uid = useSelector(state => state.user.uid);
    const [name, setName] = useState(project.name);
    const [target, setTarget] = useState('');
    const [members, setMembers] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordCoincide, setPasswordCoincide] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);
    const [noNameError, setNoNameError] = useState(false);
    const [tagOption, setTagOption] = useState({chosen: project.tags, count: 30});
    const [color, setColor] = useState({name: project.id_color});
    const [sign, setSign] = useState(project.id_fig);
    const [emoji, setEmoji] = useState(project.id_emo);
    const [icon, setIcon] = useState(project.icon);
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

    const onCustomize = () => {
        if(!name) return setNoNameError(true);
        if(showRepeat && password !== passwordRepeat) return setPasswordCoincide(false);
        onCreate(false)
        setLoadingType('squarify')
        api.get(`/ajax/project_edit.php/?uid=${uid}&id_project=${project.id}&name=${name}&icon=${icon || 'clipboard'}&tag=${tagOption.chosen}&color=${color.name || 'grey'}&symbol=${sign}&emoji=${emoji}`)
            .then((res) => {
                if (res.data.ok === 1) {
                    dispatch(onGetProjects())
                } else {
                    console.log(res) 
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
                            placeholder='Имя проекта'
                            mistake={noNameError}
                        />
                    </div>

                    <div className={styles.inputWrap}>
                        <InputField
                            model='text'
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
                        <div className={styles.tagList} >
                            {renderTags()}
                        </div>
                    </div>

                    <div className={styles.inputWrap}>
                        <InputField
                            model='password'
                            switcher={true}
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
                    <div className={styles.add} onClick={() => onCustomize()}>Сохранить</div>
                </div>
            </div>
        </PopUp>
        {error && <Error error={error} set={closeComponent} message='Папка не добавлена' />}
        </>
    )
}

export default CustomizeProject
