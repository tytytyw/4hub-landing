import React, { useRef } from "react";
import styles from "./ImagePreview.module.sass";

const ImagePreview = ({ image, visualEffects }) => {
	const imageRef = useRef();

	return (
		<div className={styles.wrapper}>
			<img
				className={styles.image}
				alt="camera"
				src={image}
				style={visualEffects}
				ref={imageRef}

                // onClick={() => {
                //     const canvas = document.createElement('canvas');
                //     const context = canvas.getContext("2d");
                //     canvas.height = imageRef.current.naturalHeight;
                //     canvas.width = imageRef.current.naturalWidth;
                //     context.filter = visualEffects.filter

                //     //rotate
                //     context.translate(canvas.width /2 , canvas.height  / 2 );
                //     context.rotate(90 * Math.PI / 180)
                //     context.translate(-canvas.width /2 , -canvas.height  / 2 );
                    
                //     //scale
                //     // context.scale(-1, 1)
                //     // context.translate(-canvas.width,0);

                //     context.drawImage(imageRef.current, 0, 0)

                //     const img = document.createElement('img')
                //     img.src = canvas.toDataURL("image/png")
                //     document.body.appendChild(img)
                //     }}
			/>
		</div>
	);
};

export default ImagePreview;
