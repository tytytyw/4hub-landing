import React from "react";

import styles from "./ListTaskItem.module.sass";
import classNames from "classnames";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { eventShowProps } from "../../../../../types/CalendarPage";

const ListTaskItem = ({ event, collapsed }) => {
  const { __ } = useLocales();
  return (
    <>
      {!collapsed ? (
        <div
          className={styles.wrapper}
          style={{
            background: `red`
          }}
        >
          <p className={styles.timeBlock}>{event?.ctime}</p>

          <div className={styles.leftBlock}>
            <span
              style={{
                background: `red`
              }}
              className={styles.circle}
            />
            <img
              className={styles.avatar}
              src={`${imageSrc}assets/PrivateCabinet/avatars/${event.avatar}.svg`}
              alt="Avatar 1"
            />
          </div>

          <div className={styles.rightBlock}>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Имя задачи")}</p>
                <p className={styles.value}>{event?.name}</p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Сроки")}</p>
                <p className={styles.value}>{event?.term}</p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Тег")}</p>
                <p className={styles.value}>{event?.tag}</p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.option}>{__("Отправитель")}</p>
                <p className={styles.value}>{event?.sender}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={classNames(styles.wrapper, styles.wrapperCollapsed)}
          style={{
            background: `red`
          }}
        >
          <p className={styles.timeBlock}>{event?.ctime}</p>

          <div className={styles.topBlock}>
            <span
              style={{
                background: `red`
              }}
              className={styles.circle}
            />
          </div>
          <div className={styles.contentBlock}>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <p className={styles.option}>Имя задачи</p>
                <p className={styles.value}>{event?.name}</p>
              </div>

              <div className={styles.infoItem}>
                <p className={styles.option}>Срок</p>
                <p className={styles.value}>{event?.term}</p>
              </div>
            </div>
          </div>
          <div className={styles.bottomBlock}>
            <img
              className={styles.avatar}
              src={`${imageSrc}assets/PrivateCabinet/avatars/${event.avatar}.svg`}
              alt="Avatar 1"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ListTaskItem;

ListTaskItem.propTypes = {
  event: eventShowProps,
  collapsed: PropTypes.bool
};
