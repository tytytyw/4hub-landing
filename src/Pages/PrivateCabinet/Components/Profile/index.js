import React from 'react';

import styles from './Profile.module.sass';

const Profile = () => {
    return (
        <div className={styles.profileWrap}>
            <img
                className={styles.profileImg}
                src='./assets/PrivateCabinet/profile-noPhoto.svg'
                alt='pie-chart'
            />
            <span>Евгений</span>
            <div className={styles.arrowDown} />
        </div>
    )
};

export default Profile;
