import React, { useState } from "react";

import styles from "./TableListTaskItem.module.sass";
import classNames from "classnames";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import { eventProps } from "../../../../../types/CalendarPage";
import PropTypes from "prop-types";
import { currentEvent, useEvents } from "generalComponents/CalendarHelper";

const TableListTaskItem = ({ task }) => {
  const { __ } = useLocales();
  const [collapse, setCollapse] = useState(false);
  const events = useEvents();
  const color = task?.id_color?.color;
  return (
    <div className={styles.wrapper}>
      <div onClick={() => setCollapse(!collapse)} className={styles.headBlock}>
        <div className={styles.icons}>
          <span
            style={{
              background: color
            }}
            className={styles.circle}
          />
          <img
            className={styles.suitCase}
            src={`${imageSrc}assets/PrivateCabinet/events/${currentEvent(events, task).icon}.svg`}
            alt="Suitcase"
          />
        </div>

        <div className={styles.infoBlock}>
          <div className={classNames(styles.infoItem, styles.infoItemName)}>
            <p className={styles.option}>{__("Имя задачи")}</p>
            <p className={styles.value}>{task?.name}</p>
          </div>

          <div className={styles.infoItem}>
            <p className={styles.option}>{__("Срок")}</p>
            <p className={styles.value}>{task?.date_start}</p>
          </div>

          <div className={styles.infoItem}>
            <p className={styles.option}>{__("Тег")}</p>
            <p className={styles.value}>{task?.tags?.chosen}</p>
          </div>

          <div className={classNames(styles.infoItem, styles.infoItemSender)}>
            <img className={styles.avatarImg} src={imageSrc + "./assets/PrivateCabinet/avatars/a1.svg"} alt="Avatar" />
            <div>
              <p className={styles.option}>{__("Отправитель")}</p>
              <p className={styles.value}>{task?.emails}</p>
            </div>
          </div>
        </div>

        <div className={styles.rightIcons}>
          <img
            className={styles.icon}
            src={`${imageSrc}assets/PrivateCabinet/smiles/${task?.id_emo}.svg`}
            alt="Notification"
          />
          <img
            className={styles.icon}
            src={`${imageSrc}assets/PrivateCabinet/signs/${task?.id_fig}.svg`}
            alt="Notification"
          />
        </div>

        <div className={styles.arrowWrap}>
          <span
            className={classNames({
              [styles.arrow]: true,
              [styles.active]: !!collapse
            })}
          />
        </div>
      </div>

      {collapse && (
        <div className={styles.descWrap}>
          <div className={styles.descBlock}>
            <p className={styles.descTitle}>{__("Описание задачи")}</p>
            <p className={styles.descText}>{task?.prim}</p>
          </div>

          <div className={styles.actionBlock}>
            <button className={styles.actionBtn}>{__("Перейти к задаче")}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableListTaskItem;

TableListTaskItem.propTypes = {
  task: PropTypes.arrayOf(eventProps)
};
