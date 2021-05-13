import React, { useState, useEffect, useRef } from 'react';

import styles from './WorkBarsPreview.module.sass';
<<<<<<< HEAD
=======
import File from '../../../../../generalComponents/Files';
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87

const WorkBarsPreview = ({children, file}) => {

    const [f, setF] = useState(file);
<<<<<<< HEAD
    useEffect(() => setF(file), [file]);

    const audioRef = useRef(null);
    // const [play, setPlay] = useState(false)

    return (<div className={styles.workBarsPreviewWrap}>
        <div className={styles.preview}>
            {/*{f?.is_preview ? <iframe src={`https://fs2.mh.net.ua${f.preview}`} title={f.name} frameBorder="0" scrolling="no"  /> : 'null'}*/}
            {/*{f?.is_preview ? <img src={f.preview} alt='filePrieview' /> : 'null'}*/}
            {/*{f?.is_preview ? (*/}
            {/*    <video controls src={f.preview} />*/}
            {/*) : 'null'}*/}
            {f ? <img src='./assets/PrivateCabinet/file-preview.svg' alt='file' /> : null}
            {f?.is_preview ? <audio controls src={`https://fs2.mh.net.ua${f.preview}`} type='audio/mp3' ref={audioRef} /> : null}
            {/*<div className={styles.audioPicWrap}>*/}
            {/*    <img className={styles.audioPic} src='./assets/PrivateCabinet/file-preview_audio.svg' alt='audio'/>*/}
            {/*    {!play ? <img className={styles.audioSwitchPlay} src='./assets/PrivateCabinet/play-black.svg' alt='play' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}*/}
            {/*    {play ? <img className={styles.audioSwitch} src='./assets/PrivateCabinet/pause.svg' alt='pause' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}*/}
            {/*</div>*/}
=======
    useEffect(() => {setF(file); setPlay(false)}, [file]);

    const audioRef = useRef(null);
    const [play, setPlay] = useState(false);

    const renderFilePreview = () => {
        switch (f.mime_type.split('/')[0]) {
            case 'image': {
                return <img src={f.preview} alt='filePrieview' />
            }
            case 'video': {
                return <video controls src={`https://fs2.mh.net.ua${f.preview}`} type={f.mime_type}>
                    <source src={`https://fs2.mh.net.ua${f.preview}`} type={f.mime_type}/>
                </video>
            }
            case 'audio': {
                return <>
                    <audio controls ref={audioRef} src={`https://fs2.mh.net.ua${f.preview}`}>
                        <source src={`https://fs2.mh.net.ua${f.preview}`} type={f.mime_type}/>
                    </audio>
                    <div className={styles.audioPicWrap}>
                        <img className={styles.audioPic} src='./assets/PrivateCabinet/file-preview_audio.svg' alt='audio'/>
                        {!play ? <img className={styles.audioSwitchPlay} src='./assets/PrivateCabinet/play-black.svg' alt='play' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}
                        {play ? <img className={styles.audioSwitch} src='./assets/PrivateCabinet/pause.svg' alt='pause' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}
                    </div>
                </>
            }
            // case 'application': {
            //     return <iframe src={`https://fs2.mh.net.ua${f.preview}`} title={f.name} frameBorder="0" scrolling="no"  />
            // }
            default: {
                return <div className={styles.filePreviewWrap}><File format={f?.ext} color={f?.color} /></div>
            }
        }
    }

    return (<div className={styles.workBarsPreviewWrap}>
        <div className={styles.preview}>
            {f ? f.is_preview === 1 ? renderFilePreview() : <div><div className={styles.filePreviewWrap}><File format={f?.ext} color={f?.color} /></div></div> : null}
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
        </div>
        <div className={styles.renderedFiles}>
            <div className={styles.innerFiles}>{children}</div>
        </div>

    </div>)
}

export default WorkBarsPreview;