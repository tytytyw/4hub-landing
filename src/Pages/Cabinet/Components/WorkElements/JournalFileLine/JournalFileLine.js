import React from "react";
import styles from "./JournalFileLine.module.sass";
import { fileProps } from "../../../../../types/File";
import File from "generalComponents/Files";

function JournalFileLine({ file }) {
  //mylog
  console.log(file);
  return (
    <div className={styles.journalFileLine}>
      <div className={styles.fileAbout}>
        <div className={styles.icon}>
          <File color={file?.is_write === "0" ? "#C1C1C1" : file?.color} format={file?.ext} />
        </div>
        <div className={styles.fileText}>
          <div className={styles.fileName}>{file?.name && file?.name.slice(0, file?.name.lastIndexOf("."))}</div>
          <div className={styles.fileDate}>
            {file?.mtime?.split(" ")[0]} {file?.size_now}
          </div>
        </div>
      </div>
      <div className={styles.fileRights}>Просмотр</div>
      <div className={styles.users}>
        <div className={styles.userIcon}>ICO</div>
        <div className={styles.safe}>Срок хранения: (8дней)</div>
      </div>
      <div className={styles.open}>Открыть в системе 4Hub</div>
      <div className={styles.buttonsBlock}>1 2 3 D</div>
    </div>
  );
}

export default JournalFileLine;

JournalFileLine.propTypes = {
  file: fileProps
};
