import React, { useState } from "react";
import classnames from "classnames";
import styles from "./CalendarYear.module.sass";
import { areEqual, getDate, useDaysOfWeeks, useGenerateCalendar, useMonths } from "generalComponents/CalendarHelper";
import PropTypes from "prop-types";
import { useLocales } from "react-localized";
import { useDispatch, useSelector } from "react-redux";
import { TasksTypes } from "Store/types";
import { TaskFilters } from "generalComponents/globalVariables";

const CalendarYear = ({ setOpenYearCalendar, year }) => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const isHistory = useSelector((s) => s.Tasks.isHistory);

  const months = useMonths();
  const generateCalendar = useGenerateCalendar();
  const daysOfWeeks = useDaysOfWeeks();
  const [chosenDate, setChosenDate] = useState({ year: year, month: "", day: "" });

  const switchYear = (status) => {
    if (isHistory && status === "increase" && chosenDate.year === new Date().getFullYear()) return;
    setChosenDate((state) =>
      status === "increase"
        ? { year: state.year + 1, month: "", day: "" }
        : { year: state.year - 1, month: "", day: "" }
    );
  };
  const onSelectYear = () => {
    dispatch({
      type: TasksTypes.SELECT_FILTER,
      payload: { type: TaskFilters.BY_YEAR, ...chosenDate, month: 0 }
    });
    setOpenYearCalendar(null);
  };

  const onSelectMonth = (month) => {
    setChosenDate((state) => ({ ...state, month: String(month.id + 1), day: "" }));
    dispatch({
      type: TasksTypes.SELECT_FILTER,
      payload: { type: TaskFilters.BY_MONTH, year: chosenDate.year, month: month.id, day: "" }
    });
    setOpenYearCalendar(null);
  };

  const onSelectDate = (date, day) => {
    if (!date) return;
    if (true && new Date(date.year, Number(date.month - 1), day) >= new Date()) return;
    setChosenDate({ ...date, day });
    dispatch({
      type: TasksTypes.SELECT_FILTER,
      payload: { type: TaskFilters.BY_DAY, year: date.year, month: Number(date.month) - 1, day }
    });
    setOpenYearCalendar(null);
  };

  const renderCal = (obj, classCustom, date) => {
    if (obj.length === 7 && classCustom !== "weekDay") return;
    return obj.map((day) => {
      const d = { ...date, day };
      const isToday = date ? areEqual(getDate(), d) : false;
      const isChosen = date ? areEqual(chosenDate, d) : false;

      return (
        <div key={day + Math.random()} className={styles.item}>
          <div
            className={classnames([styles.day], [styles[classCustom]], {
              [styles.today]: isToday,
              [styles.chosen]: isChosen
            })}
            onClick={() => onSelectDate(date, day)}
          >
            {classCustom ? day : ""}
          </div>
        </div>
      );
    });
  };

  const renderMonth = (item) => {
    const date = { year: chosenDate.year, month: (item.id + 1).toString() };
    const daysInMonth = generateCalendar(6, date);
    return (
      <>
        {renderCal(daysInMonth[0], "")}
        {renderCal(daysInMonth[1], "current", date)}
      </>
    );
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.approve} onClick={onSelectYear}>
          {__("Применить")}
        </div>
        <div className={styles.yearPicker}>
          <div className={styles.yearDecrease} onClick={() => switchYear()} />
          <span>{chosenDate.year}</span>
          <div className={styles.yearIncrease} onClick={() => switchYear("increase")} />
        </div>
        <div className={styles.close_wrap} onClick={() => setOpenYearCalendar(null)}>
          <span className={styles.close} />
        </div>
      </div>

      <div className={styles.main}>
        {months(chosenDate.year).map((item) => {
          if (isHistory && chosenDate.year === new Date().getFullYear() && item.id > new Date().getMonth()) return null;
          return (
            <div
              key={item.id}
              className={classnames([styles.month], {
                [styles.chosenMonth]: (item.id + 1).toString() === chosenDate.month
              })}
            >
              <p className={styles.monthTitle} onClick={() => onSelectMonth(item)}>
                {item.name}
              </p>
              <div className={styles.calendarBox}>
                <div className={styles.daysOfWeekWrap}>{renderCal(daysOfWeeks.short, "weekDay")}</div>
                <div className={styles.days}>{renderMonth(item)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarYear;

CalendarYear.propTypes = {
  setOpenYearCalendar: PropTypes.func,
  year: PropTypes.number
};
