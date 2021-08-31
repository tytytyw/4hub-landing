import React, {useState} from 'react'

import styles from './MiniToolBar.module.sass'
import {ReactComponent as PencilIcon} from '../../../../../../assets/PrivateCabinet/watercolor.svg'
import {ReactComponent as ForwardIcon} from '../../../../../../assets/PrivateCabinet/forward.svg'
import {ReactComponent as TrashIcon} from '../../../../../../assets/PrivateCabinet/trash.svg'
import classNames from "classnames";

const MiniToolBar = ({drawParams, setDrawParams}) => {

    const figures = [
        {id: 1, figure: 'font'},
        {id: 2, figure: 'circle-outlined'},
        {id: 3, figure: 'square-outlined'},
        {id: 4, figure: 'arrow-outlined'},
        {id: 5, figure: 'pencil-outlined'},
        {id: 6, figure: 'brush-outlined'},
    ]

    const colors = [
        {id: 1, color: '#E0A512'},
        {id: 2, color: '#9C0050'},
        {id: 3, color: '#BEBEBE'},
        {id: 4, color: '#CD0C21'},
        {id: 5, color: '#000000'},
        {id: 6, color: '#5026B8'},
        {id: 7, color: '#04C6F4'},
        {id: 8, color: '#6D3FD7'},
        {id: 9, color: '#67AB3E'},
    ]

    const dots = [
        {id: 1, width: 16},
        {id: 2, width: 14},
        {id: 3, width: 12},
        {id: 4, width: 10},
        {id: 5, width: 8},
        {id: 6, width: 6},
        {id: 7, width: 5},
        {id: 8, width: 2},
    ]

    const [toolFigure, setToolFigure] = useState(false)
    const [toolDots, setToolDots] = useState(false)
    const [toolColors, setToolColors] = useState(false)

    /*const [values, setValues] = useState({
        figure: 6,
        color: 9,
        dot: 8
    })*/

    return (
        <div className={styles.wrapper}>

            <div
                onMouseLeave={() => setToolFigure(false)}
                className={styles.item}
            >

                <div
                    className={classNames({
                        [styles.toolBlock]: true,
                        [styles.active]: !!toolFigure
                    })}
                >
                    {figures?.map((item, index) => (
                        <button key={index} className={styles.itemBtn}>
                            <img
                                className={styles.figureImg}
                                src={`./assets/PrivateCabinet/${item.figure}.svg`}
                                alt={item.figure}
                            />
                        </button>
                    ))}
                </div>

                <button
                    onMouseEnter={() => setToolFigure(true)}
                    className={styles.itemBtn}
                >
                    <PencilIcon/>
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
                >
                    {dots?.map((item, index) => (
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
                >
                    {colors?.map((item, index) => (
                        <button key={index} className={styles.itemBtn}>
                            <span
                                style={{background: `${item?.color}`}}
                                className={styles.circle}
                                onClick={() => {
                                    setDrawParams(drawParams => ({...drawParams, color: item.color}));
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
                <button className={styles.itemBtn}>
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