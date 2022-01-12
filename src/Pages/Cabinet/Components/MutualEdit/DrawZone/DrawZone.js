import React, {useState} from 'react';

import styles from './DrawZone.module.sass';
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import {setDragged} from "../../../../../Store/actions/CabinetActions";
import {useDispatch, useSelector} from "react-redux";
import {drawCanvas} from "../../PreviewFile/paintHelpers";

function DrawZone({params, setParams, canvasRef, mainRef, addImageRef}) {

    // const addImageWrapRef = useRef();

    const [toAdd, setToAdd] = useState({file: null, width: 0, height: 0, top: '', left: '', right: '', bottom: ''});
    const [draggableZone, setDraggableZone] = useState({width: 0, height: 0, top: '', left: '', right: '', bottom: ''});
    const draggedImage = useSelector(s => s.Cabinet.dragged);
    const dispatch = useDispatch();

    const onFinishDrag = () => {
        dispatch(setDragged(null));
    }

    const handleDrop = async () => {
        await setToAdd(s => ({
            ...s,
            file: draggedImage,
            width: draggableZone.width,
            height: draggableZone.height,
            top: draggableZone.top,
            bottom: draggableZone.bottom,
            left: draggableZone.left,
            right: draggableZone.right
        }));
        drawCanvas(addImageRef?.current, draggedImage, onFinishDrag)
    }

    const handleDragOver = e => {
        setParams(s => ({...s, dragImage: true}));
        const x = e.clientX - canvasRef?.current.getBoundingClientRect().left;
        const y = e.clientY - canvasRef?.current.getBoundingClientRect().top;
        const width = canvasRef?.current.getBoundingClientRect().width;
        const height = canvasRef?.current.getBoundingClientRect().height;
        const isFullScreen = (x > width * 0.45 && x < width * 0.55) && (y > height * 0.45 && y < height * 0.55);
        const quarterSize = {x: width * 0.5, y: height * 0.5,}
        const halfSize = {x: width * 0.5, y: height,}
        if(x < width * 0.2 && y < height * 0.2) {
            setDraggableZone(s => ({...s, width: quarterSize.x, height: quarterSize.y, top: '0px', left: '0px', bottom: '', right: ''}));
        }
        if(x < width * 0.2 && y > height * 0.8) {
            setDraggableZone(s => ({...s, width: quarterSize.x, height: quarterSize.y, top: '', left: '0px', bottom: '0px', right: ''}));
        }
        if(x > width * 0.8 && y < height * 0.2) {
            setDraggableZone(s => ({...s, width: quarterSize.x, height: quarterSize.y, top: '0px', left: '', bottom: '', right: '0px'}));
        }
        if(x > width * 0.8 && y > height * 0.8) {
            setDraggableZone(s => ({...s, width: quarterSize.x, height: quarterSize.y, top: '', left: '', bottom: '0px', right: '0px'}));
        }
        if(y > height * 0.2 && y < height * 0.8 && x < width * 0.5 && !isFullScreen) {
            setDraggableZone(s => ({...s, width: halfSize.x, height: halfSize.y, top: '0px', left: '0px', bottom: '', right: ''}));
        }
        if(y > height * 0.2 && y < height * 0.8 && x > width * 0.5 && !isFullScreen) {
            setDraggableZone(s => ({...s, width: halfSize.x, height: halfSize.y, top: '', left: '', bottom: '0px', right: '0px'}));
        }
        if(isFullScreen) {
            setDraggableZone(s => ({...s, width, height, top: '0px', left: '0px', bottom: '', right: ''}));
        }

        window.ondragover = hideDragZone;
    }

    const hideDragZone = (e) => {
        if(
            e.clientX < canvasRef?.current.getBoundingClientRect().left ||
            e.clientX > canvasRef?.current.getBoundingClientRect().right ||
            e.clientY < canvasRef?.current.getBoundingClientRect().top ||
            e.clientY > canvasRef?.current.getBoundingClientRect().bottom
        ) {
            setParams(s => ({...s, dragImage: false}))
            setDraggableZone(s => ({...s, width: 0, height: 0, top: '', left: '', bottom: '', right: ''}));
            window.onmousemove = null;
        }
    }

    // const handleMove = (e) => {
    //     const picture = addImageWrapRef?.current;
    //     const canvas = canvasRef?.current;
    //
    //     if(canvas && picture) {
    //         const canvasInfo = canvas.getBoundingClientRect();
    //         const squareInfo = picture.getBoundingClientRect();
    //
    //         if(canvasInfo.left < (e.pageX - squareInfo.width/2) && canvasInfo.right > (e.pageX - squareInfo.width/2)) {
    //             picture.style.left = e.pageX - (canvasInfo.width * 0.2)/2 + 'px';
    //             // const x = e.pageX + squareInfo.width/2 + magnifierRef.current.getBoundingClientRect().width > window.innerWidth
    //             //     ? e.pageX - squareInfo.width/2 - magnifierRef.current.getBoundingClientRect().width
    //             //     : e.pageX + squareInfo.width/2;
    //             // setParams(s => ({...s, x}));
    //         }
    //         if(canvasInfo.top < (e.pageY - squareInfo.height/2) && canvasInfo.bottom > (e.pageY - squareInfo.height/2)) {
    //             picture.style.top = e.pageY - (canvasInfo.height * 0.2)/2 + 'px';
    //             // const y = e.pageY + squareInfo.height/2 + magnifierRef.current.getBoundingClientRect().height > window.innerHeight
    //             //     ? e.pageY - squareInfo.height/2 - magnifierRef.current.getBoundingClientRect().height
    //             //     : e.pageY + squareInfo.height/2;
    //             // setParams(s => ({...s, y}));
    //         }
    //
    //         //Fixed edge points for square
    //         if(canvasInfo.left + squareInfo.width/2 >= e.pageX) {
    //             picture.style.left = canvasInfo.left + 'px';
    //         }
    //         if(canvasInfo.right <= e.pageX + squareInfo.width/2) {
    //             picture.style.left = (canvasInfo.right - squareInfo.width) + 'px';
    //         }
    //         if(canvasInfo.top + squareInfo.height/2 > e.pageY) {
    //             picture.style.top = canvasInfo.top + 'px';
    //         }
    //         if(canvasInfo.bottom <= e.pageY + squareInfo.height/2) {
    //             picture.style.top = (canvasInfo.bottom - squareInfo.height) + 'px';
    //         }
    //     }
    // }
    //
    // const handleMouseDown = () => {
    //     window.onmousemove = handleMove;
    //     window.onmouseup = () => window.onmousemove = null;
    // }

    return <main className={styles.paintField} ref={mainRef}>
        <div className={styles.canvasWrap} onDragOver={handleDragOver}>
            {params.dragImage ?
                <div
                    className={styles.droppableZone}
                    onDrop={handleDrop}
                    style={{
                        width: draggableZone.width,
                        height: draggableZone.height,
                        top: draggableZone.top,
                        left: draggableZone.left,
                        right: draggableZone.right,
                        bottom: draggableZone.bottom
                    }}
                >Перетащите файл в область редактирования</div> : null}
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
            {toAdd.file ? <div
                className={styles.toAddWrap}
                // ref={addImageWrapRef}
                style={{
                    top: toAdd.top,
                    bottom: toAdd.bottom,
                    left: toAdd.left,
                    right: toAdd.right,
                }}
                // onMouseDown={handleMouseDown}
            >
                <canvas
                ref={addImageRef}
                width={toAdd.width}
                height={toAdd.height}
                className={styles.toAddCanvas}
                onDrop={handleDrop}
            /></div> : null}
        </div>
    </main>
}

export default DrawZone;
