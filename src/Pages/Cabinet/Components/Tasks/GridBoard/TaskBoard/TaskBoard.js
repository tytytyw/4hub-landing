import React from "react";
import styles from "./TaskBoard.module.sass";
import classes from "../GridBoard.module.sass";
import classNames from "classnames";
import PropTypes from "prop-types";
import { BOARDS, MIDNIGHT, TASKS_SCHEMA, STYLED_CLASSES } from "../../../../../../generalComponents/globalVariables";
import { useSelector } from "react-redux";
import BoardServicePanel from "./BoardServicePanel/BoardServicePanel";
import DayTimetable from "./DayTimetable/DayTimetable";
import { createArrayOfHoursPerDay } from "../../../../../../generalComponents/CalendarHelper";
import MailTasks from "./MailTasks/MailTasks";
import MyTasks from "./MyTasks/MyTasks";

function TaskBoard({ classNameWrap, type, schema, setSchema }) {
  const { theme } = useSelector((s) => s.user.userInfo);

  const INITIAL_TIMETABLE_DATE = new Date("1971-01-01 " + MIDNIGHT);

  return (
    <div className={classNames(styles.taskBoardWrap, classes[classNameWrap], `border-${theme}`)}>
      <BoardServicePanel
        type={type}
        isLastElement={classNameWrap === STYLED_CLASSES[schema][STYLED_CLASSES[schema].length - 1]}
        setSchema={setSchema}
        schema={schema}
      />
      {(type === BOARDS.MEETINGS_BOARD || type === BOARDS.CALLS_BOARD) && (
        <DayTimetable timePeriod={createArrayOfHoursPerDay(INITIAL_TIMETABLE_DATE, 1)} />
      )}
      {type === BOARDS.MAIL_BOARD && (
        <MailTasks tasks={["Write a letter to my friend right after the meeting", "Second mail"]} />
      )}
      {type === BOARDS.TASKS_BOARD && <MyTasks />}
    </div>
  );
}

export default TaskBoard;

TaskBoard.defaultProps = {
  setSchema: () => {}
};

TaskBoard.propTypes = {
  classNameWrap: PropTypes.oneOf(Object.values(STYLED_CLASSES).reduce((acc, styles) => [...acc, ...styles], [])),
  type: PropTypes.oneOf(Object.values(BOARDS)).isRequired,
  schema: PropTypes.oneOf(Object.values(TASKS_SCHEMA)),
  setSchema: PropTypes.func.isRequired
};
