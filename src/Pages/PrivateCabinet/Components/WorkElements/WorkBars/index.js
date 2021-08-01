import React from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkBars.module.sass';
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/plus-3.svg';

const WorkBars = ({children, fileSelect, filePick, hideUploadFile}) => {

    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles);
    const size = useSelector(state => state.PrivateCabinet.size);
    const search = useSelector(state => state.PrivateCabinet.search);

    return (

        <div
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
            {!hideUploadFile && <div
                onClick={fileSelect}
                className={`
                    ${styles.addFile}
                    ${size === 'medium' ? styles.mediumSize : null}
                    ${size === 'small' ? styles.smallSize : null}
                `}
            >
                <AddIcon className={styles.addIcon} />
                <span>Перетащите файл или нажмите загрузить</span>
            </div>}
            {(!children || children?.length === 0) && search.length === 0
                ? <img
                    src='./assets/PrivateCabinet/addPropose.png'
                    alt='addFile'
                    className={size === 'big'
                        ? styles.textAddIcon
                        : size === 'medium'
                            ? styles.textAddIconMedium
                            : styles.textAddIconSmall
                    }
                />
                : null}
            {children?.length === 0 && search.length !== 0
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
            {children}
        </div>
    )
}

export default WorkBars;
