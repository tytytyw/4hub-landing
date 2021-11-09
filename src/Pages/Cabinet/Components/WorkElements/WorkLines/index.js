import React from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkLines.module.sass';
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import {useScrollElementOnScreen} from "../../../../../generalComponents/Hooks";
import {renderHeight} from "../../../../../generalComponents/generalHelpers";

const WorkLines = ({
       children, filePick, fileRef, gLoader, load, options
}) => {

    const recentFiles = useSelector(state => state.Cabinet?.recentFiles);
    const search = useSelector(state => state.Cabinet?.search);
    const size = useSelector(state => state.Cabinet.size);

    const [containerRef] = useScrollElementOnScreen(options, load);

    return(
        <div
            ref={fileRef}
            className={`${styles.workLinesWrap} ${renderHeight(recentFiles, filePick, styles)}`}
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
        >
            {children?.length === 0 && search.length !== 0
                ? <div
                    className={styles.noSearchResults}
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
                className={styles.bottomLine}
                style={{height: '100px'}}
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
        </div>)
}

export default WorkLines;