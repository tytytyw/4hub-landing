import React from "react";
import PropTypes from "prop-types";

import styles from "./SidebarEventItem.module.sass";
import { eventProps } from "types/CalendarPage";
import ThreeDots from "generalComponents/ThreeDots/ThreeDots";
import { useDispatch } from "react-redux";
import { onSetModals } from "Store/actions/CabinetActions";
import { MODALS, TASK_MODALS } from "generalComponents/globalVariables";

const SidebarEventItem = ({ task, count, setMouseParams, setChosenFile }) => {
  const dispatch = useDispatch();
  const openTask = (task) => {
    dispatch(
      onSetModals(MODALS.TASKS, {
        type: TASK_MODALS.OPEN_TASK,
        choosenTask: task,
        params: {
          width: 620
        }
      })
    );
  };

  const openContextMenu = (e) => {
    setMouseParams({
      x: e.clientX,
      y: e.clientY
    });
    setChosenFile(task);
  };

  return (
    <div className={styles.eventWrap} onClick={() => openTask(task)}>
      <div className={styles.event}>
        <div className={styles.eventIndex}>{count + 1}</div>
        <div className={styles.eventText}>{task.name}</div>
      </div>
      <div className={styles.eventOptions}>
        <ThreeDots
          onClick={(e) => {
            e.stopPropagation();
            openContextMenu(e);
          }}
        />
      </div>
    </div>
  );
};

export default SidebarEventItem;

SidebarEventItem.propTypes = {
  task: eventProps,
  count: PropTypes.number,
  setMouseParams: PropTypes.func,
  setChosenFile: PropTypes.func
};
