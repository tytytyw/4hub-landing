import React from "react";
import PropTypes from "prop-types";
import styles from "./TasksLine.module.sass";
import { taskTypes } from "types/Tasks";
import TaskItem from "./TaskItem/TaskItem";
import { TaskFilters, URGENCY_TYPES } from "generalComponents/globalVariables";
import classNames from "classnames";
import { useLocales } from "react-localized";
import { ReactComponent as FireIcon } from "assets/PrivateCabinet/tasks/fire.svg";
import { useDispatch, useSelector } from "react-redux";
import { TasksTypes } from "Store/types";

const TasksLine = ({ tasks }) => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const filtersType = useSelector((s) => s.Tasks.filters.type);

  const onSelectToday = () => {
    dispatch({ type: TasksTypes.SELECT_FILTER, payload: { type: TaskFilters.TODAY, date: new Date() } });
  };

  const onSelectAll = () => {
    dispatch({ type: TasksTypes.SELECT_FILTER, payload: { type: "", date: "" } });
  };

  return (
    <>
      <div className={styles.toggleWrap}>
        <div
          className={classNames(styles.toggleItem, { [styles.active]: filtersType !== TaskFilters.TODAY })}
          onClick={onSelectAll}
        >
          <FireIcon />
          &nbsp;{__("Срочные задачи")}
        </div>
        <div
          className={classNames(styles.toggleItem, { [styles.active]: filtersType === TaskFilters.TODAY })}
          onClick={onSelectToday}
        >
          {__("Цели на сегодня")}
        </div>
      </div>
      {tasks.length > 0 && (
        <>
          {tasks
            .filter((el) => el.id_act === URGENCY_TYPES.URGENT)
            .map((task, i) => (
              <TaskItem key={task.id} task={task} number={i + 1} />
            ))}
          <div className={classNames(styles.toggleItem)}>{__("Плановые задачи")}</div>
          {tasks
            .filter((el) => el.id_act === URGENCY_TYPES.PLANNED)
            .map((task, i) => (
              <TaskItem key={task.id} task={task} number={i + 1} />
            ))}
        </>
      )}
    </>
  );
};

export default TasksLine;

TasksLine.propTypes = {
  tasks: PropTypes.arrayOf(taskTypes)
};
