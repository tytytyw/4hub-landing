import React, { useState } from "react";

import styles from "./FileAccessUserList.module.sass";
import { userFileAccess } from "../../../../../../../types/FileAccessRights";
import PropTypes from "prop-types";
import { ReactComponent as UserIcon } from "../../../../../../../assets/PrivateCabinet/userIcon.svg";
import { useLocales } from "react-localized";
import {
  ACCESS_RIGHTS_GRANTED,
  imageSrc,
  NO_ELEMENT,
  SHARED_ACCESS_RIGHTS
} from "../../../../../../../generalComponents/globalVariables";
import { useAccessRightsConst } from "../../../../../../../generalComponents/collections";
import FileAccessEdit from "./FileAccessEdit/FileAccessEdit";

function FileAccessUserList({
  users,
  deleteUser,
  changeUserAccessRightsInUsers
}) {
  const { __ } = useLocales();
  const ACCESS_RIGHTS = useAccessRightsConst();

  const [accessRightsModal, setAccessRightsModal] = useState(NO_ELEMENT);
  const closeAccessRightsModal = () => setAccessRightsModal(NO_ELEMENT);

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

  const showUserAccessStatus = user => {
    if (user.is_write === ACCESS_RIGHTS_GRANTED) {
      return ACCESS_RIGHTS[SHARED_ACCESS_RIGHTS.EDIT];
    }
    if (user.is_download === ACCESS_RIGHTS_GRANTED) {
      return ACCESS_RIGHTS[SHARED_ACCESS_RIGHTS.DOWNLOAD];
    }
    return ACCESS_RIGHTS[SHARED_ACCESS_RIGHTS.WATCH];
  };

  const renderUsers = () =>
    users.map((user, i) => (
      <div key={i} className={styles.user}>
        <span className={styles.cross} onClick={() => deleteUser(user)} />
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
        <div className={styles.copy} onClick={() => setAccessRightsModal(i)}>
          <span>{showUserAccessStatus(user)}</span>
          <img
            src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
            alt="copy"
            className={styles.imageReverse}
          />
        </div>
        {accessRightsModal === i ? (
          <FileAccessEdit
            user={user}
            showUserAccessStatus={showUserAccessStatus}
            changeUserAccessRightsInUsers={changeUserAccessRightsInUsers}
            closeAccessRightsModal={closeAccessRightsModal}
          />
        ) : null}
      </div>
    ));

  return <div className={styles.userListWrap}>{renderUsers()}</div>;
}

export default FileAccessUserList;

FileAccessUserList.propTypes = {
  users: PropTypes.arrayOf(userFileAccess),
  deleteUser: PropTypes.func,
  changeUserAccessRightsInUsers: PropTypes.func
};
