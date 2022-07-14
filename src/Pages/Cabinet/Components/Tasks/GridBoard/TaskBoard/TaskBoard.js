import React from "react";
import styles from "./TaskBoard.module.sass";
import classes from "../GridBoard.module.sass";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  TASK_TYPES,
  MIDNIGHT,
  TASKS_SCHEMA,
  STYLED_CLASSES,
  TaskFilters
} from "../../../../../../generalComponents/globalVariables";
import { useSelector } from "react-redux";
import DayTimetable from "./DayTimetable/DayTimetable";
import { createArrayOfHoursPerDay } from "../../../../../../generalComponents/CalendarHelper";
import MailTasks from "./MailTasks/MailTasks";
import MyTasks from "./MyTasks/MyTasks";
import BoardServicePanel from "./BoardServicePanel/BoardServicePanel";
import { endOfDay, endOfMonth, endOfWeek, endOfYear, getTime, startOfDay, startOfWeek } from "date-fns";

function TaskBoard({ classNameWrap, type, schema, setSchema }) {
  const { theme } = useSelector((s) => s.user.userInfo);
  const currentDep = useSelector((s) => s.Tasks.currentDep);
  const filters = useSelector((s) => s.Tasks.filters);
  const INITIAL_TIMETABLE_DATE = new Date("1971-01-01 " + MIDNIGHT);
  const tasks = useSelector((s) => s.Tasks.myTasks)
    // filter by Department
    .filter((item) => item.id_dep === currentDep?.id)
    //filter by task type
    .filter((item) => {
      if (type === TASK_TYPES.MEETINGS) {
        return item.id_type === TASK_TYPES.OFFLINE_MEETING || item.id_type === TASK_TYPES.ONLINE_MEETING;
      } else {
        return item.id_type === type;
      }
    });

  const getFiltredTask = () => {
    return tasks.filter((el) => {
      const today = getTime(startOfDay(new Date()));
      const taskDateStart = getTime(new Date(el.date_start));
      const taskDateEnd = el.date_end
        ? getTime(endOfDay(new Date(el.date_end)))
        : getTime(endOfDay(new Date(taskDateStart)));
      if (filters.type === TaskFilters.TODAY) {
        return taskDateStart <= today && today < taskDateEnd;
      }
      if (filters.type === TaskFilters.BY_DAY) {
        const filterDate = getTime(filters.date);
        return taskDateStart <= filterDate && taskDateEnd > filterDate;
      }
      if (filters.type === TaskFilters.BY_WEEK) {
        const weekStart = getTime(
          startOfWeek(new Date(filters.year, filters.month, filters.day), {
            weekStartsOn: 1
          })
        );
        const weekEnd = getTime(
          endOfWeek(new Date(filters.year, filters.month, filters.day), {
            weekStartsOn: 1
          })
        );

        return taskDateEnd > weekStart && weekEnd > taskDateStart;
      }
      if (filters.type === TaskFilters.BY_MONTH) {
        const monthStart = getTime(new Date(filters.date));
        const monthEnd = getTime(endOfMonth(new Date(filters.date)));
        return taskDateEnd > monthStart && monthEnd > taskDateStart;
      }
      if (filters.type === TaskFilters.BY_YEAR) {
        const yearStart = getTime(new Date(filters.date));
        const yearEnd = getTime(endOfYear(new Date(yearStart)));
        return yearStart <= taskDateEnd && yearEnd > taskDateStart;
      }
      return today < taskDateEnd;
    });
  };

  return (
    <div className={classNames(styles.taskBoardWrap, classes[classNameWrap], `border-${theme}`)}>
      <BoardServicePanel
        type={type}
        isLastElement={classNameWrap === STYLED_CLASSES[schema][STYLED_CLASSES[schema].length - 1]}
        setSchema={setSchema}
        schema={schema}
        haveTasks={getFiltredTask().length > 0}
      />
      {(type === TASK_TYPES.MEETINGS || type === TASK_TYPES.CALLS) && (
        <DayTimetable
          timePeriod={createArrayOfHoursPerDay(INITIAL_TIMETABLE_DATE, 1)}
          tasks={getFiltredTask()}
          type={type}
        />
      )}
      {type === TASK_TYPES.MAILS && <MailTasks tasks={tasks} />}
      {type === TASK_TYPES.TASK && <MyTasks tasks={getFiltredTask()} />}
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
  setSchema: PropTypes.func.isRequired
};
