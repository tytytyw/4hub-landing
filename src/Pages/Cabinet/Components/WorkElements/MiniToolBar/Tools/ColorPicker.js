import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../../../../../generalComponents/Hooks";
import { hexToRgbA } from "../../../../../../generalComponents/generalHelpers";
import { onSetPaint } from "../../../../../../Store/actions/CabinetActions";
import PropTypes from "prop-types";

function ColorPicker({ colorPickerRef }) {
  const dispatch = useDispatch();
  const tool = useSelector((state) => state.Cabinet.paint.tool);

  const setStrokeColorOpacity = (value) => {
    dispatch(onSetPaint("color", `rgba(${hexToRgbA(value)},1)`));
    if (tool.name === "pencil") return (tool.strokeStyle = `rgba(${hexToRgbA(value)},1)`);
    if (tool.name === "marker") return (tool.strokeStyle = `rgba(${hexToRgbA(value)},0.2)`);
    return (tool.strokeStyle = value);
  };
  const setColor = (value) => {
    setStrokeColorOpacity(value);
  };
  const debounceCallback = useDebounce(setColor, 200);
  const handleChangeColor = (e) => debounceCallback(e.target.value);

  return (
    <input
      style={{
        position: "absolute",
        visibility: "hidden",
        left: -12,
        bottom: 0
      }}
      ref={colorPickerRef}
      type="color"
      onChange={handleChangeColor}
    />
  );
}

export default ColorPicker;

ColorPicker.propTypes = {
  colorPickerRef: PropTypes.objectOf(PropTypes.object)
};
