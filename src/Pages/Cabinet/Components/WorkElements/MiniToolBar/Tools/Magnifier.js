import React, {useEffect, useRef, useState} from 'react';
import {imageToRatio} from "../../../../../../generalComponents/generalHelpers";

function Magnifier({canvas}) {

    const squareRef = useRef();
    const magnifierRef = useRef();
    const [params, setParams] = useState({x: 0, y: 0, displayPreview: false});

    const handleMove = (e) => {
        const square = squareRef.current;

        if(canvas && square) {
            const canvasInfo = canvas.getBoundingClientRect();
            const squareInfo = square.getBoundingClientRect();

            if(canvasInfo.left < (e.pageX - squareInfo.width/2) && canvasInfo.right > (e.pageX - squareInfo.width/2)) {
                square.style.left = e.pageX - (canvasInfo.width * 0.2)/2 + 'px';
                const x = e.pageX + squareInfo.width/2 + magnifierRef.current.getBoundingClientRect().width > window.innerWidth
                    ? e.pageX - squareInfo.width/2 - magnifierRef.current.getBoundingClientRect().width
                    : e.pageX + squareInfo.width/2;
                setParams(s => ({...s, x}));
                drawMagnifier();
            }
            if(canvasInfo.top < (e.pageY - squareInfo.height/2) && canvasInfo.bottom > (e.pageY - squareInfo.height/2)) {
                square.style.top = e.pageY - (canvasInfo.height * 0.2)/2 + 'px';
                const y = e.pageY + squareInfo.height/2 + magnifierRef.current.getBoundingClientRect().height > window.innerHeight
                    ? e.pageY - squareInfo.height/2 - magnifierRef.current.getBoundingClientRect().height
                    : e.pageY + squareInfo.height/2;
                setParams(s => ({...s, y}));
                drawMagnifier();
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
        }
    }

    const drawMagnifier = () => {
        let image = new Image();
        image.src = canvas.toDataURL();
        image.onload = (e) => {
            const {height, width} = imageToRatio(e.target.naturalWidth, e.target.naturalHeight, Number((window.innerWidth * 0.84).toFixed()), Number((window.innerHeight * 0.79).toFixed()));
            e.target.width = width;
            e.target.height = height;
            const ctx = magnifierRef.current.getContext('2d');
            ctx.drawImage(
                e.target,
                //get image
                squareRef.current.getBoundingClientRect().left - canvas?.getBoundingClientRect().left,
                squareRef.current.getBoundingClientRect().top - canvas?.getBoundingClientRect().top,
                squareRef.current.getBoundingClientRect().width * 1.3, squareRef.current.getBoundingClientRect().height * 1.7,
                //draw image
                0, 0,
                magnifierRef.current.getBoundingClientRect().width, magnifierRef.current.getBoundingClientRect().height
            );
        }
    }

    useEffect(() => {
        window.onmousemove = handleMove;

        squareRef.current.onmouseenter = () => {
            setParams(s => ({...s, displayPreview: true}))
        }

        squareRef.current.onmouseleave = () => {
            setParams(s => ({...s, displayPreview: false}))
        }

        return () => {
            window.onmousemove = null;
        }
    }, []) //eslint-disable-line

    return(
        <>
        <div
            ref={squareRef}
            style={{
                background: 'rgba(232,228,162,0.42)',
                position: 'fixed',
                zIndex: 2,
                width: canvas?.getBoundingClientRect().width * 0.2 || 0,
                height: canvas?.getBoundingClientRect().height * 0.2 || 0,
            }}
        />
            <canvas
                ref={magnifierRef}
                style={{
                    display: params.displayPreview ? 'block' : 'none',
                    position: 'fixed',
                    top: params.y,
                    left: params.x,
                    zIndex: 2,
                    border: '1px solid black',
                    width: squareRef.current?.getBoundingClientRect().width * 2,
                    height: squareRef.current?.getBoundingClientRect().height * 2,
                }}
            />
        </>
    )
}

export default Magnifier;
