import React from 'react';
import {useSelector} from "react-redux";
import {useDebounce} from "../../../../../../generalComponents/Hooks";
import {hexToRgbA} from "../../../../../../generalComponents/generalHelpers";

function ColorPicker({colorPickerRef}) {

    const tool = useSelector(state => state.Cabinet.paint.tool)

    const setStrokeColorOpacity = (value) => {
        if(tool.name === "pencil") return tool.strokeStyle = `rgba(${hexToRgbA(value)},1)`;
        if(tool.name === "marker") return tool.strokeStyle = `rgba(${hexToRgbA(value)},0.2)`;
        return tool.strokeStyle = value;
    }
    const setColor = value => {
        setStrokeColorOpacity(value)
    }
    const debounceCallback = useDebounce(setColor, 200);
    const handleChangeColor = e => debounceCallback(e.target.value);

    return(
            <input
                style={{position: 'absolute', visibility: 'hidden'}}
                ref={colorPickerRef}
                type="color"
                onChange={handleChangeColor}
            />
    )
}

export default ColorPicker;