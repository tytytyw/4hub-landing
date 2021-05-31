import React from 'react'

import styles from './ProgramShop.module.sass'
import classNames from "classnames"

const ProgramShop = ({program, moreProgram, setMoreProgram}) => {

    return (
        <div
            className={classNames({
                [styles.fileBar]: true,
            })}
            //onDoubleClick={() => setFilePreview({...filePreview, view: true, program})}
        >

            <div className={styles.content}>
                <div
                    className={styles.contentLeft}
                    onClick={() => setMoreProgram(program)}
                >
                    <img
                        className={styles.contentImg}
                        src={program.icon}
                        alt={program.name}
                    />
                    <p className={styles.contentInfo}>{program.name}</p>
                </div>
                <div className={styles.contentRight}>
                    <p>
                        Это текст-"рыба", часто используемый в и
                        вэб-дизайне. Lorem Ipsum является стандартной
                        часто используемый в печати и вэб-дизайне.
                        Lorem Ipsum является стандартной
                    </p>
                    <button className={styles.buyBtn}>Купить&nbsp;&nbsp;25$</button>
                </div>
            </div>

        </div>
    )
}

export default ProgramShop