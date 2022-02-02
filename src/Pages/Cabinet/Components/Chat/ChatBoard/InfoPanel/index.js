import React from "react";
import styles from './InfoPanel.module.sass'

import MainPanel from './MainPanel'

const InfoPanel = ({setAction}) => {


	return (
        <div className={styles.wrapper}>
            <MainPanel setAction={setAction} />
        </div>
    )
};

export default InfoPanel;
