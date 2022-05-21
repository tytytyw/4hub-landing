import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onGetUserInfo } from "Store/actions/startPageAction";
import styles from "./Mail.module.sass";
import PropTypes from "prop-types";
import MailSidebar from "./MailSidebar/MailSidebar";
import Header from "./Header/Header";

function Mail({ setMenuItem }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetUserInfo());
    setMenuItem("myFiles");
    return () => setMenuItem("");
  }, []); //eslint-disable-line

  return (
    <div className={styles.mail}>
      <div className={styles.mailSidebar}>
        <MailSidebar />
      </div>
      <Header />
    </div>
  );
}

export default Mail;

Mail.propTypes = {
  setMenuItem: PropTypes.func
};
