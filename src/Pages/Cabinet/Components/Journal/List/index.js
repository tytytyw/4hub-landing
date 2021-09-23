import React from 'react';

import styles from './List.module.sass';
import classNames from "classnames";
import {imageSrc} from '../../../../../generalComponents/globalVariables';

const List = ({title, src, setListCollapsed = () => {}, listCollapsed, children, onCreate, icon = true}) => {

    return (
        <div
            className={classNames({
                [styles.listWrap]: true,
                [styles.listWrapCollapsed]: !!listCollapsed
            })}
        >
            <div className={styles.header}>
                {!listCollapsed && <span>Журлнал действий</span>}
                <div className={styles.imgWrap}>
                    <img
                        className={`${styles.playButton} ${listCollapsed ? styles.playButtonReverse : undefined}`}
                        src={imageSrc + 'assets/PrivateCabinet/play-grey.svg'}
                        alt='play'
                        onClick={() => setListCollapsed(!listCollapsed)}
                    />
                </div>
            </div>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
}

export default List;
