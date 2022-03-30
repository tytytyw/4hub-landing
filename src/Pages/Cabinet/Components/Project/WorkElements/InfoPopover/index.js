import React from 'react'
import styles from './InfoPopover.module.sass'
import {imageSrc} from '../../../../../../generalComponents/globalVariables';
import {useLocales} from "react-localized";

const InfoPopover = ({set}) => {
    const { __ } = useLocales();
    return (
        <div className={styles.popover}>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{ __('Теги') }</span>
                <span className={styles.addItem}>{ __('Добавить теги') }</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{ __('Цвет') }</span>
                <span className={styles.colorCircle}/>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{ __('Эмоджи') }</span>
                <img src={`${imageSrc}assets/PrivateCabinet/smiles/cool.svg`} alt='sign'/>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{ __('Знаки') }</span>
                <span className={styles.addItem}>{ __('Добавить знак') }</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{ __('Тег') }</span>
                <span className={styles.description}>{ __('#Дизайн сайта') }</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{ __('Создан') }</span>
                <span className={styles.description}>19.08.2019</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{ __('Изменен') }</span>
                <span className={styles.description}>19.08.2019</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{ __('Размеры') }</span>
                <span className={styles.description}>1920 х 3886</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{ __('Резрешение') }</span>
                <span className={styles.description}>72 х 72</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>{ __('Добавил') }</span>
                <span className={styles.itemBlock}>
                    <img className={styles.itemImg} src={`${imageSrc}assets/PrivateCabinet/avatars/a1.svg`} alt="Avatar"/>
                    <p className={styles.description}>Недельский Дмитрий</p>
                </span>
            </div>

        </div>
    )
}

export default InfoPopover