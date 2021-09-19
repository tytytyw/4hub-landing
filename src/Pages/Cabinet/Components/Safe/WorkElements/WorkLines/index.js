import React from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkLines.module.sass';

const WorkLines = ({children, filePick}) => {

    const search = useSelector(state => state.Cabinet?.search);

    return(
        <div
            className={styles.workLinesWrap}
        >
            {children?.length === 0 && search.length !== 0
                ? <div
                    className={styles.noSearchResults}
                >Нет элементов удовлетворяющих условиям поиска</div>
                : null}
            {children}
        </div>)
}

export default WorkLines;