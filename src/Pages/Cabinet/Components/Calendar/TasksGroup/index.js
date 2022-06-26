import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./TasksGroup.module.sass";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import SidebarEventItem from "../SidebarEventItem";
import { eventProps } from "types/CalendarPage";

const TasksGroup = ({ event, tasks, setMouseParams, setChosenFile }) => {
  const [isShowSubevents, setIsShowSubevents] = useState(false);
  const toggleEvents = () => {
    setIsShowSubevents((prevState) => !prevState);
  };
  const subeventsClass = isShowSubevents ? styles.subeventsShow : styles.subeventsHide;
  const eventsClass = isShowSubevents ? styles.tasksGroupOpen : "";
  const tasksGroup = [];

  tasks.map((item) => {
    if (event.id === Number(item.id_type)) {
      tasksGroup.push(item);
    }
  });

  return (
    <>
      <div onClick={toggleEvents} className={`${styles.tasksGroup} ${eventsClass}`}>
        {event.name}
        <PlayIcon className={`${styles.playButton}`} />
      </div>
      <div className={subeventsClass}>
        {tasksGroup.map((task, i) => {
          return (
            <SidebarEventItem
              task={task}
              count={i}
              key={i}
              setMouseParams={setMouseParams}
              setChosenFile={setChosenFile}
            />
          );
        })}
      </div>
    </>
  );
};

export default TasksGroup;

TasksGroup.propTypes = {
  event: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    icon: PropTypes.string
  }),
  tasks: PropTypes.arrayOf(eventProps),
  setMouseParams: PropTypes.func,
  setChosenFile: PropTypes.func
};
