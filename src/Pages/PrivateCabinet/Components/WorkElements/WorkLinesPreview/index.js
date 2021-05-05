import React, {useState, useEffect}  from 'react';

import styles from './WorkLinesPreview.module.sass';
import {colors} from '../../../../../generalComponents/collections'

const WorkLinesPreview = ({file, children}) => {

    const [color, setColor] = useState(null);
    const [f, setF] = useState(file);
    useEffect(() => {
        setF(file);
        const newColor = colors.filter(c => c.color === file?.color)
        setColor(newColor[0]);
    }, [file]);

    return (<div className={styles.workLinesPreviewWrap}>
        <div className={styles.fileListWrap}>{children}</div>
        <div className={styles.previewFileWrap}>
            {f ? <>
            <img className={styles.preview} src='./assets/PrivateCabinet/file-preview.svg' alt='file' />
            <span className={styles.fileName}>{f.name}</span>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Теги</span>
                {f.tag
                    ? <span className={styles.tagName}>#{f.tag}</span>
                    : <span className={styles.optionItem}>Добавить тег</span>}
            </div>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Цвет</span>
                {f?.color
                    ? <span className={styles.colorCircle} style={{background: color?.light, border: `1px solid ${color?.dark}`}}/>
                    : <span className={styles.optionItem}>Добавить цвет</span>}
            </div>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Знаки</span>
                {f?.fig
                    ? <img src={`./assets/PrivateCabinet/signs/${f.fig}.svg`} alt='sign' />
                    : <span className={styles.optionItem}>Добавить знаки</span>}
            </div>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Эмоджи</span>
                {f?.emo
                    ? <img src={`./assets/PrivateCabinet/smiles/${f.emo}.svg`} alt='sign' />
                    : <span className={styles.optionItem}>Добавить эмоджи</span>}
            </div>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Создан</span>
                {f?.mtime
                    ? <span className={styles.description}>{f.mtime.split(' ')[0]}</span>
                    : ''}
            </div>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Изменен</span>
                {f?.ctime
                    ? <span className={styles.description}>{f.ctime.split(' ')[0]}</span>
                    : ''}
            </div>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Размеры</span>
                {f?.size_now
                    ? <span className={styles.description}>{f.size_now}</span>
                    : ''}
            </div>
            </>: null}
        </div>
    </div>)
}

export default WorkLinesPreview;