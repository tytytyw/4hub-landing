import html2canvas from "html2canvas";
import {imageSrc} from "./globalVariables";
import api from "../api";

//set image to requested size with maxWidth && maxHeight params
export function imageToRatio(width, height, maxWidth = 100, maxHeight = 100) {
    let ratio = 0;

    if(width > maxWidth){
        ratio = maxWidth / width;   // get ratio for scaling image
        // $(this).css("width", maxWidth); // Set new width
        // $(this).css("height", height * ratio);  // Scale height based on ratio
        height = height * ratio;    // Reset height to match scaled image
        width = width * ratio;    // Reset width to match scaled image
    }

    // Check if current height is larger than max
    if(height > maxHeight){
        ratio = maxHeight / height; // get ratio for scaling image
        // $(this).css("height", maxHeight);   // Set new height
        // $(this).css("width", width * ratio);    // Scale width based on ratio
        width = width * ratio;    // Reset width to match scaled image
        height = height * ratio;    // Reset height to match scaled image
    }

    return {height, width}
}

// currently unused !!!!
//make a printScreen of page with navigator
export const handlePrintScreen = async (ref, set) => {
    const video = document.createElement('video');
    const options = { video: true, audio: false };
    const width = window.innerWidth - 200;
    const height = window.innerHeight - 200;
    video.width = width;
    video.height = height;

    await navigator.mediaDevices.getDisplayMedia(options)
        .then(stream => {
            video.srcObject = stream;
            video.play();

            video.addEventListener('canplay', async () => {
                setTimeout(() => {
                    video.pause();
                    const canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, width, height);
                    const data = canvas.toDataURL('image/png');
                    ref.setAttribute('src', data);
                    if(set) set('block')
                }, 500);
            })
        })
        .catch(err => {
            console.log("An error occurred: " + err);
        });
}

export const htmlToCanvas = async (element, ref, set) => {
    await html2canvas(element, {allowTaint: true, proxy: imageSrc})
        .then(function (canvas) {
            const data = canvas.toDataURL('image/png');
            ref.setAttribute('src', data);
            if(set) set('block')
        })
        .catch(e => console.log(e));
}

export const replaceFile = async (uid, info, file) => {
    const newFIle = file.replace("image/png", "image/octet-stream");
    const blob = new Blob([newFIle], {type: 'image/png'});
    let data = new FormData();
    data.append('uid', uid);
    data.append('myfile', blob);
    data.append('fid', info.fid);
    data.append('dir', info.gdir);
    api.post(`/ajax/file_replace.php`, data)
        .then(res => console.log(res))
        .catch(e => console.log(e))
}

export const sendFile = async (uid, file) => {
    console.log(file);

    let data = new FormData();
    data.append('uid', uid);
    data.append('myfile', file);
    data.append('fileName', `Снимок экрана`);
    data.append('tag', '');
    data.append('pass', '');
    data.append('color', '');
    data.append('symbol', '');
    data.append('emoji', '');

    api.post(`ajax/project_file_add.php`, data)
        .then(res => console.log(res))
        .catch(e => console.log(e))
}