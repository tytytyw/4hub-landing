import React from "react";
import styles from "./FileMessage.module.sass";
import File from "../../File";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import { useSelector, useDispatch } from "react-redux";
import { previewFormats } from "../../../../../../../generalComponents/collections";
import PropTypes from "prop-types";
import classNames from "classnames";
import { fileChatBoardProps } from "types/Chat";
import { fileProps } from "types/File";

const FileMessage = ({ file, size, style, amount }) => {
  const dispatch = useDispatch();
  const previewFile = useSelector((s) => s.Cabinet.modals.previewFile);
  const ext = file.name.slice(file.name.lastIndexOf(".") + 1);
  const mime_type = file.type ?? file.mime_type;
  const preview = (file.link || file.preview).replace("https://fs2.mh.net.ua", "");

  const checkPreviewFormat = () => {
    return previewFormats.some((item) => item.toLocaleLowerCase() === ext.toLocaleLowerCase()) ||
      mime_type?.includes("audio") ||
      mime_type?.includes("video") ||
      mime_type?.includes("image") ||
      mime_type?.includes("application")
      ? 1
      : 0;
  };

  const onFileClick = () => {
    const fileInfo = {
      ...file,
      ext,
      mime_type,
      preview,
      is_preview: checkPreviewFormat()
    };
    dispatch(onSetModals("previewFile", { ...previewFile, open: true, file: fileInfo }));
  };

  return (
    <div
      className={classNames({ [styles.wrapper]: true, [styles.severalFiles]: amount > 1 })}
      onClick={onFileClick}
      style={style}
      title={file.name ?? ""}
    >
      <div className={classNames(styles.fileBar, styles[size])}>
        <div className={styles.file}>
          <File
            color={file.color ?? "grey"}
            format={file.kind === "file" ? ext : file.type.slice(file.type.lastIndexOf("/") + 1)}
            fileSize={size}
          />
        </div>
        {file.kind === "file" && amount === 1 ? <div className={styles.fname}>{file.name}</div> : ""}
      </div>
    </div>
  );
};

export default FileMessage;

FileMessage.propTypes = {
  file: PropTypes.oneOfType([fileChatBoardProps, fileProps]).isRequired,
  size: PropTypes.string,
  style: PropTypes.exact({
    margin: PropTypes.number
  }),
  amount: PropTypes.number
};
