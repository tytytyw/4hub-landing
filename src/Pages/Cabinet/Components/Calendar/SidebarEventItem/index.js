import React from "react";
import PropTypes from "prop-types";

import styles from "./SidebarEventItem.module.sass";

const SidebarEventItem = ({ event, index }) => {
  console.log(event);
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
  event: PropTypes.object,
  index: PropTypes.number
};
