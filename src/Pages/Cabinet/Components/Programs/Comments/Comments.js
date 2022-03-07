import React from 'react';

import styles from './Comments.module.sass';

function Comments({hideComments}) {
    return (
        <div className={styles.commentsWrap}>
            <div className={styles.commentList}></div>
            <div className={styles.manageButtons}>
                <div onClick={hideComments} className={styles.hideButton}>Скрыть комментарии</div>
                <div className={styles.addButton}>Добавить комментарий</div>
            </div>
        </div>
    )
}

export default Comments;