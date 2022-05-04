import React from "react";

import styles from "./FourHUB.module.sass";

const Loader = ({ type, position, background, width, height, zIndex, containerType = "", animation = true }) => {
  return (
    <div
      className={styles.loaderWrap}
      style={{
        position: `${position ?? "fixed"}`,
        background: `${background ?? "rgba(0, 0, 0, 0.95)"}`,
        zIndex: `${zIndex ?? 10000}`,
        animation: animation ? "darkening 1s ease-in-out" : ""
      }}
    >
      <div
        className={styles[containerType + "container"]}
        style={{
          width: `${width ?? "500px"}`,
          height: `${height ?? "500px"}`
        }}
      >
        <div className={`${styles.greenSquare} ${styles[type + "Green"]}`} />
        <div className={`${styles.yellowSquareFirst} ${styles[type + "First"]}`} />
        <div className={`${styles.yellowSquareSecond} ${styles[type + "Second"]}`} />
        <div className={`${styles.yellowSquareThird} ${styles[type + "Third"]}`} />
      </div>
    </div>
  );
};

export default Loader;
