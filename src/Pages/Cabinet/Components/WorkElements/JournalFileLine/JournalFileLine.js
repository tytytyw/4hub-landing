import React from "react";
import styles from "./JournalFileLine.module.sass";
import { journalFileProps } from "../../../../../types/File";
import File from "generalComponents/Files";
import Buttons from "../FileLine/Buttons";

function JournalFileLine({ file }) {
  //mylog
  console.log(file);
  return (
    <div className={styles.journalFileLine}>
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
      <div className={styles.fileRights}>Просмотр</div>
      <div className={styles.users}>
        <div className={styles.userIcon}>ICO</div>
        <div className={styles.safe}>Срок хранения: (8дней)</div>
      </div>
      <div className={styles.open}>Открыть в системе 4Hub</div>
      <div className={styles.buttonsBlock}>
        <Buttons />
      </div>
    </div>
  );
}

export default JournalFileLine;

JournalFileLine.propTypes = {
  file: journalFileProps
};
