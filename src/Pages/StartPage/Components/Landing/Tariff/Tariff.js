import React from "react";
import styles from "./Tariff.module.sass";
import classNames from "classnames";
import { ReactComponent as FolderIcon } from "../../../../../assets/StartPage/folder.svg";
import { ReactComponent as PieChartIcon } from "../../../../../assets/StartPage/pie_chart.svg";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

function Tariff({ name, cost, currentPlan, promo, discont }) {
  const { __ } = useLocales();
  return (
    <div className={styles.tariff}>
      <div
        className={classNames({
          [styles.tariff_line]: true,
          [styles.tariff_line_promo]: !!promo
        })}>
        {promo}
      </div>
      <div className={styles.container}>
        <p className={styles.tariff_name}>{name}</p>
        <p className={styles.tariff_cost}>
          {promo ? (
            <>
              <span className={styles.tariff_cost_old}>${cost}</span>
              <span className={styles.tariff_cost_new}>
                ${cost - (cost / 100) * discont}
              </span>
            </>
          ) : (
            `$${cost}`
          )}
        </p>
        <p className={styles.tariff_cost_clarification}>
          {__("На пользователя в месяц начиная с 3 польз.")}
        </p>
        <ul className={styles.tariff_descrp}>
          <li className={styles.tariff_descrp_item}>
            <PieChartIcon className={styles.tariff_descrp_ico} />
            <p className={styles.tariff_descrp_text}>
              {__("2 000 ГБ места для безопасного хранения файлов")}
            </p>
          </li>
          <li className={styles.tariff_descrp_item}>
            <FolderIcon className={styles.tariff_descrp_ico} />
            <p className={styles.tariff_descrp_text}>
              {__(
                "Простые инструменты для храннения и предоставления доступа и совместной работы"
              )}
            </p>
          </li>
          <button
            className={classNames({
              [styles.tariff_btn]: true,
              [styles.tariff_current_btn]: currentPlan,
              [styles.tariff_promo_btn]: promo
            })}>
            {currentPlan ? __("Текущий план") : __("Купить")}
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Tariff;
Tariff.propTypes = {
  name: PropTypes.string,
  cost: PropTypes.number,
  currentPlan: PropTypes.bool,
  promo: PropTypes.string,
  discont: PropTypes.number
};
