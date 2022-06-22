import React from "react";
import PropTypes from "prop-types";
import TasksGroup from "../TasksGroup";
import { eventProps } from "types/CalendarPage";
import { useEvents } from "generalComponents/CalendarHelper";

const SidebarTasks = ({ tasks, setMouseParams, setChosenFile }) => {
  return (
    <>
      {useEvents().map((event, i) => {
        return (
          <TasksGroup
            key={i}
            event={event}
            tasks={tasks}
            setMouseParams={setMouseParams}
            setChosenFile={setChosenFile}
          />
        );
      })}
    </>
  );
};

export default SidebarTasks;

SidebarTasks.propTypes = {
  tasks: PropTypes.arrayOf(eventProps),
  tasksGroup: PropTypes.arrayOf(PropTypes.string),
  setMouseParams: PropTypes.func,
  setChosenFile: PropTypes.func
};
