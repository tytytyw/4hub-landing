import React from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkBars.module.sass';
import classNames from "classnames";

const WorkBars = ({children, shop}) => {

    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles)

    return (

        <div
            className={classNames({
                [styles.workBarsWrap]: true,
                [styles.shop]: !!shop
            })}
            style={{height: `${recentFiles?.length > 0 ? 'calc(100% - 90px - 55px - 78px)' : 'calc(100% - 90px - 55px)'}`}}
        >
            {children}
        </div>
    )
}

export default WorkBars;
