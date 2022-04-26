import React from "react";

import styles from "./SuccessCreated.module.sass";

import PopUp from "../../../../../../generalComponents/PopUp";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const SuccessCreated = ({ set, event }) => {
  const { __ } = useLocales();
  return (
    <PopUp set={set}>
      <div className={styles.wrapper}>
        <div className={styles.titleWrap}>
          <h4 className={styles.title}>{__("Задача успешно создана")}</h4>
        </div>

        <div className={styles.content}>
          <div className={styles.itemBlock}>
            <p className={styles.option}>{__("Имя задачи")}</p>
            <div className={styles.infoWrap}>
              <p className={styles.value}>{event?.name}</p>
              <div className={styles.icons}>
                {event?.sign && (
                  <img
                    className={styles.icon}
                    src={`${imageSrc}assets/PrivateCabinet/signs/${event.sign}.svg`}
                    alt="Sign"
                  />
                )}
                {event?.emoji && (
                  <img
                    className={styles.icon}
                    src={`${imageSrc}assets/PrivateCabinet/smiles/${event.emoji}.svg`}
                    alt="Emoji"
                  />
                )}
                {event?.color && (
                  <span
                    style={{
                      background: `${event.color?.dark}`
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
                <p className={styles.value}>{event?.dateFrom}</p>
              </div>
              <div className={styles.valueWrap}>
                <p className={styles.option}>{__("До:")}</p>
                <p className={styles.value}>{event?.dateTo}</p>
              </div>
            </div>
          </div>

          <div className={styles.itemBlock}>
            <p className={styles.option}>{__("Получатель")}</p>
            <div className={styles.infoWrap}>
              <img
                className={styles.avatar}
                src={`${imageSrc}assets/PrivateCabinet/avatars/a1.svg`}
                alt="Avatar"
              />
              <p className={styles.value}>{__("Мангуш Ирина Николаевна")}</p>
            </div>
          </div>

          <div className={styles.itemBlock}>
            <p className={styles.option}>{__("Тег")}</p>
            <div className={styles.infoWrap}>
              <p className={styles.value}>{event?.tagOption?.chosen}</p>
            </div>
          </div>

          <div className={styles.itemBlock}>
            <p className={styles.option}>{__("Сопроводительный текст")}</p>
            <div className={styles.infoWrap}>
              <p className={styles.value}>{event?.desc}</p>
            </div>
          </div>
        </div>

        <div className={styles.actionBlock}>
          <button onClick={() => set(false)} className={styles.actionBtn}>
            {__("Готово")}
          </button>
        </div>
      </div>
    </PopUp>
  );
};

export default SuccessCreated;

SuccessCreated.propTypes = {
  set: PropTypes.func,
  event: PropTypes.shape({
    name: PropTypes.string,
    sign: PropTypes.string,
    emoji: PropTypes.string,
    color: PropTypes.shape({
      color: PropTypes.string,
      dark: PropTypes.string,
      light: PropTypes.string,
      name: PropTypes.string
    }),
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    tagOption: PropTypes.shape({
      chosen: PropTypes.string,
      count: PropTypes.number
    }),
    desc: PropTypes.string
  })
};
