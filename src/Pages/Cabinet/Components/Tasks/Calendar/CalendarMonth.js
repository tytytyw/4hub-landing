import React, { useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./CalendarMonth.module.sass";
import { areEqual, getDate, useDaysOfWeeks, useGenerateCalendar, useMonths } from "generalComponents/CalendarHelper";
import Select from "generalComponents/Select/Select";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { getWeekOfMonth } from "date-fns";
import { TasksTypes } from "Store/types";
import { TaskFilters } from "generalComponents/globalVariables";
import { useDispatch, useSelector } from "react-redux";

const CalendarMonth = ({ setShowCalendar, setOpenYearCalendar }) => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const generateCalendar = useGenerateCalendar();
  const daysOfWeeks = useDaysOfWeeks();
  const months = useMonths();
  const [filterType, setFilterType] = useState(TaskFilters.TODAY);
  const [date, setDate] = useState(getDate());
  const today = getDate();
  const [daysInMonth, setDaysInMonth] = useState(generateCalendar(6, date));
  const isHistory = useSelector((s) => s.Tasks.isHistory);

  useEffect(() => setDaysInMonth(generateCalendar(6, date)), [date]); //eslint-disable-line

  const getYears = () => {
    const years = [];
    if (!isHistory) {
      for (let i = 2022; i <= new Date().getFullYear() + 10; i++) {
        years.push({ id: i.toString(), text: i.toString() });
      }
      return years;
    } else {
      for (let i = new Date().getFullYear(); i >= 2021; i--) {
        years.push({ id: i.toString(), text: i.toString() });
      }
      return years;
    }
  };

  const switchMonth = (e) => {
    const day = e?.target?.innerHTML ? Number(e.target.innerHTML) : e;
    if (day === 0 || day === 32) setFilterType(TaskFilters.BY_MONTH);
    if (day >= 15) {
      if (date.month === "1")
        return setDate({
          day: day && day <= 31 ? day : "",
          month: "12",
          year: date.year - 1
        });
      return setDate({
        ...date,
        day: day && day <= 31 ? day : "",
        month: String(Number(date.month) - 1)
      });
    } else {
      if (date.month === "12")
        return setDate({
          day: day && day <= 31 ? day : "",
          month: "1",
          year: date.year + 1
        });
      return setDate({
        ...date,
        day: day && day <= 31 ? day : "",
        month: String(Number(date.month) + 1)
      });
    }
  };

  const onClickYear = (year) => {
    setOpenYearCalendar(+year);
    setShowCalendar(false);
  };

  const onClickWeek = (day) => {
    setFilterType(TaskFilters.BY_WEEK);
    setDate({ ...date, day });
  };

  const onClickDay = (e, day) => {
    setFilterType(TaskFilters.BY_DAY);
    if (day.class === "prev" || day.class === "next") {
      return switchMonth(e);
    }
    if (isHistory && new Date(date.year, date.month, day.value) >= new Date(today.year, today.month, today.day)) return;
    setDate((state) => ({ ...state, day: day.value }));
  };

  const renderWeekDay = () =>
    daysOfWeeks.short.map((d, idx) => (
      <div key={idx} className={styles.weekDayTitle}>
        {d}
      </div>
    ));

  const renderDay = (week) =>
    week.map((day, idx) => {
      const eachDate = { ...date, day: day.value };
      const isChosen =
        areEqual(date, eachDate) && day.class !== "prev" && day.class !== "next" && filterType !== TaskFilters.BY_WEEK;
      return (
        <div key={idx} className={styles.item} onClick={(e) => onClickDay(e, day)}>
          <div
            className={classnames(styles[day.class], {
              [styles.today]: areEqual(today, eachDate),
              [styles.chosen]: isChosen
            })}
          >
            {day.value}
          </div>
        </div>
      );
    });

  const renderWeek = (weeks) =>
    weeks.map((week, i) => {
      const isCurrentWeek =
        getWeekOfMonth(new Date(today.year, Number(today.month - 1), today.day)) === i + 1 &&
        date.month === today.month &&
        date.year === today.year;
      const day = week.find((el) => el.class === "current").value;
      const eachDate = { ...date, day };
      const isChosenWeek = areEqual(date, eachDate) && filterType === TaskFilters.BY_WEEK;
      return (
        <div key={i} className={styles.line}>
          <div className={styles.weekNumber} onClick={() => onClickWeek(day)}>{`${i + 1} ${__("нед")}`}</div>
          <div
            className={classnames(styles.weekDays, {
              [styles.thisWeek]: isCurrentWeek,
              [styles.chosenWeek]: isChosenWeek
            })}
          >
            {renderDay(week)}
          </div>
        </div>
      );
    });

  const renderMonth = () => {
    const prevMonth = daysInMonth[0].length >= 7 ? daysInMonth[0].splice(7) : daysInMonth[0];
    const prevDays = prevMonth.reduce((acc, day) => {
      acc.push({ class: "prev", value: day });
      return acc;
    }, []);
    const currentDays = daysInMonth[1].reduce((acc, day) => {
      acc.push({ class: "current", value: day });
      return acc;
    }, []);
    const nexMonth = daysInMonth[2].length >= 7 ? daysInMonth[2].slice(0, daysInMonth[2].length - 7) : daysInMonth[2];
    const nextDays = nexMonth.reduce((acc, day) => {
      acc.push({ class: "next", value: day });
      return acc;
    }, []);
    const array = [...prevDays, ...currentDays, ...nextDays];
    const chunkSize = 7;
    const weeks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      weeks.push(array.slice(i, i + chunkSize));
    }
    return (
      <>
        <div className={styles.line}>
          <div className={styles.weekNumberNone} />
          <div className={styles.weekDays}>{renderWeekDay()}</div>
        </div>
        {renderWeek(weeks)}
      </>
    );
  };

  const changeDate = () => {
    dispatch({
      type: TasksTypes.SELECT_FILTER,
      payload: { type: filterType, ...date, month: Number(date.month - 1) }
    });

    setShowCalendar(false);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.calendarPic}>
          <Select
            placeholder={__("Год")}
            initValue={date.year.toString()}
            data={getYears()}
            onChange={(value) => onClickYear(value)}
          />
        </div>
        <div className={styles.yearPicker}>
          <div className={styles.yearDecrease} onClick={() => switchMonth(32)} />
          <div className={styles.monthTitle}>{months(date.year)[date.month - 1].name}</div>
          <div
            className={styles.yearIncrease}
            onClick={() => (isHistory && date.year === today.year && date.month >= today.month ? null : switchMonth(0))}
          />
        </div>
        <div className={styles.close_wrap} onClick={() => setShowCalendar(false)}>
          <span className={styles.close} />
        </div>
      </div>
      <div className={styles.main}>{renderMonth()}</div>
      <div className={styles.footer}>
        <div className={styles.approve} onClick={changeDate}>
          Готово
        </div>
      </div>
    </div>
  );
};

export default CalendarMonth;

CalendarMonth.propTypes = {
  setShowCalendar: PropTypes.func,
  setOpenYearCalendar: PropTypes.func
};
