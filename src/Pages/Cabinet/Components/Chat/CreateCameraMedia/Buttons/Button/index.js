import classNames from "classnames";
import React from "react";
import styles from "./Button.module.sass";
import PropTypes from "prop-types";

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
  hoverEffect = false
}) => {
  return (
    <div
      onMouseUp={clickCallback ? clickCallback : null}
      onMouseDown={mouseDownCallback ? mouseDownCallback : null}
      className={classNames({
        [styles.wrapper]: true,
        [styles.recording]: mouseDownCallback && isRecording,
        [styles.hoverEffect]: hoverEffect
      })}
      style={{
        width,
        height,
        backgroundColor: !isRecording ? backgroundColor : "#EB1F1F",
        borderRadius,
        boxShadow: boxShadow ?? ""
      }}
    >
      <div
        className={classNames(styles.childrenWrapper, styles[childrenColor])}
      >
        {children}
      </div>
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
  hoverEffect: false
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
  hoverEffect: PropTypes.bool
};
