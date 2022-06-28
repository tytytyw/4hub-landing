import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import styles from "./FullCalendar.module.sass";

import "./FullCalendar.css";
import { days } from "../helper";
import TableTaskItem from "../TableTaskItem";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { eventProps } from "../../../../../types/CalendarPage";
import classNames from "classnames";
import { setCalendarDate } from "Store/actions/CabinetActions";

const FullCalendarTable = ({ tasks, setViewType }) => {
  const dispatch = useDispatch();
  const weekTasks = tasks.map((item) => {
    return { ...item, date: new Date(item.date_start) };
  });
  const calendarRef = useRef();
  const calendarDate = useSelector((state) => state.Cabinet.calendarDate);
  const renderEventContent = (eventInfo) => {
    return <TableTaskItem date={eventInfo?.event.start} task={eventInfo.event?.extendedProps} />;
  };

  const getThisDay = (date) => {
    setViewType("day");
    dispatch(setCalendarDate(date));
  };

  const renderHeaderCell = (eventInfo) => {
    const day = days.find((item) => item.id === eventInfo.date.getDay());
    const date = eventInfo.date.getDate();
    const currentDay = date === new Date().getDate() ? styles.active : "";

    return (
      <div className={styles.dayItem}>
        <span className={styles.day}>{day?.day}</span>
        <h4 className={classNames(styles.dayNumber, currentDay)} onClick={() => getThisDay(eventInfo.date)}>
          {date}
        </h4>
      </div>
    );
  };

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(calendarDate);
  }, [calendarDate]);

  return (
    <div className={styles.wrapper}>
      <FullCalendar
        initialDate={calendarDate}
        ref={calendarRef}
        events={weekTasks}
        plugins={[timeGridPlugin, interactionPlugin]}
        allDaySlot={false}
        headerToolbar={{
          left: null,
          center: null,
          right: null
        }}
        dayHeaderContent={renderHeaderCell}
        slotDuration="01:00"
        slotMinTime="00:00"
        slotMaxTime="24:00"
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false
        }}
        firstDay={0}
        locale="ru" //TODO - according real location
        eventContent={renderEventContent}
      />
    </div>
  );
};

export default FullCalendarTable;

FullCalendarTable.propTypes = {
  tasks: PropTypes.arrayOf(eventProps),
  setViewType: PropTypes.func
};
