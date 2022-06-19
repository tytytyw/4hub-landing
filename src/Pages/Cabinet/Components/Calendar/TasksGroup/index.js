import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./TasksGroup.module.sass";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import SidebarEventItem from "../SidebarEventItem";
import { eventProps } from "types/CalendarPage";

const TasksGroup = ({ title, tasks }) => {
  const [isShowSubevents, setIsShowSubevents] = useState(false);
  const toggleEvents = () => {
    setIsShowSubevents((prevState) => !prevState);
  };
  const subeventsClass = isShowSubevents ? styles.subeventsShow : styles.subeventsHide;
  const eventsClass = isShowSubevents ? styles.tasksGroupOpen : "";
  const taskArray = [];
  for (let task in tasks) {
    taskArray.push(tasks[task]);
  }
  return (
    <>
      <div onClick={toggleEvents} className={`${styles.tasksGroup} ${eventsClass}`}>
        {title}
        <PlayIcon className={`${styles.playButton}`} />
      </div>
      <div className={subeventsClass}>
        {taskArray.map((task, i) => {
          return <SidebarEventItem task={task} index={i} key={i} />;
        })}
      </div>
    </>
  );
};

export default TasksGroup;

TasksGroup.propTypes = {
  title: PropTypes.string,
  tasks: PropTypes.arrayOf(eventProps)
};
