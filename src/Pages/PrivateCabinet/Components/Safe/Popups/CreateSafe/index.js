import React, {useState} from 'react'

import styles from './CreateSafe.module.sass'
import Colors from '../../../../../../generalComponents/Elements/Colors'
import Signs from '../../../../../../generalComponents/Elements/Signs'
import Emoji from '../../../../../../generalComponents/Elements/Emoji'
import PopUp from '../../../../../../generalComponents/PopUp'
import {colors, tags} from '../../../../../../generalComponents/collections'
import Input from '../../../MyProfile/Input'
import SafeIcon from '../../SafeIcon'
import classNames from 'classnames'
import {useDispatch} from 'react-redux'
import {onAddSafe} from "../../../../../../Store/actions/PrivateCabinetActions";

const CreateSafe = ({onCreate}) => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [tagOption, setTagOption] = useState({chosen: '', count: 30})
    const [color, setColor] = useState(colors?.find(item => item.name === 'blue'))
    const [sign, setSign] = useState('')
    const [emoji, setEmoji] = useState('')
    const [showPass, setShowPass] = useState('')

    const renderTags = () => {
        return tags.map((tag, i) => {
            return <div
                key={i}
                onClick={() => onChangeTag(tag)}
            >{tag}</div>
        })
    }

    const [errors, setErrors] = useState({})

    const addErrors = () => {
        setErrors({
            name: !!name,
            password: !!password,
            passwordRepeat: password === passwordRepeat
        })
    }

    const formIsValid = () => {
        addErrors()
        return !!name && !!password && password === passwordRepeat
    }

    const AddSafe = () => {

        if (formIsValid()) {
            const safeObj = {
                // id: safes?.length + 1,
                name,
                password,
                tag: tagOption?.chosen,
                color: color?.name,
                sign,
                emo: emoji,
            }

            dispatch(onAddSafe(safeObj.name, safeObj.password, safeObj.tag, safeObj.color, safeObj.sign, safeObj.emo))
            onCreate(false)
        }

    }

    const onChangeTag = (chosen) => {
        const count = 30 - chosen.length
        if (count >= 0) setTagOption({...tagOption, chosen, count})
    }

    return (
        <>
            <PopUp set={onCreate}>
                <div className={styles.createFolderWrap}>
                    <span className={styles.cross} onClick={() => onCreate(false)}/>

                    <div className={styles.content}>
                        <span className={styles.title}>Создание сейфа</span>
                        <div className={styles.folderIconWrap}>
                            <div
                                className={classNames({
                                    [styles.folder]: true,
                                    [styles.redCross]: color.color !== 'grey'
                                })}
                                onClick={() => setColor(colors[0])}
                            >
                                <SafeIcon
                                    type={color?.name}
                                    className={styles.safeIcon}
                                />
                            </div>
                            <div className={styles.picPreview}>
                                <div className={styles.folderName}>{name}</div>
                                <div className={styles.folderOptions}>

                                    {tagOption.chosen &&
                                    <div
                                        className={`${styles.minitag} ${styles.redCross}`}
                                        onClick={() => setTagOption({...tagOption, chosen: ''})}
                                    >
                                        # {tagOption.chosen}
                                    </div>}

                                    <div
                                        className={styles.circle}
                                        style={{
                                            background: color.light,
                                            border: `1px solid ${color.dark}`
                                        }}
                                    />

                                    {sign &&
                                    <div
                                        className={styles.redCross}
                                        onClick={() => setSign('')}
                                    >
                                        <img
                                            src={`./assets/PrivateCabinet/signs/${sign}.svg`}
                                            alt='emoji'
                                        />
                                    </div>}

                                    {emoji &&
                                    <div
                                        className={styles.redCross}
                                        onClick={() => setEmoji('')}
                                    >
                                        <img
                                            src={`./assets/PrivateCabinet/smiles/${emoji}.svg`}
                                            alt='emoji'
                                        />
                                    </div>}

                                    {/*{password.length === passwordRepeat.length &&
                                    <img
                                        className={styles.lock}
                                        src='./assets/PrivateCabinet/locked.svg'
                                        alt='lock'
                                    />}*/}

                                </div>
                            </div>
                        </div>

                        <div className={styles.inputFieldsWrap}>

                            <div className={styles.inputWrap}>
                                <Input
                                    name='name'
                                    placeholder='Имя файла'
                                    className={styles.input}
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                    isMistake={errors?.name}
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
                                    onFocus={() => {
                                        setTagOption({...tagOption, show: true})
                                    }}
                                />
                                <span>{tagOption.count}/30</span>
                                <div className={styles.tagList}>
                                    {renderTags()}
                                </div>
                            </div>

                            <div className={styles.inputWrap}>
                                <Input
                                    type='password'
                                    name='password'
                                    placeholder='Установить пароль'
                                    showPass={showPass}
                                    setShowPass={setShowPass}
                                    className={styles.input}
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    isMistake={errors?.password}
                                />
                            </div>

                            <div className={styles.inputWrap}>
                                <Input
                                    autocomplete="off"
                                    type='password'
                                    name='passwordRepeat'
                                    placeholder='Введите повторно пароль пароль'
                                    showPass={showPass}
                                    setShowPass={setShowPass}
                                    className={styles.input}
                                    value={passwordRepeat}
                                    onChange={event => setPasswordRepeat(event.target.value)}
                                    isMistake={errors?.passwordRepeat}
                                />
                            </div>

                            <div className={styles.inputWrap}>
                                <Input
                                    name='phone'
                                    placeholder='Введите Ваш номер телефона'
                                    phone={true}
                                    className={styles.input}
                                    disabled
                                />
                            </div>

                        </div>

                        <div className={styles.textWrap}>
                            <p className={styles.text}>
                                Примечание: на указанный контактный номер телефона
                                будет отправлено код-пароль для доступа к сейфу
                            </p>
                        </div>

                        <Colors color={color} setColor={setColor}/>
                        <Signs sign={sign} setSign={setSign}/>
                        <Emoji emoji={emoji} setEmoji={setEmoji}/>
                    </div>

                    <div className={styles.buttonsWrap}>
                        <div className={styles.cancel} onClick={() => onCreate(false)}>Отмена</div>
                        <div className={styles.add} onClick={() => AddSafe()}>Добавить</div>
                    </div>
                </div>
            </PopUp>
        </>
    )
}

export default CreateSafe
