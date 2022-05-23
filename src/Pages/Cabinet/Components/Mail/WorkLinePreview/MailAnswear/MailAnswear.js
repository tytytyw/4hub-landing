import React from "react";
import styles from "./MailAnswear.module.sass";
import { ReactComponent as Share } from "../../../../../../assets/PrivateCabinet/mail/share.svg";
import { ReactComponent as FullScreen } from "../../../../../../assets/PrivateCabinet/mail/fullScreen.svg";
import classNames from "classnames";

function MailAnswear() {
  return (
    <div className={styles.answear}>
      <div className={styles.receiver}>
        <div className={styles.icon}>
          <Share />
        </div>
        <div className={styles.name}>{`Алина Квиталина   «AlinaKvitalina@gmail.com»`}</div>
        <div className={classNames(styles.icon, styles.fullScreen)}>
          <FullScreen />
        </div>
      </div>
      <div className={styles.text}>TextArea</div>
      <div className={styles.bottomPanel}>
        <div className={styles.buttons}>iconka iconka iconka iconka</div>
        <div className={styles.send}>knopka</div>
      </div>
    </div>
  );
}

export default MailAnswear;
