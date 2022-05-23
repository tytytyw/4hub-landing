import React from "react";
import styles from "./AddNote.module.sass";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { addNoteParams } from "../../../../../../../types/Tasks";

function AddNote() {
  const { Type, params } = useSelector((s) => s.Cabinet.modals.taskModals);

  console.log(params);
  return (
    <div className={styles.addNoteWrap}>
      <SubmitButtons type={Type} />
    </div>
  );
}

export default AddNote;

AddNote.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: addNoteParams.isRequired
};
