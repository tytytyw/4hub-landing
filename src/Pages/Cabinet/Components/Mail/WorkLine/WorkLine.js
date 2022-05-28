import React from "react";
import styles from "./WorkLine.module.sass";
import { ReactComponent as Refresh } from "../../../../../assets/PrivateCabinet/mail/refresh.svg";
import { useLocales } from "react-localized";
import CardMail from "../CardMail/CardMail";
import PropTypes from "prop-types";
import ThreeDots from "generalComponents/ThreeDots/ThreeDots";

function WorkLine({ mail }) {
  const { __ } = useLocales();

  const unReadMails = [];
  const readMails = [];

  mail?.forEach((element) => {
    element.isRead ? readMails.push(element) : unReadMails.push(element);
  });

  const renderListMails = (arr, text) => {
    return arr.length > 0 ? (
      <>
        <div className={styles.title}>{text}</div>
        {arr.map((item) => {
          return (
            <div key={item.id}>
              <CardMail from={item.from} time={item.date} text={item.text} files={item.files} />
            </div>
          );
        })}
      </>
    ) : null;
  };

  const renderMails = () => {
    return (
      <>
        {renderListMails(unReadMails, __("Прочитанные"))}
        {renderListMails(readMails, __("Непрочитанные"))}
      </>
    );
  };

  return (
    <div className={styles.workLine}>
      <div className={styles.topPanel}>
        <div className={styles.buttons}>
          <>
            <input className={styles.checkbox} type="checkbox" />
          </>
          <div className={styles.refresh} onClick={() => console.log("Refresh")}>
            <Refresh />
          </div>
        </div>
        <div className={styles.contextMenu} onClick={() => console.log("Context menu")}>
          <ThreeDots />
        </div>
      </div>
      <div className={styles.mails}>{renderMails()}</div>
    </div>
  );
}

export default WorkLine;

WorkLine.propTypes = {
  mail: PropTypes.arrayOf(
    PropTypes.exact({
      from: PropTypes.string,
      date: PropTypes.string,
      text: PropTypes.string,
      files: PropTypes.arrayOf(PropTypes.string),
      id: PropTypes.number,
      isRead: PropTypes.bool
    })
  )
};
