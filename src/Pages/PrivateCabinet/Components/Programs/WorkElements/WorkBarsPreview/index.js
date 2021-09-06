import React, { useState } from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkBarsPreview.module.sass';
import Loader from "../../../../../../generalComponents/Loaders/4HUB";

// TODO - small loader doesn't represent itself correctly
// TODO - set vertical loading instead horizontal
const WorkBarsPreview = ({
    children, chosenProgram, setChosenProgram, filePick, page, setPage, fileRef, chosenFolder,
    gLoader
}) => {

    const search = useSelector(state => state.PrivateCabinet?.search);
    const [loadingFiles] = useState(false);

    return (
        <div className={styles.workBarsPreviewWrap}>
            <div className={styles.preview}>
                {children?.length === 0 && search.length !== 0
                    ? <div
                        className={styles.noSearchResults}
                    >Нет элементов удовлетворяющих условиям поиска</div>
                    : null}
                {chosenProgram &&
                <div>
                    <div className={styles.filePreviewWrap}>
                        <div className={styles.content}>
                            <img
                                className={styles.contentImg}
                                src={chosenProgram?.icon}
                                alt={chosenProgram?.name}
                            />
                            <p className={styles.contentInfo}>{chosenProgram?.name}</p>
                        </div>
                    </div>
                </div>}
            </div>
            <div className={styles.renderedFiles}>
                <div
                    ref={fileRef}
                    className={styles.innerFiles}
                >
                    {!gLoader && children}
                </div>
                <div
                    className={styles.bottomLine}
                    style={{width: loadingFiles ? '100px' : '40px'}}
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
            {gLoader ? <Loader
                type='squarify'
                position='absolute'
                background='rgba(255, 255, 255, 0.75)'
                zIndex={5}
            /> : null}
        </div>
    )
}

export default WorkBarsPreview;