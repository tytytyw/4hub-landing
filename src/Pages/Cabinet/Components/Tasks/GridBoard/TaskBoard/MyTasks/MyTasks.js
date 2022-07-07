import React from "react";
import PropTypes from "prop-types";
import styles from "./MyTasks.module.sass";
import TasksLine from "./TasksLine/TasksLine";
import { taskTypes } from "types/Tasks";

function MyTasks({ tasks }) {
  return (
    <div className={styles.myTasksWrap}>
      <TasksLine tasks={tasks} />
    </div>
  );
}

export default MyTasks;

MyTasks.propTypes = {
  tasks: PropTypes.arrayOf(taskTypes)
};
