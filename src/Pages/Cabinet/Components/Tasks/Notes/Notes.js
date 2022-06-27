import React from "react";
import "theme/theme.sass";
import styles from "./Notes.module.sass";
import { useLocales } from "react-localized";
import { ReactComponent as AddIcon } from "../../../../../assets/PrivateCabinet/plus-3.svg";
import { imageSrc, MODALS, TASK_MODALS, TASK_TYPES } from "../../../../../generalComponents/globalVariables";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../Store/actions/CabinetActions";
import Note from "./Note/Note";
import PropTypes from "prop-types";

function Notes({ setMouseParams }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const { theme } = useSelector((s) => s.user.userInfo);
  const myTasks = useSelector((s) => s.Tasks.myTasks).filter((item) => +item.id_type === TASK_TYPES.NOTES);

  const onAddNote = () =>
    dispatch(
      onSetModals(MODALS.TASKS, { type: TASK_MODALS.ADD_NOTE, params: { width: 420, tag: "", color: "", text: "" } })
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
      </div>
      {myTasks.length === 0 && (
        <>
          <img
            className={styles.emptyImg}
            src={`${imageSrc}assets/PrivateCabinet/create_arrow.svg`}
            alt="Create Arrow"
          />
          <img
            className={styles.inscription}
            src={`${imageSrc}assets/PrivateCabinet/tasks/inscriptions/note_board.svg`}
            alt="inscription"
          />
        </>
      )}
      {myTasks.length > 0 && myTasks.map((note) => <Note key={note.id} note={note} setMouseParams={setMouseParams} />)}
    </div>
  );
}

export default Notes;

Notes.propTypes = {
  setMouseParams: PropTypes.func
};
