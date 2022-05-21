import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onGetUserInfo } from "Store/actions/startPageAction";
import styles from "./Mail.module.sass";
import MailList from "./MailList/MailList";
import WorkSpace from "./WorkSpace/WorkSpace";
import { useStandardMail } from "../../../../generalComponents/collections";
import { onSetPath, getInboxMails } from "../../../../Store/actions/CabinetActions";

function Mail() {
  const dispatch = useDispatch();
  const STANDARD_MAIL = useStandardMail();

  useEffect(() => {
    dispatch(onGetUserInfo());
    dispatch(onSetPath(STANDARD_MAIL.INBOX.path));
    dispatch(getInboxMails());
    return () => {};
  }, []); //eslint-disable-line

  return (
    <div className={styles.mail}>
      <MailList />
      <WorkSpace />
    </div>
  );
}

export default Mail;
