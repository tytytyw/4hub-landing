import React, {useEffect, useRef, useState} from 'react';

import {previewFormats} from '../../../../generalComponents/collections';
import styles from './PreviewFile.module.sass';
import PopUp from '../../../../generalComponents/PopUp';
import File from "../../../../generalComponents/Files";
import {imageSrc} from '../../../../generalComponents/globalVariables';
import {imageToRatio} from "../../../../generalComponents/generalHelpers";
import MiniToolBar from "../Project/WorkElements/MiniToolBar";

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
                        top="7px"
                        drawParams={drawParams}
                        setDrawParams={setDrawParams}
                        unDoPaint={unDoPaint}
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

    const [drawParams, setDrawParams] = useState({color: 'black', width: 2, imgWidth: 0, imgHeight: 0});
    // const uid = useSelector(state => state.user.uid);
    const [undoList, setUndoList] = useState([]);
    const [mouse, setMouse] = useState({down: false});

    const mouseUpHandler = () => {
        if(edit.status === 'Сохранить') {
            setMouse(mouse => ({...mouse, down: false}));
        }
    }

    const mouseDownHandler = e => {
        const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
        if(edit.status === 'Сохранить' && ctx) {
            setMouse(mouse => ({...mouse, down: true}));
            ctx.beginPath();
            ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            setUndoList(state => ([...state, canvasRef.current.toDataURL()]))
        }
    }

    const mouseMoveHandler = e => {
        if(edit.status === 'Сохранить' && mouse.down) {
            draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
    }

    const draw = (x, y) => {
        const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
        ctx.lineTo(x, y);
        ctx.strokeStyle = drawParams.color;
        ctx.lineWidth = drawParams.width;
        ctx.stroke();
    }

    const unDoPaint = () => {
        const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        if(undoList.length > 0) {
            const dataUrl = undoList[undoList.length - 1];
            let img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                const sizes = imageToRatio(img.naturalWidth, img.naturalHeight, canvasRef.current.width, canvasRef.current.height);
                ctx.drawImage(img, 0, 0, sizes.width, sizes.height);
                let newUndoList = undoList;
                newUndoList.pop();
                setUndoList(() => ([...newUndoList]));
            }
        }
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