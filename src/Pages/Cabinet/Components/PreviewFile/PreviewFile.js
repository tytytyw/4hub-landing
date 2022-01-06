import React, {useEffect, useRef, useState} from 'react';

import {previewFormats} from '../../../../generalComponents/collections';
import styles from './PreviewFile.module.sass';
import PopUp from '../../../../generalComponents/PopUp';
import File from "../../../../generalComponents/Files";
import {imageSrc, projectSrc} from '../../../../generalComponents/globalVariables';
import {getMedia, imageToRatio} from "../../../../generalComponents/generalHelpers";
import MiniToolBar from "../WorkElements/MiniToolBar/MiniToolBar";
import {
    drawDiv, unDoPaintBrush
} from "./paintHelpers";
import Loader from "../../../../generalComponents/Loaders/4HUB";

const PreviewFile = ({setFilePreview, file, share}) => {

    const [loading, setLoading] = useState(false)
    const standardPrev = <div className={styles.filePreviewWrapWrap}><div className={styles.filePreviewWrap}><File format={file?.ext} color={file?.color} /></div></div>;

    const set = e => {
        let close = false;
        if(e?.target?.className === styles.preview) close = true;
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

    const canvasRef = useRef(null)
    const dotRightRef = useRef(null)
    const dotLeftRef = useRef(null)
    const lineRef = useRef(null)
    const audioRef = useRef(null);
    const [textDraw, setTextDraw] = useState({edit: false, text: 'Текст', move: false, widthDif: 0, heightDif: 0, sizeChange: false, initialParams: {x: 0, y: 0, b: 0, c: 0}, axis: null})
    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const renderFilePreview = () => {
        switch (file.mime_type.split('/')[0]) {
            case 'image': {
                return <div className={styles.imagePreviewWrap}>
                    <MiniToolBar
                        canvasRef={canvasRef}
                        file={file}
                        setTextDraw={setTextDraw}
                        setFilePreview={setFilePreview}
                        share={share}
                        direction="row"
                        drawParams={drawParams}
                        setDrawParams={setDrawParams}
                        unDoPaint={() => unDoPaintBrush(canvasRef, undoList, setUndoList)}
                    />
                    <div className={styles.canvasWrap} onMouseMove={handlePosition} onMouseUp={handleMouseUp}>
                        {isLoading ? <Loader
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
                            onMouseDown={mouseDownHandler}
                        />
                        {drawParams.figure === "arrow-outlined" ? <div
                            ref={lineRef}
                            className={styles.arrowOutlined}
                            onMouseDown={handleMouseDown}
                            draggable={false}
                            style={{
                                height: drawParams.width,
                                background: `linear-gradient(90deg, ${drawParams.color} 0%, ${drawParams.color} 99%, rgba(0, 0, 0, 0) 99%)`
                            }}
                        >
                            <span className={styles.arrow} style={{border: `${drawParams.width + 9}px solid transparent`, borderLeft: `${drawParams.width + 9}px solid ${drawParams.color}`, right: -(drawParams.width + 9)}} />
                            <span className={styles.dotRight} style={{height: 6, width: 6, right: -6}} ref={dotRightRef} draggable={false} />
                            <span className={styles.dotLeft} style={{height: 6, width: 6, left: -6}} ref={dotLeftRef} draggable={false} />
                        </div> : null}
                    </div>
                </div>
            }
            case 'video': {
                return <video controls src={video ? video : ''} type={file.mime_type} onError={e => console.log(e)}>
                    <source src={video ? video : ''} type={file.mime_type}/>
                </video>
            }
            case 'audio': {
                return <div className={styles.audioWrap}>
                    <div className={styles.audioPicWrap}>
                        <img className={styles.audioPic} src={`${imageSrc}assets/PrivateCabinet/file-preview_audio.svg`} alt='audio'/>
                    </div>
                    <audio ref={audioRef} src={audio ? audio : ''} type={file.mime_type} controls onError={e => console.log(e)}>
                        <source src={audio ? audio : ''} type={file.mime_type} />
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
        if(file.mime_type && file.mime_type.includes('image')) {
            setIsLoading(true);
            const canvas = canvasRef.current.getContext('2d');
            const img = new Image();
            img.src = `${file.preview}${file.fid === 'printScreen' ? '' : `?${new Date()}`}`;
            img.onload = (e) => {
                if(canvasRef.current) {
                    setIsLoading(false);
                    const sizes = imageToRatio(e.target.naturalWidth, e.target.naturalHeight, Number((window.innerWidth * 0.84).toFixed()), Number((window.innerHeight * 0.79).toFixed()));
                    canvasRef.current.width = sizes.width;
                    canvasRef.current.height = sizes.height;
                    canvas.clearRect(0, 0, e.target.naturalWidth, e.target.naturalHeight);
                    canvas.drawImage(img, 0, 0, sizes.width, sizes.height);
                    setDrawParams(state => ({...state, imgWidth: sizes.width, imgHeight: sizes.height}));
                }
            }
        }
        if(file.mime_type && file.mime_type.includes('audio') && file.is_preview) {
            setLoading(true);
            getMedia(`${projectSrc}${file.preview}`, file.mime_type, setAudio, setLoading)
        }
        if(file.mime_type && file.mime_type.includes('video') && file.is_preview) {
            setLoading(true);
            getMedia(`${projectSrc}${file.preview}`, file.mime_type, setVideo, setLoading)
        }
        return () => {
            if(window.cancelLoadMedia) window.cancelLoadMedia.cancel()
        }
    }, []); //eslint-disable-line

    const [drawParams, setDrawParams] = useState({color: 'black', colorRGBA: 'rgba(0, 0, 0, 0.2)', width: 2, imgWidth: 0, imgHeight: 0, figure: "brush-outlined", fontSize: 13, fontFamily: 'Arial, sans-serif', lineHeight: 15});
    const [undoList, setUndoList] = useState([]);

    const mouseDownHandler = e => {
        if(drawParams.figure === "arrow-outlined") drawDiv(canvasRef, lineRef, setUndoList, setTextDraw, setDrawParams);
    }

    const handleMouseDown = e => {
        if(drawParams.figure === "arrow-outlined") {
            let axis = null;
            if(e.target.className === styles.dotLeft) {
                const params = dotRightRef.current.getBoundingClientRect();
                axis = {y: params.top + params.height/2, x: params.left + params.width/2};
            }
            if(e.target.className === styles.dotRight) {
                const params = dotLeftRef.current.getBoundingClientRect();
                axis = {y: params.top + params.height/2, x: params.left + params.width/2};
            }
            let isCircle = false;
            e.nativeEvent.path.forEach(el => {if(el.className && el.className.includes('dot')) isCircle = true})
            if(isCircle) {
                setTextDraw(state => ({...state, move: false, widthDif: e.nativeEvent.layerX, heightDif: e.nativeEvent.layerY, sizeChange: true, initialParams: {x: e.pageX, y: state.initialParams.y === 0 ? e.pageY : state.initialParams.y}, axis}))
            } else {
                setTextDraw(state => ({...state, move: true, widthDif: e.nativeEvent.layerX, heightDif: e.nativeEvent.layerY}))
            }
        }
    }

    const handlePosition = e => {
        if(drawParams.figure === "arrow-outlined") {
            if(textDraw.move) {
                lineRef.current.style.left = e.pageX - canvasRef.current.getBoundingClientRect().x - textDraw.widthDif + "px";
                lineRef.current.style.top = e.pageY - canvasRef.current.getBoundingClientRect().y - textDraw.heightDif + "px";
            }
            if(textDraw.sizeChange) {
                const arrow = lineRef.current.getBoundingClientRect()
                const arrowEndX = arrow.left + arrow.width;
                const b = textDraw.initialParams.y - e.pageY;
                const c = e.pageX <= textDraw.axis.x ? -((arrow.left + arrow.width) - e.pageX) : e.pageX - arrow.left;
                const a = Math.round(Math.sqrt(b*b + c*c));
                if(a !== 0 && b !== 0 && c !== 0) {
                    const degree = Math.round(Math.atan(c / b) * 180 / Math.PI);
                    lineRef.current.style.transformOrigin = `center left`;
                    lineRef.current.style.transform = `rotate(${b > 0 ? degree - 90 : degree + 90}deg)`;
                    lineRef.current.style.width = (a - 3) + "px";
                } else {
                    lineRef.current.style.width = (arrow.width + e.pageX - arrowEndX - 3) + "px";
                }
            }
        }
    }

    const handleMouseUp = e => {
        if(drawParams.figure === "arrow-outlined") {
            setTextDraw(state => ({...state, move: false, widthDif: 0, heightDif: 0, sizeChange: false, axis: null}));
        }
    }

    return (
        <PopUp set={set} background={'none'} padding='0'>
            <div
                className={styles.preview}
                onClick={set}
                onMouseUp={() => setTextDraw(state => ({...state, move: false, widthDif: 0, heightDif: 0}))}
            >
                {loading
                    ? <Loader
                        type='bounceDots'
                        position='absolute'
                        background='rgba(0, 0, 0, 0)'
                        zIndex={5}
                        containerType='bounceDots'
                    />
                    : file
                        ? file.is_preview === 1
                            ? renderFilePreview()
                            : renderOfficePreview()
                        : null}
            </div>
        </PopUp>
    );
}

export default PreviewFile;
