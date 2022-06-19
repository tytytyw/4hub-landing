import React from "react";
import PropTypes from "prop-types";
import TasksGroup from "../TasksGroup";
import { eventProps } from "types/CalendarPage";

const SidebarTasks = ({ tasks }) => {
  const tasksGroup = ["Встречи", "Звонки", "Письма", "Задачи", "Срочные задачи"];
  return (
    <>
      {tasksGroup.map((item, i) => {
        return <TasksGroup key={i} title={item} tasks={tasks} />;
      })}
    </>
  );
};

export default SidebarTasks;

SidebarTasks.propTypes = {
  tasks: PropTypes.arrayOf(eventProps),
  tasksGroup: PropTypes.arrayOf(PropTypes.string)
};
