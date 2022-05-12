import React from "react";
import styles from "./Tasks.module.sass";
import Header from "./Header/Header";
import Notes from "./Notes/Notes";
import ManagementPanel from "./ManagementPanel/ManagementPanel";

function Tasks() {
  return (
    <div className={styles.taskWrap}>
      <Header />
      <Notes />
      <ManagementPanel />
    </div>
  );
}

export default Tasks;
