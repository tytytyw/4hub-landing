import React from "react";
import PropTypes from "prop-types";
import styles from "./EditLetter.module.sass";
import { MODALS, TASK_MODALS, TASK_TYPES } from "../../../../../../../generalComponents/globalVariables";
import { taskTypes } from "../../../../../../../types/Tasks";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import InputField from "../../../../../../../generalComponents/InputField";
import TextArea from "../../../../../../../generalComponents/TextArea/TextArea";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { ReactComponent as ContactBookIcon } from "assets/PrivateCabinet/contact-book.svg";
import { onAddNewTask, onEditTask } from "Store/actions/TasksActions";

function EditLetter({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();

  const onChangeText = (prim) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, prim } }));
  };

  const onChangeTopic = (name) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, name } }));
  };

  const onChangeReceiver = (emails) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, emails } }));
  };

  const messagesAdd = {
    error: __("Не удалось создать звонок"),
    success: __("Новый звонок создан")
  };

  const messagesEdit = {
    error: __("Не удалось изменить звонок"),
    success: __("Звонок изменина")
  };

  const onSubmit = () => {
    const payload = {
      name: params.name,
      idTask: params.id,
      text: params.prim,
      emails: params.emails,
      eventType: TASK_TYPES.MAILS
    };
    type === TASK_MODALS.ADD_LETTER
      ? dispatch(onAddNewTask(payload, messagesAdd))
      : dispatch(onEditTask(payload, messagesEdit));
  };

  return (
    <div className={styles.editLetterWrap}>
      <InputField
        model="text"
        value={params.topic}
        set={onChangeTopic}
        placeholder={__("Тема письма")}
        editableClass={"fixedHeight"}
      />
      <div className={styles.margin} />
      <InputField
        model="text"
        value={params.receiver}
        set={onChangeReceiver}
        placeholder={__("Получатель")}
        editableClass={"fixedHeight"}
        icon={<ContactBookIcon className={styles.contactIcon} />}
      />
      <div className={styles.margin} />
      <TextArea text={params.prim} onChange={onChangeText} placeholder={__("Текст письма")} />
      <div className={styles.margin} />
      <SubmitButtons type={type} closeModal={closeModal} onSubmit={onSubmit} />
    </div>
  );
}

export default EditLetter;

EditLetter.defaultProps = {
  closeModal: () => {}
};

EditLetter.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: taskTypes,
  closeModal: PropTypes.func
};
