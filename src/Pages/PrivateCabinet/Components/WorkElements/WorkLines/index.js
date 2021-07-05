import React from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkLines.module.sass';

const WorkLines = ({children}) => {

    const recentFiles = useSelector(state => state.PrivateCabinet?.recentFiles);
    const search = useSelector(state => state.PrivateCabinet?.search);

    return(
        <div className={styles.workLinesWrap} style={{height: `${recentFiles?.length > 0 ? 'calc(100% - 90px - 55px - 78px)' : 'calc(100% - 90px - 55px)'}`}}>
            {children?.length === 0 && search.length !== 0
                ? <div
                    className={styles.noSearchResults}
                >Нет элементов удовлетворяющих условиям поиска</div>
                : null}
            {children}
        </div>)
}

export default WorkLines;