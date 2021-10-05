import React from 'react'
import styles from './InfoPopover.module.sass'
import {imageSrc} from '../../../../../../generalComponents/globalVariables';

const InfoPopover = ({set}) => {

    return (
        <div className={styles.popover}>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Теги</span>
                <span className={styles.addItem}>Добавить теги</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Цвет</span>
                <span className={styles.colorCircle}/>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Эмоджи</span>
                <img src={`${imageSrc}assets/PrivateCabinet/smiles/cool.svg`} alt='sign'/>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Знаки</span>
                <span className={styles.addItem}>Добавить знак</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Тег</span>
                <span className={styles.description}>#Дизайн сайта</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Создан</span>
                <span className={styles.description}>19.08.2019</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Изменен</span>
                <span className={styles.description}>19.08.2019</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Размеры</span>
                <span className={styles.description}>1920 х 3886</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Резрешение</span>
                <span className={styles.description}>72 х 72</span>
            </div>

            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Добавил</span>
                <span className={styles.itemBlock}>
                            <img className={styles.itemImg} src={`${imageSrc}assets/PrivateCabinet/avatars/a1.svg`} alt="Avatar"/>
                            <p className={styles.description}>Недельский Дмитрий</p>
                        </span>
            </div>

        </div>
    )
}

export default InfoPopover