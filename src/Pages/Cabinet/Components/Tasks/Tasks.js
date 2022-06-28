import React, { useEffect, useState } from "react";
import styles from "./Tasks.module.sass";
import Header from "./Header/Header";
import Notes from "./Notes/Notes";
import ManagementPanel from "./ManagementPanel/ManagementPanel";
import BreadCrumbs from "../../../../generalComponents/BreadCrumbs/BreadCrumbs";
import GridBoard from "./GridBoard/GridBoard";
import BottomPanel from "../BottomPanel";
import { useDispatch, useSelector } from "react-redux";
import { onGetAllTasks } from "Store/actions/TasksActions";
import ContextMenu from "generalComponents/ContextMenu";
import { useContextMenuTasks } from "generalComponents/collections";
import ContextMenuItem from "generalComponents/ContextMenu/ContextMenuItem";
import { contextMenuTask, imageSrc, MODALS, TASK_MODALS } from "generalComponents/globalVariables";
import { onSetModals } from "Store/actions/CabinetActions";

function Tasks() {
  const [mouseParams, setMouseParams] = useState(null);
  const contextMenu = useContextMenuTasks();
  const chosenTask = useSelector((s) => s.Tasks.chosenTask);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetAllTasks());
  }, []); //eslint-disable-line

  const callbacks = {
    [contextMenuTask.DELETE]: () => {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.DELETE_TASK,
          taskChoosen: chosenTask,
          params: { width: 420, name: chosenTask.name }
        })
      );
    },

    [contextMenuTask.CUSTOMIZE]: () => {
      console.log(chosenTask);
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.EDIT_TASK,
          params: { width: 420, ...chosenTask }
        })
      );
    }
  };

  return (
    <div className={styles.taskWrap}>
      <Header />
      <Notes setMouseParams={setMouseParams} />
      <ManagementPanel />
      <BreadCrumbs path={["Рабочие задачи", "TEST", "PATH"]} />
      <GridBoard setMouseParams={setMouseParams} />
      <BottomPanel />
      {mouseParams !== null && (
        <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
          <div className={styles.mainMenuItems}>
            {contextMenu.map((item, i) => (
              <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={callbacks[item.type]}
                imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
              />
            ))}
          </div>
        </ContextMenu>
      )}
    </div>
  );
}

export default Tasks;
