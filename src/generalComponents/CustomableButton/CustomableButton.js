import React from "react";
import styles from "./CustomableButton.module.sass";
import PropTypes from "prop-types";
import { BUTTON_TYPES } from "../globalVariables";
import classNames from "classnames";
import { useSelector } from "react-redux";

function Button({ children, style, onClick, isSelected }) {
  const { theme } = useSelector((s) => s.user.userInfo);

  const renderLightButton = () => {
    return (
      <div
        className={classNames(
          styles.buttonLight,
          styles[style],
          `button-light-${theme}`,
          isSelected ? styles.active : ""
        )}
        onClick={onClick}
      >
        {children}
      </div>
    );
  };

  const renderButton = () => {
    return (
      <div className={classNames(styles.button, styles[style], `button-${theme}`)} onClick={onClick}>
        {children}
      </div>
    );
  };

  const renderIcon = () => {
    return (
      <div className={classNames(styles[style])} onClick={onClick}>
        {children}
      </div>
    );
  };

  const renderSwitch = (style) => {
    switch (style) {
      case BUTTON_TYPES.LIGHT_LONG:
        return renderLightButton();
      case BUTTON_TYPES.ICON:
        return renderIcon();
      default:
        return renderButton();
    }
  };

  return <>{renderSwitch(style)}</>;
}

export default Button;

Button.defaultProps = {
  onClick: () => {},
  typeButton: ""
};

Button.propTypes = {
  children: PropTypes.node.isRequired, //could be anything to render inside
  style: PropTypes.oneOf(Object.values(BUTTON_TYPES)).isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool
};
