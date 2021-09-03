import React from 'react'

import styles from './ProgramBar.module.sass'
import classNames from "classnames";

const ProgramBar = ({program, chosenProgram, setChosenProgram, setMouseParams, size}) => {

    return (
        <div
            className={classNames({
                [styles.wrapper]: true,
                [styles.active]: chosenProgram?.id === program?.id,
                [styles?.[`wrapper_${size}`]]: size !== 'medium'
            })}
            onClick={() => setChosenProgram(program)}
            //onDoubleClick={() => setFilePreview({...filePreview, view: true, program})}
        >
            <div
                className={styles.menu}
                onClick={e => {
                    setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30, type: 'program'})
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