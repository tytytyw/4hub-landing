import React from "react";

import styles from "./FileLineShort.module.sass";
import File from "../../../../../generalComponents/Files";
import classNames from "classnames";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { filePickProps, filePreviewProps, fileProps } from "../../../../../types/WorkElements";

const FileLineShort = ({
  file,
  setChosenFile,
  chosen,
  setMouseParams,
  setFilePreview,
  filePreview,
  filePick,
  setFilePick,
  size
}) => {
  const onPickFile = () => {
    if (filePick.show) {
      const isPicked = filePick.files.filter((el) => el === file.fid);
      isPicked.length > 0
        ? setFilePick({
            ...filePick,
            files: filePick.files.filter((el) => el !== file.fid)
          })
        : setFilePick({ ...filePick, files: [...filePick.files, file.fid] });
    }
    setChosenFile(file);
  };

  return (
    <div
      onClick={onPickFile}
      onDoubleClick={() => setFilePreview({ ...filePreview, view: true, file })}
      className={classNames({
        [styles.wrapper]: true,
        [styles.active]: chosen,
        [styles?.[`wrapper_${size}`]]: size !== "medium"
      })}
    >
      <div>
        <div className={styles.fileAbout}>
          <div className={styles.file}>
            <File format={file.ext} color={file.is_write === "0" ? "#C1C1C1" : file.color} />
          </div>

          <div className={styles.infoWrap}>
            <div className={styles.fileName}>{file.name && file.name.slice(0, file.name.lastIndexOf("."))}</div>

            <div className={styles.fileInfo}>
              <span className={styles.fileDate}>{file.mtime.split(" ")[0]}</span>
              <span className={styles.fileSize}>{file.size_now}</span>
              {size !== "small" && (
                <div className={styles.symbols}>
                  {file.is_pass === 1 && (
                    <img className={styles.locked} src={`${imageSrc}/assets/PrivateCabinet/locked.svg`} alt="lock" />
                  )}
                  {file.fig && (
                    <img
                      className={styles.sign}
                      src={`${imageSrc}/assets/PrivateCabinet/signs/${file.fig}.svg`}
                      alt="sign"
                    />
                  )}
                  {file.emo && (
                    <img
                      className={styles.smile}
                      src={`${imageSrc}/assets/PrivateCabinet/smiles/${file.emo}.svg`}
                      alt="emoji"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {size === "small" && (
            <div className={styles.symbols}>
              {file.is_pass === 1 && (
                <img className={styles.locked} src={`${imageSrc}/assets/PrivateCabinet/locked.svg`} alt="lock" />
              )}
              {file.fig && (
                <img
                  className={styles.sign}
                  src={`${imageSrc}/assets/PrivateCabinet/signs/${file.fig}.svg`}
                  alt="sign"
                />
              )}
              {file.emo && (
                <img
                  className={styles.smile}
                  src={`${imageSrc}/assets/PrivateCabinet/smiles/${file.emo}.svg`}
                  alt="emoji"
                />
              )}
            </div>
          )}
          <div className={styles.optionsWrap}>
            <div
              className={styles.menuWrap}
              onClick={(e) => {
                setMouseParams({
                  x: e.clientX,
                  y: e.clientY,
                  width: 260,
                  height: 25
                });
              }}
            >
              <span className={styles.menu} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileLineShort;

FileLineShort.propTypes = {
  file: fileProps,
  setChosenFile: PropTypes.func,
  chosen: PropTypes.bool,
  setMouseParams: PropTypes.func,
  setFilePreview: PropTypes.func,
  filePreview: filePreviewProps,
  filePick: filePickProps,
  setFilePick: PropTypes.func,
  size: PropTypes.string
};
