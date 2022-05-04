import React from "react";

import styles from "./OptionButtomLine.module.sass";
import classNames from "classnames";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const OptionButtomLine = ({ selectedDevices, onSubmit, onCancel }) => {
  const { __ } = useLocales();
  return (
    <div className={styles.optionBottomLine}>
      <div className={styles.cancel} onClick={onCancel}>
        {__("Отмена")}
      </div>
      <div
        className={classNames({
          [styles.buttonDisabled]: true,
          [styles.edit]: selectedDevices.length > 0
        })}
        onClick={() => onSubmit()}
      >
        {__("Блокировать")}
      </div>
    </div>
  );
};

export default OptionButtomLine;

OptionButtomLine.propTypes = {
  selectedDevices: PropTypes.array,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};
