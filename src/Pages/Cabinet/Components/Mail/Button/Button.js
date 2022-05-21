import React from "react";
import { useSelector } from "react-redux";
import styles from "./Button.module.sass";
import PropTypes from "prop-types";
import classnames from "classnames";

function Button({ children, icon, onClick }) {
  const { theme } = useSelector((state) => state.user.userInfo);

  const renderIcon = () => {
    return icon ? (
      <div className={styles.icon}>
        <img src={`./assets/PrivateCabinet/${icon}`} alt="img" />
      </div>
    ) : null;
  };

  return (
    <div className={classnames(styles.button, `standard-button button-${theme}`)} onClick={onClick}>
      {children} {renderIcon()}
    </div>
  );
}

export default Button;

Button.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func
};
