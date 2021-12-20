import React, {useState} from 'react'

import styles from './MiniToolBar.module.sass'
import {ReactComponent as PencilIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/pencil.svg'
import {ReactComponent as MarkerIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/marker.svg'
import {ReactComponent as PenThickIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/penThick.svg'
import {ReactComponent as PenThinIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/penThin.svg'
import {ReactComponent as BrushIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/brush.svg'
import {ReactComponent as EraserIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/eraser.svg'
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/add.svg'
import {ReactComponent as PhotoIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/photo.svg'
import {useDispatch, useSelector} from "react-redux";
import {onSetPaint} from "../../../../../Store/actions/CabinetActions";
import Pencil from "./Tools/Pencil";
import Eraser from "./Tools/Eraser";
import PenThin from "./Tools/PenThin";
import PenThick from "./Tools/PenThick";
import Marker from "./Tools/Marker";
import ColorPicker from "./Tools/ColorPicker";
import Brush from "./Tools/Brush";

const MiniToolBar = ({
         file, toolBarType = 'general', width = '100%', canvasRef = null
}) => {

    const [params, setParams] = useState({edit: false});
    const paint = useSelector(state => state.Cabinet.paint);
    const dispatch = useDispatch();

    const addButton = (icon, name = '', toolName = null) => (
        <div
            className={`${styles.buttonWrap} ${!params.edit && styles.buttonWrapInactive} ${name === paint.tool?.name && styles.chosen}`}
            onClick={toolName ? () => {
                dispatch(onSetPaint('tool', new toolName(canvasRef?.current)))
            } : null}
        >
            {icon}
        </div>
    )

    const chooseColor = () => {
        dispatch(onSetPaint('tool', {name: "colorPicker"}));
    }

    const handleSaveImage = () => {
        if(params.edit) {
            canvasRef.current.onmousemove = null;
            canvasRef.current.onmousedown = null;
            canvasRef.current.onmouseup = null;
            dispatch(onSetPaint('tool', undefined));
            console.log(file)
            // const preview = canvasRef.current.toDataURL("image/png");
            // if(file.fid && file.fid !== 'printScreen') replaceFile(uid, file, preview);
            // if(file.fid === 'printScreen') sendFile(uid, file);
        } else {
            dispatch(onSetPaint('tool', new Pencil(canvasRef?.current)));
        }
        setParams(state => ({...state, edit: !state.edit}));
    }

    const standardEditToolBar = () => (
        <div className={styles.standardToolBarWrap}>
            <div className={styles.customWrap}>{addButton(<PencilIcon className={`${!params.edit && styles.inActive}`} />, "pencil", Pencil)}</div>
            <div className={styles.customWrap}>{addButton(<MarkerIcon className={`${!params.edit && styles.inActive}`} />, "marker", Marker)}</div>
            <div className={styles.customWrap}>{addButton(<PenThickIcon className={`${!params.edit && styles.inActive}`} />, "penThick", PenThick)}</div>
            <div className={styles.customWrap}>{addButton(<PenThinIcon className={`${!params.edit && styles.inActive}`} />, "penThin", PenThin)}</div>
            <div className={styles.customWrap}>{addButton(<BrushIcon className={`${!params.edit && styles.inActive}`} />, "brush", Brush)}</div>
            <div className={styles.customWrap}>{addButton(<EraserIcon className={`${!params.edit && styles.inActive}`} />, "eraser", Eraser)}</div>
            <div className={styles.customWrap}>{addButton(!params.edit ? <div className={styles.inactiveColor} /> : <img src='./assets/PrivateCabinet/Oval.png' alt='palette' onClick={chooseColor} />, "colorPicker")}</div>
            <div className={styles.customWrap}>{addButton(<AddIcon className={`${!params.edit && styles.inActive}`} />)}</div>
        </div>
    )

    const setPreviewFileOrder = () => (
        <div
            className={styles.previewFileToolbar}
            style={{
                width
            }}
        >
            <div className={styles.leftPart}>
                <div className={styles.imgTitle}>
                    <img
                        src={`${file.preview}${file.fid === 'printScreen' ? '' : `?${new Date()}`}`}
                        style={{maxWidth: 100, maxHeight: 45}} alt='img'
                    />
                    <span className={styles.name}>{file.name}</span>
                </div>
                {standardEditToolBar()}
            </div>
            <div className={styles.rightPart}>
                <div className={styles.customWrap}>{addButton(<div className={styles.compareWrap}><PhotoIcon className={`${!params.edit && styles.inActive}`} /><PhotoIcon className={`${!params.edit && styles.inActive}`} /></div>)}</div>
                <div className={styles.manageButtons}>
                    <span className={`${styles.button} ${styles.cancel}`}>Отменить</span>
                    <span className={`${styles.button} ${styles.save}`} onClick={handleSaveImage}>{params.edit ? "Cохранить" : "Редактировать"}</span>
                </div>
            </div>
        </div>
    )

    const setPreviewFileProject = () => (
        <div
            className={styles.previewFileToolbar}
            style={{
                width
            }}
        >
            <div className={styles.leftPart}>
                {standardEditToolBar()}
            </div>
            <div className={styles.rightPart}>
                <div className={styles.customWrap}>{addButton(<div className={styles.compareWrap}><PhotoIcon /><PhotoIcon /></div>)}</div>
            </div>
        </div>
    )

    return (
        <>
            {toolBarType === 'general' ? setPreviewFileOrder() : null}
            {toolBarType === 'previewFile' ? setPreviewFileProject() : null}

            {paint.tool?.name === "colorPicker" && <ColorPicker />}
        </>
    )
}

export default MiniToolBar