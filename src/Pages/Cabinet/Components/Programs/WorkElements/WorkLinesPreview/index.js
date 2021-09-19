import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkLinesPreview.module.sass';
import Loader from "../../../../../../generalComponents/Loaders/4HUB";

const WorkLinesPreview = ({
    children, chosenProgram, hideFileList, fileRef, gLoader
}) => {

    const search = useSelector(state => state.Cabinet?.search);
    const [loadingFiles] = useState(false);

    return (
        <div className={styles.workLinesPreviewWrap}>
        {!hideFileList && <div
            className={styles.fileListWrap}
            ref={fileRef}
        >
            {!gLoader && children}
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
        </div>}
        {gLoader && <Loader
            type='squarify'
            position='absolute'
            background='rgba(255, 255, 255, 0.75)'
            zIndex={5}
        />}
        <div className={styles.previewFileWrap}>
            {chosenProgram ? <>
                <div className={styles.preview}>
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
                </div>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Теги</span>
                    {chosenProgram?.tag
                        ? <span className={styles.tagName}>#{chosenProgram.tag}</span>
                        : <span className={styles.optionItem}>Добавить тег</span>}
                </div>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Создан</span>
                    {chosenProgram?.ctime && <span className={styles.description}>{chosenProgram.ctime.split(' ')[0]}</span>}
                </div>
                <div className={styles.infoFileItem}>
                    <span className={styles.itemName}>Размеры</span>
                    {chosenProgram?.size_now && <span className={styles.description}>{chosenProgram.size_now}</span>}
                </div>
            </>: null}
            {children?.length === 0 && search.length !== 0
                ? <div
                    className={styles.noSearchResults}
                >Нет элементов удовлетворяющих условиям поиска</div>
                : null}
        </div>
    
    </div>)
}

export default WorkLinesPreview;