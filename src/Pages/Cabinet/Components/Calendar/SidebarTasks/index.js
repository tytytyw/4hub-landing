import React from "react";
import PropTypes from "prop-types";
import TasksGroup from "../TasksGroup";
import { eventProps } from "types/CalendarPage";
import { useLocales } from "react-localized";

const SidebarTasks = ({ tasks, setMouseParams, setChosenFile }) => {
  const { __ } = useLocales();
  //mylog
  console.log(tasks);

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
