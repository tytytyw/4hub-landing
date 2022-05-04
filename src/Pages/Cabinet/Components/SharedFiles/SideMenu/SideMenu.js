import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SideMenu.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as SharedFilesIcon } from "../../../../../assets/PrivateCabinet/sharedFiles.svg";
import { ReactComponent as FolderIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import { useLocales } from "react-localized";
import {
  onChooseFiles,
  onSetModals,
} from "../../../../../Store/actions/CabinetActions";
import {
  MODALS,
  SHARED_FILES,
} from "../../../../../generalComponents/globalVariables";
import api from "../../../../../api";
import {
  getStorageItem,
  setStorageItem,
} from "../../../../../generalComponents/StorageHelper";

const SideMenu = ({
  sideMenuCollapsed,
  setSideMenuCollapsed,
  sideMenuChosenItem,
  setSideMenuChosenItem,
}) => {
  const { __ } = useLocales();
  const uid = useSelector((s) => s.user.uid);
  const [filesAmount, setFilesAmount] = useState({
    [SHARED_FILES.FILES_USER_SHARED]:
      getStorageItem(`${SHARED_FILES.FILES_USER_SHARED}-${uid}`) ?? 0,
    [SHARED_FILES.FILES_SHARED_TO_USER]:
      getStorageItem(`${SHARED_FILES.FILES_SHARED_TO_USER}-${uid}`) ?? 0,
  });
  const globalSearch = useSelector((s) => s.Cabinet.search);
  const dispatch = useDispatch();

  const getFilesAmount = (url) => api.get(`${url}?uid=${uid}`);

  const setTopError = (message) =>
    dispatch(
      onSetModals(MODALS.TOP_MESSAGE, {
        open: true,
        type: "error",
        message,
      })
    );

  useEffect(() => {
    Promise.allSettled([
      getFilesAmount(SHARED_FILES.API_FILES_USER_SHARED_AMOUNT),
      getFilesAmount(SHARED_FILES.API_FILES_SHARED_TO_USER_AMOUNT),
    ])
      .then(([userShared, sharedToUser]) => {
        if (
          userShared.value.data.ok === 1 &&
          sharedToUser.value.data.ok === 1
        ) {
          setFilesAmount((s) => ({
            ...s,
            [SHARED_FILES.FILES_USER_SHARED]: userShared.value.data.col,
            [SHARED_FILES.FILES_SHARED_TO_USER]: sharedToUser.value.data.col,
          }));
          setStorageItem(
            `${SHARED_FILES.FILES_SHARED_TO_USER}-${uid}`,
            sharedToUser.value.data.col
          );
          setStorageItem(
            `${SHARED_FILES.FILES_USER_SHARED}-${uid}`,
            userShared.value.data.col
          );
        } else {
          setTopError(__("Ошибка загрузки количества файлов"));
        }
      })
      .catch(() => setTopError(__("Ошибка загрузки количества файлов")));
  }, []);

  return (
    <div
      className={classNames({
        [styles.sideMenu]: true,
        [styles.sideMenuCollapsed]: sideMenuCollapsed,
      })}
    >
      <div className={styles.header}>
        <div className={styles.headerName}>
          <SharedFilesIcon id={styles.headerIcon} title="" />
          {sideMenuCollapsed ? null : <span>{__("Расшаренные файлы")}</span>}
        </div>
        <FolderIcon
          onClick={() => setSideMenuCollapsed((value) => !value)}
          id={styles.headerArrow}
          title={sideMenuCollapsed ? __("развернуть") : __("свернуть")}
        />
      </div>

      <div className={styles.menu}>
        <div
          onClick={() => {
            dispatch(
              onChooseFiles(
                "global/all",
                globalSearch,
                1,
                () => {},
                () => {},
                "",
                SHARED_FILES.FILES_USER_SHARED
              )
            );
            setSideMenuChosenItem(SHARED_FILES.FILES_USER_SHARED);
          }}
          className={classNames({
            [styles.menuItem]: true,
            [styles.active]:
              sideMenuChosenItem === SHARED_FILES.FILES_USER_SHARED,
          })}
        >
          {!sideMenuCollapsed ? __("Файлы которые расшарил я") : __("Я")}
          <span className={styles.count}>
            ({filesAmount[SHARED_FILES.FILES_USER_SHARED]})
          </span>
        </div>
        <div
          onClick={() => {
            dispatch(
              onChooseFiles(
                "global/all",
                globalSearch,
                1,
                () => {},
                () => {},
                "",
                SHARED_FILES.FILES_SHARED_TO_USER
              )
            );
            setSideMenuChosenItem(SHARED_FILES.FILES_SHARED_TO_USER);
          }}
          className={classNames({
            [styles.menuItem]: true,
            [styles.active]:
              sideMenuChosenItem === SHARED_FILES.FILES_SHARED_TO_USER,
          })}
        >
          {!sideMenuCollapsed ? __("Файлы расшаренные мне") : __("Мне")}
          <span className={styles.count}>
            ({filesAmount[SHARED_FILES.FILES_SHARED_TO_USER]})
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;

SideMenu.propTypes = {
  sideMenuCollapsed: PropTypes.bool,
  setSideMenuCollapsed: PropTypes.func,
  sideMenuChosenItem: PropTypes.string,
  setSideMenuChosenItem: PropTypes.func,
};
