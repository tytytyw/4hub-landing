import React from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkBars.module.sass';
import classNames from "classnames";

const WorkBars = ({children, shop}) => {

    const size = useSelector(state => state.PrivateCabinet.size)
    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles)

    return (

        <div
            className={classNames({
                [styles.wrapper]: true,
                [styles.shop]: !!shop,
                [styles?.[`wrapper_${size}`]]: size !== 'medium'
            })}
            style={{height: `${recentFiles?.length > 0 ? 'calc(100% - 90px - 80px)' : 'calc(100% - 90px - 55px)'}`}}
        >
            {children}
        </div>
    )
}

export default WorkBars;
