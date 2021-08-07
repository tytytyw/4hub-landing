import React, {useState} from 'react'
import PopUp from '../../../../../../generalComponents/PopUp'

import styles from './CodePopup.module.sass'
import Input from '../../../MyProfile/Input'
import Button from '../../../MyProfile/Button'
import SafeIcon from "../../SafeIcon";
import ErrorPass from "../ErrorPass";
import RecoverPass from "../RecoverPass";
import {useDispatch} from 'react-redux'
import {onGetSafeAccess, onGetSafeFileList} from "../../../../../../Store/actions/PrivateCabinetActions";

const CodePopup = ({safe, set, refreshPass, setRefreshPass}) => {

    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [errPass, setErrPass] = useState(false)
    const [recoverPass, setRecoverPass] = useState(false)
    const [errors, setErrors] = useState({})
    //TODO: remove
    const [filelist, setfilelist] = useState(false)

    const formIsValid = () => {
        setErrors({
            password: !password
        })
        return !!password
    }

    const onEnter = () => {
        
        if (formIsValid()) {
            dispatch(onGetSafeAccess(password, safe.id))
            setfilelist(true)
        }
    }

    const getFileList = () => {
        console.log("click")
        dispatch(onGetSafeFileList(1, safe.id))
    }

    return (
        <>

            {!errPass && !recoverPass &&
            <PopUp set={set}>

                <div className={styles.wrapper}>

                    <div className={styles.top}>

                        <div className={styles.closeWrap}>
                            <div
                                className={styles.close}
                                onClick={() => set(false)}
                            >
                                <span className={styles.times}/>
                            </div>
                        </div>

                    </div>

                    <div className={styles.content}>

                        <div className={styles.titleWrap}>
                            <SafeIcon
                                type={safe?.color}
                                className={styles.titleImg}
                            />
                            <h4 className={styles.title}>{safe?.name}</h4>
                        </div>

                        <div className={styles.inputWrap}>
                            <Input
                                placeholder='Введите пароль'
                                className={styles.input}
                                isMistake={errors?.password}
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                            <span
                                className={styles.link}
                                onClick={() => setRecoverPass(true)}
                            >
                            Забыли пароль?
                        </span>
                        </div>

                        {/* <p className={styles.orItem}>или</p>

                        <div className={styles.inputWrap}>
                            <Input
                                placeholder='Введите номер телефона (форма ввода +3 )'
                                label={false}
                                name='tel'
                                className={styles.input}
                                phone={true}
                            />
                            <span className={styles.link}>Не пришол код?</span>
                        </div> */}

                        {filelist &&  <Button
                                placeholder='CODE'
                                className={styles.input}
                                onClick={getFileList}

                            />}

                        <div className={styles.actionBlock}>
                            <Button
                                type='submit'
                                className={styles.actionBtn}
                                onClick={onEnter}
                            >
                                Войти
                            </Button>
                        </div>

                    </div>
                </div>

            </PopUp>}

            {recoverPass &&
            <RecoverPass
                refreshPass={refreshPass}
                setRefreshPass={setRefreshPass}
                safe={safe}
                set={setRecoverPass}
            />}
            {errPass && <ErrorPass set={setErrPass}/>}

        </>
    )

}

export default CodePopup
