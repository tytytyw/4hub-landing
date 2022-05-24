import React from "react";
import styles from "./AddNote.module.sass";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { MODALS, TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { addNoteParams } from "../../../../../../../types/Tasks";
import { useDispatch } from "react-redux";
import { useLocales } from "react-localized";
import Colors from "../../../../../../../generalComponents/Elements/Colors";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import TagPicker from "../../../../../../../generalComponents/TagPicker/TagPicker";
import TextArea from "../../../../../../../generalComponents/TextArea/TextArea";

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

  return (
    <div className={styles.addNoteWrap}>
      <TagPicker tag={params.tag} onSelectTag={onChangeTag} />
      <Colors title={__("Выберите цвет Заметки")} color={params.color} setColor={onChangeColor} />
      <TextArea text={params.text} onChange={onChangeText} placeholder={__("Текст заметки")} />
      <SubmitButtons type={type} closeModal={closeModal} />
    </div>
  );
}

export default AddNote;

AddNote.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: addNoteParams.isRequired,
  closeModal: PropTypes.func
};
