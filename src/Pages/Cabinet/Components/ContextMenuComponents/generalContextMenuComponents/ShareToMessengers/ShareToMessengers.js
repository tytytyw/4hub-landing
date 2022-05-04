import React, { useEffect, useState } from "react";
import styles from "./ShareToMessengers.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import Button from "../../../MyProfile/Button";
import { messengersData } from "../../../MyProfile/Contacts/consts";
import classNames from "classnames";
import FileInfo from "../../../../../../generalComponents/FileInfo/FileInfo";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { fileProps } from "../../../../../../types/WorkElements";

const ShareToMessengers = ({ setDisplayMessengers, close, fid, file }) => {
  const { __ } = useLocales();
  const [selectedSoc, setSelectedSoc] = useState(null);
  const [hrefSoc, setHrefSoc] = useState(null);
  const file_link = `http://fs2.mh.net.ua/ajax/download.php?fid=${fid}`;
  useEffect(() => {
    switch (selectedSoc) {
      case "telegram":
        setHrefSoc(`https://t.me/share/url?url=${file_link}`);
        break;
      case "whatsapp":
        setHrefSoc(`https://api.whatsapp.com/send/?text=${file_link}`);
        break;
      case "viber":
        setHrefSoc(`viber://forward?text=${file_link}`);
        break;
      default:
        setHrefSoc("");
      //TODO: skype, slack
    }
  }, [selectedSoc]); // eslint-disable-line

  return (
    <PopUp set={setDisplayMessengers}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <FileInfo file={file} />
        </div>
        <div className={styles.border} />
        <div className={styles.blockTitle}>
          <span className={styles.info}>{__("Выберите мессенджер")}</span>
        </div>
        <div className={styles.border} />
        <span className={styles.aboutInfo}>
          {__(
            "При отправке через мессенджер будет открыто выбранное приложение на Вашем устройстве"
          )}
        </span>
        <div className={styles.socials}>
          {messengersData.map((item, index) => {
            if (item.type === "slack" || item.type === "skype") return "";
            else
              return (
                <li
                  onClick={() => setSelectedSoc(item?.type)}
                  className={classNames({
                    [styles.socialsItem]: true,
                    [styles.active]: selectedSoc === item?.type,
                  })}
                  key={index}
                >
                  <img
                    className={styles.socialIcon}
                    src={item.icon}
                    alt={item.label}
                  />
                  <p>{item.label}</p>
                </li>
              );
          })}
        </div>

        <div className={styles.actionBlock}>
          <Button
            onClick={() => setDisplayMessengers(false)}
            className={styles.backBtn}
          >
            {__("Назад")}
          </Button>
          <a target="_blank" rel="noreferrer" href={hrefSoc}>
            <Button onClick={() => close()} className={styles.actionBtn}>
              {__("Отправить")}
            </Button>
          </a>
        </div>
      </div>
    </PopUp>
  );
};

export default ShareToMessengers;

ShareToMessengers.propTypes = {
  setDisplayMessengers: PropTypes.func,
  close: PropTypes.func,
  fid: PropTypes.string,
  file: fileProps,
};
