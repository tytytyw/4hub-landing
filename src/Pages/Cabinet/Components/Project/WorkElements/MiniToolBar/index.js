import React from 'react'

import styles from './MiniToolBar.module.sass'
// import {ReactComponent as ForwardIcon} from '../../../../../../assets/PrivateCabinet/forward.svg'
import {ReactComponent as Pencil} from '../../../../../../assets/PrivateCabinet/minitoolbar/pencil.svg'
import {ReactComponent as Marker} from '../../../../../../assets/PrivateCabinet/minitoolbar/marker.svg'
import {ReactComponent as PenThick} from '../../../../../../assets/PrivateCabinet/minitoolbar/penThick.svg'
import {ReactComponent as PenThin} from '../../../../../../assets/PrivateCabinet/minitoolbar/penThin.svg'
import {ReactComponent as Brush} from '../../../../../../assets/PrivateCabinet/minitoolbar/brush.svg'
import {ReactComponent as Eraser} from '../../../../../../assets/PrivateCabinet/minitoolbar/eraser.svg'
import {ReactComponent as Add} from '../../../../../../assets/PrivateCabinet/minitoolbar/add.svg'
import {ReactComponent as Photo} from '../../../../../../assets/PrivateCabinet/minitoolbar/photo.svg'

// import {ReactComponent as Eraser} from '../../../../../../assets/PrivateCabinet/trash.svg'
// import classNames from "classnames";
// import {figuresPaint, dotsPaint, colorsPaint} from "../../../../../../generalComponents/collections";
// import {imageSrc} from '../../../../../../generalComponents/globalVariables';

