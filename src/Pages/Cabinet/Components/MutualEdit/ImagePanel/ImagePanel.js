import React from 'react'

import styles from './ImagePanel.module.sass'
import {ReactComponent as AddIcon} from "../../../../../assets/PrivateCabinet/plus-3.svg";

function ImagePanel({images = [], addImage = false, pushImages = () => {}, setDroppableZone = () => {}}) {

    const addImages = e => {
        let files = [];
        Object.values(e.target.files).forEach(f => {
            if(f.type.includes('image')) files.push(URL.createObjectURL(f));
        });
        if(files.length > 0) {
            pushImages(files);
        }
    }

    const renderImages = () => (
        images.map((image, i) => <div
            className={styles.itemWrap}
            key={i}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <img className={styles.image} src={image} alt='img' draggable={false} />
        </div>)
    )

    const handleDragStart = () => {
        setDroppableZone();
    }

    const handleDragEnd = (e) => {
        e.preventDefault();
        setDroppableZone();
    }

    return(
        <aside className={styles.panel}>
            {renderImages()}
            {addImage ? <div className={styles.itemWrap}>
                <AddIcon className={styles.addIcon}/>
                <div>Загрузить</div>
                <input
                    onChange={addImages}
                    type='file'
                    className={styles.inputImage}
                    multiple
                />
            </div> : null}
        </aside>
    )
}

export default ImagePanel;