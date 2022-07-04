import React from "react";
import styles from "./Note.module.sass";
import { getFormatDate } from "generalComponents/generalHelpers";
import { imageSrc } from "generalComponents/globalVariables";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { onSelectTask } from "Store/actions/TasksActions";
import { taskTypes } from "types/Tasks";
import Corner from "../Corner/Corner";
import {} from "generalComponents/collections";
import PropTypes from "prop-types";

const Note = ({ note, setMouseParams }) => {
  const { theme } = useSelector((s) => s.user.userInfo);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(onSelectTask(note));
  };

  return (
    <div style={{ background: `${note?.id_color?.light}` }} className={styles.noteWrap} onClick={handleClick}>
      <div className={styles.header}>
        <span className={styles.date}>{getFormatDate(note.ut)}</span>
        <div
          className={styles.dots}
          onClick={(e) =>
            setMouseParams({
              x: e.clientX,
              y: e.clientY,
              width: 200,
              height: 25
            })
          }
        >
          <span />
        </div>
      </div>
      <span className={classNames(` linear-${theme} menuItem-${theme} ${styles.tag}`)}>#{note.tags}</span>
      <p className={styles.text}>{note.prim}</p>
      <div className={styles.before} style={{ background: `${note?.id_color?.light}` }} />
      {note?.id_color?.name ? (
        <Corner id={note.id} id_color={note.id_color} />
      ) : (
        <img
          src={`${imageSrc}assets/PrivateCabinet/tasks/corners/corner-grey.svg`}
          alt="img"
          className={styles.corner}
        />
      )}
    </div>
  );
};

export default Note;

Note.propTypes = {
  note: taskTypes,
  setMouseParams: PropTypes.func
};
