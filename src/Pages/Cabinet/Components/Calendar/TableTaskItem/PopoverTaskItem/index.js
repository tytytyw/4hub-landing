import React from "react";

import styles from "./PopoverTaskItem.module.sass";
import classNames from "classnames";
import { imageSrc, MODALS, TASK_MODALS } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { eventProps } from "../../../../../../types/CalendarPage";
import { opacityColor } from "generalComponents/CalendarHelper";
import { onSetModals } from "Store/actions/CabinetActions";
import { useDispatch } from "react-redux";

const PopoverTaskItem = ({ task, reverseSide, reverse }) => {
  const { __ } = useLocales();
  const dispatch = useDispatch();

  const openTask = (task) => {
    dispatch(
      onSetModals(MODALS.TASKS, {
        type: TASK_MODALS.OPEN_TASK,
        choosenTask: task,
        params: {
          width: 620
        }
      })
    );
  };

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles.contentWrap]: !reverse,
        [styles.reverseWrap]: reverse,
        [styles.contentSideWrap]: !reverseSide,
        [styles.reverseSideWrap]: reverseSide
      })}
    >
      <div
        className={styles.content}
        style={{
          background: opacityColor(task.id_color.color)
        }}
      >
        <div className={styles.flexBlock}>
          <div className={styles.leftBlock}>
            <div className={styles.topIcons}>
              <img src={`${imageSrc}assets/PrivateCabinet/events/${task.id_type}.svg`} alt={task.name} />
              <span
                style={{
                  background: task.id_color.color
                }}
                className={styles.circle}
              />
            </div>
            <img
              className={styles.avatar}
              src={`${imageSrc}assets/PrivateCabinet/avatars/${task.avatar}.svg`}
              alt="Avatar 1"
            />
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Имя задачи")}</p>
                <p className={styles.value}>{task.name}</p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Срок")}</p>
                <p className={styles.value}>{task.date_start}</p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Тег")}</p>
                <p className={styles.value}>{task.tags.chosen}</p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Отправитель")}</p>
                <p className={styles.value}>{task.sender}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actionBlock}>
          <button
            className={styles.actionBtn}
            onClick={() => {
              openTask(task);
            }}
          >
            {__("Перейти к задаче")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopoverTaskItem;

PopoverTaskItem.propTypes = {
  task: eventProps,
  reverseSide: PropTypes.bool,
  reverse: PropTypes.bool
};

PopoverTaskItem.defaultProps = {
  reverseSide: false,
  reverse: false
};
