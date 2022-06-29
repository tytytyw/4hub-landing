import React from "react";
import PropTypes from "prop-types";
import styles from "./DeleteTask.module.sass";
import { useLocales } from "react-localized";
import { useDispatch, useSelector } from "react-redux";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";

import { onDeleteTask } from "Store/actions/TasksActions";
import { useTaskMessages } from "generalComponents/collections";
import { TASK_MODALS } from "generalComponents/globalVariables";

function DeleteTask({ closeModal, type }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const messages = useTaskMessages();
  const { taskChoosen } = useSelector((s) => s.Cabinet.modals.taskModals);

  const deleteTask = () => {
    dispatch(onDeleteTask(taskChoosen.id, messages[TASK_MODALS.DELETE_TASK]));
  };

  return (
    <>
      <div className={styles.deleteTaskText}>{__(`Вы действительно хотите удалить задачу "${taskChoosen.name}"?`)}</div>
      <SubmitButtons type={type} closeModal={closeModal} onSubmit={deleteTask} />
    </>
  );
}

export default DeleteTask;

DeleteTask.defaultProps = {
  closeModal: () => {}
};

DeleteTask.propTypes = {
  closeModal: PropTypes.func,
  type: PropTypes.string
};
