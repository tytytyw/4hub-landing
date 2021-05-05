import React from 'react'

import styles from './Programs.module.sass'
import ContactMenu from '../Contacts/ContactMenu/ContactMenu'

const menuData = [
    {
        id: 'all_contact',
        icon: './assets/PrivateCabinet/idea-2.svg',
        label: 'Все контакты'
    },
    {
        id: 'art',
        icon: './assets/PrivateCabinet/brush.svg',
        label: 'Творчество'
    },
    {
        id: 'office',
        icon: './assets/PrivateCabinet/folder-2.svg',
        label: 'Офис'
    },
]

const Programs = () => {


    return (
        <div className={styles.wrapper}>

            <div className={styles.contactMenu}>
                <ContactMenu
                    data={menuData}
                />
            </div>

            <div className={styles.mainContent}>

                <div className={styles.programs}>

                    <ul className={styles.programList}>
                        <li className={styles.programItem}>
                            <div className={styles.programImage}>
                                <img
                                    src="./assets/PrivateCabinet/sketch.svg"
                                    alt="Sketch"
                                />
                                <p>Sketch</p>
                            </div>
                            <div className={styles.programText}>
                                <p>Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и</p>
                                <p>Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной</p>
                            </div>
                        </li>
                        <li className={styles.programItem}>
                            <div className={styles.programImage}>
                                <img
                                    src="./assets/PrivateCabinet/icZeplin.svg"
                                    alt="Sketch"
                                />
                                <p>Zeplin</p>
                            </div>
                            <div className={styles.programText}>
                                <p>Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и</p>
                                <p>Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной</p>
                            </div>
                        </li>
                        <li className={styles.programItem}>
                            <div className={styles.programImage}>
                                <img
                                    src="./assets/PrivateCabinet/adobe-2.svg"
                                    alt="Sketch"
                                />
                                <p>Sketch</p>
                            </div>
                            <div className={styles.programText}>
                                <p>Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и</p>
                                <p>Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной</p>
                            </div>
                        </li>
                        <li className={styles.programItem}>
                            <div className={styles.programImage}>
                                <img
                                    src="./assets/PrivateCabinet/adobe.svg"
                                    alt="Sketch"
                                />
                                <p>Photoshop</p>
                            </div>
                            <div className={styles.programText}>
                                <p>Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и</p>
                                <p>Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной</p>
                            </div>
                        </li>
                    </ul>

                </div>

            </div>

        </div>
    )
}

export default Programs