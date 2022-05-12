import React from "react";
import styles from "./Notes.module.sass";
import { useLocales } from "react-localized";
import { ReactComponent as AddIcon } from "../../../../assets/PrivateCabinet/plus-3.svg";
import { imageSrc } from "../../../../generalComponents/globalVariables";

function Notes() {
  const { __ } = useLocales();

  return (
    <div className={styles.notesWrap}>
      <div className={styles.emptyNote}>
        <AddIcon className={styles.addIcon} />
        <span className={styles.text}>{__("Создать заметку")}</span>
        <img
          src={`${imageSrc}assets/PrivateCabinet/tasks/corners/corner-grey.svg`}
          alt="img"
          className={styles.corner}
        />
      </div>
      <></>
    </div>
  );
}

export default Notes;
