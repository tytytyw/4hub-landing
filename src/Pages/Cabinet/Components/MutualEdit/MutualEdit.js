import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';

import styles from './MutualEdit.module.sass';
import PopUp from "../../../../generalComponents/PopUp";
import MiniToolBar from "../WorkElements/MiniToolBar/MiniToolBar";
import ImagePanel from "./ImagePanel/ImagePanel";
import DrawZone from "./DrawZone/DrawZone";
import {useSelector, useDispatch} from "react-redux";
import {onSetPaint} from "../../../../Store/actions/CabinetActions";
import {drawCanvasPosition} from "../PreviewFile/paintHelpers";

function MutualEdit() {

    const canvasRef = useRef();
    const addImageRef = useRef();
    const canvasWrapRef = useRef();
    const mainRef = useRef();
    const mutualEdit = useSelector(s => s.Cabinet.paint.mutualEdit);
    const [images, setImages] = useState({loaded: [], saved: []});
    const dispatch = useDispatch();

    const [params, setParams] = useState({isLoading: false})

    const pushLoaded = (files) => {
        setImages(s => ({...s, loaded: [...s.loaded, ...files]}));
    }

    const setDroppableZone = () => {
        setParams(s => ({...s, dragImage: !s.dragImage}))
    }

    const paintImage = async (images) => {
        canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if(images.length === 1) {
            await drawCanvasPosition(canvasRef.current, images[0]);
        }
        if(images.length === 2) {
            await drawCanvasPosition(canvasRef.current, images[0], canvasRef.current.width/2, canvasRef.current.height, canvasRef.current.width/2, canvasRef.current.height/2)
            await drawCanvasPosition(canvasRef.current, images[1], canvasRef.current.width * 1.5, canvasRef.current.height, canvasRef.current.width/2, canvasRef.current.height/2)
        }
        if(images.length === 3) {
            await drawCanvasPosition(canvasRef.current, images[0], canvasRef.current.width/2, canvasRef.current.height/2, canvasRef.current.width/2, canvasRef.current.height/2)
            await drawCanvasPosition(canvasRef.current, images[1], canvasRef.current.width * 1.5, canvasRef.current.height/2, canvasRef.current.width/2, canvasRef.current.height/2)
            await drawCanvasPosition(canvasRef.current, images[2], canvasRef.current.width/2, canvasRef.current.height * 1.5, canvasRef.current.width/2, canvasRef.current.height/2)
        }
        if(images.length === 4) {
            await drawCanvasPosition(canvasRef.current, images[0], canvasRef.current.width/2, canvasRef.current.height/2, canvasRef.current.width/2, canvasRef.current.height/2);
            await drawCanvasPosition(canvasRef.current, images[1], canvasRef.current.width * 1.5, canvasRef.current.height/2, canvasRef.current.width/2, canvasRef.current.height/2);
            await drawCanvasPosition(canvasRef.current, images[2], canvasRef.current.width/2, canvasRef.current.height * 1.5, canvasRef.current.width/2, canvasRef.current.height/2);
            await drawCanvasPosition(canvasRef.current, images[3], canvasRef.current.width * 1.5, canvasRef.current.height * 1.5, canvasRef.current.width/2, canvasRef.current.height/2);
        }
    }

    useLayoutEffect(() => {
        if (mutualEdit.data.length > 0 && canvasRef?.current) {
            pushLoaded(mutualEdit.data);
            dispatch(onSetPaint('mutualEdit', {...mutualEdit, data: []}));
        }
    }, []); //eslint-disable-line

    useEffect(() => {
        paintImage(images.loaded)
    }, [images.loaded])

    return<PopUp>
        <div className={styles.mutualEdit} ref={canvasWrapRef}>
            <header className={styles.header}>
                <MiniToolBar
                    canvasRef={canvasRef}
                    canvasWrapRef={canvasWrapRef}
                    toolBarType="mutualEdit"
                    title="Сравнить документы/файлы"
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
                    images={images}
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
