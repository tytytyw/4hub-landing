import React from "react";
import PropTypes from "prop-types";

import styles from "./SidebarEventItem.module.sass";
import { eventProps } from "types/CalendarPage";
import ThreeDots from "generalComponents/ThreeDots/ThreeDots";

const SidebarEventItem = ({ task, count, setMouseParams, setChosenFile }) => {
  return (
    <div className={styles.eventWrap}>
      <div className={styles.event}>
        <div className={styles.eventIndex}>{count + 1}</div>
        <div className={styles.eventText}>{task.name}</div>
      </div>
      <div className={styles.eventOptions}>
        <ThreeDots
          onClick={(e) => {
            setMouseParams({
              x: e.clientX,
              y: e.clientY
            });
            setChosenFile(task);
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
