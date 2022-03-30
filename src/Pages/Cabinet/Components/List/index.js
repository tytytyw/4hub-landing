import React from 'react';

import styles from './List.module.sass';
import classNames from "classnames";
import {imageSrc} from '../../../../generalComponents/globalVariables';
import {useLocales} from "react-localized";

const List = ({title, src, setListCollapsed, listCollapsed, children, onCreate, icon = true}) => {
    const { __ } = useLocales();
    return (
        <div
            className={classNames({
                [styles.listWrap]: true,
                [styles.listWrapCollapsed]: !!listCollapsed
            })}
            title={listCollapsed ? title : ''}
        >
            <div className={styles.header}>
                {!listCollapsed && <span>{title}</span>}
                <span />
                <div className={styles.imgWrap}>
                <img
                    className={`${styles.playButton} ${listCollapsed ? styles.playButtonReverse : undefined}`}
                    src={`${imageSrc}assets/PrivateCabinet/play-grey.svg`}
                    alt='play'
                    onClick={() => setListCollapsed(!listCollapsed)}
                    title={listCollapsed ? __('Развернуть') : __('Свернуть')}
                />
                    {!!icon &&
                    <img
                        className={styles.icon}
                        src={`${imageSrc}assets/PrivateCabinet/${src}`}
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
}

export default List;
