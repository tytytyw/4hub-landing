import React from "react";
import styles from "./Tasks.module.sass";
import Header from "./Header/Header";
import Notes from "./Notes/Notes";
import ManagementPanel from "./ManagementPanel/ManagementPanel";
import BreadCrumbs from "../../../../generalComponents/BreadCrumbs/BreadCrumbs";

function Tasks() {
  return (
    <div className={styles.taskWrap}>
      <Header />
      <Notes />
      <ManagementPanel />
      <BreadCrumbs path={["Рабочие задачи", "TEST", "PATH"]} />
      <div className={styles.workSpace}>
        <div className={styles.thinColumn}></div>
      </div>
    </div>
  );
}

export default Tasks;
