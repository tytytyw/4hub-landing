import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
// import Pencil from "../Pencil";
import styles from "./LineDraw.module.sass";

function LineDraw({canvas, onFinishDraw, addTool}) {

    const dotRightRef = useRef(null);
    const dotLeftRef = useRef(null);
    const lineRef = useRef(null);

    const [, setParams] = useState({text: 'Text', move: false, widthDif: 0, heightDif: 0, sizeChange: false, positionX: '50%', positionY: '50%'});
    const paint = useSelector(s => s.Cabinet.paint);

    // const handleTextAreaChange = e => setParams(s => ({...s, text: e.target.value}))
    //
    // const handleKeyPress = () => {
    //     if(textBlockRef.current.offsetHeight + 3 < textBlockRef.current.scrollHeight) {
    //         textBlockRef.current.style.height = textBlockRef.current.scrollHeight + 5 + 'px'
    //     }
    // }

    const handleMouseDown = e => {
        if(!(e.pageX + 18 > e.target.getBoundingClientRect().right) && !(e.pageY + 18 > e.target.getBoundingClientRect().bottom)) {
            const widthDif = e.pageX - e.target.getBoundingClientRect().x;
            const heightDif = e.pageY - e.target.getBoundingClientRect().y;

            window.onmousemove = e => {
                setParams(s => ({
                    ...s,
                    positionX: e.pageX - widthDif,
                    positionY: e.pageY - heightDif,
                }))
            };
            window.onmouseup = () => {
                window.onmousemove = null;
                window.onmouseup = null;
            };
        }
    }

    useEffect(() => {
        // canvas.onmousedown = async () => {
        //     await onFinishDraw(canvas.toDataURL());
        //     await drawText(canvas, textBlockRef);
        //     addTool(Pencil);
        // }
        // return () => {
        //     canvas.onmousedown = null;
        // }
    }, [paint]) //eslint-disable-line

    return(
        <div
            ref={lineRef}
            className={styles.arrowOutlined}
            onMouseDown={handleMouseDown}
            draggable={false}
            style={{
                // display: 'flex',
                // alignItems: 'center',
                // width: '100px',
                // position: 'fixed',
                // top: '50%',
                // left: '50%',
                // cursor: 'move',
                // borderRadius: '50%',
                height: paint.size,
                background: `linear-gradient(90deg, ${paint.color} 0%, ${paint.color} 99%, rgba(0, 0, 0, 0) 99%)`
            }}
        >
            <span
                className={styles.arrow}
                style={{
                    border: `${paint.size + 9}px solid transparent`,
                    borderLeft: `${paint.size + 9}px solid ${paint.color}`,
                    right: - (paint.size + 9)
                }}
            />
            <span
                className={styles.dotRight}
                style={{
                    height: 6,
                    width: 6,
                    right: -6
                }}
                ref={dotRightRef}
                draggable={false}
            />
            <span
                className={styles.dotLeft}
                style={{
                    height: 6,
                    width: 6,
                    left: -6
                }}
                ref={dotLeftRef}
                draggable={false}
            />
        </div>
    )
}

export default LineDraw;
