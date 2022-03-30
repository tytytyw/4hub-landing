import React from 'react'

import styles from './Programs.module.sass'
import ContactMenu from '../Contacts/ContactMenu/ContactMenu'
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import {useLocales} from "react-localized";

const Programs = () => {
    const { __ } = useLocales()

    const menuData = [
        {
            id: 'all_contact',
            icon: `${imageSrc}assets/PrivateCabinet/idea-2.svg`,
            label: __('Все контакты')
        },
        {
            id: 'art',
            icon: `${imageSrc}assets/PrivateCabinet/brush.svg`,
            label: __('Творчество')
        },
        {
            id: 'office',
            icon: `${imageSrc}assets/PrivateCabinet/folder-2.svg`,
            label: __('Офис')
        },
    ]

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
                                    src={`${imageSrc}assets/PrivateCabinet/sketch.svg`}
                                    alt="Sketch"
                                />
                                <p>Sketch</p>
                            </div>
                            <div className={styles.programText}>
                                <p>{ __('Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и') }</p>
                                <p>{ __('Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной') }</p>
                            </div>
                        </li>
                        <li className={styles.programItem}>
                            <div className={styles.programImage}>
                                <img
                                    src={`${imageSrc}assets/PrivateCabinet/icZeplin.svg`}
                                    alt="Sketch"
                                />
                                <p>Zeplin</p>
                            </div>
                            <div className={styles.programText}>
                                <p>{ __('Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и') }</p>
                                <p>{ __('Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной') }</p>
                            </div>
                        </li>
                        <li className={styles.programItem}>
                            <div className={styles.programImage}>
                                <img
                                    src={`${imageSrc}assets/PrivateCabinet/adobe-2.svg`}
                                    alt="Sketch"
                                />
                                <p>Sketch</p>
                            </div>
                            <div className={styles.programText}>
                                <p>{ __('Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и') }</p>
                                <p>{ __('Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной') }</p>
                            </div>
                        </li>
                        <li className={styles.programItem}>
                            <div className={styles.programImage}>
                                <img
                                    src={`${imageSrc}assets/PrivateCabinet/adobe.svg`}
                                    alt="Sketch"
                                />
                                <p>Photoshop</p>
                            </div>
                            <div className={styles.programText}>
                                <p>{ __('Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и') }</p>
                                <p>{ __('Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной Это текст-"рыба", часто используемый в и вэб-дизайне. Lorem Ipsum является стандартной часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной') }</p>
                            </div>
                        </li>
                    </ul>

                </div>

            </div>

        </div>
    )
}

export default Programs