import React from "react";
import styles from "./TaskBoard.module.sass";
import classes from "../GridBoard.module.sass";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  TASK_TYPES,
  MIDNIGHT,
  TASKS_SCHEMA,
  STYLED_CLASSES
} from "../../../../../../generalComponents/globalVariables";
import { useSelector } from "react-redux";
import DayTimetable from "./DayTimetable/DayTimetable";
import { createArrayOfHoursPerDay } from "../../../../../../generalComponents/CalendarHelper";
import MailTasks from "./MailTasks/MailTasks";
import MyTasks from "./MyTasks/MyTasks";
import BoardServicePanel from "./BoardServicePanel/BoardServicePanel";

function TaskBoard({ classNameWrap, type, schema, setSchema, setMouseParams }) {
  const { theme } = useSelector((s) => s.user.userInfo);
  const tasks = useSelector((s) => s.Tasks.myTasks);
  const INITIAL_TIMETABLE_DATE = new Date("1971-01-01 " + MIDNIGHT);

  const getTasks = () => tasks.filter((item) => item.id_type === type);
  return (
    <div className={classNames(styles.taskBoardWrap, classes[classNameWrap], `border-${theme}`)}>
      <BoardServicePanel
        type={type}
        isLastElement={classNameWrap === STYLED_CLASSES[schema][STYLED_CLASSES[schema].length - 1]}
        setSchema={setSchema}
        schema={schema}
        isTask={getTasks().length > 0}
      />
      {(type === TASK_TYPES.MEETINGS || type === TASK_TYPES.CALLS) && (
        <DayTimetable
          timePeriod={createArrayOfHoursPerDay(INITIAL_TIMETABLE_DATE, 1)}
          tasks={getTasks(type)}
          setMouseParams={setMouseParams}
        />
      )}
      {/* {type === TASK_TYPES.CALLS && (
        <DayTimetable timePeriod={createArrayOfHoursPerDay(INITIAL_TIMETABLE_DATE, 1)} tasks={getTasks(type)} />
      )} */}
      {type === TASK_TYPES.MAILS && (
        <MailTasks tasks={["Write a letter to my friend right after the meeting", "Second mail"]} />
      )}
      {type === TASK_TYPES.TASK && <MyTasks />}
    </div>
  );
}

export default TaskBoard;

TaskBoard.defaultProps = {
  setSchema: () => {}
};

TaskBoard.propTypes = {
  classNameWrap: PropTypes.oneOf(Object.values(STYLED_CLASSES).reduce((acc, styles) => [...acc, ...styles], [])),
  type: PropTypes.oneOf(Object.values(TASK_TYPES)).isRequired,
  schema: PropTypes.oneOf(Object.values(TASKS_SCHEMA)),
  setSchema: PropTypes.func.isRequired,
  setMouseParams: PropTypes.func
};
