import React, { useEffect, useRef, useState } from "react";

import styles from "./FileAccessRights.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import {
  NO_ELEMENT,
  FILE_ACCESS_RIGHTS,
  MODALS,
  TOP_MESSAGE_TYPE
} from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import { ReactComponent as CopyIcon } from "../../../../../../assets/PrivateCabinet/copy.svg";
import FileAccessUserList from "./FileAccessUserList/FileAccessUserList";
import { ReactComponent as UserIcon } from "../../../../../../assets/PrivateCabinet/userIcon.svg";
import api from "../../../../../../api";
import { checkResponseStatus } from "../../../../../../generalComponents/generalHelpers";
import classNames from "classnames";
import Calendar from "../../../../../StartPage/Components/Calendar";
import { parseCalendarDateToDate } from "../../../../../../generalComponents/CalendarHelper";
import { formatDateStandard } from "../../../../../../generalComponents/CalendarHelper";
import Loader from "generalComponents/Loaders/4HUB";

function FileAccessRights() {
  const { __ } = useLocales();

  const dispatch = useDispatch();
  const fileAccessRights = useSelector((s) => s.Cabinet.modals.fileAccessRights);
  const [url, setUrl] = useState(__("Загрузка..."));
  const [users, setUsers] = useState([]);
  const linkRef = useRef(null);
  const uid = useSelector((s) => s.user.uid);
  const [params, setParams] = useState({
    usersToDelete: [],
    usersToChangeAccessRights: []
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [chosenUser, setChosenUser] = useState(null);
  const [loadingType, setLoadingType] = useState("");

  const changeCalendarDate = (date) => {
    changeUserAccessRightsInUsers({ ...chosenUser, deadline: formatDateStandard(parseCalendarDateToDate(date)) });
    setChosenUser(null);
  };

  const closeModal = () =>
    dispatch(
      onSetModals(MODALS.FILE_ACCESS_RIGHTS, {
        ...fileAccessRights,
        open: false,
        file: {}
      })
    );

  const setTopMessage = (type, message) => dispatch(onSetModals(MODALS.TOP_MESSAGE, { open: true, type, message }));

  const getLink = () => {
    setUrl(__("Загрузка..."));
    fileAccessRights.file?.file_link
      ? setUrl(fileAccessRights.file.file_link)
      : setTopMessage(TOP_MESSAGE_TYPE.ERROR, __(`Ссылка на файл не найдена. Попробуйте еще раз`)) &&
        setUrl(__("Ошибка"));
  };

  const loadUserList = () => {
    api
      .get(FILE_ACCESS_RIGHTS.API_SHARED_FILES_USER_LIST, {
        params: {
          uid,
          fid: fileAccessRights.file.fid
        }
      })
      .then((res) => {
        if (checkResponseStatus(res.data.ok)) {
          setUsers(res.data.access);
        } else {
          setTopMessage(TOP_MESSAGE_TYPE.ERROR, __("Не удалось загузить список пользователей"));
        }
      })
      .catch((err) => setTopMessage(TOP_MESSAGE_TYPE.ERROR, err));
  };

  useEffect(() => {
    getLink();
    loadUserList();
  }, []); // eslint-disable-line

  const copyLink = () => {
    if (url) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url);
      } else {
        linkRef.current.value = url;
        linkRef.current.focus();
        linkRef.current.select();
        document.execCommand("copy");
        linkRef.current.value = "";
      }
      dispatch(
        onSetModals(MODALS.TOP_MESSAGE, {
          open: true,
          type: TOP_MESSAGE_TYPE.MESSAGE,
          message: __("Ссылка скопирована")
        })
      );
    }
  };

  const deleteUserFromUsers = (user) => {
    setParams((s) => ({
      ...s,
      usersToDelete: [...s.usersToDelete, ...users.filter((it) => it.uid === user.uid)],
      usersToChangeAccessRights: s.usersToChangeAccessRights.filter((it) => it.uid !== user.uid)
    }));
    setUsers((s) => s.filter((it) => it.uid !== user.uid));
  };

  const deleteUsers = async () => {
    for await (let user of params.usersToDelete) {
      await api
        .post(FILE_ACCESS_RIGHTS.API_DELETE_USER_ACCESS_RIGHTS, {
          uid,
          fids: [fileAccessRights.file.fid],
          dir: fileAccessRights.file.gdir,
          user_to: user.email
        })
        .catch(() => {
          setTopMessage(TOP_MESSAGE_TYPE.ERROR, __(`Не удалось удалить права пользователя ${user.name} к файлу`));
        });
    }
  };

  const changeUserAccessRightsInUsers = (user) => {
    const idxInUsers = users.findIndex((it) => it.uid === user.uid);
    const idxInParams = params.usersToChangeAccessRights.findIndex((it) => it.uid === user.uid);
    setUsers((s) => s.map((it, idx) => (idx === idxInUsers ? user : it)));
    setParams((s) => ({
      ...s,
      usersToChangeAccessRights:
        idxInParams === NO_ELEMENT
          ? [...s.usersToChangeAccessRights, user]
          : s.usersToChangeAccessRights.map((it, idx) => (idx === idxInUsers ? user : it))
    }));
  };

  const changeUserAccessRights = async () => {
    for await (let user of params.usersToChangeAccessRights) {
      await api
        .post(FILE_ACCESS_RIGHTS.API_ADD_USER_ACCESS_RIGHTS, {
          uid,
          fids: [fileAccessRights.file.fid],
          dir: fileAccessRights.file.gdir,
          user_to: user.email,
          is_write: user.is_write,
          is_download: user.is_download,
          deadline: user.deadline, //TODO - wait for BE
          prim: user.prim, //TODO - wait for BE
          pass: user.pass //TODO - wait for BE
        })
        .catch(() => {
          setTopMessage(TOP_MESSAGE_TYPE.ERROR, __(`Не удалось изменить права пользователя ${user.name}`));
        });
    }
  };

  const approveChanges = async () => {
    setLoadingType("squarify");
    if (isChanges) {
      await deleteUsers();
      await changeUserAccessRights();
    }
    closeModal();
    dispatch(
      onSetModals(MODALS.SUCCESS, {
        open: true,
        message: __("Доступ успешно изменён")
      })
    );
  };

  const isChanges = () => params.usersToDelete.length > 0 || params.usersToChangeAccessRights.length > 0;

  return (
    <>
      <PopUp set={closeModal}>
        <div className={styles.fileAccessRightsWrap}>
          <span className={styles.cross} onClick={closeModal} />
          <div className={styles.titlePopUp}>{__("Настройка доступа")}</div>
          <header>
            <div className={styles.header}>
              <div className={styles.circle}>
                <CopyIcon className={styles.copyIcon} />
              </div>
              <div className={styles.details}>
                <div className={styles.title}>Скопируйте ссылку</div>
                <div className={styles.description}>
                  {__("для того чтобы отправить ссылку нажмите кнопку копировать ссылку")}
                </div>
              </div>
            </div>
            <div className={styles.copyLink}>
              <div className={styles.link} onClick={copyLink}>
                {url}
              </div>
              <div className={styles.copy} onClick={copyLink}>
                {__("Копировать ссылку")}
              </div>
            </div>
          </header>
          <div className={styles.infoWrap}>
            <div className={styles.header}>
              <div className={styles.circle}>
                <UserIcon className={styles.userIcon} />
              </div>
              <div className={styles.details}>
                <div className={styles.title}>{__("Доступ к ссылке")}</div>
                <div className={styles.description}>{__("Список пользователей, у кого есть доступ к ссылке")}</div>
              </div>
            </div>
            <FileAccessUserList
              users={users}
              deleteUser={deleteUserFromUsers}
              changeUserAccessRightsInUsers={changeUserAccessRightsInUsers}
              setShowCalendar={setShowCalendar}
              setChosenUser={setChosenUser}
            />
          </div>
          <div className={styles.buttons}>
            <div className={`${styles.cancel}`} onClick={closeModal}>
              {__("Отмена")}
            </div>
            <div
              className={classNames({
                [styles.buttonDisabled]: !isChanges(),
                [styles.add]: isChanges()
              })}
              onClick={approveChanges}
            >
              {__("Сохранить")}
            </div>
          </div>
        </div>
        <input ref={linkRef} type="text" style={{ display: "none" }} />
      </PopUp>
      {loadingType ? (
        <Loader position="absolute" zIndex={10000} containerType="bounceDots" type="bounceDots" animation={false} />
      ) : null}
      {showCalendar && (
        <PopUp set={setShowCalendar} zIndex={102}>
          <Calendar setShowCalendar={setShowCalendar} setDateValue={changeCalendarDate} />
        </PopUp>
      )}
    </>
  );
}

export default FileAccessRights;
