import React, { useEffect, useState } from "react";

import styles from "./FileAccessRights.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { MODALS } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import { ReactComponent as CopyIcon } from "../../../../../../assets/PrivateCabinet/copy.svg";
import api from "../../../../../../api";

function FileAccessRights() {
  const { __ } = useLocales();

  const dispatch = useDispatch();
  const fileAccessRights = useSelector(s => s.Cabinet.modals.fileAccessRights);
  const [url, setUrl] = useState(__("Загрузка..."));

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
          MODALS.ERROR,
          __(`Ссылка на файл не найдена. Попробуйте еще раз`)
        ) && setUrl(__("Ошибка"));
  };

  useEffect(() => {
    getLink();
  }, []); // eslint-disable-line

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
            <div className={styles.link}>{url}</div>
            <div className={styles.copy}>{__("Копировать ссылку")}</div>
          </div>
        </header>
      </div>
    </PopUp>
  );
}

export default FileAccessRights;
