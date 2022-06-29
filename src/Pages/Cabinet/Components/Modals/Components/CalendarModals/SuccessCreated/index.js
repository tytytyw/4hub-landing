import React from "react";

import styles from "./SuccessCreated.module.sass";
import { imageSrc } from "../../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getStartDate, getStartTime, opacityColor } from "generalComponents/CalendarHelper";

const SuccessCreated = ({ closeModal }) => {
  const { __ } = useLocales();
  const { task } = useSelector((s) => s.Cabinet.modals.calendarModals);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleWrap}>
          <h4 className={styles.title}>{__("Задача успешно создана")}</h4>
        </div>

        <div className={styles.content} style={{ background: `${opacityColor(task?.id_color.color)}` }}>
          <div className={styles.itemBlock}>
            <p className={styles.option}>{__("Имя задачи")}</p>
            <div className={styles.infoWrap}>
              <p className={styles.value}>{task?.name}</p>
              <div className={styles.icons}>
                {task?.id_fig && (
                  <img
                    className={styles.icon}
                    src={`${imageSrc}assets/PrivateCabinet/signs/${task.id_fig}.svg`}
                    alt="Sign"
                  />
                )}
                {task?.id_emo && (
                  <img
                    className={styles.icon}
                    src={`${imageSrc}assets/PrivateCabinet/smiles/${task.id_emo}.svg`}
                    alt="Emoji"
                  />
                )}
                {task?.id_color && (
                  <span
                    style={{
                      background: `${task.id_color.color}`
                    }}
                    className={styles.circle}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={styles.itemBlock}>
            <p className={styles.option}>{__("Срок Выполнения")}</p>
            <div className={styles.infoWrap}>
              <div className={styles.valueWrap}>
                <p className={styles.option}>{__("Дата")}:</p>
                <p className={styles.value}>{getStartDate(task.date_start)}</p>
              </div>
              <div className={styles.valueWrap}>
                <p className={styles.option}>{__("Время")}:</p>
                <p className={styles.value}>{getStartTime(task.date_start)}</p>
              </div>
            </div>
          </div>

          <div className={styles.itemBlock}>
            <p className={styles.option}>{__("Получатель")}</p>
            <div className={styles.infoWrap}>
              <img className={styles.avatar} src={`${imageSrc}assets/PrivateCabinet/avatars/a1.svg`} alt="Avatar" />
              <p className={styles.value}>{__("Мангуш Ирина Николаевна")}</p>
            </div>
          </div>

          <div className={styles.itemBlock}>
            <p className={styles.option}>{__("Тег")}</p>
            <div className={styles.infoWrap}>
              <p className={styles.value}>{`# ${task?.tags?.chosen}`}</p>
            </div>
          </div>

          <div className={styles.itemBlock}>
            <p className={styles.option}>{__("Сопроводительный текст")}</p>
            <div className={styles.infoWrap}>
              <p className={styles.value}>{task?.prim}</p>
            </div>
          </div>
        </div>

        <div className={styles.actionBlock}>
          <button onClick={closeModal} className={styles.actionBtn}>
            {__("Готово")}
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessCreated;

SuccessCreated.propTypes = {
  closeModal: PropTypes.func
};
