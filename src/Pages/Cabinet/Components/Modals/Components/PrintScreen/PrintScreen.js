import React, {useEffect, useRef, useState} from "react";
import styles from "./PrintScreen.module.sass";
import {htmlToCanvas, imageToRatio} from "../../../../../../generalComponents/generalHelpers";

const PrintScreen = ({show, setShow, setFilePreview}) => {

    const imgRef = useRef(null);
    const [display, setDisplay] = useState('none');
    const [size, setSize] = useState({width: '200px', height: '150px'});
    useEffect(() => {
        setDisplay(show);
        if(show === 'block') {
            const audio = new Audio('./assets/audio/printScreen.mp3');
            audio.addEventListener("canplaythrough", () => {
                audio.play()
            });

            const sizes = imageToRatio(imgRef.current.width, imgRef.current.height, 200, 200);
            setSize(size => ({...size, width: sizes.width, height: sizes.height}));
        }
    }, [show, imgRef]);

    useEffect(() => {
        setTimeout(() => {
            htmlToCanvas(document.getElementById('root'), imgRef.current, setDisplay)
        }, 500);
        return () => {setDisplay('none'); setShow('none')}
    }, []) //eslint-disable-line

    const handlePreview = (e) => {
        setFilePreview({view: true, file: {preview: e.target.src, mime_type: 'image/png', ext: 'PNG', is_preview: 1, fid: 'printScreen'}});
        setDisplay('none');
        setShow('none');
    }

    return(
        <>
            <img
                src=''
                alt='printScreen'
                ref={imgRef}
                className={`${styles.screenImage} ${display === 'block' ? styles.minimize : ''}`}
                style={{
                    display,
                    width: display === 'block' ? `${size.width}px` : '',
                    height: display === 'block' ? `${size.height}px` : '',
                }}
                onClick={handlePreview}
            />
        </>
    )
}

export default PrintScreen;
