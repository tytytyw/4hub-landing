import React, {useEffect, useRef, useState} from 'react';

import {previewFormats} from '../../../../generalComponents/collections';
import styles from './PreviewFile.module.sass';
import PopUp from '../../../../generalComponents/PopUp';
import File from "../../../../generalComponents/Files";
import {imageSrc, projectSrc} from '../../../../generalComponents/globalVariables';
import {imageToRatio} from "../../../../generalComponents/generalHelpers";
import MiniToolBar from "../Project/WorkElements/MiniToolBar";
import {
    drawBrush, drawCircle, drawSquare, drawText,
    mouseDownHandlerBrush, mouseDownHandlerCircle, mouseDownHandlerSquare,
    mouseMoveHandlerBrush, mouseMoveHandlerCircle, mouseMoveHandlerSquare,
    mouseUpHandlerBrush, mouseUpHandlerCircle, mouseUpHandlerSquare,
    unDoPaintBrush
} from "./paintHelpers";

const PreviewFile = ({setFilePreview, file}) => {

    const standardPrev = <div className={styles.filePreviewWrapWrap}><div className={styles.filePreviewWrap}><File format={file?.ext} color={file?.color} /></div></div>;

    const set = e => {
        let close = true;
        e.nativeEvent.path.forEach(el => {
            if(el.className === styles.imagePreviewWrap) close = false;
        })
        if(close) setFilePreview(filePreview => ({...filePreview, view: false, file: null}));
    }

    const renderOfficePreview = () => {
        const isFormat = previewFormats.filter(type => file.ext.toLowerCase().includes(type)).length > 0;
        if(isFormat && file.edit_url) {
            return <iframe src={file.edit_url} title={file.name} frameBorder="0" scrolling="no" />
        } else {
            return standardPrev;
        }
    }

    const [edit, setEdit] = useState({status: 'Редактировать'});
    const handleEdit = () => {
        if(edit.status === 'Сохранить') {
            const preview = canvasRef.current.toDataURL("image/png");
            setFilePreview(state => ({...state, file: {...state.file, preview}}));
        }
        setEdit(state => ({...state, status: state.status === 'Редактировать' ? 'Сохранить' : 'Редактировать'}))
    }
    const canvasRef = useRef(null)
    const textBlockRef = useRef(null)
    const lineRef = useRef(null)
    const [textDraw, setTextDraw] = useState({edit: false, text: 'Текст', move: false, widthDif: 0, heightDif: 0, sizeChange: false})
    const renderFilePreview = () => {
        switch (file.mime_type.split('/')[0]) {
            case 'image': {
                return <div className={styles.imagePreviewWrap}>
                    {edit.status === 'Сохранить' ? <MiniToolBar
                        setTextDraw={setTextDraw}
                        direction="row"
                        right="130px"
                        top="12px"
                        drawParams={drawParams}
                        setDrawParams={setDrawParams}
                        unDoPaint={() => unDoPaintBrush(canvasRef, undoList, setUndoList)}
                    /> : null}
                    <span className={styles.edit} onClick={handleEdit}>{edit.status}</span>
                    <div className={styles.canvasWrap} onMouseMove={handlePosition} onMouseUp={handleMouseUp}>
                        <canvas
                            ref={canvasRef}
                            className={styles.canvas}
                            onMouseDown={mouseDownHandler}
                            onMouseMove={mouseMoveHandler}
                            onMouseUp={mouseUpHandler}
                        />
                        {textDraw.edit ? <textarea
                            ref={textBlockRef}
                            onMouseDown={handleMouseDown}
                            value={textDraw.text}
                            onChange={handleTextAreaChange}
                            onKeyPress={handleKeyPress}
                            style={{
                                color: drawParams.color,
                                fontSize: `${drawParams.fontSize}px`,
                                lineHeight: `${drawParams.lineHeight}px`,
                                background: 'none',
                                position: "absolute",
                                top: 50,
                                fontFamily: drawParams.fontFamily,
                                left: '50%',
                                cursor: textDraw.move ? 'move' : 'text',
                            }}
                        /> : null}
                        {drawParams.figure === "arrow-outlined" ? <div
                            ref={lineRef}
                            className={styles.arrowOutlined}
                            onMouseDown={handleMouseDown}
                            style={{
                                height: drawParams.width,
                                background: `linear-gradient(90deg, ${drawParams.color} 0%, ${drawParams.color} 97%, rgba(0, 0, 0, 0) 97%)`
                            }}
                        >
                            <span className={styles.arrow} style={{border: `${drawParams.width + 9}px solid transparent`, borderLeft: `${drawParams.width + 9}px solid ${drawParams.color}`, right: -(drawParams.width + 9)}} />
                            <span className={styles.dotRight} style={{height: 6, width: 6, left: -6}} />
                            <span className={styles.dotLeft} style={{height: 6, width: 6, right: -6}} />
                        </div> : null}
                    </div>
                </div>
            }
            case 'video': {
                return <video controls src={`${projectSrc}${file.preview}`} type={file.mime_type}>
                    <source src={`${projectSrc}${file.preview}`} type={file.mime_type}/>
                </video>
            }
            case 'audio': {
                return <div className={styles.audioWrap}>
                    <div className={styles.audioPicWrap}>
                        <img className={styles.audioPic} src={`${imageSrc}assets/PrivateCabinet/file-preview_audio.svg`} alt='audio'/>
                    </div>
                    <audio controls src={`${projectSrc}${file.preview}`}>
                        <source src={`${projectSrc}${file.preview}`} type={file.mime_type}/>
                    </audio>
                </div>
            }
            case 'application': {
                    return <iframe src={`${projectSrc}${file.preview}`} title={file.name} frameBorder="0" scrolling="no" />
            }
            default: {
                return <div className={styles.filePreviewWrapWrap}><div className={styles.filePreviewWrap}><File format={file?.ext} color={file?.color} /></div></div>
            }
        }
    }

    useEffect(() => {
            const canvas = canvasRef.current.getContext('2d');
            const img = new Image();
            img.src = file.preview;
            img.onload = (e) => {
                const sizes = imageToRatio(e.path[0].naturalWidth, e.path[0].naturalHeight, Number((e.path[0].naturalWidth * 0.84).toFixed()), Number((e.path[0].naturalHeight * 0.89).toFixed()));
                canvasRef.current.width = sizes.width;
                canvasRef.current.height = sizes.height;
                canvas.clearRect(0, 0, e.path[0].naturalWidth, e.path[0].naturalHeight);
                canvas.drawImage(img, 0, 0, sizes.width, sizes.height);
                setDrawParams(state => ({...state, imgWidth: sizes.width, imgHeight: sizes.height}));
            }
    }, []); //eslint-disable-line

    const [drawParams, setDrawParams] = useState({color: 'black', colorRGBA: 'rgba(0, 0, 0, 0.2)', width: 2, imgWidth: 0, imgHeight: 0, figure: "brush-outlined", fontSize: 13, fontFamily: 'Arial, sans-serif', lineHeight: 15});
    const [undoList, setUndoList] = useState([]);
    const [mouse, setMouse] = useState({down: false, startX: 0, startY: 0, saved: null});

    const mouseDownHandler = e => {
        if(drawParams.figure === "brush-outlined" || drawParams.figure === "pencil-outlined") mouseDownHandlerBrush(e, canvasRef, edit.status, setMouse, setUndoList);
        if(drawParams.figure === "square-outlined") mouseDownHandlerSquare(e, edit.status, setMouse, canvasRef, setUndoList);
        if(drawParams.figure === "circle-outlined") mouseDownHandlerCircle(e, edit.status, setMouse, canvasRef, setUndoList);
        if(drawParams.figure === "font") drawText(canvasRef, textBlockRef, setTextDraw, setDrawParams, setUndoList, drawParams, textDraw);
    }

    const mouseMoveHandler = e => {
        if(drawParams.figure === "brush-outlined" || drawParams.figure === "pencil-outlined") mouseMoveHandlerBrush(e, drawBrush, edit.status, mouse, drawParams, canvasRef);
        if(drawParams.figure === "square-outlined") mouseMoveHandlerSquare(e, drawSquare, edit.status, mouse, drawParams, canvasRef)
        if(drawParams.figure === "circle-outlined") mouseMoveHandlerCircle(e, drawCircle, edit.status, mouse, drawParams, canvasRef)
    }

    const mouseUpHandler = () => {
        if(drawParams.figure === "brush-outlined" || drawParams.figure === "pencil-outlined") mouseUpHandlerBrush(edit.status, setMouse);
        if(drawParams.figure === "square-outlined") mouseUpHandlerSquare(edit.status, setMouse)
        if(drawParams.figure === "circle-outlined") mouseUpHandlerCircle(edit.status, setMouse)
    }

    const handleMouseDown = e => {
        if(drawParams.figure === "font") {
            if(!(e.pageX + 18 > e.target.getBoundingClientRect().right) && !(e.pageY + 18 > e.target.getBoundingClientRect().bottom)) {
                setTextDraw(state => ({...state, move: true, widthDif: e.nativeEvent.layerX, heightDif: e.nativeEvent.layerY}))
            }
        }
        if(drawParams.figure === "arrow-outlined") {
            let isCircle = false;
            e.nativeEvent.path.forEach(el => {if(el.className && el.className.includes('dot')) isCircle = true})
            if(isCircle) {
                setTextDraw(state => ({...state, move: false, widthDif: e.nativeEvent.layerX, heightDif: e.nativeEvent.layerY, sizeChange: true}))
            } else {
                setTextDraw(state => ({...state, move: true, widthDif: e.nativeEvent.layerX, heightDif: e.nativeEvent.layerY}))
            }
        }
    }

    const handlePosition = e => {
        if(drawParams.figure === "font" && textDraw.move) {
            textBlockRef.current.style.left = e.pageX - canvasRef.current.getBoundingClientRect().x - textDraw.widthDif + "px";
            textBlockRef.current.style.top = e.pageY - canvasRef.current.getBoundingClientRect().y - textDraw.heightDif + "px";
        }
        if(drawParams.figure === "arrow-outlined") {
            if(textDraw.move) {
                lineRef.current.style.left = e.pageX - canvasRef.current.getBoundingClientRect().x - textDraw.widthDif + "px";
                lineRef.current.style.top = e.pageY - canvasRef.current.getBoundingClientRect().y - textDraw.heightDif + "px";
            }
            if(textDraw.sizeChange) {
                const arrow = lineRef.current.getBoundingClientRect()
                const arrowEndX = arrow.left + arrow.width;
                // const differenceX = e.pageX - arrowEndX;
                // const arrowEndY = arrow.top + arrow.width;
                // const differenceY = e.pageY - arrowEndY;
                // canvasRef.current.style.cursor = "pointer";
                lineRef.current.style.width = (arrow.width + e.pageX - arrowEndX - 3) + "px";
                // lineRef.current.style.height = (arrow.height + e.pageY - arrowEndY - 3) + "px";
            }
        }
    }

    const handleMouseUp = () => {
        if(drawParams.figure === "arrow-outlined") {
            setTextDraw(state => ({...state, move: false, widthDif: 0, heightDif: 0, sizeChange: false}));
            // canvasRef.current.style.cursor = "";
        }
    }

    const handleTextAreaChange = e => setTextDraw(state => ({...state, text: e.target.value}))

    const handleKeyPress = () => {
        if(textBlockRef.current.offsetHeight + 3 < textBlockRef.current.scrollHeight) {
            textBlockRef.current.style.height = textBlockRef.current.scrollHeight + 5 + 'px'
        }
    }

    return (
        <PopUp set={set} background={'none'}>
            <div
                className={styles.preview}
                onClick={set}
                onMouseUp={() => setTextDraw(state => ({...state, move: false, widthDif: 0, heightDif: 0}))}
            >
                {file ? file.is_preview === 1 ? renderFilePreview() : renderOfficePreview() : null}
            </div>
        </PopUp>
    );
}

export default PreviewFile;