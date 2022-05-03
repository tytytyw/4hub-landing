import React from "react";

import styles from "./FileAccessEdit.module.sass";
import { userFileAccess } from "../../../../../../../../types/FileAccessRights";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { useAccessRightsConst } from "../../../../../../../../generalComponents/collections";
import classNames from "classnames";

function FileAccessEdit({ user, showUserAccessStatus }) {
  const { __ } = useLocales();
  const ACCESS_RIGHTS = useAccessRightsConst();

  return (
    <div className={styles.reviewOptions}>
      <div
        className={styles.reviewOption}
        // onClick={() => {
        //   setReview({ ...review, text: __("Просмотр") });
        // }}
      >
        <div
          className={classNames(styles.radio, {
            [styles.radioChosen]:
              showUserAccessStatus(user) === ACCESS_RIGHTS.WATCH
          })}
        />
        <div className={styles.description}>{__("Просмотр")}</div>
      </div>
      <div
        className={styles.reviewOption}
        // onClick={() => setReview({ ...review, text: __("Скачивание") })}
      >
        <div
          className={classNames(styles.radio, {
            [styles.radioChosen]:
              showUserAccessStatus(user) === ACCESS_RIGHTS.DOWNLOAD
          })}
        />
        <div>Скачивание</div>
      </div>
      <div
        className={`${styles.reviewOption} ${styles.reviewOptionLast}`}
        // onClick={() => {
        //   setReview({ ...review, text: __("Редактировать") });
        // }}
      >
        <div
          className={classNames(styles.radio, {
            [styles.radioChosen]:
              showUserAccessStatus(user) === ACCESS_RIGHTS.EDIT
          })}
        />
        <div>{__("Редактировать")}</div>
      </div>
      <span className={styles.descr}>
        {__("Может упорядочивать, добавлять и редактировать файл")}
      </span>
    </div>
  );
}

export default FileAccessEdit;

FileAccessEdit.propTypes = {
  user: userFileAccess,
  showUserAccessStatus: PropTypes.func
};
