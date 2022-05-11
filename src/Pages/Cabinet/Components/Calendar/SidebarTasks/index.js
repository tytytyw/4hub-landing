import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import TasksGroup from "../TasksGroup";

const SidebarTasks = ({ data }) => {
  const calendarDate = useSelector((state) => state.Cabinet.calendarDate);
  const getEventsByDay = (data) => {
    return data.filter((event) => {
      return event?.date.getDate() === calendarDate.getDate();
    });
  };
  //eslint-disable-next-line
  const [events, setEvents] = useState(getEventsByDay(data));

  useEffect(() => setEvents(getEventsByDay(data)), [calendarDate]); //eslint-disable-line
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
  data: PropTypes.array,
  listCollapsed: PropTypes.bool
};
