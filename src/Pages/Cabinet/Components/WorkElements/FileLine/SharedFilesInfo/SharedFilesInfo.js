import React, { useEffect, useState } from "react";
import styles from "./SharedFilesInfo.module.sass";
import {
  MODALS,
  SHARED_FILES
} from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import classnames from "classnames";
import { ReactComponent as UserIcon } from "../../../../../../assets/PrivateCabinet/userIcon.svg";
import { diffDays } from "@fullcalendar/react";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import api from "../../../../../../api";

const useAccessRightsConst = () => {
  const { __ } = useLocales();
  return {
    WATCH: __("Просмотр"),
    DOWNLOAD: __("Скачивание"),
    EDIT: __("Редактировать")
  };
};

const CONTEXT = {
  EMPTY: "",
  CHANGE_FILE_ACCESS_RIGHTS: "CHANGE_FILE_ACCESS_RIGHTS"
};

function SharedFilesInfo({ file, isChosen, sharedFilesInfo }) {
  const { __ } = useLocales();
  const ACCESS_RIGHTS = useAccessRightsConst();

  const uid = useSelector(s => s.user.uid);
  const [context, setContext] = useState(CONTEXT.EMPTY);
  const [accessRights, setAccessRights] = useState({
    text: ACCESS_RIGHTS.WATCH
  });
  const [sharedUsers, setSharedUsers] = useState([]);
  const dispatch = useDispatch();

  const showError = message =>
    dispatch(
      onSetModals(MODALS.TOP_MESSAGE, {
        open: true,
        type: MODALS.ERROR,
        message
      })
    );

  useEffect(() => {
    if (sharedFilesInfo === SHARED_FILES.FILES_USER_SHARED) {
      const params = `?uid=${uid}&fid=${file.fid}`;
      api
        .get(SHARED_FILES.API_USERLIST_FILES_USER_SHARED + params)
        .then(response => {
          if (response.data.ok) {
            setSharedUsers(response.data.access);
          } else {
            showError(
              __(
                `Не удалось загрузить список пользователей, которым расшарен файл ${file.fname}`
              )
            );
          }
        })
        .catch(() => {
          showError(
            __(
              `Не удалось загрузить список пользователей, которым расшарен файл ${file.fname}`
            )
          );
        });
    }
  }, []);

  const compareDates = endDate => {
    const today = new Date();
    if (endDate.getTime() - today.getTime() < 0) {
      return __("Бессрочно");
    }
    return __(`Осталось (${diffDays(today, endDate).toFixed()} дней)`);
  };

  const renderUser = file => {
    return file?.user_icon?.[0] ? (
      <img src={file?.user_icon?.[0]} />
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
          <span onClick={openFileAccessRightsModal}>
            {__("Настройка доступа")}
          </span>
        ) : (
          <span>{accessRights.text}</span>
        )}
      </div>
      <div className={styles.iconWrap}>
        {sharedFilesInfo === SHARED_FILES.FILES_USER_SHARED
          ? renderUsers()
          : renderUser(file)}
      </div>
      <div className={styles.endTime}>
        {__(`Срок пользования: ${compareDates(new Date(file.deadline))}`)}
      </div>
    </>
  );
}

export default SharedFilesInfo;
