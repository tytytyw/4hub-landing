import React from "react";
import styles from "./MailAnswear.module.sass";
import { ReactComponent as Share } from "../../../../../../assets/PrivateCabinet/mail/share.svg";
import { ReactComponent as FullScreen } from "../../../../../../assets/PrivateCabinet/mail/fullScreen.svg";
import classNames from "classnames";
import MailButtons from "../../MailButtons/MailButtons";
import { ANSWEAR_MAIL_PATH } from "Store/types";
import { useSelector } from "react-redux";
import { useLocales } from "react-localized";
import Button from "Pages/Cabinet/Components/MyProfile/Button";

function MailAnswear() {
  const { __ } = useLocales();
  const { theme } = useSelector((state) => state.user.userInfo);
  return (
    <div className={styles.answear}>
      <div className={styles.receiver}>
        <div className={styles.icon}>
          <Share />
        </div>
        <div className={styles.name}>{`Алина Квиталина «AlinaKvitalina@gmail.com»`}</div>
        <div className={classNames(styles.icon, styles.fullScreen)}>
          <FullScreen />
        </div>
      </div>
      <div className={classNames(styles.text, `scrollbar-thin-${theme}`)}>
        <textarea />
      </div>
      <div className={styles.bottomPanel}>
        <div className={styles.buttons}>
          <MailButtons path={ANSWEAR_MAIL_PATH} />
        </div>
        <div className={styles.send}>
          <Button>{__("Отправить")}</Button>
        </div>
      </div>
    </div>
  );
}

export default MailAnswear;
