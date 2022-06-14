import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onGetUserInfo } from "Store/actions/startPageAction";
import styles from "./Mail.module.sass";
// import MailList from "./MailList/MailList";
// import WorkSpace from "./WorkSpace/WorkSpace";
import { getMails, clearMailList, onSetMailPath } from "../../../../Store/actions/CabinetActions";

function Mail() {
  const dispatch = useDispatch();
  const mailAccounts = ["first@gmail.com", "second@gmail.com", "third@gmail.com"];

  useEffect(() => {
    dispatch(onGetUserInfo());
    dispatch(onSetMailPath(`${mailAccounts[0]}/inbox`));
    dispatch(getMails());

    return () => {
      dispatch(clearMailList());
    };
  }, []); //eslint-disable-line

  return (
    <div className={styles.mail}>
      <iframe src="https://fs2.mh.net.ua/mail/test" title="mail" frameBorder="0" allowFullScreen />
      {/*<MailList mailAccounts={mailAccounts} />*/}
      {/*<WorkSpace />*/}
    </div>
  );
}

export default Mail;
