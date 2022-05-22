import React from "react";
import styles from "./WorkLine.module.sass";
import { ReactComponent as Refresh } from "../../../../../assets/PrivateCabinet/mail/refresh.svg";
import { ReactComponent as ContextToggle } from "../../../../../assets/PrivateCabinet/mail/contextToggle.svg";
import { useLocales } from "react-localized";

function WorkLine() {
  const { __ } = useLocales();

  const renderUnReadMails = () => {
    return (
      <div className={styles.unRead}>
        <div className={styles.unReadtitle}>{__("Непрочитанные")}</div>
      </div>
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
          <ContextToggle />
        </div>
      </div>
      <div className={styles.mails}>{renderUnReadMails()}</div>
    </div>
  );
}

export default WorkLine;
