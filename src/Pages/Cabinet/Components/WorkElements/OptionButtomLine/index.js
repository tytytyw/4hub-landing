import React from "react";

import styles from "./OptionButtomLine.module.sass";
import { onSetModals } from "../../../../../Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";
import { share_types } from "../../ContextMenuComponents/ContextMenuFileList";
import { useLocation } from "react-router";
import { useLocales } from "react-localized";

const OptionButtomLine = ({
  filePick,
  nullifyFilePick,
  chosenFile,
  filesPage,
  menuItem,
}) => {
  const { __ } = useLocales();
  const contextMenuModals = useSelector(
    (s) => s.Cabinet.modals.contextMenuModals
  );
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const onZip = () =>
    chosenFile
      ? dispatch(
          onSetModals("contextMenuModals", {
            ...contextMenuModals,
            type: "CreateZip",
            items: filePick.files,
            title: __("Сжать в ZIP"),
            filesPage,
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
              contextMenuModals.items.length === 1
                ? __("Редактирование файла")
                : __("Редактировать выбранные файлы"),
            filesPage,
            filePick,
            menuItem,
          })
        )
      : null;

  const onShare = () =>
    chosenFile
      ? dispatch(
          onSetModals("share", {
            open: true,
            fids: filePick.files,
            action_type: share_types[pathname.split("/")[1]],
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
            filePick,
          })
        )
      : null;

  const onReestablish = () => console.log("onReestablish");

  const renderCancelBtn = () => {
    return (
      <div className={styles.cancel} onClick={nullifyFilePick}>
        {__("Отмена")}
      </div>
    );
  };

  const renderZipBtn = () => {
    return (
      <div
        className={`${
          filePick.files.length > 0 ? styles.edit : styles.buttonDisabled
        }`}
        onClick={onZip}
      >
        {__("Сжать в ZIP")}
      </div>
    );
  };

  const renderEditBtn = () => {
    return (
      <div
        className={`${
          filePick.files.length > 0 ? styles.edit : styles.buttonDisabled
        }`}
        onClick={onEdit}
      >
        {__("Редактировать")}
      </div>
    );
  };

  const renderShareBtn = () => {
    return (
      <div
        className={`${
          filePick.files.length > 0 ? styles.edit : styles.buttonDisabled
        }`}
        onClick={onShare}
      >
        {__("Расшарить")}
      </div>
    );
  };

  const renderMoveToArchiveBtn = () => {
    return (
      <div
        className={`${
          filePick.files.length > 0 ? styles.edit : styles.buttonDisabled
        }`}
        onClick={onMoveToArchive}
      >
        {__("Пер. в архив")}
      </div>
    );
  };

  const renderReestablishBtn = () => {
    return (
      <div
        className={`${
          filePick.files.length > 0 ? styles.edit : styles.buttonDisabled
        }`}
        onClick={onReestablish}
      >
        {__("Восстановить")}
      </div>
    );
  };

  const renderCartOption = () => {
    return (
      <>
        {renderCancelBtn()}
        {renderMoveToArchiveBtn()}
        {renderReestablishBtn()}
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
      {pathname.startsWith("/cart")
        ? renderCartOption()
        : renderOtherPageOption()}
    </div>
  );
};

export default OptionButtomLine;
