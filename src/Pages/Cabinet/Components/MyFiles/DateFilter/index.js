import React from "react";
import styles from "./DateFilter.module.sass";
import Select from "../../../../../generalComponents/Select/Select";
import { useMonths, useGetYears, useGetDays } from "./helper";
import classNames from "classnames";
import PropTypes from "prop-types";

const DateFilter = ({ dateFilter, setDateFilter }) => {
  const months = useMonths();
  const getYears = useGetYears();
  const getDays = useGetDays();
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrap}>
        <div className={styles.yearSelect}>
          <Select
            placeholder="Выбрать год"
            className={styles.select}
            classNameSelect={styles.selectContentYear}
            data={getYears()}
            onChange={(value) => setDateFilter((dateFilter) => ({ ...dateFilter, y: value }))}
            cleareFilter={() => setDateFilter((dateFilter) => ({ ...dateFilter, y: "" }))}
          />
        </div>

        <div className={styles.daySelect}>
          <Select
            placeholder="Выбрать день"
            className={styles.select}
            classNameSelect={styles.selectContent}
            data={getDays()}
            onChange={(value) => setDateFilter((dateFilter) => ({ ...dateFilter, d: value }))}
            cleareFilter={() => setDateFilter((dateFilter) => ({ ...dateFilter, d: "" }))}
          />
        </div>
      </div>

      <div className={styles.buttonsWrap}>
        {months?.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              if (dateFilter?.m !== item.id) setDateFilter((dateFilter) => ({ ...dateFilter, m: item.id }));
              else setDateFilter((dateFilter) => ({ ...dateFilter, m: "" }));
            }}
            className={classNames({
              [styles.button]: true,
              [styles.active]: item.id === dateFilter?.m
            })}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateFilter;

DateFilter.propTypes = {
  dateFilter: PropTypes.exact({
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    d: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    m: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  setDateFilter: PropTypes.func
};
