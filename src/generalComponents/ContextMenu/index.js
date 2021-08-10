import React, {useEffect, useState, useRef} from 'react';

import styles from './ContextMenu.module.sass';

const ContextMenu = ({children, params, setParams, tooltip, itemRef, customClose}) => {

    const closeContext = e => {
        if(!customClose) {
            setParams(null);
        } else {
            const isBackground = e.path.filter(el => {if(typeof el?.classList === 'object' && typeof el?.classList[0] === 'string') return el.classList[0].includes(styles.background)}).length > 0; //eslint-disable-line
            if(isBackground) setParams(null);
        }
    };
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const contextMenuRef = useRef();
    const [top, setTop] = useState({menu: '', tooltip: ''});
    const [element, setElement] = useState(null);

    useEffect(() => {
        if(itemRef) setElement(itemRef.current.getBoundingClientRect());
        setMenuVertical();
        window.addEventListener('click', closeContext);
        return () => window.removeEventListener('click', closeContext);
        // eslint-disable-next-line
    }, []);

    const setMenuHorizontal = () => {
        if(params.width + params.x >= screenWidth) {
            return `${params.x - params.width}px`;
        } else {
            return `${params.x}px`;
        }
    }

    const setMenuVertical = () => {
        if(contextMenuRef.current.offsetHeight + params.y >= screenHeight) {
            setTop({...top, menu: `${params.y - contextMenuRef.current.offsetHeight - 20}px`, tooltip: `${contextMenuRef.current.offsetHeight}px`});
        } else {
            setTop({...top, menu: `${params.y + 10}px`, tooltip: '-20px'});
        }
    }

    return(
        <>
            <div
                className={styles.contextMenuWrap}
                ref={contextMenuRef}
                style={{
                    top: element ? `${element.bottom}px` : top.menu,
                    left: element ? `${element.left + (element.width/2) - params.width/2}px` :setMenuHorizontal()
                }}
            >
                <div className={styles.wrap}>
                    {!element && tooltip ? <span style={{
                        top: top.tooltip,
                        right: params.width + params.x >= screenWidth ? '0px' : `${params.width - 20}px`,
                        borderTop: top.tooltip === '-20px' ? '' : '10px solid white',
                        borderBottom: top.tooltip !== '-20px' ? '' : '10px solid white',
                    }}/> : null}
                    {children}
                </div>
            </div>
            <div className={styles.background} />
        </>)
}

export default ContextMenu;