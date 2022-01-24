import React from 'react'

import styles from './ImagePanel.module.sass'
import {ReactComponent as AddIcon} from "../../../../../assets/PrivateCabinet/plus-3.svg";
import {ReactComponent as DeleteIcon} from "../../../../../assets/PrivateCabinet/delete.svg"

function ImagePanel({
    images = [],
    addImage = false,
    pushImages = () => {},
    deleteImage = () => {},
    inputRef = null
}) {

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
        >
            <div className={styles.hoverDelete}>
                <div className={styles.deleteWrap} onClick={() => deleteImage(i)}>
                    <DeleteIcon className={styles.deleteIco} />
                </div>
            </div>
            <img className={styles.image} src={image} alt='img' draggable={false} />
        </div>)
    )

    return(
        <aside className={styles.panel}>
            {renderImages()}
            {addImage && images.length < 4 ? <div className={styles.itemWrap}>
                <AddIcon className={styles.addIcon}/>
                <div>Загрузить</div>
                <input
                    onChange={addImages}
                    type='file'
                    className={styles.inputImage}
                    multiple
                    ref={inputRef}
                />
            </div> : null}
        </aside>
    )
}

export default ImagePanel;
