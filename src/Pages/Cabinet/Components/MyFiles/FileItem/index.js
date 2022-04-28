import React from "react";
import File from "../../../../../generalComponents/Files";
import styles from "./FileItem.module.sass";
import "../../../../../generalComponents/colors.sass";
import classNames from "classnames";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { fileProps } from "../../../../../types/FileProps";
import { filePreviewProps } from "../../../../../types/FilePreviewProps";

const FileItem = ({
  file,
  listCollapsed,
  setMouseParams,
  setChosenFile,
  setFilePreview,
  filePreview,
  chosen,
  filePick,
  setFilePick
}) => {
  const size = useSelector(state => state.Cabinet.size);
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

  const renderEmoji = () => (
    <div>
      {file?.emo ? (
        <img
          src={`${imageSrc}assets/PrivateCabinet/smiles/${file.emo}.svg`}
          alt="emoji"
        />
      ) : null}
    </div>
  );

  const renderSign = () => (
    <div>
      {file?.fig ? (
        <img
          src={`${imageSrc}assets/PrivateCabinet/signs/${file.fig}.svg`}
          alt="fig"
        />
      ) : null}
    </div>
  );

  const renderLock = () => (
    <div>
      {file?.is_pass ? (
        <img
          src={`${imageSrc}assets/PrivateCabinet/locked.svg`}
          alt="lock"></img>
      ) : null}
    </div>
  );

  const renderTag = () =>
    file?.tag ? <div className={styles.file_tag}>#{file?.tag}</div> : null;
  return (
    <div
      className={classNames({
        [styles.file_wrap]: true,
        [styles.chosen]: chosen,
        [styles.mediumSize]: size === "medium",
        [styles.bigSize]: size === "big"
      })}
      onClick={onPickFile}
      onDoubleClick={() =>
        setFilePreview({ ...filePreview, view: true, file })
      }>
      <div className={styles.file_icon}>
        <File color={file.color} format={file.ext} />
      </div>
      {!listCollapsed && (
        <div className={styles.file_info}>
          <p className={styles.name}>{file.name}</p>
          <div className={styles.descr}>
            <span className={styles.file_date}>{file.ctime.split(" ")[0]}</span>
            <span className={styles.file_size}>{file.size_now}</span>
          </div>
          {size !== "small" ? (
            <div className={styles.file_details}>
              {renderSign()}
              {renderEmoji()}
              {renderLock()}
              {renderTag()}
            </div>
          ) : null}
        </div>
      )}
      <div className={styles.symbols}>
        {!listCollapsed &&
          (size === "small" ? (
            <>
              {renderSign()}
              {renderEmoji()}
              {renderLock()}
            </>
          ) : null)}

        <div
          className={styles.file_menu}
          onClick={e => {
            setMouseParams({
              x: e.clientX,
              y: e.clientY,
              width: 200,
              height: 25
            });
          }}>
          <span className={styles.dots} />
        </div>
      </div>
    </div>
  );
};

export default FileItem;

FileItem.propTypes = {
  file: fileProps,
  listCollapsed: PropTypes.bool,
  setMouseParams: PropTypes.func,
  setChosenFile: PropTypes.func,
  setFilePreview: PropTypes.func,
  filePreview: filePreviewProps,
  filePick: PropTypes.shape({
    show: PropTypes.bool,
    files: PropTypes.array
  }),
  setFilePick: PropTypes.func,
  chosen: PropTypes.bool
};
