import React, {useEffect, useRef, useState} from 'react';

import styles from './Previews.module.sass';
import {imageSrc, projectSrc} from "../../../../../generalComponents/globalVariables";
import File from "../../../../../generalComponents/Files";
import {previewFormats} from "../../../../../generalComponents/collections";
import {getMedia, imageToRatio} from "../../../../../generalComponents/generalHelpers";

function Previews({
    file = null,
    canvasRef = null,
    width = undefined,
    height = undefined,
    setLoading = () => {}
}) {

    const audioRef = useRef(null);
    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    const standardPrev = <div className={styles.filePreviewWrapWrap}><div className={styles.filePreviewWrap}><File format={file?.ext} color={file?.color} /></div></div>;

    const renderOfficePreview = () => {
        const isFormat = previewFormats.filter(type => file?.ext.toLowerCase().includes(type)).length > 0;
        if(isFormat && file?.edit_url) {
            return <iframe src={file.edit_url} title={file?.name} frameBorder="0" scrolling="no" />
        } else {
            return standardPrev;
        }
    }

    const renderFilePreview = () => {
        switch (file.mime_type.split('/')[0]) {
            case 'image': {
                return <canvas
                    ref={canvasRef}
                    className={styles.canvas}
                />
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
                    <audio ref={audioRef} src={audio ? audio : ''} type={file?.mime_type} controls onError={e => console.log(e)}>
                        <source src={audio ? audio : ''} type={file?.mime_type} />
                    </audio>
                </div>
            }
            case 'application': {
                return <iframe src={`${projectSrc}${file?.preview}`} title={file?.name} frameBorder="0" scrolling="no" />
            }
            default: {
                return <div className={styles.filePreviewWrapWrap}><div className={styles.filePreviewWrap}><File format={file?.ext} color={file?.color} /></div></div>
            }
        }
    }

    useEffect(() => {
        if(file.mime_type && file.mime_type.includes('image')) {
            setLoading(true);
            const canvas = canvasRef.current.getContext('2d');
            const img = new Image();
            img.src = `${file.preview}${file.fid === 'printScreen' ? '' : `?${new Date()}`}`;
            img.onload = (e) => {
                if(canvasRef.current) {
                    setLoading(false);
                    const sizes = imageToRatio(e.target.naturalWidth, e.target.naturalHeight, width ?? Number((window.innerWidth * 0.84).toFixed()), height ?? Number((window.innerHeight * 0.79).toFixed()));
                    canvasRef.current.width = sizes.width;
                    canvasRef.current.height = sizes.height;
                    canvas.clearRect(0, 0, e.target.naturalWidth, e.target.naturalHeight);
                    canvas.drawImage(img, 0, 0, sizes.width, sizes.height);
                }
            }
        }
        if(file.mime_type && file.mime_type.includes('audio') && file.is_preview) {
            setLoading(true);
            getMedia(`${imageSrc}${file.preview}`, file.mime_type, setAudio, setLoading)
        }
        if(file.mime_type && file.mime_type.includes('video') && file.is_preview) {
            setLoading(true);
            getMedia(`${imageSrc}${file.preview}`, file.mime_type, setVideo, setLoading)
        }
        return () => {
            if(window.cancelLoadMedia) window.cancelLoadMedia.cancel()
        }
    }, []); //eslint-disable-line

    return(
        <div className={styles.previewsWrap}>
            {file?.is_preview === 1 ? renderFilePreview() : renderOfficePreview()}
        </div>
    )
}

export default Previews