import React from "react";

import styles from "./ContextMenuItem.module.sass";

const ContextMenuItem = ({
  width,
  height,
  color,
  text,
  imageSrc,
  callback
}) => {
  return (
    <div
      className={styles.itemWrap}
      style={{ width, height, color }}
      onClick={() => {
        if (callback) callback();
      }}>
      {imageSrc ? (
        <img src={imageSrc} alt="img" />
      ) : (
        <div style={{ width: "10px" }} />
      )}
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default ContextMenuItem;
