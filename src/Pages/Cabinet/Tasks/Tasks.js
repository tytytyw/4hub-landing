import React from "react";
import styles from "./Tasks.module.sass";
import Header from "./Header/Header";

function Tasks() {
  return (
    <div className={styles.taskWrap}>
      <Header />
    </div>
  );
}

export default Tasks;
