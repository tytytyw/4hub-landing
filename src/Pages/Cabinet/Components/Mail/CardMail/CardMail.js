import React from "react";
import styles from "./CardMail.module.sass";
import PropTypes from "prop-types";
import { ReactComponent as Spam } from "../../../../../assets/PrivateCabinet/mail/spam.svg";
import { ReactComponent as Inbox } from "../../../../../assets/PrivateCabinet/mail/inbox.svg";
import { ReactComponent as Share } from "../../../../../assets/PrivateCabinet/mail/share.svg";
import { ReactComponent as CartMail } from "../../../../../assets/PrivateCabinet/mail/cart-mail.svg";
import { ReactComponent as Clip } from "../../../../../assets/PrivateCabinet/mail/clip.svg";
import { useLocales } from "react-localized";

function CardMail({ from, time, text, files }) {
  const { __ } = useLocales();

  //mylog
  console.log(time);
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <div className={styles.checkbox}>
            <input type="checkbox" />
          </div>
          <div className={styles.name}>{from}</div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.time}>{"6 мин.назад"}</div>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Spam />
            </div>
            <div className={styles.button}>
              <Inbox />
            </div>
            <div className={styles.button}>
              <Share />
            </div>
            <div className={styles.button}>
              <CartMail />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.text}>{text}</div>
      <div className={styles.files}>
        <Clip />
        {`${files.length} ${__("Вложенных файла")}`}
      </div>
    </div>
  );
}

export default CardMail;

CardMail.propTypes = {
  from: PropTypes.string,
  time: PropTypes.instanceOf(Date),
  text: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.string)
};
