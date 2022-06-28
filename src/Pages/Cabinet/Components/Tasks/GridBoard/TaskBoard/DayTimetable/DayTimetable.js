import React from "react";
import styles from "./DayTimetable.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import ThreeDots from "../../../../../../../generalComponents/ThreeDots/ThreeDots";
import { taskTypes } from "types/Tasks";
import { getFormatTime } from "generalComponents/generalHelpers";
import { onSelectTask } from "Store/actions/TasksActions";

function DayTimetable({ timePeriod, tasks, setMouseParams }) {
  const { theme } = useSelector((s) => s.user.userInfo);
  const dispatch = useDispatch();

  const renderTask = (hour) => {
    const h = hour.split(":")[0];
    const timeTask = tasks.filter((item) => {
      const dateTask = new Date(item.date_start).getHours().toString();
      return dateTask === h;
    });
    return timeTask;
  };

  const chosenTask = (task) => dispatch(onSelectTask(task));

  const renderTimetableLine = () =>
    timePeriod.map((hours, i) => (
      <div key={i}>
        {tasks.length > 0 ? (
          renderTask(hours).length > 0 ? (
            renderTask(hours).map((el) => (
              <div key={el.id} className={classNames(styles.dayLine, styles.fill)} onClick={() => chosenTask(el)}>
                <span className={styles.time}>{getFormatTime(el.date_start)}</span>
                <span className={styles.name}> {el.name}</span>
                <ThreeDots onClick={(e) => setMouseParams({ x: e.clientX, y: e.clientY, width: 200, height: 25 })} />
              </div>
            ))
          ) : (
            <div className={classNames(styles.dayLine)}>{hours}</div>
          )
        ) : (
          <div className={classNames(styles.dayLine)}>{hours}</div>
        )}
        <div></div>
      </div>
    ));

  return (
    <div className={classNames(styles.dayTimetableWrap, `scrollbar-medium-${theme}`)}>{renderTimetableLine()}</div>
  );
}

export default DayTimetable;

DayTimetable.defaultProps = {
  timePeriod: []
};

DayTimetable.propTypes = {
  timePeriod: PropTypes.arrayOf(PropTypes.string), //list of hours per day
  tasks: PropTypes.arrayOf(taskTypes),
  setMouseParams: PropTypes.func
};
