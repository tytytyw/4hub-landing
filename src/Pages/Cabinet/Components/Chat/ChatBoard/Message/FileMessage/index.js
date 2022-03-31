import React from "react";
import styles from "./FileMessage.module.sass";
import File from "../../../../../../../generalComponents/Files";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import { useSelector, useDispatch } from "react-redux";
import { previewFormats } from "../../../../../../../generalComponents/collections";
import PropTypes from "prop-types";

const FileMessage = ({ file }) => {
  const dispatch = useDispatch();
  const previewFile = useSelector(s => s.Cabinet.modals.previewFile);
  const ext = file.name.slice(file.name.lastIndexOf(".") + 1);
  const mime_type = file.type;
  const preview = file.link.replace("https://fs2.mh.net.ua", "");

  const checkPreviewFormat = () => {
    return previewFormats.some(
      item => item.toLocaleLowerCase() === ext.toLocaleLowerCase()
    ) ||
      mime_type.includes("audio") ||
      mime_type.includes("video") ||
      mime_type.includes("image")
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
    dispatch(
      onSetModals("previewFile", { ...previewFile, open: true, file: fileInfo })
    );
  };

  return (
    <div className={styles.wrapper} onClick={onFileClick}>
      <div className={styles.fileBar}>
        <div className={styles.file}>
          <File
            color="grey"
            format={file.kind === "file" ? ext : "png"}
            className={styles.mainFile}
          />
        </div>
        {file.kind === "file" ? (
          <div className={styles.fname}>{file.name}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FileMessage;

FileMessage.propTypes = {
  file: PropTypes.object.isRequired
};
