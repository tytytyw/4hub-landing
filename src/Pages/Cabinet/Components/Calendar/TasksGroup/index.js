import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./TasksGroup.module.sass";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import SidebarEventItem from "../SidebarEventItem";
import { eventShowProps } from "types/CalendarPage";

const TasksGroup = ({ title, events }) => {
  const [isShowSubevents, setIsShowSubevents] = useState(false);
  const toggleEvents = () => {
    setIsShowSubevents((prevState) => !prevState);
  };
  const subeventsClass = isShowSubevents ? styles.subeventsShow : styles.subeventsHide;
  const eventsClass = isShowSubevents ? styles.tasksGroupOpen : "";

  return (
    <>
      <div onClick={toggleEvents} className={`${styles.tasksGroup} ${eventsClass}`}>
        {title}
        <PlayIcon className={`${styles.playButton}`} />
      </div>
      <div className={subeventsClass}>
        {events.map((event, i) => {
          return <SidebarEventItem event={event} index={i} key={i} />;
        })}
      </div>
    </>
  );
};

export default TasksGroup;

TasksGroup.propTypes = {
  title: PropTypes.string,
  events: PropTypes.arrayOf(eventShowProps)
};
