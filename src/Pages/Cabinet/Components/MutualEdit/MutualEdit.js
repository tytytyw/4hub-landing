import React, {useRef, useState} from 'react';

import styles from './MutualEdit.module.sass';
import PopUp from "../../../../generalComponents/PopUp";
import MiniToolBar from "../WorkElements/MiniToolBar/MiniToolBar";
import Loader from "../../../../generalComponents/Loaders/4HUB";
import ImagePanel from "./ImagePanel/ImagePanel";

function MutualEdit() {

    const canvasRef = useRef();
    const canvasWrapRef = useRef();
    const mainRef = useRef();
    const [images, setImages] = useState({loaded: [], saved: []})

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
                <main className={styles.paintField} ref={mainRef}>
                    <div className={styles.canvasWrap}>
                        {params.dragImage ? <div className={styles.droppableZone}>Перетащите файл в область редактирования</div> : null}
                        {params.isLoading ? <Loader
                            type='bounceDots'
                            position='absolute'
                            background='rgba(255, 255, 255, 0)'
                            zIndex={5}
                            containerType='bounceDots'
                            width='60%'
                            height='80%'
                        /> : null}
                        <canvas
                            ref={canvasRef}
                            className={styles.canvas}
                            width={mainRef?.current?.getBoundingClientRect().width}
                            height={mainRef?.current?.getBoundingClientRect().height}
                        />
                    </div>
                </main>
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
