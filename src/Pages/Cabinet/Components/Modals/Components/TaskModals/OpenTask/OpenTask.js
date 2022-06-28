import React from "react";
import PropTypes from "prop-types";
import { TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";
import { editMeetingParams } from "../../../../../../../types/Tasks";
import { eventProps } from "types/CalendarPage";

function OpenTask({ task }) {
  return <>{task.name}</>;
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
