import React from "react";
import styles from "./MailMenu.module.sass";
import PropTypes from "prop-types";

function MailMenu({ item }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <img src={`./assets/PrivateCabinet/mail/${item.icon}.svg`} alt="img" />
      </div>
      <div className={styles.item}>{item.name}</div>
    </div>
  );
}

export default MailMenu;

MailMenu.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number,
    icon: PropTypes.string,
    name: PropTypes.string
  })
};
