import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {onSetModals, onSetPaint} from "../../../../../Store/actions/CabinetActions";
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
import {ReactComponent as InfoIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/info.svg'
import {ReactComponent as CameraIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/camera.svg'
import {ReactComponent as MessageIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/messages.svg'
import {ReactComponent as DashedBorderIcon} from '../../../../../assets/PrivateCabinet/minitoolbar/dashedBorder.svg'
import Pencil from "./Tools/Pencil";
import Eraser from "./Tools/Eraser";
import Marker from "./Tools/Marker";
import ColorPicker from "./Tools/ColorPicker";
import Brush from "./Tools/Brush";
import SizePicker from "./Tools/SizePicker";
import Square from "./Tools/Square";
import Circle from "./Tools/Circle";
import {replaceFile, useSendFile} from "../../../../../generalComponents/generalHelpers";
import {drawCanvas} from "../../Modals/Components/PreviewFile/paintHelpers";
import TextDraw from "./Tools/TextDraw";
import LineDraw from "./Tools/LineDraw/LineDraw";
import Triangle from "./Tools/Triangle";
import Magnifier from "./Tools/Magnifier";

//TODO - Need to switch to real users
import BlackMan from '../../../../../assets/PrivateCabinet/minitoolbar/users/photo0.png'
import WhiteMan from '../../../../../assets/PrivateCabinet/minitoolbar/users/photo1.png'
import Woman from '../../../../../assets/PrivateCabinet/minitoolbar/users/photo2.png'


const MiniToolBar = ({
         file, toolBarType = 'general', width = '100%', canvasRef = null, share = null,
         canvasWrapRef, title = '', images, saveImageToPanel, isLoading = false,
         isPreview = true, isComment = false, toggleComment = () => {}
}) => {
    const sendFile = useSendFile();
    const [params, setParams] = useState({edit: false, history: {next: [], previous: []}, showAdditionalTools: false, drawTool: ''});
    const paint = useSelector(state => state.Cabinet.paint);
    const previewWithComments = useSelector(state => state.Cabinet.modals.previewWithComments);
    const project = useSelector(state => state.Cabinet.project);
    const uid = useSelector(state => state.user.uid);
    const printScreen = useSelector(s => s.Cabinet.modals.printScreen);
    const shareStore = useSelector(s => s.Cabinet.modals.share);
    const previewFile = useSelector(s => s.Cabinet.modals.previewFile);
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
        if(canvasRef?.current) {
            canvasRef.current.onmousemove = null;
            canvasRef.current.onmousedown = null;
            canvasRef.current.onmouseup = null;
        }
        dispatch(onSetPaint('tool', {name}));
    }

    const toggleContextMenu = () => setParams(s => ({...s, showAdditionalTools: !s.showAdditionalTools}));

    const renderAdditionalTools = () => (
        <>
            {params.showAdditionalTools ? <div className={styles.additionalTools}>
                <div onClick={() => chooseAdditionalTool('text')} className={`${styles.line} ${'text' === paint.tool?.name && styles.chosen}`}><TextIcon className={styles.iconTool} />Текст</div>
                <div onClick={() => chooseAdditionalTool('magnifier')} className={`${styles.line} ${'magnifier' === paint.tool?.name && styles.chosen}`}><SearchIcon className={styles.iconTool} />Лупа</div>
                <div className={`${styles.line} ${styles.lineIcons}`}>
                    <div onClick={() => addTool(Circle)} className={`${styles.toolWrap} ${'circle' === paint.tool?.name && styles.chosen}`}><Square1Icon /></div>
                    <div onClick={() => addTool(Triangle)} className={`${styles.toolWrap} ${'triangle' === paint.tool?.name && styles.chosen}`}><SquareIcon /></div>
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

    const addButton = (icon, name = '', options = null, callback = null, itemClass) => (
        <div
            className={`${styles.buttonWrap} ${!params.edit && styles.buttonWrapInactive} ${name === paint.tool?.name && styles.chosen} ${styles[itemClass]}`}
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
            if(file?.fid && file?.fid !== 'printScreen') replaceFile(uid, file, preview);
            if(file?.fid === 'printScreen') sendFile(uid, file);
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

    const renderPhotos = (photos) => (
        <div className={styles.photoWrap}>
            {photos.map((photo, i) => <div key={i} className={styles.photoUser} style={{transform: `translateX(${12 * i}px)`}}>
                <img src={photo} alt='img' />
            </div>)}
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
                {file?.preview ? <div className={styles.imgTitle}>
                    {isPreview ? <img
                        src={`${file?.preview}${file?.fid === 'printScreen' ? '' : `?${new Date()}`}`}
                        style={{maxWidth: 100, maxHeight: 45}} alt='img'
                    /> : null}
                    <span className={styles.name}>{file?.name}</span>
                </div> : null}
                {standardEditToolBar()}
                {isComment ? <div className={styles.customWrap} onClick={toggleComment}>{addButton(<MessageIcon />)}<div className={styles.unread} /></div> : null}
            </div>
            <div className={styles.rightPart}>
                <div
                    className={styles.customWrap}
                    onClick={() => {if(params.edit) {
                        dispatch(onSetPaint('mutualEdit', {...paint.mutualEdit, open: true, data: [canvasRef.current.toDataURL("image/png")], destination: file?.gdir || 'global/all'}))
                        dispatch(onSetModals('previewFile', {...previewFile, open: false, file: null}));
                    }}}
                >{addButton(<div className={styles.compareWrap}><PhotoIcon className={`${!params.edit && styles.inActive}`} /><PhotoIcon className={`${!params.edit && styles.inActive}`} /></div>)}</div>
                <div className={styles.manageButtons}>
                    <span className={`${styles.button} ${styles.cancel}`} onClick={() => {
                        dispatch(onSetModals('previewFile', {...previewFile, open: false, file: null}));
                        dispatch(onSetModals('previewWithComments', {...previewFile, open: false, files: [], chosenFile: null}));
                    }}>Отменить</span>
                    <span className={`${styles.button} ${styles.save}`} onClick={handleSaveImage}>{params.edit ? "Сохранить" : "Редактировать"}</span>
                    {share !== null ? <span
                        className={`${styles.button} ${styles.send}`}
                        onClick={() => {
                            dispatch(onSetModals('share', {...shareStore, open: true, fids: [file.fid], action_type: 'file_share'}));
                            dispatch(onSetModals('previewFile', {...previewFile, open: false, file: null}));
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
            <div className={styles.leftPart}/>
            <div className={styles.rightPart}>
                <div className={styles.customWrap} onClick={() => dispatch(onSetModals('previewWithComments', {...previewWithComments, open: true, files: project.files, chosenFile: file}))}>{addButton(<MessageIcon />)}<div className={styles.unread} /></div>
                <div className={`${styles.customWrap} ${printScreen.open && styles.inActive}`} onClick={() => printScreen.open ? null : dispatch((onSetModals('printScreen', ({...printScreen, open: true}))))}>{addButton(<CameraIcon />)}</div>
                <div className={styles.rightPart}>
                    <div
                        className={`${styles.customWrap}`}
                        onClick={() => dispatch(onSetPaint('mutualEdit', {...paint.mutualEdit, open: true, data: [file.preview], destination: file?.gdir || 'global/all'}))}
                    >
                        {addButton(<div className={styles.compareWrap}><PhotoIcon /><PhotoIcon /></div>)}
                    </div>
                </div>
                <div className={styles.customWrap} onClick={() => dispatch(onSetModals('previewFile', {...previewFile, open: true, file}))}>{addButton(<DashedBorderIcon />)}</div>
                <div className={styles.customWrap}>{addButton(<div className={styles.menuDots} />)}</div>
                <div className={styles.customWrap}>{addButton(<InfoIcon />)}</div>
                {renderPhotos([BlackMan, WhiteMan, Woman])}
            </div>
        </div>
    )

    const setPreviewMutualEdit = () => (
        <div
            className={`${styles.previewFileToolbar} ${styles.mutualEditWrap}`}
            style={{
                width
            }}
        >
            <div className={styles.leftPart}>
                <div className={styles.title}>{title}</div>
                {standardEditToolBar()}
            </div>
            <div className={styles.rightPart}>
                <div className={styles.customWrap}>{addButton(<CameraIcon />)}</div>
                <div className={`${styles.customWrap}`}>
                    {addButton(<div className={`${styles.compareWrap}`}><PhotoIcon className={`${!params.edit && styles.inActive}`} /><PhotoIcon className={`${!params.edit && styles.inActive}`} /></div>, '', null, null, 'compareWrapChosen')}
                </div>
                <div className={styles.customWrap}>{addButton(<div className={styles.menuDots} />)}</div>
                <div className={styles.customWrap}>{addButton(<InfoIcon />)}</div>
                {renderPhotos([BlackMan, WhiteMan, Woman])}
                <div className={styles.manageButtons}>
                    <span className={`${styles.button} ${styles.cancel}`} onClick={() => {dispatch(onSetPaint('mutualEdit', {...paint.mutualEdit, open: false}))}}>Закрыть</span>
                    <span className={`${styles.button} ${images?.length > 0 && !isLoading ? styles.save : styles.disabled}`} onClick={() => !isLoading ? saveImageToPanel(canvasRef.current.toDataURL()) : null}>Сохранить</span>
                </div>
            </div>
        </div>
    )

    useEffect(() => {
        return () => {
            chooseAdditionalTool({});
        }
    }, []) //eslint-disable-line

    useEffect(() => {
        setParams(s => ({...s, history: {...s.history, previous: [], next: []}}));
        if(images?.length > 0) {
            setParams(s => ({...s, edit: true}));
        } else {
            setParams(s => ({...s, edit: false}));
            chooseAdditionalTool('none');
        }
    }, [images]) //eslint-disable-line

    return (
        <>
            {toolBarType === 'general' ? setPreviewFileOrder() : null}
            {toolBarType === 'previewFile' ? setPreviewFileProject() : null}
            {toolBarType === 'mutualEdit' ? setPreviewMutualEdit() : null}

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
            {paint.tool?.name === 'magnifier' ? <Magnifier canvas={canvasRef?.current}/> : null}
        </>
    )
}

export default MiniToolBar
