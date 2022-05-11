import React from "react";
import styles from "./WorkSpace.module.sass";
import { hexToRgb, hours, eventTypesColor } from "../helper";
import TableListTaskItem from "../TableListTaskItem";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { eventShowProps } from "../../../../../types/CalendarPage";

const WorkSpaceList = ({ events }) => {
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
    const event = events?.find((item) => {
      const itemHour = item?.date.getHours();
      return itemHour === hour;
    });

    if (checkDateEvent(event)) {
      return event;
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
          const color = eventTypesColor?.[event?.type];
          const rgba = hexToRgb(color);
          return event ? (
            <div
              key={index}
              className={styles.listItemActive}
              style={{
                background: `rgba(${rgba?.r}, ${rgba?.g}, ${rgba?.b}, 0.1)`
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
  events: PropTypes.arrayOf(eventShowProps)
};
