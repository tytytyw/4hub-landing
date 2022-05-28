import React from "react";
import styles from "./NewMail.module.sass";
import MailBottomMenu from "Pages/Cabinet/Components/Mail/Components/MailBottomMenu/MailBottomMenu";
import { useLocales } from "react-localized";

function NewMail() {
  const { __ } = useLocales();
  return (
    <div className={styles.newMailWrap}>
      <div className={styles.customInput}>
        <div className={styles.text}>{`${__("От")}:`}</div>
        <input type="text" name="name" />
      </div>
      <div className={styles.customInput}>
        <div className={styles.text}>{`${__("Кому")}:`}</div>
        <input type="text" name="name" />
      </div>
      <div className={styles.customInput}>
        <div className={styles.text}>{`${__("Тема")}:`}</div>
        <input type="text" name="name" />
      </div>
      <div className={styles.textArea}>
        <textarea />
      </div>
      <MailBottomMenu />
    </div>
  );
}

export default NewMail;

NewMail.defaultProps = {};

NewMail.propTypes = {};
