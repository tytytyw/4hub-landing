import React from 'react';

import styles from './BottomPanel.module.sass';

const BottomPanel = () => {

    const images = ['mail.svg', 'calendar-5.svg', 'sms.svg', 'round-webcam.svg', 'calendar-4.svg', 'picture-1.svg', 'shopping-cart.svg'];

    const renderIcons = () => {
        return images.map(el => {
            return <img
                key={el}
                src={`../assets/PrivateCabinet/${el}`}
                alt='icon'
            />
        });
    };

    return (
        <div className={styles.buttomPanelWrap}>
            <div className={styles.curtain} />
            <div className={styles.icons}>
                {renderIcons()}
            </div>
        </div>
    )
}

export default BottomPanel;
