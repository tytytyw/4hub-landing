import React from "react";
import styles from "./WorkLinePreview.module.sass";
import MailPreview from "./MailPreview/MailPreview";
import MailAnswear from "./MailAnswear/MailAnswear";

function WorkLinePreview() {
  return (
    <div className={styles.workLinePreview}>
      <MailPreview />
      <MailAnswear />
    </div>
  );
}

export default WorkLinePreview;
