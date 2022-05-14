import React from "react";
import styles from "./ThreeDots.module.sass";
import PropTypes from "prop-types";

function ThreeDots({ onClick }) {
  return (
    <div className={styles.menuWrap} onClick={onClick}>
      <span className={styles.menu} />
    </div>
  );
}

export default ThreeDots;

ThreeDots.defaultProps = {
  onClick: () => {}
};

ThreeDots.propTypes = {
  onClick: PropTypes.func
};
