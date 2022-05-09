import React, { useEffect, useState } from "react";
import styles from "./SharedFilesInfo.module.sass";
import { MODALS, SHARED_ACCESS_RIGHTS, SHARED_FILES } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import classnames from "classnames";
import { ReactComponent as UserIcon } from "../../../../../../assets/PrivateCabinet/userIcon.svg";
import { diffDays } from "@fullcalendar/react";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import api from "../../../../../../api";
import { useAccessRightsConst } from "../../../../../../generalComponents/collections";
import PropTypes from "prop-types";
import { fileSharedProps } from "../../../../../../types/File";

//eslint-disable-next-line
const CONTEXT = {
  EMPTY: "",
  CHANGE_FILE_ACCESS_RIGHTS: "CHANGE_FILE_ACCESS_RIGHTS"
};
//eslint-disable-next-line
function SharedFilesInfo({ file, isChosen, sharedFilesInfo }) {
  const { __ } = useLocales();
  const ACCESS_RIGHTS = useAccessRightsConst();

  const uid = useSelector((s) => s.user.uid);
  //eslint-disable-next-line
  const [accessRights, setAccessRights] = useState({
    text: ACCESS_RIGHTS.WATCH
  });
  const [sharedUsers, setSharedUsers] = useState([]);
  const dispatch = useDispatch();

  const showError = (message) =>
    dispatch(
      onSetModals(MODALS.TOP_MESSAGE, {
        open: true,
        type: MODALS.ERROR,
        message
      })
    );

  const showAccess = (access) => {
    for (const [key, value] of Object.entries(SHARED_ACCESS_RIGHTS)) {
      if (value === access) {
        return ACCESS_RIGHTS[key];
      }
    }
  };

  useEffect(() => {
    if (sharedFilesInfo === SHARED_FILES.FILES_USER_SHARED) {
      const params = `?uid=${uid}&fid=${file.fid}`;
      api
        .get(SHARED_FILES.API_USERLIST_FILES_USER_SHARED + params)
        .then((response) => {
          if (response.data.ok) {
            setSharedUsers(response.data.access);
          } else {
            showError(__(`Не удалось загрузить список пользователей, которым расшарен файл ${file.fname}`));
          }
        })
        .catch(() => {
          showError(__(`Не удалось загрузить список пользователей, которым расшарен файл ${file.fname}`));
        });
    }
  }, []); //eslint-disable-line

  const compareDates = (endDate) => {
    const today = new Date();
    if (endDate.getTime() - today.getTime() < 0) {
      return __("Бессрочно");
    }
    return __(`Осталось (${diffDays(today, endDate).toFixed()} дней)`);
  };

  const renderUser = (file) => {
    return file?.user_icon?.[0] ? (
      <img src={file?.user_icon?.[0]} className={styles.userIcon} alt="" />
    ) : (
      <UserIcon title={file.user_name} />
    );
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
            {renderUser(user)}
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
        {sharedFilesInfo === SHARED_FILES.FILES_USER_SHARED ? renderUsers() : renderUser(file)}
      </div>
      <div className={styles.endTime}>{__(`Срок пользования: ${compareDates(new Date(file.deadline))}`)}</div>
    </>
  );
}

export default SharedFilesInfo;
SharedFilesInfo.propTypes = {
  file: fileSharedProps,
  isChosen: PropTypes.bool,
  sharedFilesInfo: PropTypes.string
};
