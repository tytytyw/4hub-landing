import React from "react";
import PropTypes from "prop-types";
import styles from "./Note.module.sass";
import { getFormatDate } from "generalComponents/generalHelpers";
import { imageSrc } from "generalComponents/globalVariables";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { onSelectTask } from "Store/actions/TasksActions";
import { taskTypes } from "types/Tasks";

const Note = ({ note, setMouseParams }) => {
  const { theme } = useSelector((s) => s.user.userInfo);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(onSelectTask(note));
  };
  return (
    <div style={{ background: `${note?.id_color?.light}` }} className={styles.noteWrap} onClick={handleClick}>
      <div className={styles.header}>
        <span className={styles.date}>{getFormatDate(note.ut)}</span>
        <div
          className={styles.dots}
          onClick={(e) =>
            setMouseParams({
              x: e.clientX,
              y: e.clientY,
              width: 200,
              height: 25
            })
          }
        >
          <span />
        </div>
      </div>
      <span className={classNames(` linear-${theme} menuItem-${theme} ${styles.tag}`)}>#{note.tags}</span>
      <p className={styles.text}>{note.prim}</p>
      <div className={styles.before} style={{ background: `${note?.id_color?.light}` }} />
      {note?.id_color?.name ? (
        <svg
          width="48"
          height="26"
          viewBox="0 0 48 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.corner}
        >
          <path
            d="M47.7913 0.505859C42.5473 19.9381 4.22409 25.391 4.22409 25.391H0.0566406C30.2533 25.3041 26.3116 0.505859 26.3116 0.505859C38.8313 5.90661 47.7913 0.505859 47.7913 0.505859Z"
            fill={`url(#paint0_linear_3_95359${note.id})`}
          />
          <defs>
            <linearGradient
              id={`paint0_linear_3_95359${note.id}`}
              x1="18.9556"
              y1="4.91431"
              x2="28.4498"
              y2="20.246"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0363128" stopColor={`${note?.id_color?.light}`} />
              <stop offset="0.2737" stopColor="#fff" />
              <stop offset="1" style={{ stopColor: note?.id_color?.dark }} />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <img
          src={`${imageSrc}assets/PrivateCabinet/tasks/corners/corner-grey.svg`}
          alt="img"
          className={styles.corner}
        />
      )}
    </div>
  );
};

export default Note;

Note.propTypes = {
  note: taskTypes,
  setMouseParams: PropTypes.func
};
