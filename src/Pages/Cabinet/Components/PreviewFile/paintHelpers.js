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
    // if(drawParams.figure === "brush-outlined") {
    //     ctx.strokeRect(x, y, width, height);
    // };
}


//general paint functions
export const unDoPaintBrush = (canvasRef, undoList, setUndoList) => {
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    if(undoList.length > 0) {
        const dataUrl = undoList[undoList.length - 1];
        let img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            const sizes = imageToRatio(img.naturalWidth, img.naturalHeight, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(img, 0, 0, sizes.width, sizes.height);
            let newUndoList = undoList;
            newUndoList.pop();
            setUndoList(() => ([...newUndoList]));
        }
    }
}