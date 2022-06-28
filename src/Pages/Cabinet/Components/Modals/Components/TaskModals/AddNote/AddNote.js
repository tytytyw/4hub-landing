import React from "react";
import styles from "./AddNote.module.sass";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { MODALS, TASK_MODALS, TASK_TYPES } from "../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { taskTypes } from "../../../../../../../types/Tasks";
import { useDispatch } from "react-redux";
import { useLocales } from "react-localized";
import Colors from "../../../../../../../generalComponents/Elements/Colors";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import TagPicker from "../../../../../../../generalComponents/TagPicker/TagPicker";
import TextArea from "../../../../../../../generalComponents/TextArea/TextArea";
import { onAddNewTask, onEditTask } from "Store/actions/TasksActions";

function AddNote({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const onChangeColor = (id_color) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, id_color } }));
  };

  const onChangeTag = (tags) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, tags } }));
  };

  const onChangeText = (prim) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, prim } }));
  };

  const messagesAdd = {
    error: __("Не удалось создать заметку"),
    success: __("Новая заметка создана")
  };
  const messagesEdit = {
    error: __("Не удалось изменить заметку"),
    success: __("Заметка изменена")
  };

  const onSubmit = () => {
    const payload = {
      text: params.prim,
      color: params.id_color,
      tagOption: params.tags,
      eventType: TASK_TYPES.NOTES,
      idTask: params.id,
      name: "note"
    };
    type === TASK_MODALS.ADD_NOTE
      ? dispatch(onAddNewTask(payload, messagesAdd))
      : dispatch(onEditTask(payload, messagesEdit));
  };

  return (
    <div className={styles.addNoteWrap}>
      <TagPicker tag={params.tags} onSelectTag={onChangeTag} />
      <div className={styles.margin} />
      <Colors title={__("Выберите цвет Заметки")} color={params.id_color} setColor={onChangeColor} />
      <TextArea text={params.prim} onChange={onChangeText} placeholder={__("Текст заметки")} />
      <SubmitButtons type={type} closeModal={closeModal} onSubmit={onSubmit} />
    </div>
  );
}

export default AddNote;

AddNote.defaultProps = {
  closeModal: () => {}
};

AddNote.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: taskTypes,
  closeModal: PropTypes.func
};
