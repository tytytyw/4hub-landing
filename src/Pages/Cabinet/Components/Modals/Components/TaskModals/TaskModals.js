import React from "react";
import styles from "./TaskModals.module.sass";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../../../../../generalComponents/PopUp";
import { MODALS, TASK_MODALS } from "../../../../../../generalComponents/globalVariables";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { useTaskModalTitles } from "../../../../../../generalComponents/collections";
import AddNote from "./AddNote/AddNote";
import EditTask from "./EditTask/EditTask";
import EditMeeting from "./EditMeeting/EditMeeting";
import EditCall from "./EditCall/EditCall";
import EditLetter from "./EditLetter/EditLetter";
import EditSection from "./EditSection/EditSection";
import DeleteSection from "./DeleteSection/DeleteSection";
import DeleteTask from "./DeleteTask/DeleteTask";
import OpenTask from "./OpenTask/OpenTask";

function TaskModals() {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
  const { type, params, choosenTask } = useSelector((s) => s.Cabinet.modals.taskModals);

  const TITLES = useTaskModalTitles();
  return (
    <PopUp set={closeModal}>
      <form
        className={styles.taskModalsWrap}
        style={{
          width: params.width ?? 420
        }}
      >
        <header className={styles.header}>
          <button className={styles.button} onClick={closeModal}>
            <span className={styles.cross} />
          </button>
          <span className={styles.title}>{TITLES[type]}</span>
        </header>
        {(type === TASK_MODALS.ADD_NOTE || type === TASK_MODALS.EDIT_NOTE) && (
          <AddNote type={type} params={params} closeModal={closeModal} />
        )}
        {type === TASK_MODALS.ADD_TASK && <EditTask type={type} params={params} closeModal={closeModal} />}
        {type === TASK_MODALS.ADD_MEETING && <EditMeeting type={type} params={params} closeModal={closeModal} />}
        {type === TASK_MODALS.ADD_CALL && <EditCall type={type} params={params} closeModal={closeModal} />}
        {type === TASK_MODALS.ADD_LETTER && <EditLetter type={type} params={params} closeModal={closeModal} />}
        {(type === TASK_MODALS.ADD_SECTION || type === TASK_MODALS.EDIT_SECTION) && (
          <EditSection type={type} params={params} closeModal={closeModal} />
        )}
        {type === TASK_MODALS.DELETE_SECTION && <DeleteSection closeModal={closeModal} icon={params.icon} />}
        {type === TASK_MODALS.DELETE_TASK && <DeleteTask type={type} closeModal={closeModal} />}
        {type === TASK_MODALS.OPEN_TASK && (
          <OpenTask type={type} params={params} closeModal={closeModal} task={choosenTask} />
        )}
      </form>
    </PopUp>
  );
}

export default TaskModals;
