import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import canvasTxt from "canvas-txt";
import Pencil from "./Pencil";
import PropTypes from "prop-types";

function TextDraw({ canvas, onFinishDraw, addTool }) {
  const textBlockRef = useRef();
  const [params, setParams] = useState({
    text: "Text",
    move: false,
    widthDif: 0,
    heightDif: 0,
    sizeChange: false,
    positionX: "50%",
    positionY: "50%"
  });
  const paint = useSelector((s) => s.Cabinet.paint);

  const handleTextAreaChange = (e) => setParams((s) => ({ ...s, text: e.target.value }));

  const handleKeyPress = () => {
    if (textBlockRef.current.offsetHeight + 3 < textBlockRef.current.scrollHeight) {
      textBlockRef.current.style.height = textBlockRef.current.scrollHeight + 5 + "px";
    }
  };

  const handleMouseDown = (e) => {
    if (
      !(e.pageX + 18 > e.target.getBoundingClientRect().right) &&
      !(e.pageY + 18 > e.target.getBoundingClientRect().bottom)
    ) {
      const widthDif = e.pageX - e.target.getBoundingClientRect().x;
      const heightDif = e.pageY - e.target.getBoundingClientRect().y;

      window.onmousemove = (e) => {
        setParams((s) => ({
          ...s,
          positionX: e.pageX - widthDif,
          positionY: e.pageY - heightDif
        }));
      };
      window.onmouseup = () => {
        window.onmousemove = null;
        window.onmouseup = null;
      };
    }
  };

  useEffect(() => {
    canvas.onmousedown = async () => {
      await onFinishDraw(canvas.toDataURL());
      await drawText(canvas, textBlockRef);
      addTool(Pencil);
    };
    return () => {
      canvas.onmousedown = null;
    };
  }, [paint]); //eslint-disable-line

  const drawText = async (canvas, textBlockRef) => {
    const ctx = canvas ? canvas.getContext("2d") : null;
    ctx.fillStyle = paint.color;
    canvasTxt.align = "left";
    canvasTxt.vAlign = "top";
    canvasTxt.font = "Arial, sans-serif";
    canvasTxt.lineHeight = paint.size + 5;
    canvasTxt.fontSize = paint.size + 5;
    canvasTxt.drawText(
      ctx,
      textBlockRef.current.value,
      textBlockRef.current.offsetLeft - canvas.getBoundingClientRect().left + 3,
      textBlockRef.current.offsetTop - canvas.getBoundingClientRect().top + 2,
      textBlockRef.current.clientWidth - 4,
      textBlockRef.current.clientHeight - 4
    );
  };

  return (
    <textarea
      ref={textBlockRef}
      onMouseDown={handleMouseDown}
      value={params.text}
      onChange={handleTextAreaChange}
      onKeyPress={handleKeyPress}
      style={{
        color: paint.color,
        fontSize: `${paint.size + 5}px`,
        lineHeight: `${paint.size + 5}px`,
        background: "none",
        position: "fixed",
        top: params.positionY,
        left: params.positionX,
        zIndex: 3,
        cursor: params.move ? "move" : "text",
        fontFamily: "Arial, sans-serif"
      }}
    />
  );
}

export default TextDraw;
TextDraw.propTypes = {
  canvas: PropTypes.any,
  onFinishDraw: PropTypes.func,
  addTool: PropTypes.func
};
