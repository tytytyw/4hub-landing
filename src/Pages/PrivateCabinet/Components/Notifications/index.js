import React from 'react';

import styles from './Notifications.module.sass';

const Notifications = () => {

    const count = 2;

    return (
        <div className={styles.notificationsWrap}>
            <img
                src='./assets/PrivateCabinet/notifications.svg'
                alt='pie-chart'
            />
            {count > 0 && <span className={styles.counter}>{count}</span>}
        </div>
    )
};

export default Notifications;
