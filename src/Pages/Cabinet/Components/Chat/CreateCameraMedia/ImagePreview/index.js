import React from "react";
import styles from "./ImagePreview.module.sass";
import PropTypes from "prop-types";

const ImagePreview = ({ image, visualEffects, imageRef, width, height }) => {
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
    </div>
  );
};

export default ImagePreview;

ImagePreview.propTypes = {
  image: PropTypes.string.isRequired,
  visualEffects: PropTypes.object,
  imageRef: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};
