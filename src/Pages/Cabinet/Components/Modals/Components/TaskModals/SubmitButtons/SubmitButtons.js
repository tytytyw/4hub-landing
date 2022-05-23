import React from "react";
import styles from "./SubmitButtons.module.sass";
import PropTypes from "prop-types";
import { TASK_MODALS } from "../../../../../../../generalComponents/globalVariables";

function SubmitButtons({ type }) {
  return <div className={styles.submitButtonsWrap}></div>;
}

export default SubmitButtons;

SubmitButtons.defaultProps = {
  type: undefined
};

SubmitButtons.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_MODALS)).isRequired
};
