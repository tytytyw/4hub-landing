import React, {useEffect, useRef, useState} from 'react';

import {previewFormats} from '../../../../generalComponents/collections';
import styles from './PreviewFile.module.sass';
import PopUp from '../../../../generalComponents/PopUp';
import File from "../../../../generalComponents/Files";
import {imageSrc} from '../../../../generalComponents/globalVariables';
import {imageToRatio} from "../../../../generalComponents/generalHelpers";
import MiniToolBar from "../Project/WorkElements/MiniToolBar";
import {
    drawBrush, drawSquare,
    mouseDownHandlerBrush, mouseDownHandlerSquare,
    mouseMoveHandlerBrush, mouseMoveHandlerSquare,
    mouseUpHandlerBrush, mouseUpHandlerSquare,
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
    const renderFilePreview = () => {
        switch (file.mime_type.split('/')[0]) {
            case 'image': {
                return <div className={styles.imagePreviewWrap}>
                    {edit.status === 'Сохранить' ? <MiniToolBar
                        direction="row"
                        right="130px"
                        top="12px"
                        drawParams={drawParams}
                        setDrawParams={setDrawParams}
                        unDoPaint={() => unDoPaintBrush(canvasRef, undoList, setUndoList)}
                    /> : null}
                    <span className={styles.edit} onClick={handleEdit}>{edit.status}</span>
                    <canvas
                        ref={canvasRef}
                        className={styles.canvas}
                        onMouseDown={mouseDownHandler}
                        onMouseMove={mouseMoveHandler}
                        onMouseUp={mouseUpHandler}
                    />
                </div>
            }
            case 'video': {
                return <video controls src={`https://fs2.mh.net.ua${file.preview}`} type={file.mime_type}>
                    <source src={`https://fs2.mh.net.ua${file.preview}`} type={file.mime_type}/>
                </video>
            }
            case 'audio': {
                return <div className={styles.audioWrap}>
                    <div className={styles.audioPicWrap}>
                        <img className={styles.audioPic} src={`${imageSrc}assets/PrivateCabinet/file-preview_audio.svg`} alt='audio'/>
                    </div>
                    <audio controls src={`https://fs2.mh.net.ua${file.preview}`}>
                        <source src={`https://fs2.mh.net.ua${file.preview}`} type={file.mime_type}/>
                    </audio>
                </div>
            }
            case 'application': {
                    return <iframe src={`https://fs2.mh.net.ua${file.preview}`} title={file.name} frameBorder="0" scrolling="no" />
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

    const [drawParams, setDrawParams] = useState({color: 'black', width: 2, imgWidth: 0, imgHeight: 0, figure: "brush-outlined"});
    const [undoList, setUndoList] = useState([]);
    const [mouse, setMouse] = useState({down: false, startX: 0, startY: 0, saved: null});

    const mouseUpHandler = () => {
        if(drawParams.figure === "brush-outlined") mouseUpHandlerBrush(edit.status, setMouse);
        if(drawParams.figure === "square-outlined") mouseUpHandlerSquare(edit.status, setMouse)
    }

    const mouseDownHandler = e => {
        if(drawParams.figure === "brush-outlined") mouseDownHandlerBrush(e, canvasRef, edit.status, setMouse, setUndoList);
        if(drawParams.figure === "square-outlined") mouseDownHandlerSquare(e, edit.status, setMouse, canvasRef, setUndoList);
    }

    const mouseMoveHandler = e => {
        if(drawParams.figure === "brush-outlined") mouseMoveHandlerBrush(e, drawBrush, edit.status, mouse, drawParams, canvasRef);
        if(drawParams.figure === "square-outlined") mouseMoveHandlerSquare(e, drawSquare, edit.status, mouse, drawParams, canvasRef)
    }

    return (
        <PopUp set={set} background={'none'}>
            <div className={styles.preview} onClick={set}>
                {file ? file.is_preview === 1 ? renderFilePreview() : renderOfficePreview() : null}
            </div>
        </PopUp>
    );
}

export default PreviewFile;