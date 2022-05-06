import React from "react";
import styles from "./FilePeriodEdit.module.sass";
import { useFileSharedPeriods } from "../../../../../../../../generalComponents/collections";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { userFileAccess } from "../../../../../../../../types/FileAccessRights";
import { addDays, addMonths, addWeeks } from "date-fns";
import { formatDateStandard } from "../../../../../../../../generalComponents/CalendarHelper";

function FilePeriodEdit({ closeChangePeriodModal, user, setShowCalendar }) {
  const { __ } = useLocales();
  const PERIODS = useFileSharedPeriods();

  const renewPeriod = (period) => {
    let deadline = user.deadline;
    if (period === PERIODS.DAY) {
      deadline = formatDateStandard(addDays(new Date(), 1));
    }
    if (period === PERIODS.WEEK) {
      deadline = formatDateStandard(addWeeks(new Date(), 1));
    }
    if (period === PERIODS.MONTH) {
      deadline = formatDateStandard(addMonths(new Date(), 1));
    }
    return {
      ...user,
      deadline
    };
  };

  const renderPeriods = () =>
    Object.values(PERIODS).map((it, i) => (
      <div
        key={i}
        className={styles.reviewOption}
        onClick={() => {
          renewPeriod(it);
          closeChangePeriodModal();
        }}
      >
        <div>{it}</div>
      </div>
    ));

  return (
    <div className={styles.filePeriodEditWrap}>
      {renderPeriods()}
      <div
        className={styles.reviewOption}
        onClick={() => {
          setShowCalendar(true);
          closeChangePeriodModal();
        }}
      >
        <div>{__("Открыть календарь")}</div>
      </div>
    </div>
  );
}

export default FilePeriodEdit;

FilePeriodEdit.propTypes = {
  closeChangePeriodModal: PropTypes.func,
  user: userFileAccess,
  setShowCalendar: PropTypes.func
};
