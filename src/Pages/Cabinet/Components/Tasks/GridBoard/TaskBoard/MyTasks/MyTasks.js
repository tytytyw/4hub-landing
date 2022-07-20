import React from "react";
import PropTypes from "prop-types";
import styles from "./MyTasks.module.sass";
import TasksLine from "./TasksLine/TasksLine";
import { taskTypes } from "types/Tasks";
import { endOfDay, getTime, startOfDay } from "date-fns";
import { useSelector } from "react-redux";

function MyTasks({ tasks }) {
  const isHistory = useSelector((s) => s.Tasks.isHistory);

  const chosenTask = !isHistory
    ? tasks
    : tasks.filter((item) => {
        const today = getTime(startOfDay(new Date()));
        const taskDateStart = getTime(startOfDay(new Date(item.date_start)));
        const taskDateEnd = item.date_end
          ? getTime(endOfDay(new Date(item.date_end)))
          : getTime(endOfDay(new Date(taskDateStart)));

        return today > taskDateEnd;
      });
  return (
    <div className={styles.myTasksWrap}>
      <TasksLine tasks={chosenTask} />
    </div>
  );
}

export default MyTasks;

MyTasks.propTypes = {
  tasks: PropTypes.arrayOf(taskTypes)
};
