import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';

import { onGetUserInfo } from '../../Store/actions/startPageAction';
import styles from './PrivateCabinet.module.sass';
import SideMenu from './Components/SideMenu';
import MyFolders from './Components/MyFolders';

const PrivateCabinet = () => {

    const dispatch = useDispatch();
    const [menuItem, setItem] = useState('Мои папки');
    const [collapsed, setCollapsed] = useState(false)
    const minHeight = window.outerHeight >= 1440 ? window.outerHeight * 0.8 : window.outerHeight * 0.75;

    useEffect(() => {
        dispatch(onGetUserInfo());
    }, []);

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
                {menuItem === 'Мои папки' && <MyFolders />}
            </div>
        </div>
    )
}

export default PrivateCabinet;
