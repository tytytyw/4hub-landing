import React from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkLines.module.sass';

const WorkLines = ({children, filePick}) => {

    const recentFiles = useSelector(state => state.PrivateCabinet?.recentFiles);
    const search = useSelector(state => state.PrivateCabinet?.search);
    const size = useSelector(state => state.PrivateCabinet.size);

    return(
        <div
            className={styles.workLinesWrap}
            style={{height: `${recentFiles?.length > 0
                    ? filePick.show
                        ? 'calc(100% - 90px - 55px - 78px - 80px)'
                        : 'calc(100% - 90px - 55px - 78px)'
                    : filePick.show
                        ? 'calc(100% - 90px - 55px - 80px)'
                        : 'calc(100% - 90px - 55px)'
                }`,
                gridTemplateColumns: size === 'small'
                    ? 'repeat(auto-fill, 118px)'
                    : size === 'medium'
                        ? 'repeat(auto-fill, 160px)'
                        : 'repeat(auto-fill, 205px)',
                gridAutoRows: size === 'small'
                    ? '118px'
                    : size === 'medium'
                        ? '160px'
                        : '205px',
            }}
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