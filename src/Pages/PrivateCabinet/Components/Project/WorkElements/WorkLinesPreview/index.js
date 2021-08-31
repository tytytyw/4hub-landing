import React, {useEffect, useRef, useState} from 'react';

import styles from './WorkLinesPreview.module.sass';

import {ReactComponent as EditIcon} from '../../../../../../assets/PrivateCabinet/edit-fill.svg'
import {ReactComponent as DotsMenu} from '../../../../../../assets/PrivateCabinet/dots-menu.svg'
import {ReactComponent as InfoIcon} from '../../../../../../assets/PrivateCabinet/info.svg'
import InfoPopover from '../InfoPopover';
import classNames from 'classnames';
import Input from '../../../MyProfile/Input';
import MiniToolBar from "../MiniToolBar";
import PopUp from "../../../../../../generalComponents/PopUp";
import {useSelector} from "react-redux";
import api from "../../../../../../api";
import File from "../../../../../../generalComponents/Files";

const WorkLinesPreview = ({recentFiles, children, chosenFile}) => {

    const [previewPopup, setPreviewPopup] = useState(false)
    const [infoPopover, setInfoPopover] = useState(false)
    const [toolBar, setToolBar] = useState(false)
    const canvasRef = useRef()
    const [mouse, setMouse] = useState({down: false})
    const [drawParams, setDrawParams] = useState({color: 'black', width: 2})
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null
    const uid = useSelector(state => state.user.uid)

    useEffect(() => {
        if(chosenFile?.mime_type && chosenFile?.mime_type?.split('/')[0] === 'image') {
            const canvas = canvasRef.current.getContext('2d');
            const img = new Image();
            img.src = chosenFile.preview;
            img.onload = () => canvas.drawImage(img, 0, 0, 350, 400);
        }
    }, [chosenFile])

    const handleEditImage = () => setToolBar(!toolBar);

    const mouseUpHandler = () => {
        setMouse(mouse => ({...mouse, down: false}));
        sendDraw();
    }

    const mouseDownHandler = e => {
        if(toolBar) {
            setMouse(mouse => ({...mouse, down: true}));
            ctx.beginPath();
            ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
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
        api.post(`/ajax/paint_add?uid=${uid}&fid=${chosenFile.fid}&line=${123}&color=${drawParams.color}&width=${350}&height=${400}`)
            .then(res => console.log(res));
    }

    const renderFilePreview = () => {
        switch (chosenFile.mime_type.split('/')[0]) {
            case 'image': {
                return <canvas
                    ref={canvasRef}
                    width='350'
                    height='400'
                    className={styles.canvas}
                    onMouseDown={mouseDownHandler}
                    onMouseMove={mouseMoveHandler}
                    onMouseUp={mouseUpHandler}
                />
            }
            case 'video': {
                return <video controls src={`https://fs2.mh.net.ua${chosenFile.preview}`} type={chosenFile.mime_type}>
                    <source src={`https://fs2.mh.net.ua${chosenFile.preview}`} type={chosenFile.mime_type}/>
                </video>
            }
            // case 'audio': {
            //     return <>
            //         <audio controls ref={audioRef} src={`https://fs2.mh.net.ua${f.preview}`}>
            //             <source src={`https://fs2.mh.net.ua${chosenFile.preview}`} type={chosenFile.mime_type}/>
            //         </audio>
            //         <div className={styles.audioPicWrap}>
            //             <img className={styles.audioPic} src='./assets/PrivateCabinet/file-preview_audio.svg' alt='audio'/>
            //             {/*{!play ? <img className={styles.audioSwitchPlay} src='./assets/PrivateCabinet/play-black.svg' alt='play' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}*/}
            //             {/*{play ? <img className={styles.audioSwitch} src='./assets/PrivateCabinet/pause.svg' alt='pause' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}*/}
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
                height: `${recentFiles?.length > 0 ? 'calc(100% - 90px - 55px - 78px - 60px)' : 'calc(100% - 90px - 55px - 60px)'}`
            }}
        >

            <div className={styles.fileListWrap}>
                {children}
            </div>

            <div className={styles.previewFileWrap}>

                <div className={styles.previewHeader}>
                    <h4 className={styles.previewTitle}>Дизайн мото сайта</h4>
                    <div className={styles.actionBlock}>

                        <button
                            onClick={handleEditImage}
                            className={classNames({
                                [styles.actionBtn]: true,
                                [styles.activeBtn]: toolBar
                            })}
                        >
                            <EditIcon/>
                        </button>

                        <button
                            className={classNames({
                                [styles.actionBtn]: true,
                            })}
                        >
                            <DotsMenu/>
                        </button>

                        <button
                            onMouseEnter={() => setInfoPopover(true)}
                            onMouseLeave={() => setInfoPopover(false)}
                            className={classNames({
                                [styles.actionBtn]: true,
                                [styles.activeBtn]: infoPopover
                            })}
                        >
                            <InfoIcon/>
                        </button>

                    </div>
                </div>

                <div className={styles.previewContent}>

                    {infoPopover &&
                    <InfoPopover
                        set={setInfoPopover}
                    />}

                    {toolBar &&
                    <MiniToolBar
                        drawParams={drawParams}
                        setDrawParams={setDrawParams}
                    />}

                    <div className={styles.previewImg}>
                        {chosenFile ? chosenFile.is_preview === 1 ? renderFilePreview() : <div><div className={styles.filePreviewWrap}><File format={chosenFile?.ext} color={chosenFile?.color} /></div></div> : null}
                    </div>

                    <div className={styles.commentBlock}>

                        <div className={styles.addCommentBlock}>
                            <img src='./assets/PrivateCabinet/avatars/a2.svg' alt='Comment Avatar'/>
                            <Input
                                placeholder='Комментировать'
                                className={styles.commentInput}
                            />
                        </div>

                        <div className={styles.commentContent}>

                            <div className={styles.commentItem}>
                                <img
                                    className={styles.commentAvatar}
                                    src='./assets/PrivateCabinet/avatars/a3.svg'
                                    alt='Comment Avatar'
                                />
                                <p className={styles.commentText}>
                                    Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
                                    время, программы электронной вёрстки типа
                                </p>
                            </div>

                            <div className={styles.commentItem}>
                                <img
                                    className={styles.commentAvatar}
                                    src='./assets/PrivateCabinet/avatars/a3.svg'
                                    alt='Comment Avatar'
                                />
                                <p className={styles.commentText}>
                                    Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
                                    время, программы электронной вёрстки типа
                                </p>
                            </div>

                            <div className={styles.commentItem}>
                                <img
                                    className={styles.commentAvatar}
                                    src='./assets/PrivateCabinet/avatars/a3.svg'
                                    alt='Comment Avatar'
                                />
                                <p className={styles.commentText}>
                                    Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
                                    время, программы электронной вёрстки типа
                                </p>
                            </div>

                            <div className={styles.commentItem}>
                                <img
                                    className={styles.commentAvatar}
                                    src='./assets/PrivateCabinet/avatars/a3.svg'
                                    alt='Comment Avatar'
                                />
                                <p className={styles.commentText}>
                                    Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
                                    время, программы электронной вёрстки типа
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {previewPopup &&
            <PopUp set={setPreviewPopup}>
                <img
                    style={{
                        width: '700px',
                        height: '804px'
                    }}
                    className={styles.previewPopupImg}
                    src="./assets/PrivateCabinet/Bitmap2.png"
                    alt="Bitmap"
                />
            </PopUp>}

        </div>)
}

export default WorkLinesPreview