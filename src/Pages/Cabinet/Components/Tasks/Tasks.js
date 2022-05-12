import React from "react";
import styles from "./Tasks.module.sass";
import Header from "./Header/Header";
import Notes from "./Notes/Notes";

function Tasks() {
  return (
    <div className={styles.taskWrap}>
      <Header />
      <Notes />
    </div>
  );
}

export default Tasks;
