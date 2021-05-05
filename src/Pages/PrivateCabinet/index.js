import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { onGetUserInfo } from '../../Store/actions/startPageAction';
import { onGetFolders, onChooseFiles } from '../../Store/actions/PrivateCabinetActions';
import styles from './PrivateCabinet.module.sass';
import SideMenu from './Components/SideMenu';
import MyFolders from './Components/MyFolders';
import MyProfile from './Components/MyProfile';

const PrivateCabinet = () => {

    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();
    const [menuItem, setItem] = useState('Мои папки');
    const [collapsed, setCollapsed] = useState(false)
    const minHeight = window.outerHeight >= 1440 ? window.outerHeight * 0.8 : window.outerHeight * 0.75;

    useEffect(() => {
        dispatch(onGetUserInfo());
        dispatch(onGetFolders());
        dispatch(onChooseFiles('global/all'));

        let date = new Date();
        date.setHours(date.getHours() + 1);
        document.cookie = `uid=${uid};expires=${date}`;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                {menuItem === 'Мой профиль' && <MyProfile />}
            </div>
        </div>
    )
}

export default PrivateCabinet;
