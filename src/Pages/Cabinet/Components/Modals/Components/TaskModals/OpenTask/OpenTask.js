import React from "react";
import PropTypes from "prop-types";
import { TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import { editMeetingParams } from "../../../../../../../types/Tasks";
import styles from "./OpenTask.module.sass";
import { eventProps } from "types/CalendarPage";

function OpenTask({ type, params, closeModal, task }) {
  //mylog
  console.log(task);
  return <>OPEN TASK</>;
}

export default OpenTask;

OpenTask.defaultProps = {
  closeModal: () => {}
};

OpenTask.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired,
  params: editMeetingParams.isRequired,
  closeModal: PropTypes.func,
  task: eventProps
};
