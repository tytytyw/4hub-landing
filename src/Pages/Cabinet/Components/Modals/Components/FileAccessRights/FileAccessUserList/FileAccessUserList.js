import React, { useState } from "react";

import styles from "./FileAccessUserList.module.sass";
import { userFileAccess } from "../../../../../../../types/FileAccessRights";
import PropTypes from "prop-types";
import { ReactComponent as UserIcon } from "../../../../../../../assets/PrivateCabinet/userIcon.svg";
import { useLocales } from "react-localized";
import {
  imageSrc,
  SHARED_ACCESS_RIGHTS
} from "../../../../../../../generalComponents/globalVariables";
import { useAccessRightsConst } from "../../../../../../../generalComponents/collections";

function FileAccessUserList({ users }) {
  const { __ } = useLocales();
  const ACCESS_RIGHTS = useAccessRightsConst();

  const renderUserIcon = user => {
    return user?.user_icon?.[0] ? (
      <img src={user?.user_icon?.[0]} />
    ) : (
      <UserIcon />
    );
  };

  const showEndDate = date => {
    if (new Date(date).getTime() > new Date().getTime()) {
      return __(`до ${date.split(" ")[0]}`);
    }
    if (new Date().getTime() > new Date(date).getTime()) {
      return __(`неверный`);
    }
    return __("Бесконечный");
  };

  const showAccess = access => {
    for (const [key, value] of Object.entries(SHARED_ACCESS_RIGHTS)) {
      if (value === access) {
        return ACCESS_RIGHTS[key];
        break;
      }
    }
  };

  const renderUsers = () =>
    users.map((user, i) => (
      <div key={i} className={styles.user}>
        <div className={styles.iconWrap}>{renderUserIcon(user)}</div>
        <div className={styles.userName}>
          {user.name} {user.sname}
        </div>
        <div className={styles.copy}>
          <span>{__(`Срок хранения ${showEndDate(user.date_last)}`)}</span>
          <img
            src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
            alt="copy"
            className={styles.imageReverse}
          />
        </div>
        <div className={styles.copy}>
          <span>{showAccess(user.is_write)}</span>
          <img
            src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
            alt="copy"
            className={styles.imageReverse}
          />
        </div>
      </div>
    ));

  return <div className={styles.userListWrap}>{renderUsers()}</div>;
}

export default FileAccessUserList;

FileAccessUserList.propTypes = {
  users: PropTypes.arrayOf(userFileAccess)
};
