import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TasksLine.module.sass";
import { taskTypes } from "types/Tasks";
import TaskItem from "./TaskItem/TaskItem";
import { URGENCY_TYPES } from "generalComponents/globalVariables";
import classNames from "classnames";
import { useLocales } from "react-localized";
import { ReactComponent as FireIcon } from "assets/PrivateCabinet/tasks/fire.svg";

const TasksLine = ({ tasks }) => {
  const { __ } = useLocales();
  const [isToday, setIsToday] = useState(false);

  const handleToggle = () => {
    setIsToday((state) => !state);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.toggleWrap}>
        <div className={classNames(styles.toggleItem, { [styles.active]: !isToday })} onClick={handleToggle}>
          <FireIcon />
          &nbsp;{__("Срочные задачи")}
        </div>
        <div className={classNames(styles.toggleItem, { [styles.active]: isToday })} onClick={handleToggle}>
          {__("Цели на сегодня")}
        </div>
      </div>
      {isToday ? (
        <>
          {tasks
            .filter((el) => el.date_start.split(" ")[0] === new Date().toISOString().split("T")[0])
            .map((task, i) => (
              <TaskItem key={task.id} task={task} number={i + 1} />
            ))}
        </>
      ) : (
        <>
          {tasks
            .filter((el) => el.id_act === URGENCY_TYPES.URGENT)
            .map((task, i) => (
              <TaskItem key={task.id} task={task} number={i + 1} />
            ))}
          <div className={classNames(styles.toggleItem, { [styles.active]: isToday })} onClick={handleToggle}>
            {__("Плановые задачи")}
          </div>
          {tasks
            .filter((el) => el.id_act === URGENCY_TYPES.PLANNED)
            .map((task, i) => (
              <TaskItem key={task.id} task={task} number={i + 1} />
            ))}
        </>
      )}
    </div>
  );
};

export default TasksLine;

TasksLine.propTypes = {
  tasks: PropTypes.arrayOf(taskTypes)
};
