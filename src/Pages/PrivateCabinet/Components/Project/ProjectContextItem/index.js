import React from 'react'

import styles from './ProjectContextItem.module.sass'

const ProjectContextItem = ({text, imageSrc}) => {

    return (
        <div className={styles.item}>
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