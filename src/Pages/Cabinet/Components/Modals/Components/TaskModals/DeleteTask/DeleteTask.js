import React from "react";
import PropTypes from "prop-types";
import styles from "./DeleteTask.module.sass";
import { useLocales } from "react-localized";
import { useDispatch, useSelector } from "react-redux";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { onDeleteTask, onSetModals } from "Store/actions/CabinetActions";
import { MODALS } from "generalComponents/globalVariables";

function DeleteTask({ closeModal, type }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const { taskChoosen } = useSelector((s) => s.Cabinet.modals.taskModals);

  const deleteTask = async () => {
    dispatch(onDeleteTask(taskChoosen.id, __("Задача успешно удалена"), __("Ошибка при удалении задачи")));
    dispatch(onSetModals(MODALS.LOADER, true));
    closeModal();
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
