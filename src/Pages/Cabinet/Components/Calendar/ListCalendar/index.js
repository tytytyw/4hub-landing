import React, { useEffect, useState } from "react";

import styles from "./ListCalendar.module.sass";
import classNames from "classnames";
import { getDays, getNextMonthDays, getPrevMonthDays } from "./helper";
import { months, weekDays } from "../helper";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarDate } from "../../../../../Store/actions/CabinetActions";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";

const ListCalendar = () => {
  const dispatch = useDispatch();
  const calendarDate = useSelector((state) => state.Cabinet.calendarDate);

  const [prevMonthDays, setPrevMonthDays] = useState(getPrevMonthDays(calendarDate));
  const [days, setDays] = useState(getDays(calendarDate));
  const [nextMonthDays, setNextMonthDays] = useState(getNextMonthDays(calendarDate));

  useEffect(() => {
    setPrevMonthDays(getPrevMonthDays(calendarDate));
    setDays(getDays(calendarDate));
    setNextMonthDays(getNextMonthDays(calendarDate));
  }, [calendarDate]);

  const getMonthName = () => {
    const monthItem = months?.find((item) => item?.id === calendarDate.getMonth());
    return monthItem?.text;
  };

  const onChangeDay = (day, month = null) => {
    const date = new Date(calendarDate);
    date.setDate(day);
    if (month !== null) {
      date.setMonth(month);
    }
    dispatch(setCalendarDate(date));
  };

  const dayActive = (day) => calendarDate.getDate() === day;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.month}>
          {getMonthName(calendarDate.getMonth())} {calendarDate.getFullYear()}
        </p>
        <img src={`${imageSrc}assets/PrivateCabinet/calendar-9.svg`} className={styles.calendarIcon} alt="Calendar" />
      </div>
      <div className={styles.content}>
        {weekDays?.map((weekDay) => (
          <div className={styles.weekDay} key={weekDay.id}>
            {weekDay.name}
          </div>
        ))}

        {prevMonthDays?.map((itemDay, index) => (
          <div key={index} className={styles.dayWrap}>
            <span
              className={classNames(styles.day, styles.anotherDay)}
              onClick={() => onChangeDay(itemDay, calendarDate.getMonth() - 1)}
            >
              {itemDay}
            </span>
          </div>
        ))}

        {days?.map((itemDay, index) => (
          <div key={index} className={styles.dayWrap}>
            <span
              className={classNames({
                [styles.day]: true,
                [styles.selectedDay]: dayActive(itemDay)
              })}
              onClick={() => onChangeDay(itemDay)}
            >
              {itemDay}
            </span>
          </div>
        ))}

        {nextMonthDays?.map((itemDay, index) => (
          <div key={index} className={styles.dayWrap}>
            <span
              className={classNames(styles.day, styles.anotherDay)}
              onClick={() => onChangeDay(itemDay, calendarDate.getMonth() + 1)}
            >
              {itemDay}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCalendar;

ListCalendar.propTypes = {
  collapsed: PropTypes.bool
};

ListCalendar.defaultProps = {
  collapsed: false
};
