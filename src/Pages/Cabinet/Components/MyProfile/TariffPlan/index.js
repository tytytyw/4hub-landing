import React from "react";

import styles from "./TariffPlan.module.sass";
import Button from "../Button";
import TariffCard from "./TariffCard";
import { useData } from "./consts";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const TariffPlan = ({ currentTariff = "Free", balance = 100 }) => {
  const { __ } = useLocales();
  const data = useData();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <p>
            {__("Ваш текущий тарифный план:")}&nbsp;
            <span className={styles.tariff}>{currentTariff}</span>
          </p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.balance}>
            <img
              src={imageSrc + "assets/PrivateCabinet/credit-card-payment.svg"}
              alt="Credit card"
            />
            <p>
              {__("Баланс:")}&nbsp;<span>{balance}$</span>
            </p>
          </div>
          <div className={styles.addBalance}>
            <Button className={styles.addBalanceBtn}>
              {__("Пополнить баланс")}
              <img
                src={imageSrc + "assets/PrivateCabinet/plus-3.svg"}
                alt="Plus"
              />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.cards}>
        {data.map((item, index) => {
          return <TariffCard item={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default TariffPlan;

TariffPlan.propTypes = {
  currentTariff: PropTypes.string,
  balance: PropTypes.number
};
TariffPlan.defaultProps = {
  currentTariff: "Free",
  balance: 100
};
