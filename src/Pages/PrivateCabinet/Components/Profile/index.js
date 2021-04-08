import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Profile.module.sass';

const Profile = () => {

    const user = useSelector(state => state.user.userInfo);

    return (
        <div className={styles.profileWrap}>
            <img
                className={styles.profileImg}
                src='./assets/PrivateCabinet/profile-noPhoto.svg'
                alt='pie-chart'
            />
            <span>{user?.name ? user.name : 'User'}</span>
            <div className={styles.arrowDown} />
        </div>
    )
};

export default Profile;
