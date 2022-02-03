import React, {useState} from "react";
import styles from './InfoPanel.module.sass'

import MainPanel from './MainPanel'
import Media from './Media'

const InfoPanel = ({setAction}) => {
    const [option, setOption] = useState('main')

	return (
        <div className={styles.wrapper}>
            {option === 'main' ? <MainPanel setAction={setAction} setOption={setOption} /> : null}
            {option === 'media' ? <Media setOption={setOption} /> : null}
        </div>
    )
};

export default InfoPanel;
