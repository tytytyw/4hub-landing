import React, {useEffect, useRef} from 'react';

function Magnifier({canvas}) {

    const squareRef = useRef();

    const handleMove = (e) => {
        const square = squareRef.current;
        const canvasInfo = canvas.getBoundingClientRect();
        const squareInfo = square.getBoundingClientRect();

        if(canvas && square) {
            if(canvasInfo.left < (e.pageX - squareInfo.width/2) && canvasInfo.right > (e.pageX - squareInfo.width/2)) {
                square.style.left = e.pageX - (canvasInfo.width * 0.2)/2 + 'px';
            }
            if(canvasInfo.top < (e.pageY - squareInfo.height/2) && canvasInfo.bottom > (e.pageY - squareInfo.height/2)) {
                square.style.top = e.pageY - (canvasInfo.height * 0.2)/2 + 'px';
            }

            //Fixed edge points for square
            if(canvasInfo.left + squareInfo.width/2 >= e.pageX) {
                square.style.left = canvasInfo.left + 'px';
            }
            if(canvasInfo.right <= e.pageX + squareInfo.width/2) {
                square.style.left = (canvasInfo.right - squareInfo.width) + 'px';
            }
            if(canvasInfo.top + squareInfo.height/2 > e.pageY) {
                square.style.top = canvasInfo.top + 'px';
            }
            if(canvasInfo.bottom <= e.pageY + squareInfo.height/2) {
                square.style.top = (canvasInfo.bottom - squareInfo.height) + 'px';
            }

            // set display squareBlock
            // if(e.pageX > canvasInfo.left && e.pageX < canvasInfo.right && e.pageY > canvasInfo.top && e.pageY < canvasInfo.bottom) {
            //     console.log('in')
            //     setParams(s => ({...s, display: true}))
            // } else {
            //     console.log('out')
            //     setParams(s => ({...s, display: false}))
            // }
        }
    }

    useEffect(() => {
        window.onmousemove = handleMove;

        return () => {
            window.onmousemove = null;
        }
    }, []) //eslint-disable-line

    return(
        <div
            ref={squareRef}
            style={{
                background: 'rgba(232,228,162,0.42)',
                position: 'fixed',
                zIndex: 3,
                width: canvas?.getBoundingClientRect().width * 0.2 || 0,
                height: canvas?.getBoundingClientRect().height * 0.2 || 0,
            }}
        />
    )
}

export default Magnifier;
