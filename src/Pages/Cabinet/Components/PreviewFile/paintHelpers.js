import {imageToRatio} from "../../../../generalComponents/generalHelpers";
import canvasTxt from "canvas-txt";
import html2canvas from "html2canvas";
import styles from "./PreviewFile.module.sass";

//Square paint
export const mouseDownHandlerSquare = (e, status, setMouse, canvasRef, setUndoList) => {
    if(status === 'Сохранить') {
        setMouse(mouse => ({...mouse, down: true, startX: e.nativeEvent.offsetX, startY: e.nativeEvent.offsetY, saved: canvasRef.current.toDataURL()}));
        setUndoList(state => ([...state, canvasRef.current.toDataURL()]))
    }
}

export const mouseMoveHandlerSquare = (e, drawSquare, status, mouse, drawParams, canvasRef) => {
    if(status === 'Сохранить' && mouse.down) {
        const currentX = e.nativeEvent.offsetX;
        const currentY = e.nativeEvent.offsetY;
        const width = currentX - mouse.startX;
        const height = currentY - mouse.startY;
        drawSquare(mouse.startX, mouse.startY, width, height, canvasRef, mouse, drawParams)
    }
}

export const mouseUpHandlerSquare = (status, setMouse) => {
    if(status === 'Сохранить') {
        setMouse(mouse => ({...mouse, down: false, startX: 0, startY: 0, saved: null}));
    }
}

export const drawSquare = (x, y, width, height, canvasRef, mouse, drawParams) => {
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
    const img = new Image();
    img.src = mouse.saved;
    img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.strokeStyle = drawParams.color;
        ctx.lineWidth = drawParams.width;
        ctx.stroke();
    }
}

//Paint circle
export const mouseDownHandlerCircle = (e, status, setMouse, canvasRef, setUndoList) => {
    if(status === 'Сохранить') {
        setMouse(mouse => ({...mouse, down: true, startX: e.nativeEvent.offsetX, startY: e.nativeEvent.offsetY, saved: canvasRef.current.toDataURL()}));
        setUndoList(state => ([...state, canvasRef.current.toDataURL()]))
    }
}

export const mouseMoveHandlerCircle = (e, drawRadius, status, mouse, drawParams, canvasRef) => {
    if(status === 'Сохранить' && mouse.down) {
        const currentX = e.nativeEvent.offsetX;
        const currentY = e.nativeEvent.offsetY;
        const width = currentX - mouse.startX;
        const height = currentY - mouse.startY;
        const radius = Math.sqrt(width**2 + height**2)
        drawRadius(mouse.startX, mouse.startY, radius, canvasRef, mouse, drawParams)
    }
}

export const mouseUpHandlerCircle = (status, setMouse) => {
    if(status === 'Сохранить') {
        setMouse(mouse => ({...mouse, down: false, startX: 0, startY: 0, saved: null}));
    }
}

export const drawCircle = (x, y, radius, canvasRef, mouse, drawParams) => {
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
    const img = new Image();
    img.src = mouse.saved;
    img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2*Math.PI);
        ctx.strokeStyle = drawParams.color;
        ctx.lineWidth = drawParams.width;
        ctx.stroke();
    }
}

// Paint text
export const drawText = async (canvasRef, textBlockRef, setTextDraw, setDrawParams, setUndoList, drawParams, textDraw) => {
    if(textDraw.edit) {
        await setUndoList(state => ([...state, canvasRef.current.toDataURL()]));
        const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
        ctx.fillStyle = drawParams.color;
        canvasTxt.fontSize = drawParams.fontSize;
        canvasTxt.align = "left";
        canvasTxt.vAlign = "top";
        canvasTxt.font = drawParams.fontFamily;
        canvasTxt.lineHeight = drawParams.lineHeight;
        canvasTxt.fontSize = drawParams.fontSize;
        canvasTxt.drawText(ctx, textBlockRef.current.value, textBlockRef.current.offsetLeft + 3, textBlockRef.current.offsetTop + 2, textBlockRef.current.clientWidth - 4, textBlockRef.current.clientHeight - 4)
        setTextDraw(state => ({...state, edit: false, text: "Текст"}));
        setDrawParams(state => ({...state, figure: "brush-outlined"}));
    }
}

//paint arrow

export const drawDiv = async (canvasRef, lineRef, setUndoList, setTextDraw, setDrawParams) => {
    setUndoList(state => ([...state, canvasRef.current.toDataURL()]));
    const params = lineRef.current.getBoundingClientRect();
    const paramsParent = canvasRef.current.getBoundingClientRect();
    let img = new Image();

    await html2canvas(lineRef.current, {
        backgroundColor: null,
        y: -lineRef.current.scrollHeight,
        height: lineRef.current.scrollHeight * 20,
        width: lineRef.current.scrollWidth * 20,
        ignoreElements: (el) => el.className === styles.dotRight || el.className === styles.dotLeft
    })
        .then(canvas => {
            const data = canvas.toDataURL('image/png');
            img.setAttribute('src', data);
            img.onload = () => {
                const ctx = canvasRef.current.getContext('2d')
                ctx.drawImage(img, params.left - paramsParent.left, params.top - paramsParent.top - lineRef.current.scrollHeight)
                setTextDraw(state => ({...state, move: false, widthDif: 0, heightDif: 0, sizeChange: false, initialParams: {x: 0, y: 0, b: 0, c: 0}, axis: null}));
                setDrawParams(state => ({...state, figure: "brush-outlined"}));
            }
        })
        .catch(e => console.log(e));
}

//general paint functions
export const unDoPaintBrush = (canvasRef, undoList, setUndoList) => {
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
    if(undoList.length > 0) {
        const dataUrl = undoList[undoList.length - 1];
        let img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            const sizes = imageToRatio(img.naturalWidth, img.naturalHeight, canvasRef.current.width, canvasRef.current.height);
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(img, 0, 0, sizes.width, sizes.height);
            let newUndoList = undoList;
            newUndoList.pop();
            setUndoList(() => ([...newUndoList]));
        }
    }
}

//draw image on canvas
export function drawCanvas(canvas, image, callback = null, next, previous) {
    const ctx = canvas ? canvas.getContext('2d') : null;
    let img = new Image();
    img.src = image;
    img.onload = () => {
        const sizes = imageToRatio(img.naturalWidth, img.naturalHeight, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, sizes.width, sizes.height);
        if(callback) callback(next, previous);
    }
}