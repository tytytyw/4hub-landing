import React from "react";
import { useSelector } from "react-redux";
import styles from "./OptionalDate.module.sass";
import { useLocation } from "react-router";
import classNames from "classnames";
import { useLocales } from "react-localized";
import { fileProps } from "../../../../../../types/WorkElements";

import { fileProps } from "../../../../../../types/WorkElements";

const OptionalDate = ({ file }) => {
  const { __ } = useLocales();
  const { pathname } = useLocation();
  const size = useSelector((state) => state.Cabinet.size);

  const getText = () => {
    switch (pathname) {
      case "/downloaded-files":
        return {
          title: __("Дата загрузки: "),
          value: file.ctime?.split(" ")[0] ?? ""
        };
      // TODO: get date of arhive
      case "/archive":
        return {
          title: __("Дата архивирования: "),
          value: file?.date_archive ? file.date_archive?.split(" ")[0] ?? "" : ""
        };
      default:
        return "";
    }
  };
  return (
    <div className={classNames(styles.wrapper, styles[size])}>
      <span className={styles.description}>{getText().title}</span>
      <span className={styles.value}>{getText().value}</span>
    </div>
  );
};

export default OptionalDate;

OptionalDate.propTypes = {
  file: fileProps
};
