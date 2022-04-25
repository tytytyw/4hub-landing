import React, { useEffect, useRef } from 'react'
import styles from './Settings.module.sass'
import PropTypes from "prop-types";
import { useLocales } from "react-localized";
import { ReactComponent as Arrow } from "../../../../../assets/PrivateCabinet/icons/arrow-2.svg";
import classNames from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { changeChatTheme } from '../../../../../Store/actions/CabinetActions'

const Settings = ({ close }) => {
    const { __ } = useLocales();
    const activeTheme = useSelector(state => state.Cabinet.chat.theme)
    const themes = [
        { name: 'white', background: '#fff', title: __('Белый'), textColor: '#49494B', iconColor: '#B8B8B8', inputBgColor: '#F7F7F7', inputColor: '#AEAEAE', accentColor: '' },
        { name: 'dark', background: '#323232', title: __('Темный'), textColor: '#fff', iconColor: '#fff', inputBgColor: '#292929', inputColor: '#fff', accentColor: '#272727' }
    ];
    const initialTheme = useRef({ intialTheme: null, saved: false })
    const dispatch = useDispatch()

    const themeHandler = (theme) => dispatch(changeChatTheme(theme))
    const onExit = () => {
        themeHandler(initialTheme.current.theme);
        close()
    }
    const saveSettings = () => initialTheme.current.saved = true

    useEffect(() => {
        if (activeTheme) initialTheme.current.theme = activeTheme
        return () => {
            if (!initialTheme.current.saved && initialTheme.current.theme) themeHandler(initialTheme.current.theme)
        }
    }, [])


    return (
        <div className={styles.wrapper}>
            <div className={styles.topPanel}>
                <div className={styles.backButtonWrapper}><Arrow />
                    <button className={styles.button} onClick={onExit}>{__('Назад')}</button>
                </div>
                <p className={styles.text}>{__('Выберите фон чата')}</p>
                <button className={styles.button} onClick={saveSettings}>{__('Сохранить')}</button>
            </div>
            <div className={styles.colorPicker}>
                {themes.map(theme => (
                    <div className={styles.colorWrapper} key={theme.title} onClick={() => themeHandler(theme)}>
                        <div className={styles.flexWrapper}>
                            <div className={classNames({ [styles.radio]: true, [styles.chosen]: activeTheme.name === theme.name })}></div>
                            <p className={styles.colorName}>{theme.title}</p>
                        </div>
                        <div style={{ background: theme.background }} className={styles.colorPreview}></div>
                    </div>))}
            </div>
        </div>
    )
}

export default Settings

Settings.propTypes = {
    close: PropTypes.func.isRequired
}