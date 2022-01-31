import React, {useState} from 'react';
import styles from './PreviewImageWithComment.module.sass';
import PopUp from "../../../../../../generalComponents/PopUp";
import classnames from "classnames";
import {useSelector} from "react-redux";

function PreviewImageWithComment() {

    const [chosenFile, setChosenFile] = useState(null);
    const previewImageWithComment = useSelector(s => s.Cabinet.modals.previewWithComments);

    const renderImages = () => {
        const images = previewImageWithComment.files.filter(file => file.mime_type.includes('image'));
        return images.map((image, i) => <div
            className={classnames({
                [styles.itemWrap]: true,
                [styles.itemChosen]: typeof image === 'object' && chosenFile.indexOf(image.fid) !== -1
            })}
            key={i}
            draggable
        >
            <div className={styles.hoverDelete} onClick={() => setChosenFile(image)}/>}
                <img className={styles.image} src={image.src} alt='img' draggable={false}/>

        </div>)
    }

    return(<PopUp>
        <div className={styles.wrap}>
            <div className={styles.imagePanel}>
                {renderImages()}
            </div>
            <div className={styles.workingPanel}>
                <div className={styles.miniToolBarWrap}>

                </div>
                <div className={styles.drawPanel}>
                    <canvas></canvas>
                </div>
            </div>
        </div>
    </PopUp>)
}

export default PreviewImageWithComment;
