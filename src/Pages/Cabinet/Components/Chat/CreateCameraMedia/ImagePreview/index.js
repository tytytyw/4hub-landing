import React from "react";
import styles from "./ImagePreview.module.sass";
import PropTypes from "prop-types";
import СhooseAspectRatio from "../СhooseAspectRatio";
import { visualEffectsProps } from "types/Chat";

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
  const ratio = imageRef.current?.naturalWidth / imageRef.current?.naturalHeight;
  const originalAspect = ratio || width / height;
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
          originalAspect={originalAspect}
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
  visualEffects: visualEffectsProps,
  imageRef: PropTypes.exact({ current: PropTypes.instanceOf(Element) }),
  width: PropTypes.number,
  height: PropTypes.number,
  imageAspectRatio: PropTypes.number,
  setImageAspectRatio: PropTypes.func,
  openCropImage: PropTypes.bool,
  setOpenCropImage: PropTypes.func.isRequired
};
