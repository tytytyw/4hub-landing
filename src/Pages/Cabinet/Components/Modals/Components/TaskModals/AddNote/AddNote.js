import React from "react";
import styles from "./AddNote.module.sass";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { TaskFields, TASK_MODALS, TASK_TYPES } from "../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { taskTypes } from "../../../../../../../types/Tasks";
import { useDispatch } from "react-redux";
import { useLocales } from "react-localized";
import Colors from "../../../../../../../generalComponents/Elements/Colors";
import TagPicker from "../../../../../../../generalComponents/TagPicker/TagPicker";
import TextArea from "../../../../../../../generalComponents/TextArea/TextArea";
import { onAddNewTask, onEditTask } from "Store/actions/TasksActions";
import { useTaskMessages } from "generalComponents/collections";

function AddNote({ type, params, closeModal, onChangeField }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const messages = useTaskMessages();

  const onSubmit = () => {
    type === TASK_MODALS.ADD_NOTE
      ? dispatch(onAddNewTask(params, messages[TASK_TYPES.NOTES][type]))
      : dispatch(onEditTask(params, messages[TASK_TYPES.NOTES][type]));
  };

  return (
    <div className={styles.addNoteWrap}>
      <TagPicker tag={params.tags} onSelectTag={(value) => onChangeField(TaskFields.TAGS, value)} />
      <div className={styles.margin} />
      <Colors
        title={__("Выберите цвет Заметки")}
        color={params.id_color}
        setColor={(value) => onChangeField(TaskFields.ID_COLOR, value)}
      />
      <TextArea
        text={params.prim}
        onChange={(value) => onChangeField(TaskFields.PRIM, value)}
        placeholder={__("Текст заметки")}
      />
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
  closeModal: PropTypes.func,
  onChangeField: PropTypes.func
};
