import React, { useState } from "react";
import PropTypes from "prop-types";

const PopUp = (props) => {
  const [targetClick, setTargetClick] = useState("");

  const handleMouseDown = (e) => {
    setTargetClick(e.target.id);
  };

  const handleMouseUp = (e) => {
    if (e.target.id === "popUp" && e.target.id === targetClick) {
      setTargetClick("");
      props.set(false);
    }
  };

  return (
    <div
      id="popUp"
      style={{
        padding: props.padding ?? "20px 0",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `rgba(1, 1, 1, 0.5)`,
        zIndex: `${props.zIndex ? props.zIndex : 11}`
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          margin: "auto",
          width: "max-content",
          maxWidth: "max-content",
          height: "max-content",
          maxHeight: "max-content",
          borderRadius: "7px",
          color: "black",
          zIndex: `${(props.zIndex ? props.zIndex : 100) + 1}`,
          background: props?.background ? props.background : "white"
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default PopUp;

PopUp.propTypes = {
  set: PropTypes.func,
  padding: PropTypes.string,
  zIndex: PropTypes.number,
  background: PropTypes.string,
  children: PropTypes.element.isRequired
};
