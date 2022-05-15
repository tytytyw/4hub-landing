import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./CropImage.module.sass";
import PropTypes from "prop-types";
import { blobProps } from "types/CreateFile";

function CropImage({ blob, setCropParams, setPicParams }) {
  const [hiddenPic, setHiddenPic] = useState(null);
  const [blobUrl, setBlobUrl] = useState("");

  const cropArea = document.querySelector("#crop_area");
  const picArea = document.querySelector("#picture");
  let startX = null;
  let startWidth = cropArea?.offsetWidth;
  let startHeight = cropArea?.offsetHeight;
  let dot_horizontal;
  let dot_vertilal;
  let cropAreaOffsetTop_initial = cropArea?.offsetTop;
  let cropAreaOffsetLeft_initial = cropArea?.offsetLeft;

  const mouseMoveOnDot = (e) => {
    e.stopPropagation();
    let difference;
    difference = startWidth + e.clientX - startX;

    if (dot_horizontal === "right") difference = startWidth + e.clientX - startX;
    if (dot_horizontal === "left") difference = startWidth + startX - e.clientX;

    const newWidth = difference > hiddenPic.width ? hiddenPic.width : difference;
    const newHeight = newWidth / 3;

    initialCordinates = {
      x: e.offsetX,
      y: e.offsetY
    };
    cropArea.style.width = `${newWidth}px`;
    cropArea.style.height = `${Math.round(newHeight)}px`;

    if (dot_vertilal === "top" && cropArea.offsetHeight > 21) {
      cropArea.style.top = `${cropAreaOffsetTop_initial + Math.round(startHeight - newHeight)}px`;
    }
    if (dot_horizontal === "left" && cropArea.offsetWidth > 63) {
      cropArea.style.left = `${cropAreaOffsetLeft_initial + Math.round(startWidth - newWidth)}px`;
    }
  };

  const moveDot = (e, vertical, horizontal) => {
    e.stopPropagation();
    startX = e.clientX;
    startHeight = cropArea?.offsetHeight;
    dot_horizontal = horizontal;
    dot_vertilal = vertical;
    cropAreaOffsetTop_initial = cropArea.offsetTop;
    cropAreaOffsetLeft_initial = cropArea.offsetLeft;
    picArea.addEventListener("mousemove", mouseMoveOnDot);
  };

  const dotMouseUp = () => {
    startWidth = cropArea?.offsetWidth;
    startX = null;
    dot_horizontal = null;
    dot_vertilal = null;
    picArea.removeEventListener("mousemove", mouseMoveOnDot);
    cropArea.removeEventListener("mousemove", mouseMoveOnCropArea);
  };

  let initialCordinates;

  const moveCropArea = (e) => {
    e.stopPropagation();
    if (e.target.id === "crop_area") {
      initialCordinates = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY
      };
      cropArea.addEventListener("mousemove", mouseMoveOnCropArea);
    }
  };

  const mouseMoveOnCropArea = (e) => {
    e.stopPropagation();
    const difference = {
      x: e.offsetX - initialCordinates.x,
      y: initialCordinates.y - e.offsetY
    };

    const validateCordinates = (cordinate, type) => {
      if (cordinate <= 0) return 0;
      if (type === "top") {
        const maxValue = hiddenPic.height - cropArea.offsetHeight;
        if (cordinate >= maxValue) return maxValue;
      }
      if (type === "left") {
        const maxValue = hiddenPic.width - cropArea.offsetWidth;
        if (cordinate >= maxValue) return maxValue;
      }
      return cordinate;
    };
    const newCordinates = {
      x: cropArea.offsetLeft + difference.x,
      y: cropArea.offsetTop - difference.y
    };
    cropArea.style.top = `${validateCordinates(newCordinates.y, "top")}px`;
    cropArea.style.left = `${validateCordinates(newCordinates.x, "left")}px`;
  };

  const calcNewSize = (blob) => {
    const image = new Image();
    image.src = URL.createObjectURL(blob);
    setTimeout(() => {
      if (image.naturalWidth > image.naturalHeight) {
        const aspectRatio = image.width / image.naturalHeight;
        image.width = 418;
        image.height = 418 / aspectRatio;
      }
      if (image.naturalWidth < image.naturalHeight) {
        const aspectRatio = image.naturalHeight / image.naturalWidth;
        image.height = 232;
        image.width = 232 / aspectRatio;
      }
      if (image.naturalWidth === image.naturalHeight) {
        image.height = 232;
        image.width = 232;
      }
      setHiddenPic(image);
    }, 10);
  };

  useEffect(() => {
    if (blob) {
      calcNewSize(blob);
      setBlobUrl(URL.createObjectURL(blob));
    }
  }, [blob]);

  const preventDefault = (e) => e.preventDefault();
  useEffect(() => {
    document.addEventListener("dragstart", preventDefault);
    return () => document.removeEventListener("dragstart", preventDefault);
  }, []);

  useEffect(() => {
    setPicParams(hiddenPic);
    setCropParams(cropArea);
  }, [hiddenPic, cropArea, setPicParams, setCropParams]);

  return (
    <div className={styles.picArea} onMouseUp={dotMouseUp} onMouseLeave={dotMouseUp}>
      <div className={styles.picWrap} style={{ width: hiddenPic?.width, height: hiddenPic?.height }}>
        <div
          id="crop_area"
          className={styles.cropArea}
          draggable={false}
          style={{
            width: 192,
            height: 64,
            maxWidth: hiddenPic?.width,
            maxHeight: hiddenPic?.height,
            top: `calc(50% - ${cropArea?.height / 2})`,
            left: `calc(50% - ${cropArea?.width / 2})`
          }}
          onMouseDown={moveCropArea}
          onMouseUp={() => {
            cropArea.removeEventListener("mousemove", mouseMoveOnCropArea);
          }}
        >
          <div className={classNames(styles.dot, styles.dotLT)} onMouseDown={(e) => moveDot(e, "top", "left")} />
          <div className={classNames(styles.dot, styles.dotRT)} onMouseDown={(e) => moveDot(e, "top", "right")} />
          <div className={classNames(styles.dot, styles.dotLB)} onMouseDown={(e) => moveDot(e, "bottom", "left")} />
          <div className={classNames(styles.dot, styles.dotRB)} onMouseDown={(e) => moveDot(e, "bottom", "right")} />
        </div>
        <img className={styles.editablePicture} id="hiddenPic" draggable={false} src={blobUrl} alt="crop_logo" />
        <div style={{ backgroundImage: `url(${blobUrl})` }} className={styles.picture} draggable={false} id="picture" />
      </div>
      <canvas id="canvas" style={{ visibility: "hidden" }}></canvas>
    </div>
  );
}

export default CropImage;

CropImage.propTypes = {
  setCropParams: PropTypes.func,
  setPicParams: PropTypes.func,
  blob: blobProps
};
