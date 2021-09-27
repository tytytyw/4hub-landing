// paint brush
import {imageToRatio} from "../../../../generalComponents/generalHelpers";

export const mouseUpHandlerBrush = (status, setMouse) => {
    if(status === 'Сохранить') {
        setMouse(mouse => ({...mouse, down: false}));
    }
}

export const mouseDownHandlerBrush = (e, canvasRef, status, setMouse, setUndoList) => {
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
    if(status === 'Сохранить' && ctx) {
        console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setMouse(mouse => ({...mouse, down: true}));
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setUndoList(state => ([...state, canvasRef.current.toDataURL()]))
    }
}

export const mouseMoveHandlerBrush = (e, drawBrush, status, mouse, drawParams, canvasRef) => {
    if(status === 'Сохранить' && mouse.down) {
        drawBrush(e.nativeEvent.offsetX, e.nativeEvent.offsetY, drawParams, canvasRef)
    }
}

export const drawBrush = (x, y, drawParams, canvasRef) => {
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
    ctx.lineTo(x, y);
    ctx.strokeStyle = drawParams.color;
    ctx.lineWidth = drawParams.width;
    ctx.stroke();
}

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
        ctx.stroke();
    }
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