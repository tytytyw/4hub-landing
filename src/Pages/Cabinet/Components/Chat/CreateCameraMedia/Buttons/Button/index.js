import classNames from "classnames";
import React from "react";
import styles from "./Button.module.sass";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Button = ({
  children,
  clickCallback = () => {},
  mouseDownCallback,
  isRecording,
  width = 0,
  height = 0,
  borderRadius = "2px",
  childrenColor = "black",
  backgroundColor = "#EDEDED",
  boxShadow = false,
  hoverEffect = false,
  active
}) => {
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);

  return (
    <div
      onMouseUp={clickCallback ? clickCallback : null}
      onMouseDown={mouseDownCallback ? mouseDownCallback : null}
      className={classNames({
        [styles.wrapper]: true,
        [styles.recording]: mouseDownCallback && isRecording,
        [styles.hoverEffect]: hoverEffect,
        [styles.active]: active,
        [styles.darkTheme]: chatTheme.name === "dark"
      })}
      style={{
        width,
        height,
        backgroundColor: !isRecording ? backgroundColor : "#EB1F1F",
        borderRadius,
        boxShadow: boxShadow ?? ""
      }}
    >
      <div className={classNames(styles.childrenWrapper, styles[childrenColor])}>{children}</div>
    </div>
  );
};

export default Button;

Button.defautProps = {
  clickCallback: () => {},
  width: 0,
  height: 0,
  borderRadius: "2px",
  childrenColor: "black",
  backgroundColor: "#EDEDED",
  boxShadow: false,
  hoverEffect: false,
  active: false
};

Button.propTypes = {
  children: PropTypes.any,
  clickCallback: PropTypes.func,
  mouseDownCallback: PropTypes.func,
  isRecording: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  borderRadius: PropTypes.string,
  childrenColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  boxShadow: PropTypes.string,
  hoverEffect: PropTypes.bool,
  active: PropTypes.bool
};
