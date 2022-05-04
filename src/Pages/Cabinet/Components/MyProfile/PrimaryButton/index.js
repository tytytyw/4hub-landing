import React from "react";
import classnames from "classnames";
import styles from "../MyProfile.module.sass";
import PropTypes from "prop-types";

const PrimaryButton = ({ onClick, active, ...props }) => (
  <button
    type="button"
    onClick={onClick}
    className={classnames({
      [styles.button]: true,
      [styles.active]: active
    })}
  >
    {props.text}
    {props.icon && <span className={styles.buttonIcon}>{props.icon}</span>}
  </button>
);

export default PrimaryButton;

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  active: PropTypes.bool,
  text: PropTypes.string,
  icon: PropTypes.object
};

PrimaryButton.defaultProps = {
  onClick: () => {},
  active: false
};
