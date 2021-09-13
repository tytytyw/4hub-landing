import React from 'react'

import styles from './Standards.module.sass'
import logoImg from '../../../../../assets/BusinessCabinet/logo.png'
import printerImg from '../../../../../assets/BusinessCabinet/print.svg'
import pointerMenuImg from '../../../../../assets/BusinessCabinet/pointer-menu.svg'

const Standards = ({setPageOption}) => {

    return (
        <div className={styles.wrapper}>

            <div className={styles.printWrapper}>
                <button className={styles.printBtn}>
                    <img src={printerImg} alt="Print"/>
                </button>
                <button className={styles.printBtn}>
                    <img src={pointerMenuImg} alt="Options"/>
                </button>
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <img className={styles.logoImg} src={logoImg} alt=""/>
                </div>

                <h2 className={styles.title}>Стандарты компании</h2>
                <p className={styles.text}>
                    Это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                    <br/>
                    <br/>
                    В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
                    <br/>
                    <br/>
                    часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                    <br/>
                    <br/>
                    В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
                    часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                    <br/>
                    <br/>
                    часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                    <br/>
                    <br/>
                    В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время,
                </p>
            </div>

        </div>
    )
}

export default Standards