const MiniToolBar = ({
         drawParams, setDrawParams, unDoPaint, direction = "column", file,
         setTextDraw, toolBarType = 'general', width = '100%'
}) => {

    // const [toolFigure, setToolFigure] = useState(false)
    // const [toolDots, setToolDots] = useState(false)
    // const [toolColors, setToolColors] = useState(false)

    const addButton = (icon, callback) => (
        <div
            className={styles.buttonWrap}
            onClick={callback ? callback : null}
        >
            {icon}
        </div>
    )

    const standardEditToolBar = () => (
        <div className={styles.standardToolBarWrap}>
            <div className={styles.customWrap}>{addButton(<Pencil />)}</div>
            <div className={styles.customWrap}>{addButton(<Marker />)}</div>
            <div className={styles.customWrap}>{addButton(<PenThick />)}</div>
            <div className={styles.customWrap}>{addButton(<PenThin />)}</div>
            <div className={styles.customWrap}>{addButton(<Brush />)}</div>
            <div className={styles.customWrap}>{addButton(<Eraser />)}</div>
            <div className={styles.customWrap}>{addButton(<img src='./assets/PrivateCabinet/Oval.png' alt='palette' />)}</div>
            <div className={styles.customWrap}>{addButton(<Add />)}</div>
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
                <div className={styles.customWrap}>{addButton(<div className={styles.compareWrap}><Photo /><Photo /></div>)}</div>
                <div className={styles.manageButtons}>
                    <span className={`${styles.button} ${styles.cancel}`}>Отменить</span>
                    <span className={`${styles.button} ${styles.save}`}>Cохранить</span>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {toolBarType === 'general' ? setPreviewFileOrder() : null}
            {/*<div*/}
            {/*    onMouseLeave={() => setToolFigure(false)}*/}
            {/*    className={styles.item}*/}
            {/*>*/}

                {/*<div*/}
                {/*    className={classNames({*/}
                {/*        [styles.toolBlock]: true,*/}
                {/*        [styles.active]: !!toolFigure*/}
                {/*    })}*/}
                {/*    style={{*/}
                {/*        flexDirection: direction === "column" ? "row" : "column",*/}
                {/*        right: direction === "column" ? "24px" : "",*/}
                {/*        top: direction === "column" ? "" : "24px"*/}
                {/*    }}*/}
                {/*>*/}
                {/*    {figuresPaint?.map((item, index) => (*/}
                {/*        <button*/}
                {/*            key={index}*/}
                {/*            className={styles.itemBtn}*/}
                {/*            onClick={() => {*/}
                {/*                setDrawParams(drawParams => ({...drawParams, figure: item.figure}));*/}
                {/*                setToolFigure(false);*/}
                {/*                if(setTextDraw) setTextDraw(state => ({...state, edit: item.figure === 'font' ? true : false}));*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <img*/}
                {/*                className={styles.figureImg}*/}
                {/*                src={`${imageSrc}assets/PrivateCabinet/${item.figure}.svg`}*/}
                {/*                alt={item.figure}*/}
                {/*            />*/}
                {/*        </button>*/}
                {/*    ))}*/}
                {/*</div>*/}

            {/*    <button*/}
            {/*        onMouseEnter={() => setToolFigure(true)}*/}
            {/*        className={styles.itemBtn}*/}
            {/*    >*/}
            {/*        <img*/}
            {/*            className={styles.figureImg}*/}
            {/*            src={`${imageSrc}assets/PrivateCabinet/${drawParams.figure}.svg`}*/}
            {/*            alt={drawParams.figure}*/}
            {/*        />*/}
            {/*    </button>*/}
            {/*</div>*/}

            {/*<div*/}
            {/*    onMouseLeave={() => setToolDots(false)}*/}
            {/*    className={styles.item}*/}
            {/*>*/}

            {/*    <div*/}
            {/*        className={classNames({*/}
            {/*            [styles.toolBlock]: true,*/}
            {/*            [styles.active]: !!toolDots*/}
            {/*        })}*/}
            {/*        style={{*/}
            {/*            flexDirection: direction === "column" ? "row" : "column-reverse",*/}
            {/*            right: direction === "column" ? "24px" : "",*/}
            {/*            top: direction === "column" ? "" : "24px"*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        {dotsPaint?.map((item, index) => (*/}
            {/*            <button*/}
            {/*                key={index}*/}
            {/*                className={styles.itemBtn}*/}
            {/*                onClick={() => {*/}
            {/*                    setDrawParams(drawParams => ({...drawParams, width: item.width}))*/}
            {/*                    setToolDots(false);*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                <span*/}
            {/*                    style={{*/}
            {/*                        width: `${item?.width}px`,*/}
            {/*                        height: `${item?.width}px`*/}
            {/*                    }}*/}
            {/*                    className={styles.dot}*/}
            {/*                />*/}
            {/*            </button>*/}
            {/*        ))}*/}
            {/*    </div>*/}

            {/*    <button*/}
            {/*        className={styles.itemBtn}*/}
            {/*        onMouseEnter={() => setToolDots(true)}*/}
            {/*    >*/}
            {/*        <span*/}
            {/*            className={styles.dot}*/}
            {/*            style={{*/}
            {/*                width: `${drawParams.width}px`,*/}
            {/*                height: `${drawParams.width}px`*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </button>*/}
            {/*</div>*/}

            {/*<div*/}
            {/*    onMouseLeave={() => setToolColors(false)}*/}
            {/*    className={styles.item}*/}
            {/*>*/}

            {/*    <div*/}
            {/*        className={classNames({*/}
            {/*            [styles.toolBlock]: true,*/}
            {/*            [styles.active]: !!toolColors*/}
            {/*        })}*/}
            {/*        style={{*/}
            {/*            flexDirection: direction === "column" ? "row" : "column",*/}
            {/*            right: direction === "column" ? "24px" : "",*/}
            {/*            top: direction === "column" ? "" : "24px"*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        {colorsPaint?.map((item, index) => (*/}
            {/*            <button key={index} className={styles.itemBtn}>*/}
            {/*                <span*/}
            {/*                    style={{background: `${item?.color}`}}*/}
            {/*                    className={styles.circle}*/}
            {/*                    onClick={() => {*/}
            {/*                        setDrawParams(drawParams => ({...drawParams, color: item.color, colorRGBA: item.colorRGBA}));*/}
            {/*                        setToolColors(false);*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*            </button>*/}
            {/*        ))}*/}
            {/*    </div>*/}

            {/*    <button*/}
            {/*        onMouseEnter={() => setToolColors(true)}*/}
            {/*        className={classNames(styles.itemBtn, styles.itemBtnActive)}*/}
            {/*    >*/}
            {/*        <span*/}
            {/*            style={{background: drawParams.color}}*/}
            {/*            className={styles.circle}*/}
            {/*        />*/}
            {/*    </button>*/}
            {/*</div>*/}

            {/*<div className={styles.item}>*/}
            {/*    <button*/}
            {/*        className={styles.itemBtn}*/}
            {/*        onClick={unDoPaint}*/}
            {/*    >*/}
            {/*        <ForwardIcon/>*/}
            {/*    </button>*/}

            {/*</div>*/}

            {/*<div className={styles.item}>*/}
            {/*    <button className={styles.itemBtn}>*/}
            {/*        <TrashIcon/>*/}
            {/*    </button>*/}

            {/*</div>*/}

        </>
    )
}

export default MiniToolBar