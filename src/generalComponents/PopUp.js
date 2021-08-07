import React from 'react'

const PopUp = (props) => {
    return(
        <div
            style={{
                padding: '20px 0',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                //overflow: 'auto',
                background: `rgba(1, 1, 1, 0.5)`,
                zIndex: `${props.zIndex ? props.zIndex : 11}`
            }}
            onClick={() => props.set(false)}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    margin: 'auto',
                    width: 'max-content',
                    maxWidth: 'max-content',
                    height: 'max-content',
                    maxHeight: 'max-content',
                    borderRadius: '7px',
                    color: 'black',
                    zIndex: `${(props.zIndex ? props.zIndex : 100) + 1}`,
                    background: props?.background ? props.background : 'white'
                }}
            >
                {props.children}
            </div>
        </div>
    )
};

export default PopUp;