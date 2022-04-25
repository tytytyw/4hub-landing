import React, { useEffect, useState } from "react";
import styles from "../CalendarPage.module.sass";
import ListTaskItem from "../ListTaskItem";
import { useSelector } from "react-redux";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const SidebarTasks = ({ data, listCollapsed }) => {
  const { __ } = useLocales();
  const calendarDate = useSelector(state => state.Cabinet.calendarDate);
  const getEventsByDay = data => {
    return data.filter(event => {
      return event?.date.getDate() === calendarDate.getDate();
    });
  };

  const [events, setEvents] = useState(getEventsByDay(data));

  useEffect(() => setEvents(getEventsByDay(data)), [calendarDate]);

  const getStrDate = () => {
    const day =
      `${calendarDate.getDate()}`.length < 2
        ? `0${calendarDate.getDate()}`
        : calendarDate.getDate();
    const month =
      `${calendarDate.getMonth()}`.length < 2
        ? `0${calendarDate.getMonth()}`
        : calendarDate.getMonth();
    return `${day}.${month}.${calendarDate.getFullYear()}`;
  };

  return (
    <>
      <div className={styles.myTasksBlock}>
        <p className={styles.title}>
          {__("Мои задачи")} {!listCollapsed && <span>{getStrDate()}</span>}
        </p>
      </div>
      {events?.map((event, i) => (
        <ListTaskItem key={i} event={event} collapsed={listCollapsed} />
      ))}
    </>
  );
};

export default SidebarTasks;

SidebarTasks.propTypes = {
  data: PropTypes.array,
  listCollapsed: PropTypes.bool
};
