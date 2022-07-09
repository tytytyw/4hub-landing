import React from "react";
import styles from "./TaskModals.module.sass";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../../../../../generalComponents/PopUp";
import { MODALS, TASK_MODALS, TASK_TYPES } from "../../../../../../generalComponents/globalVariables";
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
import MeetingNote from "./MeetingNote/MeetingNote";
import RescheduleOne from "./RescheduleMeeting/RescheduleOne";
import RescheduleAll from "./RescheduleMeeting/RescheduleAll";
import AddComments from "./AddComments/AddComments";

function TaskModals() {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
  const { type, params, choosenTask } = useSelector((s) => s.Cabinet.modals.taskModals);

  const TITLES = useTaskModalTitles();

  const onChangeField = (name, value) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, [name]: value } }));
  };

  const getEditTask = () => {
    switch (params.id_type) {
      case TASK_TYPES.NOTES:
        return <AddNote type={type} params={params} closeModal={closeModal} onChangeField={onChangeField} />;

      case TASK_TYPES.OFFLINE_MEETING:
      case TASK_TYPES.ONLINE_MEETING:
        return <EditMeeting type={type} params={params} closeModal={closeModal} onChangeField={onChangeField} />;

      case TASK_TYPES.CALLS:
        return <EditCall type={type} params={params} closeModal={closeModal} onChangeField={onChangeField} />;

      case TASK_TYPES.TASK:
        return <EditTask type={type} params={params} closeModal={closeModal} onChangeField={onChangeField} />;

      default:
        break;
    }
  };

  const getTitleEditTask = () => {
    switch (params.id_type) {
      case TASK_TYPES.OFFLINE_MEETING:
      case TASK_TYPES.ONLINE_MEETING:
        return TITLES[TASK_TYPES.MEETINGS];

      case TASK_TYPES.CALLS:
        return TITLES[TASK_TYPES.CALLS];

      case TASK_TYPES.NOTES:
        return TITLES[TASK_TYPES.NOTES];

      case TASK_TYPES.TASK:
        return TITLES[TASK_TYPES.TASK];

      default:
        break;
    }
  };

  const getTitle = () => {
    switch (type) {
      case TASK_MODALS.EDIT_TASK:
        return getTitleEditTask();

      default:
        return TITLES[type];
    }
  };
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
          <span className={styles.title}>{getTitle()}</span>
        </header>

        {type === TASK_MODALS.EDIT_TASK && getEditTask()}
        {type === TASK_MODALS.ADD_NOTE && (
          <AddNote type={type} params={params} closeModal={closeModal} onChangeField={onChangeField} />
        )}
        {type === TASK_MODALS.ADD_TASK && (
          <EditTask type={type} params={params} closeModal={closeModal} onChangeField={onChangeField} />
        )}
        {type === TASK_MODALS.ADD_MEETING && (
          <EditMeeting type={type} params={params} closeModal={closeModal} onChangeField={onChangeField} />
        )}
        {type === TASK_MODALS.ADD_CALL && (
          <EditCall type={type} params={params} closeModal={closeModal} onChangeField={onChangeField} />
        )}
        {type === TASK_MODALS.ADD_LETTER && (
          <EditLetter type={type} params={params} closeModal={closeModal} onChangeField={onChangeField} />
        )}
        {(type === TASK_MODALS.ADD_SECTION || type === TASK_MODALS.EDIT_SECTION) && (
          <EditSection type={type} params={params} closeModal={closeModal} />
        )}
        {type === TASK_MODALS.DELETE_SECTION && <DeleteSection closeModal={closeModal} icon={params.icon} />}
        {type === TASK_MODALS.DELETE_TASK && <DeleteTask type={type} closeModal={closeModal} params={params} />}
        {type === TASK_MODALS.OPEN_TASK && (
          <OpenTask type={type} params={params} closeModal={closeModal} task={choosenTask} />
        )}
        {type === TASK_MODALS.ADD_NOTE_TO_MEETING && (
          <MeetingNote type={type} closeModal={closeModal} params={params} onChangeField={onChangeField} />
        )}
        {type === TASK_MODALS.RESCHEDULE_ONE && (
          <RescheduleOne type={type} closeModal={closeModal} params={params} onChangeField={onChangeField} />
        )}
        {type === TASK_MODALS.RESCHEDULE_ALL && (
          <RescheduleAll type={type} closeModal={closeModal} params={params.chosenTasks} />
        )}
        {type === TASK_MODALS.ADD_COMMENT_TASK && <AddComments type={type} closeModal={closeModal} params={params} />}
      </form>
    </PopUp>
  );
}

export default TaskModals;
