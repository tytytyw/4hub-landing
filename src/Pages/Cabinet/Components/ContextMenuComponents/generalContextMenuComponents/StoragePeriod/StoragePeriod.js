import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./StoragePeriod.module.sass";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/PrivateCabinet/calendar-6.svg";
import Calendar from "../../../../../StartPage/Components/Calendar";
import PopUp from "../../../../../../generalComponents/PopUp";
import FileInfo from "../../../../../../generalComponents/FileInfo/FileInfo";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { fileProps } from "../../../../../../types/File";

function StoragePeriod({ file, setDisplayStotagePeriod, dateValue, setDateValue, timeValue, setTimeValue }) {
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
      <div className={classNames(styles.header, styles.border_bottom)}>
        <FileInfo file={file} />
      </div>
      <div className={styles.border} />
      <div className={classNames(styles.row_item)}>
        <div className={styles.ico_wrap}>
          <CalendarIcon className={styles.row_ico} />
        </div>
        <div className={styles.input_wrap}>
          <p className={styles.input_title}>Срок хранения файла/папки</p>
          <input value={__("Установите срок хранения файла (после завершения файл будет удален)")} type="button" />
        </div>
      </div>
      <div className={styles.border} />
      <div className={styles.date_wrap}>
        <div className={styles.title_wrap}>
          <h5 className={styles.title}>{__("Укажите дату хранения")}</h5>
        </div>
        <div className={styles.inputs_wrap}>
          <div className={styles.tables_wrap}>
            <span className={styles.from}>C</span>
            <input className={styles.date} value={curretDate} type="text" disabled></input>
            <span className={styles.to}>{__("До")}</span>
            <input
              className={styles.date}
              type="text"
              value={dateValue}
              placeholder={__("_ _._ _._ _ _ _")}
              onChange={(e) => onDateChange(e)}
            />
          </div>
          <span className={styles.open_calendar} onClick={() => setShowCalendar(true)}>
            {__("Открыть календарь")}
          </span>
        </div>
      </div>
      <div className={styles.border} />
      <div className={styles.time_wrap}>
        <div className={styles.title_wrap}>
          <h5 className={styles.title}>{__("Укажите время хранения")}</h5>
        </div>
        <div className={classNames(styles.inputs_wrap, styles.inputs_wrap_time)}>
          <input
            className={styles.time_count}
            type="text"
            placeholder={__("ЧЧ")}
            value={hours}
            onChange={(e) => onTime(e.target.value, setHours, 24)}
          />
          <span>:</span>
          <input
            className={styles.time_count}
            type="text"
            placeholder={__("ММ")}
            value={minutes}
            onChange={(e) => onTime(e.target.value, setMinutes, 60)}
          />
        </div>
      </div>
      <p className={classNames(styles.hint, styles.border_bottom)}>
        {__("После завершения срока хранения в 23:59 ссылка автоматитески будет недоступна")}
      </p>
      <div className={styles.buttonsWrap}>
        <div onClick={() => setDisplayStotagePeriod(false)} className={styles.cancel}>
          {__("Отмена")}
        </div>
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
  file: fileProps,
  setDisplayStotagePeriod: PropTypes.func,
  dateValue: PropTypes.string,
  setDateValue: PropTypes.func,
  timeValue: PropTypes.shape({
    hours: PropTypes.string,
    minutes: PropTypes.string
  }),
  setTimeValue: PropTypes.func
};
