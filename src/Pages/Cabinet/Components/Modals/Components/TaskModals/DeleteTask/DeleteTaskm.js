import React from "react";
import PropTypes from "prop-types";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";
import ActionApproval from "generalComponents/ActionApproval";
import styles from "../../../../MyFolders/WorkSpace/WorkSpace.module.sass";
import { onDeleteTask } from "Store/actions/TasksActions";

const DeleteTask = ({ closeModal, name }) => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const deleteTask = () => {
    // ?TODO -mk- добавить айдишник и проверить модалки
    dispatch(onDeleteTask(92));
  };

  return (
    <ActionApproval
      name={__("Удаление задачи")}
      text={__(`Вы действительно хотите удалить задачу ${name}?`)}
      set={closeModal}
      callback={deleteTask}
      approve={__("Удалить")}
    >
      <div className={styles.fileActionWrapr}></div>
    </ActionApproval>
  );
};

export default DeleteTask;

DeleteTask.propTypes = {
  closeModal: PropTypes.func,
  name: PropTypes.string
};
