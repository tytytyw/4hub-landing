import React, {useEffect, useRef, useState} from "react";
import styles from "./PrintScreen.module.sass";
import {htmlToCanvas, imageToRatio} from "../../../../../../generalComponents/generalHelpers";
import {useDispatch, useSelector} from "react-redux";
import {onSetModals} from "../../../../../../Store/actions/CabinetActions";

const PrintScreen = () => {
    const printScreen = useSelector(s => s.Cabinet.modals.printScreen);
    const imgRef = useRef(null);
    const [display, setDisplay] = useState('none');
    const [size, setSize] = useState({width: '200px', height: '150px'});
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            htmlToCanvas(document.getElementById('root'), imgRef.current, showImage)
        }, 500);
    }, []) //eslint-disable-line

    const showImage = (display, result) => {
        setDisplay(display);
        const audio = new Audio('./assets/audio/printScreen.mp3');
        audio.addEventListener("canplaythrough", () => {
            audio.play()
        });

        dispatch(onSetModals('printScreen', {...printScreen, result}))
        const sizes = imageToRatio(imgRef.current.width, imgRef.current.height, 200, 200);
        setSize(size => ({...size, width: sizes.width, height: sizes.height}));
        setTimeout(() => {
            setDisplay('none');
            dispatch(onSetModals('printScreen', {...printScreen, open: false}))
        }, 10500);
    }

    const handlePreview = (e) => {
        //TODO - add preview via dispatch
        // setFilePreview({view: true, file: {preview: e.target.src, mime_type: 'image/png', ext: 'PNG', is_preview: 1, fid: 'printScreen'}});
        setDisplay('none');
        dispatch(onSetModals('printScreen', {...printScreen, open: false}));
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
