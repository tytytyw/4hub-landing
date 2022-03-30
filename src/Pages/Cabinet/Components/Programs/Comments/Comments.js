import React, {useState} from 'react';

import styles from './Comments.module.sass';
import AddComment from "../AddComment/AddComment";
import {onSetModals} from "../../../../../Store/actions/CabinetActions";
import {useDispatch} from "react-redux";
import {useLocales} from "react-localized";

function Comments({hideComments = () => {}, comments = [], program = {}}) {
    const { __ } = useLocales();
    const [params, setParams] = useState({newCommentModal: false, commentList: comments});
    const dispatch = useDispatch();

    const toggleNewCommentModal = () => setParams(s => ({...s, newCommentModal: !s.newCommentModal}));
    const onAddComment = (newComment) => {
        setParams(s => ({...s, commentList: [...s.commentList, newComment], newCommentModal: false}));
        dispatch(onSetModals('success', {open: true, message: __(`Ваш отзыв о программе ${program?.name ?? ''} успешно добавлен`), title: __('Отзыв успешно добавлен')}))
    }

    const renderComments = () => params.commentList.map((comment, i) => <div className={styles.comment} key={i}>
        <div className={styles.commentLeftColumn}>
            <img src={comment.icon} alt='avatar'/>
        </div>
        <div className={styles.commentRightColumn}>
            <div className={styles.commentText}>{comment.text}</div>
            <div className={styles.date}>{comment.date}</div>
        </div>
    </div>)

    const emptyComments = () => <div className={styles.emptyComments}>{ __('Комментарии отсутствуют') }</div>

    return (
        <>
        <div className={styles.commentsWrap}>
            <div className={styles.commentList}>{comments.length > 0 ? renderComments() : emptyComments()}</div>
            <div className={styles.manageButtons}>
                <div onClick={hideComments} className={styles.hideButton}>{ __('Скрыть комментарии') }</div>
                <div onClick={toggleNewCommentModal} className={styles.addButton}>{ __('Добавить комментарий') }</div>
            </div>
        </div>
        {params.newCommentModal ? <AddComment close={toggleNewCommentModal} onAddComment={onAddComment} program={program} /> : null}
        </>
    )
}

export default Comments;