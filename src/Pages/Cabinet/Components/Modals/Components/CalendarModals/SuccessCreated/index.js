import React from "react";

import styles from "./SuccessCreated.module.sass";
import { imageSrc } from "../../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const SuccessCreated = ({ closeModal }) => {
  const { __ } = useLocales();
  const task = useSelector((s) => s.Cabinet.taskCriterion);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleWrap}>
          <h4 className={styles.title}>{__("Задача успешно создана")}</h4>
        </div>

        <div className={styles.content}>
          <div className={styles.itemBlock}>
            <p className={styles.option}>{__("Имя задачи")}</p>
            <div className={styles.infoWrap}>
              <p className={styles.value}>{task?.name}</p>
              <div className={styles.icons}>
                {task?.filters?.figure && (
                  <img
                    className={styles.icon}
                    src={`${imageSrc}assets/PrivateCabinet/signs/${task.filters.figure}.svg`}
                    alt="Sign"
                  />
                )}
                {task?.filters?.emoji && (
                  <img
                    className={styles.icon}
                    src={`${imageSrc}assets/PrivateCabinet/smiles/${task.filters.emoji}.svg`}
                    alt="Emoji"
                  />
                )}
                {task?.filters?.color && (
                  <span
                    style={{
                      background: `${task.filters.color.dark}`
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
                <p className={styles.option}>С:</p>
                <p className={styles.value}>{task?.date_start}</p>
              </div>
              <div className={styles.valueWrap}>
                <p className={styles.option}>{__("До:")}</p>
                <p className={styles.value}>{task?.date_end}</p>
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
              <p className={styles.value}>{`# ${task?.tagOption?.chosen}`}</p>
            </div>
          </div>

          <div className={styles.itemBlock}>
            <p className={styles.option}>{__("Сопроводительный текст")}</p>
            <div className={styles.infoWrap}>
              <p className={styles.value}>{task?.text}</p>
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
