import React from 'react';

import styles from './Comments.module.sass';

function Comments({hideComments = () => {}, comments = []}) {

    const renderComments = () => comments.map((comment, i) => <div className={styles.comment} key={i}>
        <div className={styles.commentLeftColumn}>
            <img src={comment.icon} alt='avatar'/>
        </div>
        <div className={styles.commentRightColumn}>
            <div className={styles.commentText}>{comment.text}</div>
            <div className={styles.date}>{comment.date}</div>
        </div>
    </div>)

    const emptyComments = () => <div className={styles.emptyComments}>Комментарии отсутствуют</div>

    return (
        <div className={styles.commentsWrap}>
            <div className={styles.commentList}>{comments.length > 0 ? renderComments() : emptyComments()}</div>
            <div className={styles.manageButtons}>
                <div onClick={hideComments} className={styles.hideButton}>Скрыть комментарии</div>
                <div className={styles.addButton}>Добавить комментарий</div>
            </div>
        </div>
    )
}

export default Comments;