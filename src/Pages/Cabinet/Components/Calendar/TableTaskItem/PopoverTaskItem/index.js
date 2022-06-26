import React from "react";

import styles from "./PopoverTaskItem.module.sass";
import { hexToRgb, eventTypesColor } from "../../helper";
import classNames from "classnames";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { eventProps } from "../../../../../../types/CalendarPage";

const PopoverTaskItem = ({ task, reverseSide, reverse }) => {
  const { __ } = useLocales();
  const color = eventTypesColor?.[task?.type];
  const rgba = hexToRgb(color);
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
          background: `rgba(${rgba?.r}, ${rgba?.g}, ${rgba?.b}, 0.1)`
        }}
      >
        <div className={styles.flexBlock}>
          <div className={styles.leftBlock}>
            <div className={styles.topIcons}>
              <img src={`${imageSrc}assets/PrivateCabinet/suitcase.svg`} alt="Suitcase" />
              <span
                style={{
                  background: `${color}`
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
                <p className={styles.value}>{task?.term}</p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Тег")}</p>
                <p className={styles.value}>{task?.tag}</p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Отправитель")}</p>
                <p className={styles.value}>{task?.sender}</p>
              </div>
            </div>

            <p className={styles.timeBlock}>{task?.ctime}</p>
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
