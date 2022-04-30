import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { onChooseRecentFile } from "../../../../Store/actions/CabinetActions";
import styles from "./RecentFiles.module.sass";
import File from "../../../../generalComponents/Files";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import { getIcon } from "../Project/helpers";
import PropTypes from "prop-types";
import { filePreviewProps } from "../../../../types/FilePreviewProps";

const RecentFiles = ({
  setFilePreview,
  filePreview,
  menuItem,
  onDoubleClickCallback,
  width
}) => {
  const recentFiles = useSelector(state => state.Cabinet.recentFiles);
  const chosenRecentFile = useSelector(state => state.Cabinet.chosenRecentFile);
  const dispatch = useDispatch();
  const containerRef = useRef();

  const renderIcon = file => {
    if (menuItem === "project") return getIcon(file);
    return <File color={file.id_color} format={file.ext} />;
  };

  const handleDoubleClick = file => {
    if (menuItem === "project") return onDoubleClickCallback(file);
    return setFilePreview({ ...filePreview, view: true, file });
  };

  const renderRecent = () => {
    if (!recentFiles) return null;
    return recentFiles.map((file, i) => {
      return (
        <div
          className={`
                ${styles.fileWrap} 
                ${
                  file?.fid
                    ? chosenRecentFile?.fid === file?.fid
                      ? styles.chosen
                      : ""
                    : chosenRecentFile?.id === file?.id
                    ? styles.chosen
                    : ""
                }
              `}
          key={i}
          onClick={() => dispatch(onChooseRecentFile(file))}
          onDoubleClick={() => handleDoubleClick(file)}>
          <div className={styles.innerFileWrap}>
            {renderIcon(file)}
            {file.is_pass ? (
              <img
                className={styles.lock}
                src={`${imageSrc}assets/PrivateCabinet/locked.svg`}
                alt="lock"
              />
            ) : null}
          </div>
          <div className={styles.descriptionWrap}>
            <div className={styles.fileName}>
              {file.name.slice(0, file.name.lastIndexOf("."))}
            </div>
            <div className={styles.innerFileInfo}>
              <div className={styles.fileSize}>{file.size_now}</div>
              <div className={styles.descriptionGroup}>
                {file.tag ? (
                  <div className={styles.fileTag}>#{file.tag}</div>
                ) : null}
                {file.id_fig && (
                  <img
                    src={`${imageSrc}assets/PrivateCabinet/signs/${file.id_fig}.svg`}
                    alt="sign"
                  />
                )}
                {file.id_emo && (
                  <img
                    src={`${imageSrc}assets/PrivateCabinet/smiles/${file.id_emo}.svg`}
                    alt="emoji"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className={styles.wrap}
      ref={containerRef}
      style={{ width: width - 27 }}>
      <div className={styles.recentFilesWrap}>{renderRecent()}</div>
    </div>
  );
};

export default RecentFiles;

RecentFiles.propTypes = {
  setFilePreview: PropTypes.func,
  filePreview: filePreviewProps,
  menuItem: PropTypes.string,
  onDoubleClickCallback: PropTypes.func,
  width: PropTypes.number
};

RecentFiles.defaultProps = {
  width: "100%"
};
