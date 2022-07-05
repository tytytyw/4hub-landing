import React from "react";
import styles from "./MeetingNote.module.sass";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { TaskFields, TASK_MODALS, TASK_TYPES } from "../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { taskTypes } from "../../../../../../../types/Tasks";
import { useDispatch } from "react-redux";
import { useLocales } from "react-localized";
import TextArea from "../../../../../../../generalComponents/TextArea/TextArea";
import { onEditTask } from "Store/actions/TasksActions";
import { useTaskMessages } from "generalComponents/collections";

function MeetingNote({ type, params, closeModal, onChangeField }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const messages = useTaskMessages();

  const onSubmit = () => {
    dispatch(onEditTask(params, messages[TASK_TYPES.MEETINGS][type]));
  };

  return (
    <div className={styles.addNoteWrap}>
      <TextArea
        text={params.prim}
        onChange={(value) => onChangeField(TaskFields.PRIM, value)}
        placeholder={__("Текст заметки")}
      />
      <SubmitButtons type={type} closeModal={closeModal} onSubmit={onSubmit} />
    </div>
  );
}

export default MeetingNote;

MeetingNote.defaultProps = {
  closeModal: () => {}
};

MeetingNote.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: taskTypes,
  closeModal: PropTypes.func,
  onChangeField: PropTypes.func
};
