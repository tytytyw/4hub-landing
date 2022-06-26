import React, { useState } from "react";

import styles from "./TableTaskItem.module.sass";
import PopoverTaskItem from "./PopoverTaskItem";
import PropTypes from "prop-types";
import { eventProps } from "types/CalendarPage";

const TableTaskItem = ({ task, date }) => {
  const [visible, setVisible] = useState(false);
  const color = task?.id_color?.color;
  const checkReverse = () => {
    const hour = date.getHours();
    return hour > 17;
  };

  const checkReverseSide = () => {
    const dayIndex = date.getDay();

    return dayIndex > 3;
  };

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      style={{ background: color }}
      className={styles.wrapper}
    >
      <p className={styles.name}>{task?.name}</p>
      {visible && <PopoverTaskItem task={task} reverse={checkReverse()} reverseSide={checkReverseSide()} />}
    </div>
  );
};

export default TableTaskItem;

TableTaskItem.propTypes = {
  task: eventProps,
  date: PropTypes.instanceOf(Date)
};
