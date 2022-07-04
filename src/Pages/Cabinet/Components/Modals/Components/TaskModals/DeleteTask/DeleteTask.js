import React from "react";
import PropTypes from "prop-types";
import styles from "./DeleteTask.module.sass";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";

import { onDeleteTask } from "Store/actions/TasksActions";
import { useTaskMessages } from "generalComponents/collections";
import { TASK_MODALS, TASK_TYPES } from "generalComponents/globalVariables";
import { taskTypes } from "types/Tasks";

function DeleteTask({ params, closeModal, type }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const messages = useTaskMessages();

  const deleteTask = () => {
    dispatch(onDeleteTask(params.id, messages[TASK_MODALS.DELETE_TASK]));
  };
  return (
    <>
      <div className={styles.deleteTaskText}>
        {params.id_type === TASK_TYPES.NOTES
          ? __(`Вы действительно хотите удалить выбранную заметку?`)
          : __(`Вы действительно хотите удалить задачу "${params.name}"?`)}
      </div>
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
  type: PropTypes.string,
  params: taskTypes
};
