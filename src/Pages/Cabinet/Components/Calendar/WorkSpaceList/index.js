import React from "react";
import styles from "./WorkSpace.module.sass";
import { hours } from "../helper";
import TableListTaskItem from "../TableListTaskItem";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { eventProps } from "../../../../../types/CalendarPage";
import { opacityColor } from "generalComponents/CalendarHelper";

const WorkSpaceList = ({ tasks }) => {
  const dayTasks = tasks.map((item) => {
    return { ...item, date: new Date(item.date_start) };
  });

  const calendarDate = useSelector((state) => state.Cabinet.calendarDate);
  const checkDateEvent = (event) => {
    if (!event) return false;

    return (
      event?.date?.getFullYear() === calendarDate.getFullYear() &&
      event?.date?.getMonth() === calendarDate.getMonth() &&
      event?.date?.getDate() === calendarDate.getDate()
    );
  };

  const getTask = (hour) => {
    const task = dayTasks?.find((item) => {
      const itemHour = item?.date.getHours();
      return itemHour === hour;
    });

    if (checkDateEvent(task)) {
      return task;
    }

    return false;
  };

  const renderTask = (hour) => {
    const task = getTask(hour);
    if (task) {
      return <TableListTaskItem task={task} />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {hours?.map((hour, index) => {
          const event = getTask(hour.value);
          return event ? (
            <div
              key={index}
              className={styles.listItemActive}
              style={{
                background: opacityColor(event.id_color.color)
              }}
            >
              <div className={styles.hour}>{hour.text}</div>
              <div className={styles.hourItem}>{renderTask(hour.value)}</div>
            </div>
          ) : (
            <div key={index} className={styles.listItem}>
              <div className={styles.hour}>{hour.text}</div>
              <div className={styles.hourItem}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkSpaceList;

WorkSpaceList.propTypes = {
  tasks: PropTypes.arrayOf(eventProps)
};
