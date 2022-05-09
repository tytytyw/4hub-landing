import classNames from "classnames";
import React from "react";
import styles from "./TextButton.module.sass";
import PropTypes from "prop-types";

const TextButton = ({ text, type, callback, disabled, style }) => {
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
  style: PropTypes.exact({
    width: PropTypes.number,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    color: PropTypes.string
  })
};

TextButton.defaultProps = {
  text: "",
  type: "ok" || "cancel",
  callback: () => {},
  disabled: false,
  style: {}
};
