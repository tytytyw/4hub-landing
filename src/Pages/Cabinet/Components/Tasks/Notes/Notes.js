import React from "react";
import "theme/theme.sass";
import styles from "./Notes.module.sass";
import { useLocales } from "react-localized";
import { ReactComponent as AddIcon } from "../../../../../assets/PrivateCabinet/plus-3.svg";
import { imageSrc, MODALS, TASK_MODALS } from "../../../../../generalComponents/globalVariables";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../Store/actions/CabinetActions";

function Notes() {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const { theme } = useSelector((s) => s.user.userInfo);

  const onAddNote = () =>
    dispatch(
      onSetModals(MODALS.TASKS, { Type: TASK_MODALS.ADD_NOTE, params: { width: 420, tag: "", color: "", text: "" } })
    );

  return (
    <div className={styles.notesWrap}>
      <div className={classNames(styles.emptyNote, `interaction-border-${theme}`)} onClick={onAddNote}>
        <AddIcon className={styles.addIcon} />
        <span className={styles.text}>{__("Создать заметку")}</span>
        <img
          src={`${imageSrc}assets/PrivateCabinet/tasks/corners/corner-grey.svg`}
          alt="img"
          className={styles.corner}
        />
        <img className={styles.emptyImg} src={`${imageSrc}assets/PrivateCabinet/create_arrow.svg`} alt="Create Arrow" />
        <img
          className={styles.inscription}
          src={`${imageSrc}assets/PrivateCabinet/tasks/inscriptions/note_board.svg`}
          alt="inscription"
        />
      </div>
    </div>
  );
}

export default Notes;
