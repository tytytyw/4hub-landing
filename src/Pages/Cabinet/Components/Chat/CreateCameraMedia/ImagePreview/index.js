import React from "react";
import styles from "./ImagePreview.module.sass";

const ImagePreview = ({ image, visualEffects, imageRef, width, height }) => {

	return (
		<div className={styles.wrapper} style={{height, width}}>
			<img
				className={styles.image}
				alt="camera"
				src={image}
				style={{
                        filter: visualEffects.filter.result,
                    }}
				ref={imageRef}
			/>
		</div>
	);
};

export default ImagePreview;
