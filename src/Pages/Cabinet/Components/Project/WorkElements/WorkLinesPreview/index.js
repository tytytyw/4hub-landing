import React, {useEffect, useRef, useState} from 'react';

import styles from './WorkLinesPreview.module.sass';

// import {ReactComponent as EditIcon} from '../../../../../../assets/PrivateCabinet/edit-fill.svg'
// import {ReactComponent as CameraIcon} from '../../../../../../assets/PrivateCabinet/camera.svg'
// import {ReactComponent as DotsMenu} from '../../../../../../assets/PrivateCabinet/dots-menu.svg'
// import {ReactComponent as InfoIcon} from '../../../../../../assets/PrivateCabinet/info.svg'
// import InfoPopover from '../InfoPopover';
// import classNames from 'classnames';
// import Input from '../../../MyProfile/Input';
import MiniToolBar from "../MiniToolBar";
import PopUp from "../../../../../../generalComponents/PopUp";
import {useSelector} from "react-redux";
import api from "../../../../../../api";
import File from "../../../../../../generalComponents/Files";
import {imageToRatio, htmlToCanvas} from "../../../../../../generalComponents/generalHelpers";
import PrintScreen from "../../../../../../generalComponents/PrintScreen";
import {projectSrc, imageSrc} from '../../../../../../generalComponents/globalVariables';
import PreviewFile from "../../../PreviewFile/PreviewFile";
// import {useElementSize} from "../../../../../../generalComponents/Hooks";
// import {unDoPaintBrush} from "../../../PreviewFile/paintHelpers";

