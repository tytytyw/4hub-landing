import React, { useEffect, useState } from "react";
import styles from "./SharedFilesInfo.module.sass";
import { MODALS, SHARED_ACCESS_RIGHTS, SHARED_FILES } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import classnames from "classnames";
import { diffDays } from "@fullcalendar/react";
import { useDispatch, useSelector } from "react-redux";
import { onGetFilesUserShared, onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { useAccessRightsConst } from "../../../../../../generalComponents/collections";
import PropTypes from "prop-types";
import { fileSharedProps } from "../../../../../../types/File";
import ShareUserIcon from "generalComponents/ShareUserIcon/ShareUserIcon";

//eslint-disable-next-line
const CONTEXT = {
  EMPTY: "",
  CHANGE_FILE_ACCESS_RIGHTS: "CHANGE_FILE_ACCESS_RIGHTS"
};
//eslint-disable-next-line
function SharedFilesInfo({ file, isChosen, sharedFilesInfo }) {
  const { __ } = useLocales();
  const ACCESS_RIGHTS = useAccessRightsConst();
  const fileUserShared = useSelector((s) => s.Cabinet.filesUserShared);
  //eslint-disable-next-line
  const [accessRights, setAccessRights] = useState({
    text: ACCESS_RIGHTS.WATCH
  });
  const dispatch = useDispatch();

  const showAccess = (access) => {
    for (const [key, value] of Object.entries(SHARED_ACCESS_RIGHTS)) {
      if (value === access) {
        return ACCESS_RIGHTS[key];
      }
    }
  };
  const sharedUsers = [];

  for (const key in fileUserShared) {
    if (key === file.fid) {
      sharedUsers.push(...fileUserShared[key]);
    }
  }

  useEffect(() => {
    if (sharedFilesInfo === SHARED_FILES.FILES_USER_SHARED) {
      dispatch(
        onGetFilesUserShared(
          SHARED_FILES.API_USERLIST_FILES_USER_SHARED,
          file.fid,
          __(`Не удалось загрузить список пользователей`)
        )
      );
    }
  }, []); //eslint-disable-line

  const compareDates = (endDate) => {
    const today = new Date();
    if (endDate.getTime() - today.getTime() < 0) {
      return __("Бессрочно");
    }
    return __(`Осталось (${diffDays(today, endDate).toFixed()} дней)`);
  };

  const renderUsers = () =>
    sharedUsers.length > 0
      ? sharedUsers.map((user, i) => (
          <div
            key={i}
            className={classnames(styles.userIconWrap, {
              [styles.shownUsers]: 0 > i <= 2,
              [styles.hiddenUsers]: i > 2
            })}
            style={{
              left: `${i * 10}px`
            }}
          >
            <ShareUserIcon userIcon={user.user_icon} name={user.user_name} />
          </div>
        ))
      : null;

  const openFileAccessRightsModal = () => {
    if (sharedFilesInfo === SHARED_FILES.FILES_USER_SHARED) {
      dispatch(onSetModals(MODALS.FILE_ACCESS_RIGHTS, { open: true, file }));
    }
  };

  return (
    <>
      <div
        className={classnames({
          [styles.review]: true,
          [styles.chosen]: isChosen
        })}
      >
        {sharedFilesInfo === SHARED_FILES.FILES_USER_SHARED ? (
          <span onClick={openFileAccessRightsModal}>{__("Настройка доступа")}</span>
        ) : (
          <span>{showAccess(file.is_write)}</span>
        )}
      </div>
      <div className={styles.iconWrap}>
        {sharedFilesInfo === SHARED_FILES.FILES_USER_SHARED ? (
          renderUsers()
        ) : (
          <ShareUserIcon userIcon={file.user_icon} name={file.user_name} />
        )}
      </div>
      <div className={styles.endTime}>
        {__(`Срок пользования: ${compareDates(new Date(sharedUsers[0]?.deadline))}`)}
      </div>
    </>
  );
}

export default SharedFilesInfo;
SharedFilesInfo.propTypes = {
  file: fileSharedProps,
  isChosen: PropTypes.bool,
  sharedFilesInfo: PropTypes.string
};
