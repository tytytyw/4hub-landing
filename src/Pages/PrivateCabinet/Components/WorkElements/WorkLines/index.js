import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './WorkLines.module.sass';
import {onChooseFiles} from "../../../../../Store/actions/PrivateCabinetActions";
import Loader from "../../../../../generalComponents/Loaders/4HUB";

const WorkLines = ({
       children, filePick, page, setPage, fileRef, chosenFolder, gLoader
}) => {

    const recentFiles = useSelector(state => state.PrivateCabinet?.recentFiles);
    const search = useSelector(state => state.PrivateCabinet?.search);
    const size = useSelector(state => state.PrivateCabinet.size);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const dispatch = useDispatch();

    // Loading files to full the page
    useEffect(() => {onCheckFilesPerPage()}, [size, page, chosenFolder?.files_amount]) // eslint-disable-line

    const onSuccessLoading = (result) => {
        setLoadingFiles(false);
        result > 0 ? setPage(page => page + 1) : setPage(0);
    }

    const loadFiles = (e, access) => {
        if(!loadingFiles && ((e?.target?.scrollHeight - e?.target?.offsetHeight - 200 < e?.target?.scrollTop) || access) && page > 0) {
            if(chosenFolder?.files_amount > fileList?.files.length) {
                setLoadingFiles(true);
                dispatch(onChooseFiles(fileList?.path, search, page, onSuccessLoading, ''));
            }
        }
    }

    const onCheckFilesPerPage = () => {
        if(fileRef?.current && fileRef?.current?.offsetHeight === fileRef?.current?.scrollHeight&& fileList?.path === chosenFolder?.path) {
            loadFiles('', true);
        }
    }

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
            onScroll={loadFiles}
        >
            {children?.length === 0 && search.length !== 0
                ? <div
                    className={styles.noSearchResults}
                >Нет элементов удовлетворяющих условиям поиска</div>
                : null}
            {gLoader ? <Loader
                type='squarify'
                position='absolute'
                background='rgba(255, 255, 255, 0.75)'
                zIndex={5}
            /> : children}
            <div
                className={styles.bottomLine}
                style={{height: loadingFiles ? '100px' : '40px'}}
            >
                {loadingFiles && !gLoader ? <Loader
                    type='switch'
                    position='absolute'
                    background='white'
                    zIndex={5}
                    width='100px'
                    height='100px'

                /> : null}
            </div>
        </div>)
}

export default WorkLines;