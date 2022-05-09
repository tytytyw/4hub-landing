import React from "react";
import PropTypes from "prop-types";

import styles from "./TasksGroup.module.sass";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import SidebarEventItem from "../SidebarEventItem";

const TasksGroup = ({ title, events }) => {
  return (
    <>
      <div className={styles.tasksGroupWrap}>
        <>{title}</>
        <div>
          <PlayIcon className={`${styles.playButton}`} />
        </div>
      </div>
      {events.map((event, i) => {
        return <SidebarEventItem event={event} key={i} index={i} />;
      })}
    </>
  );
};

export default TasksGroup;

TasksGroup.propTypes = {
  title: PropTypes.string,
  events: PropTypes.arrayOf(PropTypes.object)
};
