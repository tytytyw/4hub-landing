import React from 'react';

import styles from './BottomPanel.module.sass';
import {themes} from "../SideMenu/themes";
import {useSelector} from "react-redux";

const BottomPanel = () => {

    const images = ['mail.svg', 'calendar-5.svg', 'sms.svg', 'round-webcam.svg', 'calendar-4.svg', 'picture-1.svg', 'shopping-cart.svg'];

    const personalSettings = useSelector(state => state.main.personalSettings)
    const previewTheme = useSelector(state => state.main.previewTheme)

    const getThemeBg = () => {
        if (previewTheme) {
            return themes?.[previewTheme]
        }
        return themes?.[personalSettings?.theme]
    }

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
        <div
            className={styles.buttomPanelWrap}
            style={{
                background: getThemeBg()
            }}
        >
            <div className={styles.curtain} />
            <div className={styles.icons}>
                {renderIcons()}
            </div>
        </div>
    )
}

export default BottomPanel;
