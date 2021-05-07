import React from 'react';

import styles from './WorkLines.module.sass';

const WorkLines = ({children}) => {
    return(<div className={styles.workLinesWrap}>
        {children}
    </div>)
}

export default WorkLines;