import React, {useState} from 'react'

import styles from './Personal.module.sass'
import {ReactComponent as BellIcon} from '../../../../../assets/PrivateCabinet/bell.svg'
import classNames from 'classnames'
import Select from '../../../../../generalComponents/Select/Select'
import Button from '../Button'
import {resetPersonalSettings, setPersonalSettings, setPreviewTheme} from '../../../../../Store/actions/main'
import {useDispatch, useSelector} from 'react-redux'

const langs = [
    {id: 'ru', text: 'Русский'},
    {id: 'en', text: 'English'},
    {id: 'uk', text: 'Украинский'},
]

const Personal = () => {

    const dispatch = useDispatch()
    const personalSettings = useSelector(state => state.main.personalSettings)
    const previewTheme = useSelector(state => state.main.previewTheme)

    let currentTheme = previewTheme || personalSettings?.theme

    const [fields, setFields] = useState({
        theme: currentTheme
    })

    const onSubmit = event => {
        event.preventDefault()
        dispatch(setPersonalSettings(fields))
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.title}>
                <h4>Персонализация</h4>
            </div>

            <form
                noValidate
                onSubmit={onSubmit}
                className={styles.form}
            >
                <div className={styles.formItem}>
                    <label className={styles.label}>Уведомления</label>
                    <div className={styles.formBlock}>

                        <div className={styles.option}>
                            <BellIcon/>
                            <p>Звуковое оповещение</p>
                        </div>

                        <div
                            className={styles.switcher}
                            onClick={() => setFields({...fields, notify: !fields?.notify})}
                        >
                            <div className={classNames({
                                [styles.switch]: true,
                                [styles.active]: !!fields?.notify
                            })} />
                        </div>

                    </div>
                </div>

                <div className={styles.formItem}>
                    <label className={styles.label}>Тема</label>
                    <div className={styles.radioBlockWrapper}>

                        <div
                            className={styles.radioBlock}
                            onClick={() => {
                                setFields({...fields, theme: 'blue'})
                                dispatch(setPreviewTheme('blue'))
                            }}
                        >
                            <div className={styles.radio}>
                                <input
                                    name='theme'
                                    id='blue'
                                    type="radio"
                                    className={styles.radioInput}
                                    checked={fields?.theme === 'blue'}
                                    onChange={() => {}}
                                />
                                <label htmlFor='blue'>Синий</label>
                            </div>
                            <div
                                style={{
                                    backgroundImage: 'linear-gradient(180deg, #4543F7 0%, #0A3AAB 100%)'
                                }}
                                className={styles.colorBlock}
                            />
                            <button
                                style={{background: '#4086F1'}}
                                className={styles.button}
                            >
                                Кнопка
                            </button>
                        </div>

                        <div
                            className={styles.radioBlock}
                            onClick={() => {
                                setFields({...fields, theme: 'orange'})
                                dispatch(setPreviewTheme('orange'))
                            }}
                        >
                            <div className={styles.radio}>
                                <input
                                    name='theme'
                                    id='orange'
                                    type="radio"
                                    className={styles.radioInput}
                                    checked={fields?.theme === 'orange'}
                                    onChange={() => {}}
                                />
                                <label htmlFor='orange'>Оранжевый</label>
                            </div>
                            <div
                                style={{
                                    backgroundImage: 'linear-gradient(180deg, #EA7D30 0%, #EA4631 100%)'
                                }}
                                className={styles.colorBlock}
                            />
                            <button
                                style={{background: '#F58338'}}
                                className={styles.button}
                            >
                                Кнопка
                            </button>
                        </div>

                        <div
                            className={styles.radioBlock}
                            onClick={() => {
                                setFields({...fields, theme: 'turquoise'})
                                dispatch(setPreviewTheme('turquoise'))
                            }}
                        >
                            <div className={styles.radio}>
                                <input
                                    name='theme'
                                    id='turquoise'
                                    type="radio"
                                    className={styles.radioInput}
                                    checked={fields?.theme === 'turquoise'}
                                    onChange={() => {}}
                                />
                                <label htmlFor='turquoise'>Берюзовый</label>
                            </div>
                            <div
                                style={{
                                    backgroundImage: 'linear-gradient(180deg, #10AADD 0%, #18697C 100%)'
                                }}
                                className={styles.colorBlock}
                            />
                            <button
                                style={{background: '#10AADC'}}
                                className={styles.button}
                            >
                                Кнопка
                            </button>
                        </div>

                    </div>
                </div>

                <div className={styles.formItem}>
                    <label className={styles.label}>Язык интерфейса</label>
                    <div className={styles.select}>
                        <Select
                            initValue='ru'
                            data={langs}
                            className={styles.selectWrap}
                        />
                    </div>
                </div>


                <div className={styles.submitBlock}>
                    <Button
                        className={styles.cancelBtn}
                        onClick={() => {
                            setFields({})
                            dispatch(resetPersonalSettings())
                        }}
                    >
                        Отмена
                    </Button>
                    <Button
                        type='submit'
                        className={styles.submitBtn}
                    >
                        Сохранить
                    </Button>
                </div>

            </form>

        </div>
    )
}

export default Personal