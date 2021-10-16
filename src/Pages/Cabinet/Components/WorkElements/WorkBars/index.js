import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from './WorkBars.module.sass';
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/plus-3.svg';
import {onChooseFiles, onChooseAllFiles} from '../../../../../Store/actions/CabinetActions';
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import Loader from '../../../../../generalComponents/Loaders/4HUB';
import {useScrollElementOnScreen} from "../../../../../generalComponents/Hooks";

const WorkBars = ({
          children, fileSelect, filePick, hideUploadFile, filesPage, setFilesPage, fileRef, chosenFolder,
          gLoader
}) => {

    const recentFiles = useSelector(state => state.Cabinet.recentFiles);
    const size = useSelector(state => state.Cabinet.size);
    const search = useSelector(state => state.Cabinet.search);
    const fileList = useSelector(state => state.Cabinet.fileList);
    const fileListAll = useSelector(state => state.Cabinet.fileListAll);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const dispatch = useDispatch();

    const onSuccessLoading = (result) => {
        setLoadingFiles(false);
        result > 0 ? setFilesPage(filesPage => filesPage + 1) : setFilesPage(0);
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    }

    const load = (entry) => {
        if(entry.isIntersecting && !loadingFiles && filesPage !== 0 && window.location.pathname === '/'){
            setLoadingFiles(true);
            dispatch(onChooseFiles(fileList?.path, search, filesPage, onSuccessLoading, ''));
        }
        if(entry.isIntersecting && !loadingFiles && filesPage !== 0 && window.location.pathname.includes('files')){
            setLoadingFiles(true);
            dispatch(onChooseAllFiles(fileListAll?.path, search, filesPage, onSuccessLoading, ''));
        }
    }

    const [containerRef] = useScrollElementOnScreen(options, load);

    return (
        <div
            ref={fileRef}
            className={styles.workBarsWrap}
            style={{height: `${recentFiles?.length > 0 
                    ? filePick.show 
                        ? 'calc(100% - 90px - 55px - 78px - 80px)'
                        : 'calc(100% - 90px - 55px - 78px)'
                    : filePick.show 
                        ? 'calc(100% - 90px - 55px - 80px)'
                        : 'calc(100% - 90px - 55px)'
                    }`,
                gridTemplateColumns: size === 'small'
                    ? 'repeat(auto-fill, minmax(118px, 1fr))'
                    : size === 'medium'
                        ? 'repeat(auto-fill, minmax(160px, 1fr))'
                        : 'repeat(auto-fill, minmax(205px, 1fr))',
                gridAutoRows: size === 'small'
                    ? '118px'
                    : size === 'medium'
                        ? '160px'
                        : '205px',
            }}
        >
            {!hideUploadFile && (!children || children?.length === 0) && search.length === 0 ? <div
                onClick={fileSelect}
                className={`
                    ${styles.addFile}
                    ${size === 'medium' ? styles.mediumSize : null}
                    ${size === 'small' ? styles.smallSize : null}
                `}
            >
                <AddIcon className={styles.addIcon} />
                <span>Перетащите файл или нажмите загрузить</span>
            </div> : null}
            {!hideUploadFile && (!children || children?.length === 0) && search.length === 0
                ? <img
                    src={`${imageSrc}assets/PrivateCabinet/addPropose.png`}
                    alt='addFile'
                    className={size === 'big'
                        ? styles.textAddIcon
                        : size === 'medium'
                            ? styles.textAddIconMedium
                            : styles.textAddIconSmall
                    }
                />
                : null}
            {children?.length === 0 && (search.length !== 0 || hideUploadFile)
                ? <div
                    className={styles.noSearchResults}
                    style={{
                        left: size === 'small'
                            ? '158px'
                            : size === 'medium'
                                ? '200px'
                                : '245px',
                    }}
                >Нет элементов удовлетворяющих условиям поиска</div>
                : null}
            {gLoader ? <Loader
                type='bounceDots'
                position='absolute'
                background='rgba(255, 255, 255, 0.75)'
                zIndex={5}
                containerType='bounceDots'
            /> : children}
            {!gLoader ? <div
                className={`${styles.bottomLine} ${filesPage === 0 ? styles.bottomLineHidden : ''}`}
                style={{height: '100%'}}
                ref={containerRef}
            >
                <Loader
                    type='bounceDots'
                    position='absolute'
                    background='white'
                    zIndex={5}
                    width='100px'
                    height='100px'
                    containerType='bounceDots'
                />
            </div> : null}
        </div>
    )
}

export default WorkBars;
