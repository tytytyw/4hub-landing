import React from "react";
import styles from "./FileInfo.module.sass";
import classNames from "classnames";
import File from "../Files";
import { imageSrc } from "../globalVariables";
import { colors } from "../collections";
import { ReactComponent as FolderIcon } from "../../assets/PrivateCabinet/folder-2.svg";
import { useLocales } from "react-localized";
import { fileProps } from "../../types/WorkElements";

function FileInfo({ file = {} }) {
  const { __ } = useLocales();
  return (
    <>
      {file === {} ? null : (
        <div className={styles.wrap}>
          <div className={styles.innerFileWrap}>
            {file.is_dir || !!file?.folders ? (
              <FolderIcon
                className={`${styles.innerFolderIcon} ${colors.filter((el) => el.color === file.color)[0]?.name}`}
              />
            ) : (
              <File color={file?.id_color} format={file?.ext ?? "FILE"} />
            )}
            {file?.is_pass ? (
              <img className={styles.lock} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt="lock" />
            ) : null}
          </div>
          <div className={styles.descriptionWrap}>
            <div className={styles.fileName}>{file?.name}</div>
            <div className={styles.innerFileInfo}>
              <div className={styles.fileSize}>{file?.size_now}</div>
              <div className={styles.descriptionGroup}>
                <div
                  className={classNames({
                    [styles.tagBlock]: true,
                    [styles.ftag]: !!file?.tag
                  })}
                >
                  {file?.tag && `#${file?.tag}`}
                </div>
                {file.fig && <img src={`${imageSrc}assets/PrivateCabinet/signs/${file?.fig}.svg`} alt="sign" />}
                {file.emo && <img src={`${imageSrc}assets/PrivateCabinet/smiles/${file?.emo}.svg`} alt="emoji" />}
              </div>
            </div>
          </div>
          {file?.ext === "FILES" ? (
            <div className={styles.severalChosen}>{__(`Выбранно ${file?.count} файлов/папок`)}</div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default FileInfo;

FileInfo.propTypes = {
  file: fileProps
};
