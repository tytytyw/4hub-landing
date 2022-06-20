import React from "react";
import PropTypes from "prop-types";

import styles from "./SidebarEventItem.module.sass";
import { eventProps } from "types/CalendarPage";

const SidebarEventItem = ({ task, count }) => {
  //mylog
  console.log(task);
  return (
    <div className={styles.eventWrap}>
      <div className={styles.event}>
        <div className={styles.eventIndex}>{count + 1}</div>
        <div className={styles.eventText}>{task.prim}</div>
      </div>
      <div className={styles.eventOptions}>...</div>
    </div>
  );
};

export default SidebarEventItem;

SidebarEventItem.propTypes = {
  task: eventProps,
  count: PropTypes.number
};
