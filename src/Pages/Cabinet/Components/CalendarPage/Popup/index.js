import React from 'react'

import styles from './Popup.module.sass'

const PopUp = (props) => {
    return(
        <div
            className={styles.parentWrap}
            style={{zIndex: `${props.zIndex ? props.zIndex : 11}`}}
            onClick={() => props.set(false)}
        >
            <div
                onClick={e => e.stopPropagation()}
                className={styles.contentWrap}
                style={{
                    zIndex: `${(props.zIndex ? props.zIndex : 100) + 1}`,
                    background: props?.background ? props.background : 'white'
                }}
            >
                {props.children}
            </div>
        </div>
    )
}

export default PopUp