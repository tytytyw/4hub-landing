import React from "react";
import styles from "./CustomableButton.module.sass";
import PropTypes from "prop-types";
import { BUTTON_TYPES } from "../globalVariables";
import classNames from "classnames";
import { useSelector } from "react-redux";

function Button({ children, style, onClick }) {
  const { theme } = useSelector((s) => s.user.userInfo);

  return (
    <div className={classNames(styles[style], `button-light-${theme}`)} onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;

Button.defaultProps = {
  onClick: () => {}
};

Button.propTypes = {
  children: PropTypes.node.isRequired, //could be anything to render inside
  style: PropTypes.oneOf(Object.values(BUTTON_TYPES)).isRequired,
  onClick: PropTypes.func
};
