import React from "react";
import MailButtons from "../MailButtons/MailButtons";
import styles from "./MailBottomMenu.module.sass";
import { useLocales } from "react-localized";
import { ANSWEAR_MAIL_PATH } from "Store/types";
import Button from "../../../../../../generalComponents/CustomableButton/CustomableButton";
import { BUTTON_TYPES } from "generalComponents/globalVariables";

function MailBottomMenu() {
  const { __ } = useLocales();
  const onSendMail = () => {
    // TODO - vz - create modal funcion
  };
  return (
    <div className={styles.bottomPanel}>
      <div className={styles.buttons}>
        <MailButtons path={ANSWEAR_MAIL_PATH} />
      </div>
      <div className={styles.send}>
        <Button style={BUTTON_TYPES.SMALL} onClick={onSendMail}>
          {__("Отправить")}
        </Button>
      </div>
    </div>
  );
}

export default MailBottomMenu;
