import React from "react";
import styles from "../FileLine.module.sass";

import File from "../../../../../../generalComponents/Files";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { ReactComponent as FolderIcon } from "../../../../../../assets/PrivateCabinet/folder-2.svg";
import { colors } from "../../../../../../generalComponents/collections";
import { useLocation } from "react-router";

const FileInfo = ({ file }) => {
  const { pathname } = useLocation();
  const shortWidth =
    pathname.startsWith("/archive") || pathname.startsWith("/downloaded-files")
      ? { maxWidth: `calc( 100% - 620px )` }
      : {};

  return (
    <div className={styles.fileAbout} style={shortWidth}>
      <div
        className={`${styles.file} ${file?.is_dir ? styles.fileFolder : ""}`}
      >
        {file?.is_dir ? (
          <FolderIcon
            className={`${styles.folderIcon} ${
              colors.filter((el) => el.color === file?.color)[0]?.name
            }`}
          />
        ) : (
          <File
            color={file?.is_write === "0" ? "#C1C1C1" : file?.color}
            format={file?.ext}
            className={styles.mainFile}
          />
        )}
      </div>

      <div className={styles.infoWrap}>
        <div className={styles.fileName}>
          {file?.name && file?.name.slice(0, file?.name.lastIndexOf("."))}
        </div>

        <div className={styles.fileInfo}>
          {pathname.startsWith("/files") ? (
            <span className={styles.fileDate}>
              {file?.ctime?.split(" ")[0]}
            </span>
          ) : (
            ""
          )}
          <span className={styles.fileSize}>{file?.size_now}</span>
          <div className={styles.symbols}>
            {file?.is_pass === 1 && (
              <img
                className={styles.locked}
                src={`${imageSrc}assets/PrivateCabinet/locked.svg`}
                alt="lock"
              />
            )}
            {file?.fig && (
              <img
                className={styles.sign}
                src={`${imageSrc}assets/PrivateCabinet/signs/${file?.fig}.svg`}
                alt="sign"
              />
            )}
            {file?.emo && (
              <img
                className={styles.smile}
                src={`${imageSrc}assets/PrivateCabinet/smiles/${file?.emo}.svg`}
                alt="emoji"
              />
            )}
            {file?.tag && <div className={styles.ftag}>#{file?.tag}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInfo;
