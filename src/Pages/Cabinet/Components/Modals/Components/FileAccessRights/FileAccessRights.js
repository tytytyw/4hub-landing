import React, { useEffect, useRef, useState } from "react";

import styles from "./FileAccessRights.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import {
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

function FileAccessRights() {
  const { __ } = useLocales();

  const dispatch = useDispatch();
  const fileAccessRights = useSelector(s => s.Cabinet.modals.fileAccessRights);
  const [url, setUrl] = useState(__("Загрузка..."));
  const [users, setUsers] = useState([]);
  const linkRef = useRef(null);
  const uid = useSelector(s => s.user.uid);
  const [params, setParams] = useState({ usersToDelete: [] });

  const closeModal = () =>
    dispatch(
      onSetModals(MODALS.FILE_ACCESS_RIGHTS, {
        ...fileAccessRights,
        open: false,
        file: {}
      })
    );

  const setTopMessage = (type, message) =>
    dispatch(onSetModals(MODALS.TOP_MESSAGE, { open: true, type, message }));

  const getLink = () => {
    setUrl(__("Загрузка..."));
    fileAccessRights.file?.file_link
      ? setUrl(fileAccessRights.file.file_link)
      : setTopMessage(
          TOP_MESSAGE_TYPE.ERROR,
          __(`Ссылка на файл не найдена. Попробуйте еще раз`)
        ) && setUrl(__("Ошибка"));
  };

  const loadUserList = () => {
    api
      .get(FILE_ACCESS_RIGHTS.API_SHARED_FILES_USER_LIST, {
        params: {
          uid,
          fid: fileAccessRights.file.fid
        }
      })
      .then(res => {
        if (checkResponseStatus(res.data.ok)) {
          setUsers(res.data.access);
        } else {
          setTopMessage(
            TOP_MESSAGE_TYPE.ERROR,
            __("Не удалось загузить список пользователей")
          );
        }
      })
      .catch(err => setTopMessage(TOP_MESSAGE_TYPE.ERROR, err));
  };

  // file_share_list дайт список пользователей,
  // которым файл расшарен, file_share_del -
  // удаляет доступ, file_share - добавляет доступ

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

  const deleteUserFromUsers = user => {
    setParams(s => ({
      ...s,
      usersToDelete: [
        ...s.usersToDelete,
        ...users.filter(it => it.uid === user.uid)
      ]
    }));
    setUsers(s => s.filter(it => it.uid !== user.uid));
  };

  const deleteUsers = async () => {
    for await (let user of params.usersToDelete) {
      await api.post(FILE_ACCESS_RIGHTS.API_DELETE_USER_ACCESS_RIGHTS, {
        params: {
          uid,
          fids: [user.fid],
          dir: fileAccessRights.file.gdir,
          user_to: user.email
        }
      });
    }
  };

  const approveChanges = async () => {
    await deleteUsers();
  };

  return (
    <PopUp set={closeModal}>
      <div className={styles.fileAccessRightsWrap}>
        <span className={styles.cross} onClick={closeModal} />
        <h3>{__("Настройка доступа")}</h3>
        <header>
          <div className={styles.header}>
            <div className={styles.circle}>
              <CopyIcon className={styles.copyIcon} />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>Скопируйте ссылку</div>
              <div className={styles.description}>
                {__(
                  "для того чтобы отправить ссылку нажмите кнопку копировать ссылку"
                )}
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
          <div className={styles.circle}>
            <UserIcon className={styles.userIcon} />
          </div>
          <div className={styles.details}>
            <div className={styles.title}>{__("Доступ к ссылке")}</div>
            <div className={styles.description}>
              {__("Список пользователей, у кого есть доступ к ссылке")}
            </div>
          </div>
        </div>
        <FileAccessUserList users={users} deleteUser={deleteUserFromUsers} />
        <div className={styles.buttons}>
          <div className={`${styles.cancel}`} onClick={closeModal}>
            {__("Отмена")}
          </div>
          <div className={`${styles.add}`} onClick={approveChanges}>
            {__("Сохранить")}
          </div>
        </div>
      </div>
      <input ref={linkRef} type="text" style={{ display: "none" }} />
    </PopUp>
  );
}

export default FileAccessRights;
