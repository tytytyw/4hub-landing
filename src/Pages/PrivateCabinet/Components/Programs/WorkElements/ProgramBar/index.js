import React from 'react'

import styles from './ProgramBar.module.sass'
import classNames from "classnames";

const ProgramBar = ({program, chosenProgram, setChosenProgram, setMouseParams, setFilePreview, filePreview}) => {

    return (
        <div
            className={classNames({
                [styles.fileBar]: true,
                [styles.fileBarChosen]: chosenProgram === program?.id
            })}
            onClick={() => setChosenProgram(program?.id)}
            //onDoubleClick={() => setFilePreview({...filePreview, view: true, program})}
        >
            <div
                className={styles.menu}
                onClick={e => {
                    setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30})
                }}
            >
                <span/>
            </div>

            <div className={styles.content}>
                <img
                    className={styles.contentImg}
                    src={program.icon}
                    alt={program.name}
                />
                <p className={styles.contentInfo}>{program.name}</p>
            </div>

        </div>
    )
}

export default ProgramBar