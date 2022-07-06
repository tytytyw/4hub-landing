import React, { useEffect } from "react";
import styles from "./Tasks.module.sass";
import Header from "./Header/Header";
import Notes from "./Notes/Notes";
import ManagementPanel from "./ManagementPanel/ManagementPanel";
import BreadCrumbs from "../../../../generalComponents/BreadCrumbs/BreadCrumbs";
import GridBoard from "./GridBoard/GridBoard";
import BottomPanel from "../BottomPanel";
import { useDispatch } from "react-redux";
import { onGetAllTasks } from "Store/actions/TasksActions";
import { useLocales } from "react-localized";

function Tasks() {
  const { __ } = useLocales();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetAllTasks(__("Ошибка при получении задач")));
  }, []); //eslint-disable-line

  return (
    <div className={styles.taskWrap}>
      <Header />
      <Notes />
      <ManagementPanel />
      <BreadCrumbs path={["Рабочие задачи", "TEST", "PATH"]} />
      <GridBoard />
      <BottomPanel />
    </div>
  );
}

export default Tasks;
