import React from "react";
import PropTypes from "prop-types";

import styles from "./SidebarEventItem.module.sass";
import { eventShowProps } from "types/CalendarPage";

const SidebarEventItem = ({ event, index }) => {
  return (
    <div className={styles.eventWrap}>
      <div className={styles.event}>
        <div className={styles.eventIndex}>{index + 1}</div>
        <div className={styles.eventText}>{event.name}</div>
      </div>
      <div className={styles.eventOptions}>...</div>
    </div>
  );
};

export default SidebarEventItem;

SidebarEventItem.propTypes = {
  event: eventShowProps,
  index: PropTypes.number
};
