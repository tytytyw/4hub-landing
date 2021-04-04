import React, { useState } from 'react';

import styles from './PrivateCabinet.module.sass';
import SideMenu from './Components/SideMenu';

const PrivateCabinet = () => {

    const [menuItem, setItem] = useState('Мои папки');
    const [collapsed, setCollapsed] = useState(false)
    const minHeight = window.outerHeight * 0.8;

    return (
        <div className={styles.mainWrap} style={{minHeight}}>
            <SideMenu
                menuItem={menuItem} setItem={setItem}
                collapsed={collapsed} setCollapsed={setCollapsed}
            />
            <div
                className={styles.workArea}
                style={{
                    minHeight,
                    width: collapsed ? `calc(100vw - 55px)` : '82%'
                }}>
                {menuItem === 'Мои папки' && <div></div>}
            </div>
        </div>
    )
}

export default PrivateCabinet;
