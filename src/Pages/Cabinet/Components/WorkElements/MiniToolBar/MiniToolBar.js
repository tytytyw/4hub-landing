import React, {useEffect, useState} from 'react'

import styles from './MiniToolBar.module.sass'
import {ReactComponent as Pencil} from '../../../../../assets/PrivateCabinet/minitoolbar/pencil.svg'
import {ReactComponent as Marker} from '../../../../../assets/PrivateCabinet/minitoolbar/marker.svg'
import {ReactComponent as PenThick} from '../../../../../assets/PrivateCabinet/minitoolbar/penThick.svg'
import {ReactComponent as PenThin} from '../../../../../assets/PrivateCabinet/minitoolbar/penThin.svg'
import {ReactComponent as BrushIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/brush.svg'
import {ReactComponent as Eraser} from '../../../../../assets/PrivateCabinet/minitoolbar/eraser.svg'
import {ReactComponent as Add} from '../../../../../assets/PrivateCabinet/minitoolbar/add.svg'
import {ReactComponent as Photo} from '../../../../../assets/PrivateCabinet/minitoolbar/photo.svg'
import {useDispatch, useSelector} from "react-redux";
import {onSetPaint} from "../../../../../Store/actions/CabinetActions";
import Brush from "./Tools/Brush";

const MiniToolBar = ({
         file, toolBarType = 'general', width = '100%', canvasRef = null
}) => {

    const [params, setParams] = useState({edit: false});
    const tool = useSelector(state => state.Cabinet.paint.tool);
    const dispatch = useDispatch();

    const addButton = (icon, name = '', toolName = null) => (
        <div
            className={`${styles.buttonWrap} ${!params.edit && styles.buttonWrapInactive} ${name === tool?.name && styles.chosen}`}
            onClick={toolName ? () => {
                dispatch(onSetPaint('tool', new toolName(canvasRef?.current)))
            } : null}
        >
            {icon}
        </div>
    )

    useEffect(() => {

    }, []) //eslint-disable-line

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
            dispatch(onSetPaint('tool', new Brush(canvasRef?.current)));
        }
        setParams(state => ({...state, edit: !state.edit}));
    }

    const standardEditToolBar = () => (
        <div className={styles.standardToolBarWrap}>
            <div className={styles.customWrap}>{addButton(<Pencil className={`${!params.edit && styles.inActive}`} />, "brush", Brush)}</div>
            <div className={styles.customWrap}>{addButton(<Marker className={`${!params.edit && styles.inActive}`} />)}</div>
            <div className={styles.customWrap}>{addButton(<PenThick className={`${!params.edit && styles.inActive}`} />)}</div>
            <div className={styles.customWrap}>{addButton(<PenThin className={`${!params.edit && styles.inActive}`} />)}</div>
            <div className={styles.customWrap}>{addButton(<BrushIcon className={`${!params.edit && styles.inActive}`} />)}</div>
            <div className={styles.customWrap}>{addButton(<Eraser className={`${!params.edit && styles.inActive}`} />)}</div>
            <div className={styles.customWrap}>{addButton(!params.edit ? <div className={styles.inactiveColor} /> : <img src='./assets/PrivateCabinet/Oval.png' alt='palette' />)}</div>
            <div className={styles.customWrap}>{addButton(<Add className={`${!params.edit && styles.inActive}`} />)}</div>
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
                <div className={styles.customWrap}>{addButton(<div className={styles.compareWrap}><Photo className={`${!params.edit && styles.inActive}`} /><Photo className={`${!params.edit && styles.inActive}`} /></div>)}</div>
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
                <div className={styles.customWrap}>{addButton(<div className={styles.compareWrap}><Photo /><Photo /></div>)}</div>
            </div>
        </div>
    )

    return (
        <>
            {toolBarType === 'general' ? setPreviewFileOrder() : null}
            {toolBarType === 'previewFile' ? setPreviewFileProject() : null}
        </>
    )
}

export default MiniToolBar