import React from 'react';

import styles from './Comments.module.sass';

function Comments() {
    return (
        <div className={styles.commentsWrap}>
            <div className={styles.commentList}></div>
            <div className={styles.manageButtons}></div>
        </div>
    )
}

export default Comments;