import React, { useEffect, useRef, useState } from "react";

import styles from "./Previews.module.sass";
import { imageSrc, projectSrc } from "../../../../../generalComponents/globalVariables";
import File from "../../../../../generalComponents/Files";
import { previewFormats } from "../../../../../generalComponents/collections";
import { getMedia, imageToRatio } from "../../../../../generalComponents/generalHelpers";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../Store/actions/CabinetActions";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { fileChatProps, fileProps } from "../../../../../types/File";

// eslint-disable-next-line
const Previews = React.forwardRef(({ file, width, height, errorHandler }, canvasRef) => {
  const { __ } = useLocales();
  const audioRef = useRef(null);
  const [audio, setAudio] = useState("");
  const [video, setVideo] = useState("");
  const standardPrev = (
    <div className={styles.filePreviewWrapWrap}>
      <div className={styles.filePreviewWrap}>
        <File format={file?.ext} color={file?.color} />
      </div>
    </div>
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((s) => s.Cabinet.modals.error);

  const renderError = (message) => {
    dispatch(onSetModals("error", { ...error, open: true, message }));
    errorHandler(message);
  };

  const renderOfficePreview = () => {
    const isFormat = previewFormats.filter((type) => file?.ext.toLowerCase().includes(type)).length > 0;
    if (isFormat && file?.edit_url) {
      return <iframe src={file.edit_url} title={file?.name} frameBorder="0" scrolling="no" />;
    } else {
      return standardPrev;
    }
  };

  const renderFilePreview = () => {
    if (!loading) {
      switch (file.mime_type.split("/")[0]) {
        case "image": {
          return <canvas ref={canvasRef} className={styles.canvas} />;
        }
        case "video": {
          return (
            <video
              controls
              src={video ? video : ""}
              type={file.mime_type}
              onError={() => renderOfficePreview("Failed to open video")}
            >
              <source src={video ? video : ""} type={file.mime_type} />
            </video>
          );
        }
        case "audio": {
          return (
            <div className={styles.audioWrap}>
              <div className={styles.audioPicWrap}>
                <img
                  className={styles.audioPic}
                  src={`${imageSrc}assets/PrivateCabinet/file-preview_audio.svg`}
                  alt="audio"
                />
              </div>
              <audio
                ref={audioRef}
                src={audio ? audio : ""}
                type={file?.mime_type}
                controls
                onError={() => renderOfficePreview("Failed to open audio")}
              >
                <source src={audio ? audio : ""} type={file?.mime_type} />
              </audio>
            </div>
          );
        }
        case "application": {
          return <iframe src={`${projectSrc}${file?.preview}`} title={file?.name} frameBorder="0" scrolling="no" />;
        }
        default: {
          return (
            <div className={styles.filePreviewWrapWrap}>
              <div className={styles.filePreviewWrap}>
                <File format={file?.ext} color={file?.color} />
              </div>
            </div>
          );
        }
      }
    }
  };

  useEffect(() => {
    if (file.mime_type && file.mime_type.includes("image")) {
      const img = new Image();
      img.src = `${file.preview}${file.fid === "printScreen" ? "" : `?${new Date()}`}`;
      img.onload = (e) => {
        console.log(canvasRef?.current);
        if (canvasRef?.current) {
          const canvas = canvasRef.current.getContext("2d");
          const sizes = imageToRatio(
            e.target.naturalWidth,
            e.target.naturalHeight,
            width ?? Number((window.innerWidth * 0.84).toFixed()),
            height ?? Number((window.innerHeight * 0.79).toFixed())
          );
          canvasRef.current.width = sizes.width;
          canvasRef.current.height = sizes.height;
          canvas.clearRect(0, 0, e.target.naturalWidth, e.target.naturalHeight);
          canvas.drawImage(img, 0, 0, sizes.width, sizes.height);
        }
      };
      img.onerror = () => {
        setLoading(false);
        renderError(__("Не удалось загрузить изображение, попробуйте еще раз"));
      };
    }
    if (file.mime_type && file.mime_type.includes("audio") && file.is_preview) {
      setLoading(true);
      getMedia(`${imageSrc}${file.preview}`, file.mime_type, setAudio, setLoading, renderError);
    }
    if (file.mime_type && file.mime_type.includes("video") && file.is_preview) {
      setLoading(true);
      getMedia(`${imageSrc}${file.preview}`, file.mime_type, setVideo, setLoading, renderError);
    }
    return () => {
      if (window.cancelLoadMedia) window.cancelLoadMedia.cancel();
    };
  }, []); //eslint-disable-line

  return (
    <>
      {loading ? (
        <Loader
          type="bounceDots"
          position="absolute"
          background="rgba(0, 0, 0, 0)"
          zIndex={5}
          containerType="bounceDots"
        />
      ) : null}
      <div className={styles.previewsWrap}>{file?.is_preview === 1 ? renderFilePreview() : renderOfficePreview()}</div>
    </>
  );
});

export default Previews;

Previews.propTypes = {
  file: PropTypes.oneOfType([fileChatProps, fileProps]),
  width: PropTypes.string,
  height: PropTypes.number,
  errorHandler: PropTypes.func,
  canvasRef: PropTypes.exact({ current: PropTypes.instanceOf(Element) })
};
Previews.defaultProps = {
  file: null,
  width: undefined,
  height: undefined,
  errorHandler: () => {}
};
