import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onGetUserInfo } from "Store/actions/startPageAction";
import styles from "./Mail.module.sass";
import PropTypes from "prop-types";
import MailList from "./MailList/MailList";
import WorkSpace from "./WorkSpace/WorkSpace";

function Mail({ setMenuItem }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetUserInfo());
    setMenuItem("myFiles");
    return () => setMenuItem("");
  }, []); //eslint-disable-line

  return (
    <div className={styles.mail}>
      <MailList />
      <WorkSpace />
    </div>
  );
}

export default Mail;

Mail.propTypes = {
  setMenuItem: PropTypes.func
};
