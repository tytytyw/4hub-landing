import React from "react";
import styles from "./DateBlock.module.sass";
import Select from "../../../../../generalComponents/Select/Select";
import { useMonths, useGetYears, useGetDays } from "../../Archive/helper";
import classNames from "classnames";
import { useLocales } from "react-localized";

const DateBlock = ({ month, setMonth }) => {
  const { __ } = useLocales();
  const months = useMonths();
  const getDays = useGetDays();
  const getYears = useGetYears();
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrap}>
        <div className={styles.selectsWrap}>
          <div className={styles.yearSelect}>
            <Select
              placeholder={__("Выбрать год")}
              className={styles.select}
              classNameSelect={styles.selectContentYear}
              data={getYears}
            />
          </div>

          <div className={styles.daySelect}>
            <Select
              placeholder={__("Выбрать день")}
              className={styles.select}
              classNameSelect={styles.selectContent}
              data={getDays}
            />
          </div>
        </div>
      </div>

      <div className={styles.buttonsWrap}>
        {months?.map((item, index) => (
          <button
            key={index}
            onClick={() => setMonth(item.id)}
            className={classNames({
              [styles.button]: true,
              [styles.active]: item.id === month
            })}>
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateBlock;
