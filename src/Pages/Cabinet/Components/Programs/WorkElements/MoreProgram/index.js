import React from 'react'

import styles from './MoreProgram.module.sass'
import StarRating from '../StarRating'
import {categories} from "../../consts";
import {imageSrc} from '../../../../../../generalComponents/globalVariables';

const MoreProgram = ({program, ...props}) => {
    return (
        <div className={styles.wrapper}>

            <div className={styles.top}>

                <div className={styles.topLeft}>
                    <div className={styles.contentImage}>
                        <img
                            src={program?.icon}
                            alt={program?.name}
                        />
                    </div>
                    <div className={styles.contentInfo}>
                        <div>
                            <p className={styles.title}>{program?.name}</p>
                            <p className={styles.category}>{categories?.[program?.category]}</p>
                            <a href={program?.site} className={styles.link}>{program?.site}</a>
                        </div>
                        <div>
                            <div className={styles.rating}>
                                <p className={styles.ratingInfo}>{program?.rating}</p>
                                <StarRating rating={program?.rating}/>
                            </div>
                            <span className={styles.votes}>{program?.votes} оценок</span>
                        </div>
                    </div>
                </div>

                <div className={styles.topRight}>
                    <button className={styles.buyBtn}>Купить&nbsp;&nbsp;25$</button>
                </div>

            </div>

            <div className={styles.content}>

                <div className={styles.contentPreviews}>
                    <img src={imageSrc + "assets/PrivateCabinet/program_preview_1.svg"} alt="Preview 1"/>
                    <img src={imageSrc + "assets/PrivateCabinet/program_preview_2.svg"} alt="Preview 2"/>
                </div>

                <div className={styles.contentText}>
                    <p>
                        Это текст-"рыба", часто используемый в печати и вэб-дизайне.
                        Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.<br/><br/>
                        В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
                        используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без
                        заметных изменений пять веков, но и перешагнул в электронный дизайн.
                        Его популяризации в новое время послужили публикация листов Letraset с образцами
                        Lorem Ipsum в 60-х годах и, в более недавнее время,
                        программы электронной вёрстки типа Aldus PageMaker,
                        в шаблонах которых используется Lorem Ipsum.
                    </p>
                </div>

            </div>

        </div>
    )
}

export default MoreProgram