import { TASK_TYPES } from "generalComponents/globalVariables";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./MyTasks.module.sass";
import TasksLine from "./TasksLine/TasksLine";
import TaskTabs from "./TaskTabs/TaskTabs";

function MyTasks() {
  const tasks = useSelector((s) => s.Tasks.myTasks).filter((task) => task.id_type === TASK_TYPES.TASK);

  return (
    <div className={styles.myTasksWrap}>
      <TaskTabs taskTabs={["Design Tasks", "Office"]} isTasks={tasks.length > 0} />
      <TasksLine tasks={tasks} />
    </div>
  );
}

export default MyTasks;
