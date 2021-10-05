import React, {useState} from 'react'

import styles from './MiniToolBar.module.sass'
import {ReactComponent as ForwardIcon} from '../../../../../../assets/PrivateCabinet/forward.svg'
import {ReactComponent as TrashIcon} from '../../../../../../assets/PrivateCabinet/trash.svg'
import classNames from "classnames";
import {figuresPaint, dotsPaint, colorsPaint} from "../../../../../../generalComponents/collections";
import {imageSrc} from '../../../../../../generalComponents/globalVariables';

const MiniToolBar = ({
         drawParams, setDrawParams, unDoPaint, direction = "column",
         top = "20px", right = "13px", setTextDraw,
}) => {

    const [toolFigure, setToolFigure] = useState(false)
    const [toolDots, setToolDots] = useState(false)
    const [toolColors, setToolColors] = useState(false)

    /*const [values, setValues] = useState({
        figure: 6,
        color: 9,
        dot: 8
    })*/

    return (
        <div
            className={styles.wrapper}
            style={{
                flexDirection: direction,
                top,
                right
            }}
        >

            <div
                onMouseLeave={() => setToolFigure(false)}
                className={styles.item}
            >

                <div
                    className={classNames({
                        [styles.toolBlock]: true,
                        [styles.active]: !!toolFigure
                    })}
                    style={{
                        flexDirection: direction === "column" ? "row" : "column",
                        right: direction === "column" ? "24px" : "",
                        top: direction === "column" ? "" : "24px"
                    }}
                >
                    {figuresPaint?.map((item, index) => (
                        <button
                            key={index}
                            className={styles.itemBtn}
                            onClick={() => {
                                setDrawParams(drawParams => ({...drawParams, figure: item.figure}));
                                setToolFigure(false);
                                if(setTextDraw) setTextDraw(state => ({...state, edit: item.figure === 'font' ? true : false}));
                            }}
                        >
                            <img
                                className={styles.figureImg}
                                src={`${imageSrc}assets/PrivateCabinet/${item.figure}.svg`}
                                alt={item.figure}
                            />
                        </button>
                    ))}
                </div>

                <button
                    onMouseEnter={() => setToolFigure(true)}
                    className={styles.itemBtn}
                >
                    <img
                        className={styles.figureImg}
                        src={`${imageSrc}assets/PrivateCabinet/${drawParams.figure}.svg`}
                        alt={drawParams.figure}
                    />
                </button>
            </div>

            <div
                onMouseLeave={() => setToolDots(false)}
                className={styles.item}
            >

                <div
                    className={classNames({
                        [styles.toolBlock]: true,
                        [styles.active]: !!toolDots
                    })}
                    style={{
                        flexDirection: direction === "column" ? "row" : "column-reverse",
                        right: direction === "column" ? "24px" : "",
                        top: direction === "column" ? "" : "24px"
                    }}
                >
                    {dotsPaint?.map((item, index) => (
                        <button
                            key={index}
                            className={styles.itemBtn}
                            onClick={() => {
                                setDrawParams(drawParams => ({...drawParams, width: item.width}))
                                setToolDots(false);
                            }}
                        >
                            <span
                                style={{
                                    width: `${item?.width}px`,
                                    height: `${item?.width}px`
                                }}
                                className={styles.dot}
                            />
                        </button>
                    ))}
                </div>

                <button
                    className={styles.itemBtn}
                    onMouseEnter={() => setToolDots(true)}
                >
                    <span
                        className={styles.dot}
                        style={{
                            width: `${drawParams.width}px`,
                            height: `${drawParams.width}px`
                        }}
                    />
                </button>
            </div>

            <div
                onMouseLeave={() => setToolColors(false)}
                className={styles.item}
            >

                <div
                    className={classNames({
                        [styles.toolBlock]: true,
                        [styles.active]: !!toolColors
                    })}
                    style={{
                        flexDirection: direction === "column" ? "row" : "column",
                        right: direction === "column" ? "24px" : "",
                        top: direction === "column" ? "" : "24px"
                    }}
                >
                    {colorsPaint?.map((item, index) => (
                        <button key={index} className={styles.itemBtn}>
                            <span
                                style={{background: `${item?.color}`}}
                                className={styles.circle}
                                onClick={() => {
                                    setDrawParams(drawParams => ({...drawParams, color: item.color, colorRGBA: item.colorRGBA}));
                                    setToolColors(false);
                                }}
                            />
                        </button>
                    ))}
                </div>

                <button
                    onMouseEnter={() => setToolColors(true)}
                    className={classNames(styles.itemBtn, styles.itemBtnActive)}
                >
                    <span
                        style={{background: drawParams.color}}
                        className={styles.circle}
                    />
                </button>
            </div>

            <div className={styles.item}>
                <button
                    className={styles.itemBtn}
                    onClick={unDoPaint}
                >
                    <ForwardIcon/>
                </button>

            </div>

            <div className={styles.item}>
                <button className={styles.itemBtn}>
                    <TrashIcon/>
                </button>

            </div>

        </div>
    )
}

export default MiniToolBar