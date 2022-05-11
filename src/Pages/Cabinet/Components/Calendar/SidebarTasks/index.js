import React from "react";
import PropTypes from "prop-types";
import TasksGroup from "../TasksGroup";
import { eventShowProps } from "types/CalendarPage";

const SidebarTasks = ({ data }) => {
  const tasksGroup = ["Встречи", "Звонки", "Письма", "Задачи", "Срочные задачи"];

  return (
    <>
      {tasksGroup.map((item, i) => {
        return <TasksGroup key={i} title={item} events={data} />;
      })}
    </>
  );
};

export default SidebarTasks;

SidebarTasks.propTypes = {
  data: PropTypes.arrayOf(eventShowProps),
  tasksGroup: PropTypes.arrayOf(PropTypes.string)
};
