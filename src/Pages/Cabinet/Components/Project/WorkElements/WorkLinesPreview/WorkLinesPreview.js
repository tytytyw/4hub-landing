import React, {useEffect, useRef, useState} from 'react';
import styles from './WorkLinesPreview.module.sass';
import MiniToolBar from "../../../WorkElements/MiniToolBar/MiniToolBar";
import {useSelector} from "react-redux";
import api from "../../../../../../api";
import File from "../../../../../../generalComponents/Files";
import {imageToRatio} from "../../../../../../generalComponents/generalHelpers";
import {projectSrc} from '../../../../../../generalComponents/globalVariables';
import PreviewFile from "../../../Modals/Components/PreviewFile/PreviewFile";

const WorkLinesPreview = ({recentFiles, children, chosenFile, fileCollapsed}) => {

    const [toolBar, ] = useState(false)
    const canvasRef = useRef()
    const previewRef = useRef()
    const [mouse, setMouse] = useState({down: false})
    const [drawParams, setDrawParams] = useState({color: 'black', width: 2, imgWidth: 0, imgHeight: 0})
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null
    const uid = useSelector(state => state.user.uid)
    const [, setUndoList] = useState([]);
    const [filePreview, setFilePreview] = useState({view: false, file: null, create: false});

    useEffect(() => {
        if(chosenFile?.mime_type && chosenFile?.mime_type?.split('/')[0] === 'image') {
            const canvas = canvasRef.current.getContext('2d');
            canvas.clearRect(0, 0, 0, 0);
            const img = new Image();
            img.src = chosenFile.preview;
            img.onload = async (e) => {
                const sizes = imageToRatio(e.target.naturalWidth, e.target.naturalHeight, previewRef.current?.offsetWidth - 60, previewRef.current?.offsetHeight - 50);
                await setDrawParams(state => ({...state, imgWidth: sizes.width.toFixed(), imgHeight: sizes.height.toFixed()}))
                canvas.drawImage(img, 0, 0, sizes.width.toFixed(), sizes.height.toFixed());
            }
            img.onerror = e => console.log(e)
        }
    }, [chosenFile, fileCollapsed]) //eslint-disable-line


    const mouseUpHandler = () => {
        if(toolBar) {
            setMouse(mouse => ({...mouse, down: false}));
            sendDraw();
        }
    }

    const mouseDownHandler = e => {
        if(toolBar) {
            setMouse(mouse => ({...mouse, down: true}));
            ctx.beginPath();
            ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            setUndoList(state => ([...state, canvasRef.current.toDataURL()]))
        }
    }

    const mouseMoveHandler = e => {
        if(toolBar && mouse.down) {
            draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
    }

    const draw = (x, y) => {
        ctx.lineTo(x, y);
        ctx.strokeStyle = drawParams.color;
        ctx.lineWidth = drawParams.width;
        ctx.stroke();
    }

    const sendDraw = () => {
        api.post(`/ajax/paint_add?uid=${uid}&fid=${chosenFile.fid}&line=${123}&color=${drawParams.color}&width=${drawParams.imgWidth}&height=${drawParams.imgHeight}`)
            .then(res => console.log(res));
    }

    const renderFilePreview = () => {
        switch (chosenFile.mime_type.split('/')[0]) {
            case 'image': {
                return <canvas
                    ref={canvasRef}
                    width={drawParams.imgWidth}
                    height={drawParams.imgHeight}
                    className={styles.canvas}
                    onMouseDown={mouseDownHandler}
                    onMouseMove={mouseMoveHandler}
                    onMouseUp={mouseUpHandler}
                />
            }
            case 'video': {
                return <video controls src={`${projectSrc}${chosenFile.preview}`} type={chosenFile.mime_type}>
                    <source src={`${projectSrc}${chosenFile.preview}`} type={chosenFile.mime_type}/>
                </video>
            }
            // case 'audio': {
            //     return <>
            //         <audio controls ref={audioRef} src={`https://fs2.mh.net.ua${f.preview}`}>
            //             <source src={`https://fs2.mh.net.ua${chosenFile.preview}`} type={chosenFile.mime_type}/>
            //         </audio>
            //         <div className={styles.audioPicWrap}>
            //             <img className={styles.audioPic} src={`${imageSrc}}assets/PrivateCabinet/file-preview_audio.svg`} alt='audio'/>
            //             {/*{!play ? <img className={styles.audioSwitchPlay} src={`${imageSrc}}assets/PrivateCabinet/play-black.svg`} alt='play' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}*/}
            //             {/*{play ? <img className={styles.audioSwitch} src={`${imageSrc}}assets/PrivateCabinet/pause.svg' alt='pause`} onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}*/}
            //         </div>
            //     </>
            // }
            default: {
                return <div className={styles.filePreviewWrap}><File format={chosenFile?.ext} color={chosenFile?.color} /></div>
            }
        }
    }

    return (
        <div
            className={styles.workLinesPreviewWrap}
            style={{
                height: `${recentFiles?.length > 0 ? 'calc(100% - 90px - 55px - 78px)' : 'calc(100% - 90px - 55px)'}`
            }}
        >

            <div
                className={styles.fileListWrap}
                style={{
                    minWidth: fileCollapsed ? 110 : ''
                }}
            >
                {children}
            </div>

            <div className={styles.previewFileWrap}>
                <div className={styles.previewContent}>
                    {chosenFile?.mime_type && chosenFile?.mime_type?.split('/')[0] === 'image' ? <MiniToolBar
                        direction="row"
                        drawParams={drawParams}
                        setDrawParams={setDrawParams}
                        toolBarType={'previewFile'}
                        file={chosenFile}
                        canvasRef={canvasRef}
                    /> : null}
                    <div className={styles.previewImg} ref={previewRef}>
                        {chosenFile ? chosenFile.is_preview === 1 ? renderFilePreview() : <div><div className={styles.filePreviewWrap}><File format={chosenFile?.ext} color={chosenFile?.color} /></div></div> : null}
                    </div>
                </div>
            </div>
            {filePreview.view ? <PreviewFile filePreview={filePreview} setFilePreview={setFilePreview} file={filePreview?.file} /> : null}
        </div>)
}

export default WorkLinesPreview