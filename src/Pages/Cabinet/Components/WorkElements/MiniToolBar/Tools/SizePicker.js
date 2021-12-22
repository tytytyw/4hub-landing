import React, {useState} from 'react';
import {dotsPaint} from "../../../../../../generalComponents/collections";
import {useDispatch, useSelector} from "react-redux";
import {onSetPaint} from "../../../../../../Store/actions/CabinetActions";

const buttonStyles = {
    background: "white",
    minWidth: "max-content",
    width: 24,
    minHeight: "max-content",
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
}

function SizePicker() {

    const paint = useSelector(state => state.Cabinet.paint);
    const [params, setParams] = useState({open: false});
    const dispatch = useDispatch();

    return(
        <>
            {params.open && <div
                onMouseEnter={() => {setParams(state => ({...state, open: true}))}}
                onMouseLeave={() => {setParams(state => ({...state, open: false}))}}
                style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    position: "absolute",
                    background: 'white',
                    zIndex: 4,
                    right: 0,
                    top: 0,
                    height: dotsPaint.length * 24,
                    width: "max-content"

                }}
            >
                {params.open && dotsPaint.map((item, index) => (
                    <button
                        key={index}
                        style={{...buttonStyles}}
                        onClick={() => {
                            paint.tool.lineWidth = item.width;
                            dispatch(onSetPaint('size', item.width));
                            setParams(state => ({...state, open: false}));
                        }}
                    >
                            <span
                                style={{
                                    width: `${item?.width}px`,
                                    height: `${item?.width}px`,
                                    background: paint.color,
                                    borderRadius: '50%'
                                }}
                            />
                    </button>
                ))}
            </div>}

            <button
                style={{...buttonStyles}}
                onMouseEnter={() => {setParams(state => ({...state, open: true}))}}
                onMouseLeave={() => {setParams(state => ({...state, open: false}))}}
            >
                <span
                    style={{
                        background: paint.color,
                        borderRadius: '50%',
                        width: `${paint.size}px`,
                        height: `${paint.size}px`

                    }}
                />
            </button>

        </>
    )
}

export default SizePicker;