import React, {useState} from 'react'

import styles from './MiniToolBar.module.sass'
import {ReactComponent as PencilIcon} from '../../../../../../assets/PrivateCabinet/watercolor.svg'
import {ReactComponent as ForwardIcon} from '../../../../../../assets/PrivateCabinet/forward.svg'
import {ReactComponent as TrashIcon} from '../../../../../../assets/PrivateCabinet/trash.svg'
import classNames from "classnames";

const MiniToolBar = () => {

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
        {id: 1, width: '16px'},
        {id: 2, width: '14px'},
        {id: 3, width: '12px'},
        {id: 4, width: '10px'},
        {id: 5, width: '8px'},
        {id: 6, width: '6px'},
        {id: 7, width: '2px'},
        {id: 8, width: '5px'},
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
                        <button key={index} className={styles.itemBtn}>
                            <span
                                style={{
                                    width: `${item?.width}`,
                                    height: `${item?.width}`
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
                    <span className={styles.dot}/>
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
                            />
                        </button>
                    ))}
                </div>

                <button
                    onMouseEnter={() => setToolColors(true)}
                    className={classNames(styles.itemBtn, styles.itemBtnActive)}
                >
                    <span
                        style={{background: '#67AB3E'}}
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