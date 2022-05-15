import React from "react";
import styles from "./TaskBoard.module.sass";
import classes from "../GridBoard.module.sass";
import classNames from "classnames";
import PropTypes from "prop-types";
import { BOARDS, MIDNIGHT, SCHEMA, STYLED_CLASSES } from "../../../../../../generalComponents/globalVariables";
import { useSelector } from "react-redux";
import BoardServicePanel from "./BoardServicePanel/BoardServicePanel";
import DayTimetable from "./DayTimetable/DayTimetable";
import { createArrayOfHoursPerDay } from "../../../../../../generalComponents/CalendarHelper";

function TaskBoard({ classNameWrap, type, schema }) {
  const { theme } = useSelector((s) => s.user.userInfo);

  const INITIAL_TIMETABLE_DATE = new Date("1971-01-01 " + MIDNIGHT);

  return (
    <div className={classNames(styles.taskBoardWrap, classes[classNameWrap], `border-${theme}`)}>
      <BoardServicePanel
        type={type}
        isLastElement={classNameWrap === STYLED_CLASSES[schema][STYLED_CLASSES[schema].length - 1]}
      />
      {type !== BOARDS.TASKS_BOARD && <DayTimetable timePeriod={createArrayOfHoursPerDay(INITIAL_TIMETABLE_DATE, 1)} />}
    </div>
  );
}

export default TaskBoard;

TaskBoard.propTypes = {
  classNameWrap: PropTypes.oneOf(Object.values(STYLED_CLASSES).reduce((acc, styles) => [...acc, ...styles], [])),
  type: PropTypes.oneOf(Object.values(BOARDS)).isRequired,
  schema: PropTypes.oneOf(Object.values(SCHEMA))
};
