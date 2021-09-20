import React from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkBars.module.sass';
import classNames from "classnames";

const WorkBars = ({children, shop}) => {

    const size = useSelector(state => state.Cabinet.size)

    return (

        <div className={styles.parentWrap}>
            <div
                className={classNames({
                    [styles.wrapper]: true,
                    [styles.shop]: !!shop,
                    [styles?.[`wrapper_${size}`]]: size !== 'medium'
                })}
            >
                {children}
            </div>
        </div>
    )
}

export default WorkBars;
