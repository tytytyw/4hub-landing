import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onGetUserInfo } from "Store/actions/startPageAction";
import styles from "./Mail.module.sass";
import MailList from "./MailList/MailList";
import WorkSpace from "./WorkSpace/WorkSpace";
import { getMails, clearFileList, onSetMailPath } from "../../../../Store/actions/CabinetActions";

function Mail() {
  const dispatch = useDispatch();
  const mailAccounts = ["first@gmail.com", "second@gmail.com", "third@gmail.com"];

  useEffect(() => {
    dispatch(onGetUserInfo());
    dispatch(onSetMailPath(`${mailAccounts[0]}/inbox`));
    dispatch(getMails());

    return () => {
      dispatch(clearFileList());
    };
  }, []); //eslint-disable-line

  return (
    <div className={styles.mail}>
      <MailList mailAccounts={mailAccounts} />
      <WorkSpace />
    </div>
  );
}

export default Mail;
