import React from "react";
import styles from "./MyTasks.moudule.sass";
import TaskTabs from "./TaskTabs/TaskTabs";

function MyTasks() {
  return (
    <div className={styles.myTasksWrap}>
      <TaskTabs taskTabs={["Design Tasks", "Office"]} />
    </div>
  );
}

export default MyTasks;
