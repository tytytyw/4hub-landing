import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import styles from "./ConfigAccessFolder.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import StoragePeriod from "../../ContextMenuFolder/StoragePeriod/StoragePeriod";
import SetPassword from "../SetPassword/SetPassword";
import { ReactComponent as Password } from "../../../../../../assets/PrivateCabinet/password.svg";
import { ReactComponent as Calendar } from "../../../../../../assets/PrivateCabinet/calendar-6.svg";
import { ReactComponent as Pensil } from "../../../../../../assets/PrivateCabinet/edit.svg";
import { ReactComponent as Eye } from "../../../../../../assets/PrivateCabinet/eye.svg";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { chosenFolderProps } from "../../../../../../types/CreateFolder";

function ConfigAccessFolder({ folder, close, setShowSuccessMessage }) {
  const { __ } = useLocales();
  const [displayStotagePeriod, setDisplayStotagePeriod] = useState(false);
  const [displaySetPassword, setDisplaySetPassword] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState({
    hours: "",
    minutes: "",
    seconds: ""
  });
  const uid = useSelector((state) => state.user.uid);
  const [size] = useState("0 MB");
  const [data, setData] = useState({ uid, deadline: "" });
  const linkRef = useRef("");
  const setTime = (time, limit) => {
    return time < limit ? (time < 10 ? `0${time}` : time) : time[0];
  };

  useEffect(() => {
    setData((data) => ({
      ...data,
      deadline: dateValue
        ? `${dateValue} ${timeValue.hours ? setTime(timeValue.hours, 24) : "23"}:${
            timeValue.minutes ? setTime(timeValue.minutes, 60) : "59"
          }`
        : ""
    }));
  }, [dateValue, timeValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PopUp set={close}>
      {!displayStotagePeriod && (
        <div className={styles.ShareFile_wrap}>
          <div className={classNames(styles.header, styles.border_bottom)}>
            {__("Настройка доступа папки")} {folder.name}
            <span className={styles.cross} onClick={() => close()} />
          </div>
          <div className={classNames(styles.row_item, styles.border_bottom)}>
            <div className={styles.ico_wrap}>
              <Eye className={styles.row_ico} />
            </div>
            <div className={styles.input_wrap}>
              <p className={styles.input_title}>{__("Может просматривать")}</p>
              <input value={__("Все у кого есть эта ссылка, смогут просматривать файл")} type="button" />
            </div>
            <span className={styles.set_list}>{__("Все у кого есть ссылка")}</span>
          </div>
          <div className={classNames(styles.row_item, styles.border_bottom)}>
            <div className={styles.ico_wrap}>
              <Calendar className={styles.row_ico} />
            </div>
            <div className={styles.input_wrap}>
              <p className={styles.input_title}>{__("Срок хранения файла/папки")}</p>
              <input value={__("Установите срок хранения файла (после завершения файл будет удален)")} type="button" />
            </div>
            <span onClick={() => setDisplayStotagePeriod(true)} className={styles.set_btn}>
              {__("Установить")}
            </span>
          </div>
          <div className={classNames(styles.row_item, styles.border_bottom)}>
            <div className={styles.ico_wrap}>
              <Password className={styles.row_ico} />
            </div>
            <div className={styles.input_wrap}>
              <p className={styles.input_title}>Пароль</p>
              <input id={"input_pass"} placeholder="Вы можете установить пароль на данный файл"></input>
            </div>
            <span onClick={() => setDisplaySetPassword(true)} className={styles.set_btn}>
              {__("Установить")}
            </span>
          </div>
          <div className={styles.share_link}>
            <div className={styles.row_item}>
              <div className={styles.ico_wrap}>
                <Pensil className={styles.row_ico} />
              </div>
              <div className={styles.input_wrap}>
                <p className={styles.input_title}>Может редактировать</p>
                <input value={__("Все у кого есть эта ссылка, смогут изменять файл")} type="button" />
              </div>
              <span className={styles.set_list}>{__("Все у кого есть ссылка")}</span>
            </div>
          </div>
        </div>
      )}
      {displayStotagePeriod && (
        <StoragePeriod
          setDisplayStotagePeriod={setDisplayStotagePeriod}
          dateValue={dateValue}
          setDateValue={setDateValue}
          timeValue={timeValue}
          setTimeValue={setTimeValue}
          size={size}
          data={data}
        />
      )}
      {displaySetPassword && (
        <SetPassword
          folder={folder}
          setDisplaySetPassword={setDisplaySetPassword}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      )}
      <input ref={linkRef} type="text" style={{ display: "none" }} />
    </PopUp>
  );
}

export default ConfigAccessFolder;

ConfigAccessFolder.propTypes = {
  folder: chosenFolderProps,
  close: PropTypes.func,
  setShowSuccessMessage: PropTypes.func
};
