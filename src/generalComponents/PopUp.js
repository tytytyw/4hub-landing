import React from 'react';

const PopUp = (props) => {
    return(
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: `${props.zIndex ? props.zIndex : 10}`
        }}>
            <div
                style={{
                    background: 'rgba(1, 1, 1, 0.5)',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: `${props.zIndex ? props.zIndex : 101}`
                }}
                onClick={() => props.set(false)}
            ></div>
            <div style={{
                zIndex: `${(props.zIndex ? props.zIndex : 100) + 1}`,
                width: 'max-content',
                height: 'max-content',
                background: props?.background ? props.background : 'white',
                borderRadius: '7px',
                color: 'black',
            }}>
                {props.children}
            </div>
        </div>
    )
};

export default PopUp;