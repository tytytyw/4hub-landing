import React from 'react'
import styles from './SelectFile.module.sass'
import PopUp from "../../../../../generalComponents/PopUp";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TextButton from '../../../../../generalComponents/TextButton';

const SelectFile = ({ nullifyAction, title }) => {

    const chatTheme = useSelector(state => state.Cabinet.chat.theme)


    return (
        <PopUp set={nullifyAction} background={chatTheme.name === 'dark' ? '#292929' : ''}>
            <div className={styles.selectFileWrapper}>
                <span className={styles.title}>{title}</span>
                <div className={styles.crossWrapper} onClick={nullifyAction}>
                    <span className={styles.cross} />
                </div>

                <div className={styles.filesWrapper}></div>

                <div className={styles.buttonsWrap}>
                    <div className={styles.cancelButtonWrapper}><TextButton text='Отмена' type='cancel' /></div>
                    <TextButton text='Отправить' type='ok' />
                </div>
            </div>

        </PopUp>
    )
}
export default SelectFile

SelectFile.propTypes = {
    nullifyAction: PropTypes.func.isRequired,
    title: PropTypes.string
};
