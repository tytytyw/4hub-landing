import React from 'react'
import styles from './Settings.module.sass'
import PropTypes from "prop-types";
import { useLocales } from "react-localized";
import { ReactComponent as Arrow } from "../../../../../assets/PrivateCabinet/icons/arrow-2.svg";
import classNames from 'classnames';


const Settings = ({ close }) => {
    const { __ } = useLocales();
    const themes = [{ background: 'white', name: __('Белый'), color: '#fff' }, { background: 'dark', name: __('Темный'), color: '#3F3F3F' }];

    const saveSettings = console.log('save()')

    return (
        <div className={styles.wrapper}>
            <div className={styles.topPanel}>
                <div className={styles.backButtonWrapper}><Arrow />
                    <button className={styles.button} onClick={close}>{__('Назад')}</button>
                </div>
                <p className={styles.text}>{__('Выберите фон чата')}</p>
                <button className={styles.button} onClick={saveSettings}>{__('Сохранить')}</button>
            </div>
            <div className={styles.colorPicker}>
                {themes.map(theme => (
                    <div className={styles.colorWrapper} key={theme.name}>
                        <div className={styles.flexWrapper}>
                            <div className={classNames({ [styles.radio]: true, [styles.chosen]: false })}></div>
                            <p className={styles.colorName}>{theme.name}</p>
                        </div>
                        <div style={{ background: theme.color }} className={styles.colorPreview}></div>
                    </div>))}
            </div>
        </div>
    )
}

export default Settings

Settings.propTypes = {
    close: PropTypes.func.isRequired
}