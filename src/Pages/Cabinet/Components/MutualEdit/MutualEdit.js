import React, {useLayoutEffect, useRef, useState} from 'react';

import styles from './MutualEdit.module.sass';
import PopUp from "../../../../generalComponents/PopUp";
import MiniToolBar from "../WorkElements/MiniToolBar/MiniToolBar";
import ImagePanel from "./ImagePanel/ImagePanel";
import DrawZone from "./DrawZone/DrawZone";
import {useSelector, useDispatch} from "react-redux";
import {onSetPaint} from "../../../../Store/actions/CabinetActions";

function MutualEdit() {

    const canvasRef = useRef();
    const canvasWrapRef = useRef();
    const mainRef = useRef();
    const mutualEdit = useSelector(s => s.Cabinet.paint.mutualEdit);
    const [images, setImages] = useState({loaded: [], saved: []});
    const dispatch = useDispatch();

    const [params, setParams] = useState({isLoading: false})

    const pushLoaded = (files) => {
        setImages(s => ({...s, loaded: [...s.loaded, ...files]}));
    }

    useLayoutEffect(() => {
        if (mutualEdit.data.length > 0 && canvasRef?.current) {
            pushLoaded(mutualEdit.data);
            dispatch(onSetPaint('mutualEdit', {...mutualEdit, data: []}));
        }
    }, []); //eslint-disable-line

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
                <ImagePanel addImage={true} pushImages={pushLoaded} images={images.loaded} />
                <DrawZone
                    canvasRef={canvasRef}
                    mainRef={mainRef}
                    images={images}
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
