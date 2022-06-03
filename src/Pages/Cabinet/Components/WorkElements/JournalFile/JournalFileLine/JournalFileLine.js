import React from "react";
import styles from "./JournalFileLine.module.sass";

function JournalFileLine() {
  return (
    <div className={styles.journalFileLine}>
      <div className={styles.fileInfo}>
        <div className={styles.icon}>ICON</div>
        <div className={styles.fileText}>
          <div className={styles.fileName}>Картинка Мото</div>
          <div className={styles.fileDate}>20.08.2019 10 MB</div>
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
