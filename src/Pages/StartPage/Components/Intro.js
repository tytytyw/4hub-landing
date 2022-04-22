import React from "react";
import { useLocales } from "react-localized";

import styles from "./Intro.module.sass";
import { ReactComponent as DownloadIcon } from "../../../assets/StartPage/download-startPage.svg";
import { imageSrc } from "../../../generalComponents/globalVariables";
import PropTypes from "prop-types";

const Intro = ({ setPage }) => {
  const { __ } = useLocales();
  return (
    <div className={styles.main}>
      <img
        className={styles.hubIcon}
        src={imageSrc + "assets/StartPage/4HUB.svg"}
        alt="4HUB"
      />
      <div className={styles.title}>{__("Remote WorkSpace")}</div>
      <div className={styles.description}>
        {__(
          "Рыбный текст о сервисе и его преймуществах, сейчас делаю его на 3 строкиможно больше можно меньше"
        )}
      </div>
      <div className={styles.siteOptionWrapper}>
        <div className={styles.siteOption}>
          <h3>{__("Для личных целей")}</h3>
          <span>
            {__(
              "Рыбный текст о сервисе и его преймуществах, сейчас делаю его на 3 строкиможно больше можно меньше  сейчас делаю его на 3 строкиможно больше можно меньше"
            )}
          </span>
          <div onClick={() => setPage("landing")}>{__("Перейти")}</div>
        </div>
        <div className={styles.siteOption}>
          <h3>{__("Для бизнеса")}</h3>
          <span>
            {__(
              "Рыбный текст о сервисе и его преймуществах, сейчас делаю его на 3 строкиможно больше можно меньше  сейчас делаю его на 3 строки можно больше можно меньше"
            )}
          </span>
          <div onClick={() => setPage("business-landing")}>{__("Перейти")}</div>
        </div>
      </div>
      <div className={styles.download} onClick={() => setPage("sendFile")}>
        <DownloadIcon className={styles.downloadIcon} />
        <span>{__("Отправить файл")}</span>
      </div>
    </div>
  );
};

export default Intro;

Intro.propTypes = {
  setPage: PropTypes.func
};
