import React from "react";
import styles from "./AddNote.module.sass";
import SubmitButtons from "../SubmitButtons/SubmitButtons";
import { TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { addNoteParams } from "../../../../../../../types/Tasks";

function AddNote({ type, params }) {
  console.log(params);
  return (
    <div className={styles.addNoteWrap}>
      <SubmitButtons type={type} />
    </div>
  );
}

export default AddNote;

AddNote.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: addNoteParams.isRequired
};
