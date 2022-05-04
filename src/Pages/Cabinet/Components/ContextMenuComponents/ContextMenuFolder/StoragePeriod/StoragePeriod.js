import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./StoragePeriod.module.sass";
import { ReactComponent as CalendarIco } from "../../../../../../assets/PrivateCabinet/calendar-6.svg";
import { ReactComponent as EyeIco } from "../../../../../../assets/PrivateCabinet/clock.svg";
import Calendar from "../../../../../StartPage/Components/Calendar";
import PopUp from "../../../../../../generalComponents/PopUp";
import { ReactComponent as FolderIcon } from "../../../../../../assets/PrivateCabinet/folder-2.svg";
import { colors } from "../../../../../../generalComponents/collections";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { projectFolderStructure } from "../../../../../../types/Project";

//TODO - CHECK - needs to be deprecated (look in generalContextMenuComponents)
function StoragePeriod({ folder, setDisplayStotagePeriod, dateValue, setDateValue, timeValue, setTimeValue, size }) {
  const { __ } = useLocales();
  const curretDate = new Date().toLocaleDateString("ru-RU");
  const [showCalendar, setShowCalendar] = useState(false);
  const [hours, setHours] = useState(timeValue.hours);
  const [minutes, setMinutes] = useState(timeValue.minutes);
  const onTime = (val, set, limit) => {
    if (/[0-9]/.test(val) || val.length === 0) {
      if (val.length < 3) val < limit ? set(val) : set(val[0]);
    }
  };
  useEffect(() => {
    return () => {
      setTimeValue({ hours, minutes });
      if (hours && !dateValue) setDateValue(new Date().toLocaleDateString("ru"));
    };
  }, [hours, minutes]); // eslint-disable-line react-hooks/exhaustive-deps

  const onDateChange = (e) => {
    let val = e.target.value.trim();
    let length = e.target.value.length;
    if (/[0-9]/.test(val) || length === 0) {
      if (length === 3) {
        let arr = val.split("");
        if (arr[3] !== ".") arr.splice(2, 0, ".");
        if (arr[3] === ".") arr.splice(2);
        val = arr.join("");
      }
      if (length === 6) {
        let arr = val.split("");
        if (arr[6] !== ".") arr.splice(5, 0, ".");
        if (arr[6] === ".") arr.splice(5);
        val = arr.join("");
      }
      if (val.length <= 10) setDateValue(val);
    }
  };

  return (
    <div className={styles.wrap}>
      {folder && (
        <div className={classNames(styles.header, styles.border_bottom)}>
          <div className={styles.innerFileWrap}>
            <FolderIcon
              className={`${styles.folderIcon} ${
                folder?.info?.color
                  ? colors.filter((el) => el.color === folder.info.color)[0]?.name
                  : folder.info?.nameRu
                  ? styles.generalFolder
                  : ""
              }`}
            />
            {folder?.info?.is_pass ? (
              <img className={styles.lock} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt="lock" />
            ) : null}
          </div>
          <div className={styles.descriptionWrap}>
            <div className={styles.fileName}>{folder.info?.nameRu ?? folder.info?.name}</div>
            <div className={styles.innerFileInfo}>
              <div className={styles.fileSize}>{size}</div>
              <div className={styles.descriptionGroup}>
                {folder?.info?.fig && (
                  <img src={`${imageSrc}assets/PrivateCabinet/signs/${folder?.info?.fig}.svg`} alt="sign" />
                )}
                {folder?.info?.emo && (
                  <img src={`${imageSrc}assets/PrivateCabinet/smiles/${folder?.info?.emo}.svg`} alt="emoji" />
                )}
              </div>
            </div>
          </div>
          <div className={styles.buttons_wrap}>
            <div className={styles.close_wrap} onClick={() => setDisplayStotagePeriod(false)}>
              <span className={styles.close} />
            </div>
          </div>
        </div>
      )}
      <div className={styles.date_wrap}>
        <div className={styles.title_wrap}>
          <CalendarIco />
          <h5 className={styles.title}>{__("Укажите даты хранения")}</h5>
        </div>
        <div className={styles.inputs_wrap}>
          <span className={styles.from}>{__("C")}</span>
          <input className={styles.date} value={curretDate} type="text" disabled></input>
          <span className={styles.to}>До</span>
          <input
            className={styles.date}
            type="text"
            value={dateValue}
            placeholder={__("_ _._ _._ _ _ _")}
            onChange={(e) => onDateChange(e)}
          />
          <span className={styles.open_calendar} onClick={() => setShowCalendar(true)}>
            {__("Открыть календарь")}
          </span>
        </div>
      </div>
      <div className={styles.time_wrap}>
        <div className={styles.title_wrap}>
          <EyeIco />
          <h5 className={styles.title}>{__("Укажите время хранения")}</h5>
        </div>
        <div className={classNames(styles.inputs_wrap, styles.inputs_wrap_time)}>
          <input
            className={styles.time_count}
            type="text"
            placeholder="ЧЧ"
            value={hours}
            onChange={(e) => onTime(e.target.value, setHours, 24)}
          />
          <span>:</span>
          <input
            className={styles.time_count}
            type="text"
            placeholder="ММ"
            value={minutes}
            onChange={(e) => onTime(e.target.value, setMinutes, 60)}
          />
        </div>
      </div>
      <p className={classNames(styles.hint, styles.border_bottom)}>
        {__("После завершения срока хранения в 23:59 ссылка автоматитески будет недоступна")}
      </p>
      <div className={styles.buttonsWrap}>
        <div onClick={() => setDisplayStotagePeriod(false)} className={styles.add}>
          {__("Готово")}
        </div>
      </div>
      {showCalendar && (
        <PopUp set={setShowCalendar} zIndex={102}>
          <Calendar setShowCalendar={setShowCalendar} setDateValue={setDateValue} />
        </PopUp>
      )}
    </div>
  );
}

export default StoragePeriod;

StoragePeriod.propTypes = {
  folder: projectFolderStructure,
  setDisplayStotagePeriod: PropTypes.func,
  dateValue: PropTypes.string,
  setDateValue: PropTypes.func,
  timeValue: PropTypes.shape({
    hours: PropTypes.string,
    minutes: PropTypes.string
  }),
  setTimeValue: PropTypes.func,
  size: PropTypes.string
};
