import React, { useState } from "react";
import { useLocales } from "react-localized";

import { imageSrc } from "../../../generalComponents/globalVariables";
import styles from "./SavePeriodPicker.module.sass";
import PropTypes from "prop-types";

const SavePeriodPicker = ({
  set,
  setShowCalendar,
  dateValue,
  setDateValue,
  timeValue,
  setTimeValue
}) => {
  const { __ } = useLocales();
  const onDateChange = e => {
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

  const [hours, setHours] = useState(timeValue.hours);
  const [minutes, setMinutes] = useState(timeValue.minutes);
  const onTime = (val, set, limit) => {
    if (/[0-9]/.test(val) || val.length === 0) {
      if (val.length < 3) val < limit ? set(val) : set(val[0]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <img src={imageSrc + "assets/StartPage/file-grey.svg"} alt="file" />
          <span>{__("Срок хранения файла")}</span>
        </div>
        <span className={styles.cross} onClick={() => set(false)}></span>
      </div>
      <div className={styles.main}>
        <div className={styles.titleName}>
          <img
            src={imageSrc + "assets/StartPage/calendar-grey.svg"}
            alt="calendar"
          />
          <span>{__("Укажите даты хранения")}</span>
        </div>
        <div className={styles.inputDiv}>
          <div>
            <span>{__("До")}</span>
            <input
              type="text"
              placeholder="_ _._ _._ _ _ _"
              onChange={e => onDateChange(e)}
              value={dateValue}
            />
          </div>
          <span onClick={() => setShowCalendar(true)}>
            {__("Открыть календарь")}
          </span>
        </div>
        <div className={styles.titleName}>
          <img src={imageSrc + "assets/StartPage/clock.svg"} alt="calendar" />
          <span>{__("Укажите время хранения")}</span>
        </div>
        <div className={styles.inputHM}>
          <input
            type="text"
            placeholder="ЧЧ"
            value={hours}
            onChange={e => onTime(e.target.value, setHours, 24)}
          />
          <span> : </span>
          <input
            type="text"
            placeholder="ММ"
            value={minutes}
            onChange={e => onTime(e.target.value, setMinutes, 60)}
          />
        </div>
        <div className={styles.notion}>
          {__(
            "Срок удаления файла по умолчанию (23:59), после завершения срока хранения ссылка автоматически будет недоступна"
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <div
          className={styles.approve}
          onClick={() => {
            setTimeValue({ hours, minutes });
            set(false);
          }}>
          {__("Готово")}
        </div>
      </div>
    </div>
  );
};

export default SavePeriodPicker;

SavePeriodPicker.propTypes = {
  set: PropTypes.func,
  setShowCalendar: PropTypes.func,
  dateValue: PropTypes.string,
  setDateValue: PropTypes.func,
  timeValue: PropTypes.shape({
    hours: PropTypes.string,
    minutes: PropTypes.string
  }),
  setTimeValue: PropTypes.func
};
