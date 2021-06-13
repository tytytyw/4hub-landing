import React from 'react'

import styles from './WorkBarsPreview.module.sass'

const WorkBarsPreview = () => {

    return (
        <div
            className={styles.wrapper}
            style={{height: 'calc(100% - 90px - 55px)'}}
        >

            <div className={styles.workBarsPreview}>

                <div className={styles.previewImg}>
                    <img src="./assets/PrivateCabinet/Bitmap.png" alt="Bitmap"/>
                </div>

                <div className={styles.previewSlider}>

                    <div className={styles.current}>
                        <img src="./assets/PrivateCabinet/Bitmap.png" alt="Bitmap"/>
                    </div>

                    <div className={styles.scrollBar}>
                        <ul className={styles.scrollList}>
                            <li className={styles.scrollItem}>
                                <img src="./assets/PrivateCabinet/screen.png" alt="Screen"/>
                            </li>
                            <li className={styles.scrollItem}>
                                <img src="./assets/PrivateCabinet/screen.png" alt="Screen"/>
                            </li>
                            <li className={styles.scrollItem}>
                                <img src="./assets/PrivateCabinet/screen.png" alt="Screen"/>
                            </li>
                            <li className={styles.scrollItem}>
                                <img src="./assets/PrivateCabinet/screen.png" alt="Screen"/>
                            </li>
                            <li className={styles.scrollItem}>
                                <img src="./assets/PrivateCabinet/screen.png" alt="Screen"/>
                            </li>
                            <li className={styles.scrollItem}>
                                <img src="./assets/PrivateCabinet/screen.png" alt="Screen"/>
                            </li>
                            <li className={styles.scrollItem}>
                                <img src="./assets/PrivateCabinet/screen.png" alt="Screen"/>
                            </li>
                            <li className={styles.scrollItem}>
                                <img src="./assets/PrivateCabinet/screen.png" alt="Screen"/>
                            </li>
                            <li className={styles.scrollItem}>
                                <img src="./assets/PrivateCabinet/screen.png" alt="Screen"/>
                            </li>
                            <li className={styles.scrollItem}>
                                <img src="./assets/PrivateCabinet/screen.png" alt="Screen"/>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.prevImg}>
                        <img src="./assets/PrivateCabinet/current.png" alt="Prev"/>
                    </div>

                </div>

            </div>

            <div className={styles.workPreviewData}>

                <div className={styles.previewHeader}>
                    <div className={styles.previewImgSm}>
                        <img src="./assets/PrivateCabinet/Bitmap.png" alt="Bitmap"/>
                    </div>
                    <div className={styles.previewInfo}>
                        <h4>Дизайн Moto</h4>
                        <p>
                            <span>JPEG</span> - <span>10</span> МБ
                        </p>
                    </div>
                </div>

                <div className={styles.previewFileWrap}>

                    {/*<span className={styles.fileName}>{f.name}</span>*/}

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
                        <img src={`./assets/PrivateCabinet/smiles/cool.svg`} alt='sign'/>
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

                </div>

            </div>

        </div>
    )
}

export default WorkBarsPreview