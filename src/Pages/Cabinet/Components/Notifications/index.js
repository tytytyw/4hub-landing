import React from 'react';
import {imageSrc} from '../../../../generalComponents/globalVariables';
import styles from './Notifications.module.sass';

const Notifications = () => {

    const count = 2;

    return (
        <div className={styles.notificationsWrap}>
            <img
                src={`${imageSrc}assets/PrivateCabinet/notifications.svg`}
                alt='pie-chart'
            />
            {count > 0 && <span className={styles.counter}>{count}</span>}
        </div>
    )
};

export default Notifications;
