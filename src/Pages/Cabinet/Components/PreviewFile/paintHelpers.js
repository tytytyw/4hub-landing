import {imageToRatio} from "../../../../generalComponents/generalHelpers";
import html2canvas from "html2canvas";
import styles from "./PreviewFile.module.sass";

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