import React from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkBars.module.sass';
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/plus-3.svg';

const WorkBars = ({children, fileSelect, filePick, setFilePick}) => {

    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles);
    const size = useSelector(state => state.PrivateCabinet.size);

    return (

        <div
            className={styles.workBarsWrap}
            style={{}}
        >
            <div
                onClick={fileSelect}
                className={`
                    ${styles.addFile}
                    ${size === 'medium' ? styles.mediumSize : null}
                    ${size === 'small' ? styles.smallSize : null}
                `}
            >
                <AddIcon className={styles.addIcon} />
                <span>Перетащите файл или нажмите загрузить</span>
            </div>
            {!children || children?.length === 0 ? <img
                src='./assets/PrivateCabinet/addPropose.png'
                alt='addFile'
                className={size === 'big'
                    ? styles.textAddIcon
                    : size === 'medium'
                        ? styles.textAddIconMedium
                        : styles.textAddIconSmall
                }
            /> : null}
            {children}
        </div>
    )
}

export default WorkBars;
