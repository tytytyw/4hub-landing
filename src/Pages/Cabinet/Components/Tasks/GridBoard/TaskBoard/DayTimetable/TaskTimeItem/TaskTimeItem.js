import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { taskTypes } from "types/Tasks";
import { getFormatDate, getFormatTime } from "generalComponents/generalHelpers";
import { onSelectTask } from "Store/actions/TasksActions";
import { ReactComponent as NoteIcon } from "assets/PrivateCabinet/tasks/note.svg";
import ThreeDots from "../../../../../../../../generalComponents/ThreeDots/ThreeDots";
import styles from "../DayTimetable.module.sass";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "generalComponents/Hooks";

const TaskTimeItem = ({ task, setMouseParams, isDate }) => {
  const [showNote, setShowNote] = useState(false);
  const dispatch = useDispatch();
  const noteRef = useRef();
  useOutsideClick(noteRef, () => setShowNote(false));

  const selectTask = (task) => dispatch(onSelectTask(task));

  return (
    <div className={classNames(styles.dayLine, styles.fill)} onClick={() => selectTask(task)}>
      <span className={styles.time}>{getFormatTime(task.date_start)}</span>
      <span className={styles.name}> {task.name}</span>
      {task.prim && (
        <div className={styles.noteBox}>
          <NoteIcon className={styles.icon} onClick={() => setShowNote(true)} />
          {showNote && (
            <div className={styles.note} ref={noteRef}>
              {task.prim}
            </div>
          )}
        </div>
      )}
      {isDate && <span className={styles.time}>{getFormatDate(task.date_start)}</span>}
      <ThreeDots onClick={(e) => setMouseParams({ x: e.clientX, y: e.clientY, width: 200, height: 25 })} />
    </div>
  );
};

export default TaskTimeItem;
TaskTimeItem.propTypes = {
  task: taskTypes,
  setMouseParams: PropTypes.func,
  isDate: PropTypes.bool
};
