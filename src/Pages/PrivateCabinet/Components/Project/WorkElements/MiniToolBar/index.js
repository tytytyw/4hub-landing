import React, {useState} from 'react'

import styles from './MiniToolBar.module.sass'
import {ReactComponent as PencilIcon} from '../../../../../../assets/PrivateCabinet/watercolor.svg'
import {ReactComponent as ForwardIcon} from '../../../../../../assets/PrivateCabinet/forward.svg'
import {ReactComponent as TrashIcon} from '../../../../../../assets/PrivateCabinet/trash.svg'
import classNames from "classnames";

const MiniToolBar = ({}) => {

    const [figures, setFigures] = useState([
        {color: '#E0A512'},
        {color: '#9C0050'},
        {color: '#BEBEBE'},
        {color: '#CD0C21'},
        {color: '#000000'},
        {color: '#5026B8'},
        {color: '#04C6F4'},
        {color: '#6D3FD7'}
    ])

    const [colors, setColors] = useState([
        {color: '#E0A512'},
        {color: '#9C0050'},
        {color: '#BEBEBE'},
        {color: '#CD0C21'},
        {color: '#000000'},
        {color: '#5026B8'},
        {color: '#04C6F4'},
        {color: '#6D3FD7'}
    ])

    const [dots, setDots] = useState([
        {width: '16px'},
        {width: '14px'},
        {width: '12px'},
        {width: '10px'},
        {width: '8px'},
        {width: '6px'},
        {width: '2px'},
    ])

    const [toolFigure, setToolFigure] = useState(false)
    const [toolDots, setToolDots] = useState(false)
    const [toolColors, setToolColors] = useState(false)

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
                                //src="./assets/PrivateCabinet/"
                                alt=""
                            />
                        </button>
                    ))}
                </div>

                <button className={styles.itemBtn}>
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