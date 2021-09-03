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