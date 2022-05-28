import React from "react";
import styles from "./MailAnswear.module.sass";
import { ReactComponent as Share } from "../../../../../../assets/PrivateCabinet/mail/share.svg";
import { ReactComponent as FullScreen } from "../../../../../../assets/PrivateCabinet/mail/fullScreen.svg";
import classNames from "classnames";
import { useSelector } from "react-redux";
import MailBottomMenu from "../../Components/MailBottomMenu/MailBottomMenu";

function MailAnswear() {
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
      <MailBottomMenu />
    </div>
  );
}

export default MailAnswear;
