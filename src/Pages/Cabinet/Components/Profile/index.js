import React, {useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import styles from './Profile.module.sass';
import ContextMenu from '../../../../generalComponents/ContextMenu';
import {contextMenuProfile} from '../../../../generalComponents/collections';
import {setCookie} from '../../../../generalComponents/StorageHelper';
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem';
import {useHistory} from "react-router";
import {imageSrc} from "../../../../generalComponents/globalVariables";

const Profile = () => {

    const user = useSelector(state => state.user.userInfo);
    const [mouseParams, setMouseParams] = useState(null);
    const profileRef = useRef();
    const history = useHistory();

    const exit = () => {
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => cookie.split('=')[0].trim() === 'uid' ? setCookie(cookie.split('=')[0].trim(), cookie.split('=')[1].trim(), 'Thu, 01 Jan 1970 00:00:00 GMT') : null);
        window.location.reload();
    };

    const openProfile = () => history.replace('/personal-data');
    const openSupport = () => history.replace('/support');
    const openSettings = () => history.replace('/settings');

    const additionalCallBacks = [exit];
    const mainCallBacks = [openProfile, openSupport, openSettings]

    const renderMenuItems = (target, arr) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                imageSrc={`./assets/PrivateCabinet/ContextMenuProfile/${item.img}.svg`}
                callback={arr ? arr[i] : ''}
            />
        })
    }

    return (
        <>
        <div
            ref={profileRef}
            className={styles.profileWrap}
            onClick={e => {setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 25})}}
        >
            <img
                className={styles.profileImg}
                src={user?.icon?.[0] ? imageSrc + user?.icon?.[0] : imageSrc + '/assets/PrivateCabinet/profile-noPhoto.svg'}
                alt='pie-chart'
            />
            <span>{user?.name ? user.name : 'User'}</span>
            <div className={styles.arrowDown} />
        </div>
        {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} itemRef={profileRef}>
            <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuProfile.main, mainCallBacks)}</div>
            <div className={styles.additionalMenuItems}>{renderMenuItems(contextMenuProfile.additional, additionalCallBacks)}</div>
        </ContextMenu> : null}
        </>
    )
};

export default Profile;
