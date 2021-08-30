import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from './WorkBars.module.sass';
import {ReactComponent as AddIcon} from '../../../../../../assets/PrivateCabinet/plus-3.svg';
import {onChooseFiles} from "../../../../../../Store/actions/PrivateCabinetActions";
import {imageSrc} from '../../../../../../generalComponents/globalVariables';
import Loader from "../../../../../../generalComponents/Loaders/4HUB";

const WorkBars = ({
          children, fileSelect, hideUploadFile, page, setPage, fileRef, chosenFolder,
          gLoader
}) => {

    const size = useSelector(state => state.PrivateCabinet.size);
    const search = useSelector(state => state.PrivateCabinet.search);
    const fileList = useSelector(state => state.PrivateCabinet.fileList)
    const [loadingFiles, setLoadingFiles] = useState(false);
    const dispatch = useDispatch();

    const onSuccessLoading = () => {
        setLoadingFiles(false);
        setPage(page => page + 1);
    }

    const loadFiles = e => {
        if(!loadingFiles && (e.target.scrollHeight - e.target.offsetHeight - 200 < e.target.scrollTop)) {
            if(chosenFolder?.files_amount > fileList.files.length) {
                setLoadingFiles(true);
                dispatch(onChooseFiles(fileList.path, search, page, onSuccessLoading));
            }
        }
    }

    return (
        <div
            ref={fileRef}
            className={styles.workBarsWrap}
            style={{
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
            {!hideUploadFile ? <div
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
        </div>
    )
}

export default WorkBars;
