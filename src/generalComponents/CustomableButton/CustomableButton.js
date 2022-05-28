import React from "react";
import styles from "./CustomableButton.module.sass";
import PropTypes from "prop-types";
import { BUTTON_TYPES } from "../globalVariables";
import classNames from "classnames";
import { useSelector } from "react-redux";

function Button({ children, style, onClick, light }) {
  const { theme } = useSelector((s) => s.user.userInfo);
  return (
    <>
      {light ? (
        <div className={classNames(styles.buttonLight, styles[style], `button-light-${theme}`)} onClick={onClick}>
          {children}
        </div>
      ) : (
        <div className={classNames(styles.button, styles[style], `button-${theme}`)} onClick={onClick}>
          {children}
        </div>
      )}
    </>
  );
}

export default Button;

Button.defaultProps = {
  onClick: () => {},
  light: false
};

Button.propTypes = {
  children: PropTypes.node.isRequired, //could be anything to render inside
  style: PropTypes.oneOf(Object.values(BUTTON_TYPES)).isRequired,
  onClick: PropTypes.func,
  light: PropTypes.bool
};