const WorkLinesPreview = ({recentFiles, children, chosenFile, fileCollapsed}) => {

    const [previewPopup, setPreviewPopup] = useState(false)
    // const [infoPopover, setInfoPopover] = useState(false)
    const [toolBar, ] = useState(false)
    const canvasRef = useRef()
    const previewRef = useRef()
    const [mouse, setMouse] = useState({down: false})
    const [drawParams, setDrawParams] = useState({color: 'black', width: 2, imgWidth: 0, imgHeight: 0})
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null
    const uid = useSelector(state => state.user.uid)
    const [, setUndoList] = useState([]);
    const [filePreview, setFilePreview] = useState({view: false, file: null, create: false});
    // const { width, height } = useElementSize(previewRef)
    //
    // useEffect(() => {
    //     console.log(width, height)
    // }, [width, height])

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

    // const handleEditImage = () => setToolBar(!toolBar)

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

    // const unDoPaint = () => {
    //     ctx.clearRect(0, 0, ctx.width, ctx.height)
    //     if(undoList.length > 0) {
    //         const dataUrl = undoList[undoList.length - 1];
    //         let img = new Image();
    //         img.src = dataUrl;
    //         img.onload = () => {
    //             const sizes = imageToRatio(img.naturalWidth, img.naturalHeight, 350, 400);
    //             ctx.drawImage(img, 0, 0, sizes.width, sizes.height);
    //             let newUndoList = undoList;
    //             newUndoList.pop();
    //             setUndoList(() => ([...newUndoList]));
    //         }
    //     }
    // }

    //PrintScreen of the webPage
    const imgRef = useRef(null);
    const [showPrintScreen, setShowPrintScreen] = useState(false);
    const [display, setDisplay] = useState('none');
    const makePrintScreen = () => {
        setShowPrintScreen(true);
        setTimeout(() => {
            htmlToCanvas(document.getElementById('root'), imgRef.current, setDisplay)
        }, 500);
        setTimeout(() => {
            setShowPrintScreen(false);
        }, 10500);
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

                {/*<div className={styles.previewHeader}>*/}
                {/*    <h4 className={styles.previewTitle}>Дизайн мото сайта</h4>*/}
                {/*    <div className={styles.actionBlock}>*/}

                {/*        <button*/}
                {/*            onClick={makePrintScreen}*/}
                {/*            className={classNames({*/}
                {/*                [styles.actionBtn]: true,*/}
                {/*            })}*/}
                {/*        >*/}
                {/*            <CameraIcon className={styles.cameraIcon} />*/}
                {/*        </button>*/}

                {/*        <button*/}
                {/*            onClick={handleEditImage}*/}
                {/*            className={classNames({*/}
                {/*                [styles.actionBtn]: true,*/}
                {/*                [styles.activeBtn]: toolBar*/}
                {/*            })}*/}
                {/*        >*/}
                {/*            <EditIcon/>*/}
                {/*        </button>*/}

                {/*        <button*/}
                {/*            className={classNames({*/}
                {/*                [styles.actionBtn]: true,*/}
                {/*            })}*/}
                {/*        >*/}
                {/*            <DotsMenu/>*/}
                {/*        </button>*/}

                {/*        <button*/}
                {/*            onMouseEnter={() => setInfoPopover(true)}*/}
                {/*            onMouseLeave={() => setInfoPopover(false)}*/}
                {/*            className={classNames({*/}
                {/*                [styles.actionBtn]: true,*/}
                {/*                [styles.activeBtn]: infoPopover*/}
                {/*            })}*/}
                {/*        >*/}
                {/*            <InfoIcon/>*/}
                {/*        </button>*/}

                {/*    </div>*/}
                {/*</div>*/}

                <div className={styles.previewContent}>

                    {/*{infoPopover &&*/}
                    {/*<InfoPopover*/}
                    {/*    set={setInfoPopover}*/}
                    {/*/>}*/}

                    <MiniToolBar
                        // file={file}
                        // setTextDraw={setTextDraw}
                        direction="row"
                        drawParams={drawParams}
                        setDrawParams={setDrawParams}
                        toolBarType={'previewFile'}
                        prointScreen={makePrintScreen}
                        // unDoPaint={() => unDoPaintBrush(canvasRef, undoList, setUndoList)}

                        // drawParams={drawParams}
                        // setDrawParams={setDrawParams}
                        // unDoPaint={unDoPaint}
                    />

                    <div className={styles.previewImg} ref={previewRef}>
                        {chosenFile ? chosenFile.is_preview === 1 ? renderFilePreview() : <div><div className={styles.filePreviewWrap}><File format={chosenFile?.ext} color={chosenFile?.color} /></div></div> : null}
                    </div>

                    {/*<div className={styles.commentBlock}>*/}

                        {/*<div className={styles.addCommentBlock}>*/}
                        {/*    <img src={imageSrc + './assets/PrivateCabinet/avatars/a2.svg'} alt='Comment Avatar'/>*/}
                        {/*    <Input*/}
                        {/*        placeholder='Комментировать'*/}
                        {/*        className={styles.commentInput}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {/*<div className={styles.commentContent}>*/}

                        {/*    <div className={styles.commentItem}>*/}
                        {/*        <img*/}
                        {/*            className={styles.commentAvatar}*/}
                        {/*            src={imageSrc + './assets/PrivateCabinet/avatars/a3.svg'}*/}
                        {/*            alt='Comment Avatar'*/}
                        {/*        />*/}
                        {/*        <p className={styles.commentText}>*/}
                        {/*            Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее*/}
                        {/*            время, программы электронной вёрстки типа*/}
                        {/*        </p>*/}
                        {/*    </div>*/}

                        {/*    <div className={styles.commentItem}>*/}
                        {/*        <img*/}
                        {/*            className={styles.commentAvatar}*/}
                        {/*            src={imageSrc + './assets/PrivateCabinet/avatars/a3.svg'}*/}
                        {/*            alt='Comment Avatar'*/}
                        {/*        />*/}
                        {/*        <p className={styles.commentText}>*/}
                        {/*            Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее*/}
                        {/*            время, программы электронной вёрстки типа*/}
                        {/*        </p>*/}
                        {/*    </div>*/}

                        {/*    <div className={styles.commentItem}>*/}
                        {/*        <img*/}
                        {/*            className={styles.commentAvatar}*/}
                        {/*            src={imageSrc + './assets/PrivateCabinet/avatars/a3.svg'}*/}
                        {/*            alt='Comment Avatar'*/}
                        {/*        />*/}
                        {/*        <p className={styles.commentText}>*/}
                        {/*            Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее*/}
                        {/*            время, программы электронной вёрстки типа*/}
                        {/*        </p>*/}
                        {/*    </div>*/}

                        {/*    <div className={styles.commentItem}>*/}
                        {/*        <img*/}
                        {/*            className={styles.commentAvatar}*/}
                        {/*            src={imageSrc + './assets/PrivateCabinet/avatars/a3.svg'}*/}
                        {/*            alt='Comment Avatar'*/}
                        {/*        />*/}
                        {/*        <p className={styles.commentText}>*/}
                        {/*            Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее*/}
                        {/*            время, программы электронной вёрстки типа*/}
                        {/*        </p>*/}
                        {/*    </div>*/}

                        {/*</div>*/}

                    {/*</div>*/}

                </div>

            </div>
            {showPrintScreen ? <PrintScreen imgRef={imgRef} show={display} setShow={setDisplay} setFilePreview={setFilePreview} /> : null}
            {filePreview.view ? <PreviewFile filePreview={filePreview} setFilePreview={setFilePreview} file={filePreview?.file} /> : null}
            {previewPopup &&
            <PopUp set={setPreviewPopup}>
                <img
                    style={{
                        width: '700px',
                        height: '804px'
                    }}
                    className={styles.previewPopupImg}
                    src={imageSrc + "./assets/PrivateCabinet/Bitmap2.png"}
                    alt="Bitmap"
                />
            </PopUp>}
        </div>)
}

export default WorkLinesPreview