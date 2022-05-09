import React from "react";
import PropTypes from "prop-types";
import styles from "./ContextMenuItem.module.sass";

const ContextMenuItem = ({ width, height, color, text, imageSrc, callback }) => {
  console.log(color);
  return (
    <div
      className={styles.itemWrap}
      style={{ width, height, color }}
      onClick={() => {
        if (callback) callback();
      }}
    >
      {imageSrc ? <img src={imageSrc} alt="img" /> : <div style={{ width: "10px" }} />}
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default ContextMenuItem;

ContextMenuItem.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string,
  text: PropTypes.string,
  imageSrc: PropTypes.string,
  callback: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
