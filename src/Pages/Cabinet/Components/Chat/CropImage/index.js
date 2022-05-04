import React, { useState, useEffect, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import PropTypes from "prop-types";

const CropImage = ({ aspect, canvasRef, imageSrc }) => {
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const imgRef = useRef();

  const canvasPreview = (image, canvas, crop) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No 2d context");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;
    ctx.save();
    ctx.translate(-cropX, -cropY);
    ctx.translate(centerX, centerY);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );
    ctx.restore();
  };

  const useDebounceEffect = (func, waitTime, deps) => {
    useEffect(() => {
      const t = setTimeout(() => {
        func.apply(undefined, deps);
      }, waitTime);

      return () => {
        clearTimeout(t);
      };
    }, deps); // eslint-disable-line
  };

  const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 50,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  };

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  useDebounceEffect(
    async () => {
      if (imgRef.current && canvasRef.current && crop)
        canvasPreview(imgRef.current, canvasRef.current, completedCrop ?? crop);
    },
    100,
    [completedCrop]
  );

  return (
    <div>
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={aspect}
      >
        <img ref={imgRef} src={imageSrc} alt="img" onLoad={onImageLoad} />
      </ReactCrop>
    </div>
  );
};

export default CropImage;

CropImage.defaultProps = {
  aspect: 1,
};

CropImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  aspect: PropTypes.number,
  canvasRef: PropTypes.object.isRequired,
};
