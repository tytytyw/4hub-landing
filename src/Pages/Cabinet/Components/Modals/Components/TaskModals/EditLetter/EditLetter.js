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
import { useTaskMessages } from "generalComponents/collections";

function EditLetter({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const messages = useTaskMessages();

  const onChangeText = (prim) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, prim } }));
  };

  const onChangeTopic = (name) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, name } }));
  };

  const onChangeReceiver = (emails) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, emails } }));
  };

  const onSubmit = () => {
    type === TASK_MODALS.ADD_LETTER
      ? dispatch(onAddNewTask(params, messages[TASK_TYPES.MAILS][type]))
      : dispatch(onEditTask(params, messages[TASK_TYPES.MAILS][type]));
  };

  return (
    <div className={styles.editLetterWrap}>
      <InputField
        model="text"
        value={params.name}
        set={onChangeTopic}
        placeholder={__("Тема письма")}
        editableClass={"fixedHeight"}
      />
      <div className={styles.margin} />
      <InputField
        model="text"
        value={params.emails}
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
