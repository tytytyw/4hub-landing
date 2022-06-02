import React from "react";
import styles from "./CustomableButton.module.sass";
import PropTypes from "prop-types";
import { BUTTON_TYPES } from "../globalVariables";
import classNames from "classnames";
import { useSelector } from "react-redux";

function Button({ children, style, onClick, typeButton }) {
  const { theme } = useSelector((s) => s.user.userInfo);

  const renderLightButton = () => {
    return (
      <div className={classNames(styles.buttonLight, styles[style], `button-light-${theme}`)} onClick={onClick}>
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
      <div className={classNames(styles[typeButton])} onClick={onClick}>
        {children}
      </div>
    );
  };

  const renderSwitch = (typeButton) => {
    switch (typeButton) {
      case BUTTON_TYPES.LIGHT_LONG:
        return renderLightButton();
      case BUTTON_TYPES.ICON:
        return renderIcon();
      default:
        return renderButton();
    }
  };

  return <>{renderSwitch(typeButton)}</>;
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
  typeButton: PropTypes.string
};
