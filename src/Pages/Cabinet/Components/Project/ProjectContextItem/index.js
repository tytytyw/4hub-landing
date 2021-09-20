import React from 'react'

import styles from './ProjectContextItem.module.sass'

const ProjectContextItem = ({text, imageSrc, callback}) => {

    return (
        <div onClick={() => callback()} className={styles.item}>
            <div className={styles.imgWrap}>
                <img
                    src={imageSrc}
                    alt={text}
                />
            </div>
            <p>{text}</p>
        </div>
    )
}

export default ProjectContextItem