import React, {useEffect, useState} from "react";
import styles from "./PrintScreen.module.sass";
import {imageToRatio} from "../generalHelpers";

const PrintScreen = ({imgRef, show, setShow}) => {

    const [display, setDisplay] = useState('none');
    const [size, setSize] = useState({width: '200px', height: '150px'});
    useEffect(() => {
        setDisplay(show);
        if(show === 'block') {
            const audio = new Audio('./assets/audio/printScreen.mp3');
            audio.play();
            const sizes = imageToRatio(imgRef.current.width, imgRef.current.height, 200, 200);
            setSize(size => ({...size, width: sizes.width, height: sizes.height}));
        }
    }, [show, imgRef]);

    useEffect(() => {
        return () => {setDisplay('none'); setShow('none')}
    }, []) //eslint-disable-line

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
            />
        </>
    )
}

export default PrintScreen;
