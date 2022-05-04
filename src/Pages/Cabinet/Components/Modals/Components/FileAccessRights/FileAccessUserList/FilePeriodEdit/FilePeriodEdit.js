import React from "react";
import styles from "./FilePeriodEdit.module.sass";
import { useFileSharedPeriods } from "../../../../../../../../generalComponents/collections";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

function FilePeriodEdit({ closeChangePeriodModal }) {
  const { __ } = useLocales();
  const PERIODS = useFileSharedPeriods();

  const renderPeriods = () =>
    Object.values(PERIODS).map((it, i) => (
      <div
        key={i}
        className={styles.reviewOption}
        onClick={() => {
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
          closeChangePeriodModal();
        }}
      >
        <div>{__("Открыть календарь")}</div>
      </div>
    </div>
  );
}

export default FilePeriodEdit;

FilePeriodEdit.proptypes = {
  closeChangePeriodModal: PropTypes.func
};
