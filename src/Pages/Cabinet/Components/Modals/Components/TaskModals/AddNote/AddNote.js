import React from "react";
import styles from "./AddNote.module.sass";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { MODALS, TASK_MODALS, TASK_TYPES } from "../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { addNoteParams } from "../../../../../../../types/Tasks";
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

  const onChangeColor = (color) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, color } }));
  };

  const onChangeTag = (tag) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, tag } }));
  };

  const onChangeText = (text) => {
    dispatch(onSetModals(MODALS.TASKS, { type, params: { ...params, text } }));
  };

  const onSubmit = () => {
    const payload = {
      text: params.text,
      color: params.color,
      tagOption: params.tag,
      eventType: TASK_TYPES.NOTES,
      name: "note"
    };
    console.log("first", type);
    type === TASK_MODALS.ADD_NOTE
      ? dispatch(onAddNewTask(payload, __("Не удалось создать заметку")))
      : dispatch(onEditTask(payload, __("Не удалось изменить заметку")));
  };

  return (
    <div className={styles.addNoteWrap}>
      <TagPicker tag={params.tag} onSelectTag={onChangeTag} />
      <div className={styles.margin} />
      <Colors title={__("Выберите цвет Заметки")} color={params.color} setColor={onChangeColor} />
      <TextArea text={params.text} onChange={onChangeText} placeholder={__("Текст заметки")} />
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
  params: addNoteParams.isRequired,
  closeModal: PropTypes.func
};
