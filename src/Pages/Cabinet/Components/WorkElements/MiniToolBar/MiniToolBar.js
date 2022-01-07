import React, {useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {onSetPaint} from "../../../../../Store/actions/CabinetActions";
import styles from './MiniToolBar.module.sass'
import {ReactComponent as PencilIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/pencil.svg'
import {ReactComponent as MarkerIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/marker.svg'
import {ReactComponent as BrushIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/brush.svg'
import {ReactComponent as EraserIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/eraser.svg'
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/add.svg'
import {ReactComponent as PhotoIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/photo.svg'
import {ReactComponent as LineIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/line.svg'
import {ReactComponent as SquareIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/rectangle1.svg'
import {ReactComponent as Square1Icon} from '../../../../../assets/PrivateCabinet/minitoolbar/rectangle2.svg'
import {ReactComponent as Square3Icon} from '../../../../../assets/PrivateCabinet/minitoolbar/rectangle3.svg'
import {ReactComponent as SearchIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/search.svg'
import {ReactComponent as TextIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/text.svg'
import {ReactComponent as VectorIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/vector-1.svg'
import Pencil from "./Tools/Pencil";
import Eraser from "./Tools/Eraser";
import Marker from "./Tools/Marker";
import ColorPicker from "./Tools/ColorPicker";
import Brush from "./Tools/Brush";
import SizePicker from "./Tools/SizePicker";
import Square from "./Tools/Square";
import Circle from "./Tools/Circle";
import {replaceFile, sendFile} from "../../../../../generalComponents/generalHelpers";
import {drawCanvas} from "../../PreviewFile/paintHelpers";
import TextDraw from "./Tools/TextDraw";
import LineDraw from "./Tools/LineDraw/LineDraw";

const MiniToolBar = ({
         file, toolBarType = 'general', width = '100%', canvasRef = null, share = null,
         setFilePreview, canvasWrapRef
}) => {

    const [params, setParams] = useState({edit: false, history: {next: [], previous: []}, showAdditionalTools: false, drawTool: ''});
    const paint = useSelector(state => state.Cabinet.paint);
    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();
    const colorPickerRef = useRef();

    const onFinishDraw = (image) => setParams(s => ({...s, history: {...s.history, previous: [...s.history.previous, image], next: []}}));
    const imageNavigation = (next, previous) => setParams(s => ({...s, history: {previous, next}}));

    const previousImage = () => {
        if(params.history.previous.length > 0) {
            let previous = [...params.history.previous];
            const image = previous.pop();
            const next = [...params.history.next, canvasRef.current.toDataURL()];
            drawCanvas(canvasRef.current, image, imageNavigation, next, previous);
        }
    };

    const nextImage = () => {
        if(params.history.next.length > 0) {
            let next = [...params.history.next];
            const image = next.pop();
            const previous = [...params.history.previous, canvasRef.current.toDataURL()];
            drawCanvas(canvasRef.current, image, imageNavigation, next, previous);
        }
    };

    const chooseAdditionalTool = (name) => {
        canvasRef.current.onmousemove = null;
        canvasRef.current.onmousedown = null;
        canvasRef.current.onmouseup = null;
        dispatch(onSetPaint('tool', {name}));
    }

    const toggleContextMenu = () => setParams(s => ({...s, showAdditionalTools: !s.showAdditionalTools}));

    const renderAdditionalTools = () => (
        <>
            {params.showAdditionalTools ? <div className={styles.additionalTools}>
                <div onClick={() => chooseAdditionalTool('text')} className={`${styles.line} ${'text' === paint.tool?.name && styles.chosen}`}><TextIcon className={styles.iconTool} />Текст</div>
                <div className={styles.line}><SearchIcon className={styles.iconTool} />Лупа</div>
                <div className={`${styles.line} ${styles.lineIcons}`}>
                    <div onClick={() => addTool(Circle)} className={`${styles.toolWrap} ${'circle' === paint.tool?.name && styles.chosen}`}><Square1Icon /></div>
                    <div className={`${styles.toolWrap} ${'123' === paint.tool?.name && styles.chosen}`}><SquareIcon /></div>
                    <div onClick={() => addTool(Square)} className={`${styles.toolWrap} ${'square' === paint.tool?.name && styles.chosen}`}><Square3Icon /> </div>
                    <div onClick={() => chooseAdditionalTool('arrow')} className={`${styles.toolWrap} ${'arrow' === paint.tool?.name && styles.chosen}`}><VectorIcon /></div>
                    <div onClick={() => chooseAdditionalTool('line')} className={`${styles.toolWrap} ${'line' === paint.tool?.name && styles.chosen}`}><LineIcon /></div>
                </div>
            </div> : null}
        </>
    )

    const addTool = (toolName) => {
        dispatch(onSetPaint('tool', new toolName(canvasRef?.current, {color: paint.color, pushInDrawHistory: onFinishDraw})))
    }

    const addButton = (icon, name = '', options = null, callback = null) => (
        <div
            className={`${styles.buttonWrap} ${!params.edit && styles.buttonWrapInactive} ${name === paint.tool?.name && styles.chosen}`}
            onClick={options && callback && params.edit ? () => {callback(options)} : null}
        >
            {icon}
        </div>
    )

    const chooseColor = () => {
        colorPickerRef.current.click();
    }

    const handleSaveImage = () => {
        if(params.edit) {
            canvasRef.current.onmousemove = null;
            canvasRef.current.onmousedown = null;
            canvasRef.current.onmouseup = null;
            dispatch(onSetPaint('tool', undefined));
            const preview = canvasRef.current.toDataURL("image/png");
            if(file.fid && file.fid !== 'printScreen') replaceFile(uid, file, preview);
            if(file.fid === 'printScreen') sendFile(uid, file);
        } else {
            addTool(Pencil);
        }
        setParams(state => ({...state, edit: !state.edit}));
    }

    const standardEditToolBar = () => (
        <div className={styles.standardToolBarWrap}>
            <div className={styles.customWrap}>{addButton(<div className={`${styles.arrow} ${!params.edit || params.history.previous.length === 0 ? styles.inActive : ''}`}>&larr;</div>, 'previous', true, previousImage)}</div>
            <div className={styles.customWrap}>{addButton(<div className={`${styles.arrow} ${!params.edit || params.history.next.length === 0 ? styles.inActive : ''}`}>&rarr;</div>, 'next', true, nextImage)}</div>
            <div className={styles.customWrap}>{addButton(<PencilIcon className={`${!params.edit && styles.inActive}`} />, "pencil", Pencil, addTool)}</div>
            <div className={styles.customWrap}>{addButton(<MarkerIcon className={`${!params.edit && styles.inActive}`} />, "marker", Marker, addTool)}</div>
            <div className={styles.customWrap}>{addButton(<BrushIcon className={`${!params.edit && styles.inActive}`} />, "brush", Brush, addTool)}</div>
            <div className={styles.customWrap}>{addButton(<EraserIcon className={`${!params.edit && styles.inActive}`} />, "eraser", Eraser, addTool)}</div>
            <div className={styles.customWrap}>{addButton(<SizePicker isEdit={params.edit} />, "colorPicker")}</div>
            <div className={styles.customWrap}>{addButton(!params.edit
                ? <div className={styles.inactiveColor} />
                : <div style={{position: 'relative'}}><img src='./assets/PrivateCabinet/Oval.png' alt='palette' onClick={chooseColor} /><ColorPicker colorPickerRef={colorPickerRef} /></div>
                , "colorPicker")}
            </div>
            <div className={styles.customWrap}>{addButton(<div className={styles.additionalToolsWrap}><AddIcon className={`${!params.edit && styles.inActive}`} />{renderAdditionalTools()}</div>, 'add', true, toggleContextMenu)}</div>
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
                    <span className={`${styles.button} ${styles.cancel}`} onClick={() => {setFilePreview(filePreview => ({...filePreview, view: false, file: null}))}}>Отменить</span>
                    <span className={`${styles.button} ${styles.save}`} onClick={handleSaveImage}>{params.edit ? "Сохранить" : "Редактировать"}</span>
                    {share !== null ? <span
                        className={`${styles.button} ${styles.send}`}
                        onClick={() => {
                            setFilePreview(filePreview => ({...filePreview, view: false, file: null}));
                            share({type: 'share', name: '', text: ``})
                    }}>Отправить</span> : null}
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

            {params.edit && paint.tool?.name === 'text' ? <TextDraw
                canvas={canvasRef?.current}
                onFinishDraw={onFinishDraw}
                addTool={addTool}
            /> : null}
            {params.edit && (paint.tool?.name === 'arrow' || paint.tool?.name === 'line') ? <LineDraw
                canvas={canvasRef?.current}
                onFinishDraw={onFinishDraw}
                addTool={addTool}
                canvasWrapRef={canvasWrapRef}
                isArrow={paint.tool?.name === 'arrow'}
            /> : null}
        </>
    )
}

export default MiniToolBar
