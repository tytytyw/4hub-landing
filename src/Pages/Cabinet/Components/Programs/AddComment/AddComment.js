import React, { useState } from "react";

import styles from "./AddComment.module.sass";
import PopUp from "../../../../../generalComponents/PopUp";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { getDate } from "../../../../../generalComponents/CalendarHelper";
import classNames from "classnames";
import PropTypes from "prop-types";

function AddComment({ close, program, onAddComment }) {
  const [params, setParams] = useState({ comment: "" });
  const enterText = (e) =>
    setParams((s) => ({ ...s, comment: e.target.value }));
  //TODO - Need to replace after api is added
  const createNewComment = () => ({
    icon: `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`,
    from: "Test",
    date: `${getDate(0).day}.${getDate(0).month}.${getDate(0).year}`,
    text: params.comment,
  });

  const onAdd = () => {
    if (params.comment.length > 0) {
      onAddComment(createNewComment());
    }
  };

  return (
    <PopUp set={close}>
      <div className={styles.newCommentWrap}>
        <span className={styles.cross} onClick={close} />
        <span className={styles.title}>Добавьте отзыв к программе</span>
        <img className={styles.imageIcon} src={program.icon} alt="icon" />
        <span className={styles.programName}>{program.name}</span>
        <textarea placeholder="Введите текст" onChange={enterText}></textarea>
        <div className={styles.buttonsWrap}>
          <div className={styles.cancel} onClick={close}>
            Отмена
          </div>
          <div
            className={classNames({
              [styles.add]: true,
              [styles.inactive]: params.comment.length === 0,
            })}
            onClick={onAdd}
          >
            Добавить
          </div>
        </div>
      </div>
    </PopUp>
  );
}

export default AddComment;

AddComment.propTypes = {
  close: PropTypes.func,
  program: PropTypes.object,
  onAddComment: PropTypes.func,
};

AddComment.defaultProps = {
  close: () => {},
  program: {},
};
