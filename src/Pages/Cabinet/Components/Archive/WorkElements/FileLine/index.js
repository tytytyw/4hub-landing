import React from "react";

import styles from "./FileLine.module.sass";
import File from "../../../../../../generalComponents/Files";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { ReactComponent as DownLoadIcon } from "../../../../../../assets/PrivateCabinet/download.svg";
import { ReactComponent as PrintIcon } from "../../../../../../assets/PrivateCabinet/print.svg";
import { ReactComponent as SettingsIcon } from "../../../../../../assets/PrivateCabinet/settings.svg";
import { ReactComponent as DeleteIcon } from "../../../../../../assets/PrivateCabinet/delete.svg";
import { ReactComponent as ShareIcon } from "../../../../../../assets/PrivateCabinet/share.svg";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { filePreviewProps, fileProps } from "../../../../../../types/WorkElements";

const FileLine = ({ file, setChosenFile, chosenFile, setMouseParams, setAction, setFilePreview, filePreview }) => {
  const { __ } = useLocales();

  const size = useSelector((state) => state.Cabinet.size);
  return (
    <div
      onClick={() => setChosenFile(file)}
      onDoubleClick={() => setFilePreview({ ...filePreview, view: true, file })}
      className={classNames({
        [styles.wrapper]: true,
        [styles.active]: chosenFile?.fid === file?.fid,
        [styles?.[`wrapper_${size}`]]: size !== "medium"
      })}
    >
      <div className={styles.fileAbout}>
        <div className={styles.file}>
          <File format={file.ext} color={file.color} />
        </div>

        <div className={styles.infoWrap}>
          <div className={styles.fileName}>{file.name && file.name.slice(0, file.name.lastIndexOf("."))}</div>

          <div className={styles.fileInfo}>
            <span className={styles.fileDate}>{file.mtime.split(" ")[0]}</span>
            <span className={styles.fileSize}>{file.size_now}</span>
            {size !== "small" && (
              <div className={styles.symbols}>
                {file.is_pass === 1 && (
                  <img className={styles.locked} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt="lock" />
                )}
                {file.fig && (
                  <img
                    className={styles.sign}
                    src={`${imageSrc}assets/PrivateCabinet/signs/${file.fig}.svg`}
                    alt="sign"
                  />
                )}
                {file.emo && (
                  <img
                    className={styles.smile}
                    src={`${imageSrc}assets/PrivateCabinet/smiles/${file.emo}.svg`}
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
              <img className={styles.locked} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt="lock" />
            )}
            {file.fig && (
              <img className={styles.sign} src={`${imageSrc}assets/PrivateCabinet/signs/${file.fig}.svg`} alt="sign" />
            )}
            {file.emo && (
              <img
                className={styles.smile}
                src={`${imageSrc}assets/PrivateCabinet/smiles/${file.emo}.svg`}
                alt="emoji"
              />
            )}
          </div>
        )}

        {/* <div className={styles.linkWrap}>
                    <a className={styles.link}>https://google.com</a>
                </div> */}
      </div>

      <div className={styles.optionsWrap}>
        <div className={styles.iconView}>
          <DownLoadIcon />
        </div>

        {file?.ext !== "ZIP" && (
          <div className={styles.iconView}>
            <PrintIcon />
          </div>
        )}

        <div className={classNames(styles.iconView, styles.iconSettings)}>
          <SettingsIcon />
        </div>

        <div
          className={classNames(styles.iconView, styles.iconTrash)}
          onClick={() =>
            setAction({
              type: "delete",
              name: __("Удаление файла"),
              text: __(`Вы действительно хотите удалить файл ${file?.name}?`)
            })
          }
        >
          <DeleteIcon />
        </div>

        <div className={classNames(styles.iconView, styles.iconShare)}>
          <ShareIcon />
        </div>

        <div
          className={styles.menuWrap}
          onClick={(e) => {
            setMouseParams({
              x: e.clientX,
              y: e.clientY,
              width: 200,
              height: 25
            });
          }}
        >
          <span className={styles.menu} />
        </div>
      </div>
    </div>
  );
};

export default FileLine;

FileLine.propTypes = {
  file: fileProps,
  setChosenFile: PropTypes.func,
  chosenFile: fileProps,
  setMouseParams: PropTypes.func,
  setAction: PropTypes.func,
  setFilePreview: PropTypes.func,
  filePreview: filePreviewProps
};
