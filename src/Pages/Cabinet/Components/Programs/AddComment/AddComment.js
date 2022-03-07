import React from 'react';

import styles from './AddComment.module.sass';
import PopUp from "../../../../../generalComponents/PopUp";

function AddComment({close = () => {}, program = {}}) {
    return (<PopUp set={close}>
        <div className={styles.newCommentWrap}>
            <span className={styles.cross} onClick={close} />
        </div>
    </PopUp>)
}

export default AddComment;