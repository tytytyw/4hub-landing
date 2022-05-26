import React from "react";
import Button from "../../Button/Button";
import MailButtons from "../../MailButtons/MailButtons";
import styles from "./MailBottomMenu.module.sass";
import { useLocales } from "react-localized";
import { ANSWEAR_MAIL_PATH } from "Store/types";

function MailBottomMenu() {
  const { __ } = useLocales();

  return (
    <div className={styles.bottomPanel}>
      <div className={styles.buttons}>
        <MailButtons path={ANSWEAR_MAIL_PATH} />
      </div>
      <div className={styles.send}>
        <Button>{__("Отправить")}</Button>
      </div>
    </div>
  );
}

export default MailBottomMenu;
