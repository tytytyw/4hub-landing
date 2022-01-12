import React, {useRef, useState} from 'react';

import styles from './MutualEdit.module.sass';
import PopUp from "../../../../generalComponents/PopUp";
import MiniToolBar from "../WorkElements/MiniToolBar/MiniToolBar";
import ImagePanel from "./ImagePanel/ImagePanel";
import DrawZone from "./DrawZone/DrawZone";

function MutualEdit() {

    const canvasRef = useRef();
    const addImageRef = useRef();
    const canvasWrapRef = useRef();
    const mainRef = useRef();
    const [images, setImages] = useState({loaded: [], saved: []});

    const [params, setParams] = useState({isLoading: false, dragImage: false})

    const pushLoaded = (files) => {
        setImages(s => ({...s, loaded: [...s.loaded, ...files]}));
    }

    const setDroppableZone = () => {
        setParams(s => ({...s, dragImage: !s.dragImage}))
    }



    return<PopUp>
        <div className={styles.mutualEdit} ref={canvasWrapRef}>
            <header className={styles.header}>
                <MiniToolBar
                    canvasRef={canvasRef}
                    canvasWrapRef={canvasWrapRef}
                    toolBarType="mutualEdit"
                    title="Сравнить документы/файлы"
                    // setFilePreview={setFilePreview}
                    // share={share}
                />
            </header>
            <div className={styles.mainField}>
                <ImagePanel addImage={true} pushImages={pushLoaded} images={images.loaded} setDroppableZone={setDroppableZone} />
                <DrawZone
                    canvasRef={canvasRef}
                    addImageRef={addImageRef}
                    mainRef={mainRef}
                    params={params}
                    setParams={setParams}
                />
                <div className={styles.rightPanelWrap}>
                    <div className={styles.asideWrap}>
                        <ImagePanel images={images.saved} />
                    </div>
                    <div className={styles.buttonsWrap}></div>
                </div>
            </div>
        </div>
    </PopUp>
}

export default MutualEdit
