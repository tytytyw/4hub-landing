import React from "react";
import styles from "./CustomableButton.module.sass";
import PropTypes from "prop-types";
import { BUTTON_TYPES } from "../globalVariables";
import classNames from "classnames";
import { useSelector } from "react-redux";

function Button({ children, style }) {
  const { theme } = useSelector((s) => s.user.userInfo);

  return <div className={classNames(styles[style], `button-light-${theme}`)}>{children}</div>;
}

export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired, //could be anything to render inside
  style: PropTypes.oneOf(Object.values(BUTTON_TYPES)).isRequired
};
