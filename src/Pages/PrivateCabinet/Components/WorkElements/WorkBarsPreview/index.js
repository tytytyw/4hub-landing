import React, { useState, useEffect, useRef } from 'react';

import styles from './WorkBarsPreview.module.sass';

const WorkBarsPreview = ({children, file}) => {

    const [f, setF] = useState(file);
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
        </div>
        <div className={styles.renderedFiles}>
            <div className={styles.innerFiles}>{children}</div>
        </div>

    </div>)
}

export default WorkBarsPreview;