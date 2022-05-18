import React from "react";
import styles from "./DayTimetable.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useSelector } from "react-redux";
import ThreeDots from "../../../../../../../generalComponents/ThreeDots/ThreeDots";

function DayTimetable({ timePeriod }) {
  const { theme } = useSelector((s) => s.user.userInfo);

  const renderTimetableLine = () =>
    timePeriod.map((hours, i) => (
      <div key={i} className={classNames(styles.dayLine)}>
        <div>
          <div>{hours}</div>
        </div>
        <ThreeDots />
      </div>
    ));

  return (
    <div className={classNames(styles.dayTimetableWrap, `scrollbar-medium-${theme}`)}>{renderTimetableLine()}</div>
  );
}

export default DayTimetable;

DayTimetable.defaultProps = {
  timePeriod: []
};

DayTimetable.propTypes = {
  timePeriod: PropTypes.arrayOf(PropTypes.string) //list of hours per day
};
