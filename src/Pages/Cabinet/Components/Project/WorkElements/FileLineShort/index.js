import React from "react";

import styles from "./FileLineShort.module.sass";
import File from "../../../../../../generalComponents/Files";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import PropTypes from "prop-types";

const FileLineShort = ({
  file,
  setChosenFile,
  chosen,
  setMouseParams,
  filePick,
  setFilePick,
  fileCollapsed
}) => {
  const size = useSelector(state => state.Cabinet.size);
  const previewFile = useSelector(s => s.Cabinet.modals.previewFile);
  const dispatch = useDispatch();

  const onPickFile = () => {
    if (filePick.show) {
      const isPicked = filePick.files.filter(el => el === file.fid);
      isPicked.length > 0
        ? setFilePick({
            ...filePick,
            files: filePick.files.filter(el => el !== file.fid)
          })
        : setFilePick({ ...filePick, files: [...filePick.files, file.fid] });
    }
    setChosenFile(file);
  };

  const getFileName = file => {
    const slicedName =
      file.name && file.name.slice(0, file.name.lastIndexOf("."));
    return slicedName || "(empty name)";
  };

  return (
    <div
      onClick={onPickFile}
      onDoubleClick={() =>
        dispatch(
          onSetModals("previewFile", { ...previewFile, open: true, file })
        )
      }
      className={classNames({
        [styles.wrapper]: true,
        [styles.active]: chosen,
        [styles?.[`wrapper_${size}`]]: size !== "medium"
      })}
    >
      <div className={styles.fileAbout}>
        <div className={styles.file}>
          <File
            format={file.ext}
            color={file.is_write === "0" ? "#C1C1C1" : file.color}
          />
        </div>

        {!fileCollapsed ? (
          <div className={styles.infoWrap}>
            <div className={styles.fileName}>{getFileName(file)}</div>

            <div className={styles.fileInfo}>
              <span className={styles.fileDate}>
                {file.mtime.split(" ")[0]}
              </span>

              <span className={styles.fileSize}>{file.size_now}</span>
            </div>

            {size !== "small" && (
              <div className={styles.symbols}>
                {file.is_pass === 1 && (
                  <img
                    className={styles.locked}
                    src={`${imageSrc}/assets/PrivateCabinet/locked.svg`}
                    alt="lock"
                  />
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
        ) : null}

        {size === "small" && (
          <div className={styles.symbols}>
            {file.is_pass === 1 && (
              <img
                className={styles.locked}
                src={`${imageSrc}/assets/PrivateCabinet/locked.svg`}
                alt="lock"
              />
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
            onClick={e => {
              e.stopPropagation();
              setMouseParams({
                x: e.clientX,
                y: e.clientY,
                width: 260,
                height: 25
              });
            }}
          >
            <span
              className={styles.menu}
              onClick={e => {
                onPickFile();
                setMouseParams({
                  x: e.clientX,
                  y: e.clientY,
                  width: 240,
                  height: 25
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileLineShort;

FileLineShort.propTypes = {
  file: PropTypes.object,
  setChosenFile: PropTypes.func,
  chosen: PropTypes.bool,
  setMouseParams: PropTypes.func,
  filePick: PropTypes.object,
  setFilePick: PropTypes.func,
  fileCollapsed: PropTypes.bool
};
