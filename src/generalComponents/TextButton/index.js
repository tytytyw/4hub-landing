import classNames from "classnames";
import React from "react";
import styles from "./TextButton.module.sass";
import PropTypes from "prop-types";

const TextButton = ({ text = "", type = "ok" || "cancel", callback = () => {}, disabled = false, style = {} }) => {
  return (
    <div
      onClick={callback}
      style={style}
      className={classNames({
        [styles.wrapper]: true,
        [styles[type]]: true,
        [styles.disabled]: disabled
      })}
    >
      {text}
    </div>
  );
};

export default TextButton;

TextButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  callback: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object
};
