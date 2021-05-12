import React from 'react';

import styles from './ActionApproval.module.sass';
import PopUp from '../PopUp';

const ActionApproval = ({set, text, name, children, callback}) => {
    return(<PopUp set={set}>
        <div className={styles.wrap}>
            <span className={styles.cross} onClick={set} />
            <span className={styles.title}>{name}</span>
            <div className={styles.children}>{children}</div>
            <div className={styles.text}>{text}</div>
            <div className={styles.buttonsWrap}>
                <div className={styles.cancel} onClick={set}>Отмена</div>
                <div className={styles.action} onClick={callback}>Удалить</div>
            </div>
        </div>
    </PopUp>)
}

export default ActionApproval;