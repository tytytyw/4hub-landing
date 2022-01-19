import {imageToRatio} from "../../../../generalComponents/generalHelpers";

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

export function drawCanvasPosition(canvas, image, dx = canvas.width, dy = canvas.height, width = canvas.width, height = canvas.height) {
    const ctx = canvas ? canvas.getContext('2d') : null;
    let img = new Image();
    img.src = image;
    img.onload = () => {
        const sizes = imageToRatio(img.naturalWidth, img.naturalHeight, width, height);
        ctx.drawImage(img, (dx - sizes.width)/2, (dy - sizes.height)/2, sizes.width, sizes.height);
    }
}