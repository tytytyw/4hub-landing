import React from 'react';
import PopUp from "../../../../../../generalComponents/PopUp";
import {onSetPaint} from "../../../../../../Store/actions/CabinetActions";
import {useDispatch} from "react-redux";

function ColorPicker() {

    const dispatch = useDispatch();

    const close = () => {
        dispatch(onSetPaint('tool', undefined));
    }

    return(
        <PopUp set={close}>
            <input type="color" onChange={e => console.log(e)}/>
        </PopUp>
    )
}

export default ColorPicker;