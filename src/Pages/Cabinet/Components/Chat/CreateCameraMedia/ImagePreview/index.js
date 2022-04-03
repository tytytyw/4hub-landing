import React from "react";
import styles from "./ImagePreview.module.sass";
import PropTypes from "prop-types";
import СhooseAspectRatio from "../СhooseAspectRatio";

const ImagePreview = ({
  image,
  visualEffects,
  imageRef,
  width,
  height,
  imageAspectRatio,
  setImageAspectRatio,
  openCropImage,
  setOpenCropImage
}) => {
  return (
    <div className={styles.wrapper} style={{ height, width }}>
      <img
        className={styles.image}
        alt="camera"
        src={image}
        style={{
          filter: visualEffects.filter.result
        }}
        ref={imageRef}
      />
      {!imageAspectRatio && openCropImage ? (
        <СhooseAspectRatio
          set={setImageAspectRatio}
          originalAspect={1}
          cancel={() => setOpenCropImage(null)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ImagePreview;

ImagePreview.propTypes = {
  image: PropTypes.string.isRequired,
  visualEffects: PropTypes.object,
  imageRef: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  imageAspectRatio: PropTypes.number,
  setImageAspectRatio: PropTypes.func,
  openCropImage: PropTypes.bool,
  setOpenCropImage: PropTypes.func.isRequired
};
