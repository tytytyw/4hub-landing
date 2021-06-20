import React, {useEffect, useRef} from 'react'

import styles from './ProjectContext.module.sass'

const ProjectContext = ({data = [], set}) => {

    const ref = useRef()

    useEffect(() => {

        const onClick = event => {
            if (!ref.current?.contains(event.target)) {
                set(null)
            }
        }

        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div ref={ref} className={styles.wrapper}>
            <ul className={styles.list}>
                {data?.map((item, index) => (
                    <li
                        key={index}
                        className={styles.item}
                    >
                        <div className={styles.imgWrap}>
                            <img
                                src={`./assets/PrivateCabinet/contextMenuProject/${item.img}.svg`}
                                alt={item.name}
                            />
                        </div>
                        <p>{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProjectContext