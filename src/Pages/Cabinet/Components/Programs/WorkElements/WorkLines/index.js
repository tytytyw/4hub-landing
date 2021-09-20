import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './WorkLines.module.sass';

const WorkLines = ({
       children, filePick, page, setPage, fileRef, chosenFolder, gLoader
}) => {

    const recentFiles = useSelector(state => state.Cabinet?.recentFiles);
    const search = useSelector(state => state.Cabinet?.search);
    const size = useSelector(state => state.Cabinet.size);
    const fileList = useSelector(state => state.Cabinet.fileList);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const dispatch = useDispatch();

    // Loading files to full the page
    useEffect(() => {onCheckFilesPerPage()}, [size, page, chosenFolder?.files_amount]) // eslint-disable-line

    return(
        <div
            ref={fileRef}
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
            <div
                className={styles.bottomLine}
                style={{height: loadingFiles ? '100px' : '40px'}}
            >

            </div>
        </div>)
}

export default WorkLines;