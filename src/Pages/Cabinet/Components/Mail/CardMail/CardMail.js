import React from "react";
import styles from "./CardMail.module.sass";
import PropTypes from "prop-types";
import { ReactComponent as Clip } from "../../../../../assets/PrivateCabinet/mail/clip.svg";
import { useLocales } from "react-localized";
import MailButtons from "../Components/MailButtons/MailButtons";
import { CARD_MAIL_PATH } from "Store/types";

function CardMail({ from, time, text, files }) {
  const { __ } = useLocales();
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
          <div className={styles.time}>{time}</div>
          <div className={styles.buttons}>
            <MailButtons path={CARD_MAIL_PATH} />
          </div>
        </div>
      </div>
      <div className={styles.text}>{text}</div>
      {files.length > 0 ? (
        <div className={styles.files}>
          <Clip />
          {files.length} {__("Вложенных файла")}
        </div>
      ) : null}
    </div>
  );
}

export default CardMail;

CardMail.defaultProps = {
  files: []
};

CardMail.propTypes = {
  from: PropTypes.string,
  time: PropTypes.string,
  text: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.string)
};
