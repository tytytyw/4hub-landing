import React from "react";

import styles from "./PopoverTaskItem.module.sass";
import classNames from "classnames";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { eventProps } from "../../../../../../types/CalendarPage";
import { opacityColor, useEvents } from "generalComponents/CalendarHelper";

const PopoverTaskItem = ({ task, reverseSide, reverse }) => {
  const { __ } = useLocales();
  const event = useEvents();
  const currentEvent = () => event.find((item) => (item.id === Number(task.id_type) ? item : ""));

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
          background: opacityColor(task?.id_color?.color)
        }}
      >
        <div className={styles.flexBlock}>
          <div className={styles.leftBlock}>
            <div className={styles.topIcons}>
              <img
                src={`${imageSrc}assets/PrivateCabinet/events/${currentEvent().icon}.svg`}
                alt={currentEvent().name}
              />
              <span
                style={{
                  background: task?.id_color?.color
                }}
                className={styles.circle}
              />
            </div>
            <img
              className={styles.avatar}
              src={`${imageSrc}assets/PrivateCabinet/avatars/${task?.avatar}.svg`}
              alt="Avatar 1"
            />
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Имя задачи")}</p>
                <p className={styles.value}>{task?.name}</p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Срок")}</p>
                <p className={styles.value}>{task?.date_start}</p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Тег")}</p>
                <p className={styles.value}>{task?.tags.chosen}</p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Отправитель")}</p>
                <p className={styles.value}>{task?.sender}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actionBlock}>
          <button className={styles.actionBtn} onClick={() => {}}>
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
