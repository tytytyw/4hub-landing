import React, { useState } from "react";
import styles from "./JournalFileLine.module.sass";
import { journalFileProps } from "../../../../../types/File";
import File from "generalComponents/Files";
import { useLocales } from "react-localized";
import OpenInFolderButton from "generalComponents/OpenInFolderButton/OpenInFolderButton";
import { MODALS } from "generalComponents/globalVariables";
import { onSetModals } from "Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";

function JournalFileLine({ file }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const previewFile = useSelector((state) => state.Cabinet.modals.previewFile);

  const [isHover, setIsHover] = useState(false);

  const handleDoubleClick = () => {
    dispatch(onSetModals(MODALS.FILE_PREVIEW, { ...previewFile, open: true, file }));
  };
  return (
    <div
      className={styles.journalFileLine}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onDoubleClick={handleDoubleClick}
    >
      <div className={styles.fileAbout}>
        <div className={styles.icon}>
          <File color={file?.id_color} format={file?.ext} />
        </div>
        <div className={styles.fileText}>
          <div className={styles.fileName}>{file?.name && file?.name.slice(0, file?.name.lastIndexOf("."))}</div>
          <div className={styles.fileDate}>
            {file?.mtime?.split(" ")[0]} {file?.size_now}
          </div>
        </div>
      </div>
      <div className={styles.fileRights}>{__("Просмотр")}</div>
      <div className={styles.users}>
        <div className={styles.userIcon}>ICO</div>
        <div className={styles.safe}>Срок хранения: (8дней)</div>
      </div>
      <OpenInFolderButton file={file} isHover={isHover} />
    </div>
  );
}

export default JournalFileLine;

JournalFileLine.propTypes = {
  file: journalFileProps
};
