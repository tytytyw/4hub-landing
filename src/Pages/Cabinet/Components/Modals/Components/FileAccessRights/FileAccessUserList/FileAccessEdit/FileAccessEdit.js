import React from "react";

import styles from "./FileAccessEdit.module.sass";
import { userFileAccess } from "../../../../../../../../types/FileAccessRights";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { useAccessRightsConst } from "../../../../../../../../generalComponents/collections";
import classNames from "classnames";
import {
  ACCESS_RIGHTS_FORBIDDEN,
  ACCESS_RIGHTS_GRANTED,
} from "../../../../../../../../generalComponents/globalVariables";

function FileAccessEdit({
  user,
  showUserAccessStatus,
  changeUserAccessRightsInUsers,
  closeAccessRightsModal,
}) {
  const { __ } = useLocales();
  const ACCESS_RIGHTS = useAccessRightsConst();

  const changeAccessRights = (accessRights) => {
    const access = {
      is_write:
        accessRights === ACCESS_RIGHTS.EDIT
          ? ACCESS_RIGHTS_GRANTED
          : ACCESS_RIGHTS_FORBIDDEN,
      is_download:
        accessRights === ACCESS_RIGHTS.DOWNLOAD
          ? ACCESS_RIGHTS_GRANTED
          : ACCESS_RIGHTS_FORBIDDEN,
    };
    return changeUserAccessRightsInUsers({ ...user, ...access });
  };

  return (
    <div className={styles.reviewOptions}>
      <div
        className={styles.reviewOption}
        onClick={() => {
          changeAccessRights(ACCESS_RIGHTS.WATCH);
          closeAccessRightsModal();
        }}
      >
        <div
          className={classNames(styles.radio, {
            [styles.radioChosen]:
              showUserAccessStatus(user) === ACCESS_RIGHTS.WATCH,
          })}
        />
        <div className={styles.description}>{__("Просмотр")}</div>
      </div>
      <div
        className={styles.reviewOption}
        onClick={() => {
          changeAccessRights(ACCESS_RIGHTS.DOWNLOAD);
          closeAccessRightsModal();
        }}
      >
        <div
          className={classNames(styles.radio, {
            [styles.radioChosen]:
              showUserAccessStatus(user) === ACCESS_RIGHTS.DOWNLOAD,
          })}
        />
        <div>Скачивание</div>
      </div>
      <div
        className={`${styles.reviewOption} ${styles.reviewOptionLast}`}
        onClick={() => {
          changeAccessRights(ACCESS_RIGHTS.EDIT);
          closeAccessRightsModal();
        }}
      >
        <div
          className={classNames(styles.radio, {
            [styles.radioChosen]:
              showUserAccessStatus(user) === ACCESS_RIGHTS.EDIT,
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
  showUserAccessStatus: PropTypes.func,
  changeUserAccessRightsInUsers: PropTypes.func,
  closeAccessRightsModal: PropTypes.func,
};
