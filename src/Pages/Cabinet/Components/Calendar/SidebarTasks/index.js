import React from "react";
import PropTypes from "prop-types";
import TasksGroup from "../TasksGroup";
import { eventProps } from "types/CalendarPage";
import { useLocales } from "react-localized";

const SidebarTasks = ({ tasks }) => {
  const { __ } = useLocales();

  const events = [
    { id: 1, name: __("Задача") },
    { id: 2, name: __("День рождение") },
    { id: 3, name: __("Встреча online") },
    { id: 4, name: __("Встреча offline") },
    { id: 5, name: __("Напоминание") },
    { id: 6, name: __("Другое") }
  ];

  return (
    <>
      {events.map((event, i) => {
        return <TasksGroup key={i} event={event} tasks={tasks} />;
      })}
    </>
  );
};

export default SidebarTasks;

SidebarTasks.propTypes = {
  tasks: PropTypes.arrayOf(eventProps),
  tasksGroup: PropTypes.arrayOf(PropTypes.string)
};
