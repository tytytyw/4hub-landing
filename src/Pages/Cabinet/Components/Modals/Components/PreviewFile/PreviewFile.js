import React, {useEffect, useRef, useState} from 'react';

import {previewFormats} from '../../../../../../generalComponents/collections';
import styles from './PreviewFile.module.sass';
import PopUp from '../../../../../../generalComponents/PopUp';
import File from "../../../../../../generalComponents/Files";
import {imageSrc, projectSrc} from '../../../../../../generalComponents/globalVariables';
import {getMedia, imageToRatio} from "../../../../../../generalComponents/generalHelpers";
import MiniToolBar from "../../../WorkElements/MiniToolBar/MiniToolBar";
import Loader from "../../../../../../generalComponents/Loaders/4HUB";

const PreviewFile = ({setFilePreview = () => {}, file}) => {

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
    const canvasWrapRef = useRef(null)
    const audioRef = useRef(null);
    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const renderFilePreview = () => {
        switch (file.mime_type.split('/')[0]) {
            case 'image': {
                return <div className={styles.imagePreviewWrap} ref={canvasWrapRef}>
                    <MiniToolBar
                        canvasRef={canvasRef}
                        canvasWrapRef={canvasWrapRef}
                        file={file}
                        // setFilePreview={setFilePreview}
                        share={true}
                        closePreview={set}
                    />
                    <div className={styles.canvasWrap}>
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
                        />
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

    return (
        <PopUp set={set} background={'none'} padding='0'>
            <div
                className={styles.preview}
                onClick={set}
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
