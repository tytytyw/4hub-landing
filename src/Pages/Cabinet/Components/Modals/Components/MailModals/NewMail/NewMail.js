import React from "react";
import styles from "./NewMail.module.sass";
import { MAIL_MODALS } from "../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { addNoteParams } from "../../../../../../../types/Tasks";
import MailBottomMenu from "Pages/Cabinet/Components/Mail/Components/MianBottomMenu/MailBottomMenu";
// import { useDispatch } from "react-redux";
import { useLocales } from "react-localized";
// type, params, closeModal
function NewMail() {
  const { __ } = useLocales();
  // const dispatch = useDispatch();
  return (
    <div className={styles.newMailWrap}>
      <div className={styles.customInput}>
        <div className={styles.text}>{__("От:")}</div>
        <input type="text" name="name" />
      </div>
      <div className={styles.customInput}>
        <div className={styles.text}>{__("Кому:")}</div>
        <input type="text" name="name" />
      </div>
      <div className={styles.customInput}>
        <div className={styles.text}>{__("Тема:")}</div>
        <input type="text" name="name" />
      </div>
      <div className={styles.textArea}>
        <textarea />
      </div>
      <MailBottomMenu />
    </div>
  );
}

export default NewMail;

NewMail.defaultProps = {
  closeModal: () => {}
};

NewMail.propTypes = {
  type: PropTypes.oneOf(Object.values(MAIL_MODALS)).isRequired,
  params: addNoteParams.isRequired,
  closeModal: PropTypes.func
};
