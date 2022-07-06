import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AddComments.module.sass";
import TextButton from "generalComponents/TextButton";
import { useLocales } from "react-localized";
import { ReactComponent as NoteItemIcon } from "assets/PrivateCabinet/textarea/note-item.svg";
import { ReactComponent as FontSizeIcon } from "assets/PrivateCabinet/textarea/font-size.svg";
import { ReactComponent as SendIcon } from "assets/PrivateCabinet/send.svg";
import { ReactComponent as RadioIcon } from "assets/PrivateCabinet/radio-3.svg";
import { ReactComponent as PlayIcon } from "assets/PrivateCabinet/play-grey.svg";
import { ReactComponent as SmileIcon } from "assets/PrivateCabinet/smile.svg";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { onAddTaskComment } from "Store/actions/TasksActions";
import { taskTypes } from "types/Tasks";
import { useTaskMessages } from "generalComponents/collections";

const AddComments = ({ type, params, closeModal }) => {
  const { __ } = useLocales();
  const messages = useTaskMessages();
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const task = useSelector((s) => s.Tasks.myTasks).find((task) => task.id === params.id);

  const handleSubmit = (isClose) => {
    const payload = {
      id_task: params.id,
      text: comment
    };
    dispatch(onAddTaskComment(payload, messages[type], isClose));
    setComment("");
  };

  const renderComments = (comments) => {
    return comments.map((el, i) => (
      <p key={i} className={styles.comment}>
        {el}
      </p>
    ));
  };

  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>{renderComments(task.comments)}</ul>
      <div className={styles.managementPanel}>
        <button onClick={(e) => e.preventDefault()}>
          <FontSizeIcon />
        </button>
        <button onClick={(e) => e.preventDefault()}>
          <NoteItemIcon />
        </button>
      </div>
      <div className={styles.fielsdWrap}>
        <div className={styles.messageBox}>
          <textarea
            className={styles.textarea}
            rows="1"
            placeholder={__("Комментарий")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div onClick={() => handleSubmit(false)}>
            <SendIcon className={classNames({ [styles.active]: comment, [styles.sendIcon]: true })} />
          </div>
        </div>
        <div className={styles.btn}>
          <RadioIcon className={styles.icon} />
        </div>
        <div className={styles.btn}>
          <PlayIcon className={styles.playIcon} />
        </div>
        <div className={styles.btn}>
          <SmileIcon className={styles.icon} />
        </div>
      </div>
      <div className={styles.buttonWrap}>
        <TextButton text={__("Отмена")} type="cancel" callback={closeModal} />
        <TextButton text={__("Отправить")} type="ok" callback={() => handleSubmit(true)} disabled={!comment} />
      </div>
    </div>
  );
};

export default AddComments;

AddComments.propTypes = {
  type: PropTypes.string,
  params: taskTypes,
  closeModal: PropTypes.func
};
