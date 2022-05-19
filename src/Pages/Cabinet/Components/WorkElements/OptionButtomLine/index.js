import React from "react";

import styles from "./OptionButtomLine.module.sass";
import { onSetModals, onChooseFiles } from "../../../../../Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";
import { share_types } from "../../ContextMenuComponents/ContextMenuFileList";
import { useLocation } from "react-router";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { filePickProps, fileProps } from "../../../../../types/File";
import api from "../../../../../api";

const OptionButtomLine = ({ filePick, nullifyFilePick, chosenFile, filesPage, menuItem }) => {
  const { __ } = useLocales();
  const contextMenuModals = useSelector((s) => s.Cabinet.modals.contextMenuModals);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);

  const { pathname } = useLocation();

  const onZip = () =>
    chosenFile
      ? dispatch(
          onSetModals("contextMenuModals", {
            ...contextMenuModals,
            type: "CreateZip",
            items: filePick.files,
            title: __("Сжать в ZIP"),
            filesPage
          })
        )
      : null;

  const onEdit = () =>
    chosenFile
      ? dispatch(
          onSetModals("contextMenuModals", {
            ...contextMenuModals,
            type: "CustomizeFile",
            items: filePick.files,
            title:
              contextMenuModals.items.length === 1 ? __("Редактирование файла") : __("Редактировать выбранные файлы"),
            filesPage,
            filePick,
            menuItem
          })
        )
      : null;

  const onShare = () =>
    chosenFile
      ? dispatch(
          onSetModals("share", {
            open: true,
            fids: filePick.files,
            action_type: share_types[pathname.split("/")[1]]
          })
        )
      : null;

  const onMoveToArchive = () =>
    chosenFile
      ? dispatch(
          onSetModals("contextMenuModals", {
            ...contextMenuModals,
            type: "MoveToArchive",
            items: filePick.files,
            filePick
          })
        )
      : null;

  const onRestoreCartFile = () => {
    api
      .get(`/ajax/file_restore.php?uid=${uid}&fid=${filePick.files[0]}`)
      .then((res) => {
        console.log(res.data.ok);
        if (res.data.ok) {
          dispatch(onChooseFiles("", "", 1, "", "", "", "trash_list", ""));
          dispatch(
            onSetModals("topMessage", {
              open: true,
              type: "message",
              message: __("Файл успешно восстановлен")
            })
          );
        } else throw new Error();
      })
      .catch(() =>
        dispatch(
          onSetModals("error", {
            open: true,
            message: __("что-то пошло не так"),
            title: __("ошибка")
          })
        )
      );
  };

  const renderCancelBtn = () => {
    return (
      <div className={styles.cancel} onClick={nullifyFilePick}>
        {__("Отмена")}
      </div>
    );
  };

  const renderZipBtn = () => {
    return (
      <div className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`} onClick={onZip}>
        {__("Сжать в ZIP")}
      </div>
    );
  };

  const renderEditBtn = () => {
    return (
      <div className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`} onClick={onEdit}>
        {__("Редактировать")}
      </div>
    );
  };

  const renderShareBtn = () => {
    return (
      <div className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`} onClick={onShare}>
        {__("Расшарить")}
      </div>
    );
  };

  const renderMoveToArchiveBtn = () => {
    return (
      <div className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`} onClick={onMoveToArchive}>
        {__("Пер. в архив")}
      </div>
    );
  };

  const renderRestoreCartFileBtn = () => {
    return (
      <div className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`} onClick={onRestoreCartFile}>
        {__("Восстановить")}
      </div>
    );
  };

  const renderCartOption = () => {
    return (
      <>
        {renderCancelBtn()}
        {renderMoveToArchiveBtn()}
        {renderRestoreCartFileBtn()}
      </>
    );
  };

  const renderOtherPageOption = () => {
    return (
      <>
        {renderCancelBtn()}
        {renderZipBtn()}
        {renderShareBtn()}
        {renderMoveToArchiveBtn()}
        {renderEditBtn()}
      </>
    );
  };

  return (
    <div className={styles.optionBottomLine}>
      {pathname.startsWith("/cart") ? renderCartOption() : renderOtherPageOption()}
    </div>
  );
};

export default OptionButtomLine;

OptionButtomLine.propTypes = {
  filePick: filePickProps,
  nullifyFilePick: PropTypes.func,
  chosenFile: fileProps,
  filesPage: PropTypes.number,
  menuItem: PropTypes.string
};
