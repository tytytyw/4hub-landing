import React, { useEffect } from "react";
import styles from "./SuccessMessage.module.sass";
import PropTypes from "prop-types";

//Deprecated
//TODO - Needs to be replaced with dispatch
function SuccessMessage({ showSuccessMessage, setShowSuccessMessage }) {
  useEffect(() => {
    setTimeout(() => setShowSuccessMessage(false), 3000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.wrap}>
      <div className={styles.message}>{showSuccessMessage}</div>
    </div>
  );
}

export default SuccessMessage;

SuccessMessage.propTypes = {
  showSuccessMessage: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setShowSuccessMessage: PropTypes.func
};
