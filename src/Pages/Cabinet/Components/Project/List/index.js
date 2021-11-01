import React from 'react'

import styles from './List.module.sass'
import classNames from "classnames";
import {imageSrc} from '../../../../../generalComponents/globalVariables';

const List = React.forwardRef(({title, src, setListCollapsed, listCollapsed, children, onCreate, icon = true, className}, ref) => {

    return (
        <div
            className={classNames({
                [styles.listWrap]: true,
                [className]: true,
                [styles.listWrapCollapsed]: !!listCollapsed
             })}
            ref={ref ?? null}
        >
            <div className={styles.header}>
                {!listCollapsed && <span>{title}</span>}
                <div className={styles.imgWrap}>
                    <img
                        className={`${styles.playButton} ${listCollapsed ? styles.playButtonReverse : undefined}`}
                        src={`${imageSrc}/assets/PrivateCabinet/play-grey.svg`}
                        alt='play'
                        onClick={() => setListCollapsed(!listCollapsed)}
                    />
                    {!!icon &&
                    <img
                        className={styles.icon}
                        src={`${imageSrc}/assets/PrivateCabinet/${src}`}
                        alt='icon'
                        onClick={() => onCreate(true)}
                    />}
                </div>
            </div>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
})

export default List
