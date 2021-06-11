import React from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkLines.module.sass';

const WorkLines = ({children}) => {

    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles);

    return(<div className={styles.workLinesWrap} style={{height: `${recentFiles?.length > 0 ? 'calc(100% - 90px - 55px - 78px)' : 'calc(100% - 90px - 55px)'}`}}>
        {children}
    </div>)
}

export default WorkLines;