import React from "react";
import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import styles from "../../../MyFolders/WorkSpace/WorkSpace.module.sass";
import File from "../../../../../../generalComponents/Files";
import { useDispatch, useSelector } from "react-redux";
import { onAddRecentFiles, onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { fileDelete, fileDeleteFromCart } from "../../../../../../generalComponents/fileMenuHelper";
import { useLocales } from "react-localized";
import { useLocation } from "react-router";
import { MODALS } from "generalComponents/globalVariables";

function DeleteFile() {
  const { __ } = useLocales();
  const { pathname } = useLocation();
  const uid = useSelector((s) => s.user.uid);
  const fileList = useSelector((s) => s.Cabinet.fileList);
  const contextMenuModals = useSelector((s) => s.Cabinet.modals.contextMenuModals);
  const dispatch = useDispatch();

  const close = () =>
    dispatch(
      onSetModals(MODALS.CONTEXT_MENU_MODAL, {
        ...contextMenuModals,
        type: "",
        items: [],
        filePick: null
      })
    );

  const showMessage = (message) => {
    dispatch(onSetModals(MODALS.TOP_MESSAGE, { open: true, type: "message", message }));
    close();
  };

  const deleteFile = () => {
    if (contextMenuModals?.filePick?.show) {
      const gdir = fileList.path;
      contextMenuModals.filePick.files.forEach((fid, i, arr) =>
        fileDelete(
          { gdir, fid },
          dispatch,
          uid,
          i === arr.length - 1 ? showMessage : "",
          __("Файлы перемещено в корзину")
        )
      );
    } else {
      fileDelete(contextMenuModals?.items[0], dispatch, uid, showMessage, __("Файл перемещен в корзину"));
    }
    dispatch(onAddRecentFiles());
  };

  const deleteFileForce = () => {
    if (contextMenuModals?.filePick?.show) {
      contextMenuModals.filePick.files.forEach((fid, i, arr) => {
        fileDeleteFromCart(fid, dispatch, uid, i === arr.length - 1 ? showMessage : "", __("Файлы удалены из системы"));
      });
    } else {
      fileDeleteFromCart(contextMenuModals?.items[0].fid, dispatch, uid, showMessage, __("Файл удалён из системы"));
    }
  };

  const textPopup = () => {
    if (pathname.startsWith("/cart")) {
      return contextMenuModals?.filePick?.show
        ? __(`Вы уверены, что хотите удалить файлы навсегда?`)
        : __(`Вы уверены, что хотите удалить ${contextMenuModals?.items[0]?.fname} навсегда?`);
    } else {
      return contextMenuModals?.filePick?.show
        ? __("Вы действительно хотите удалить выбранные файлы?")
        : contextMenuModals?.items[0]?.fname;
    }
  };
  return (
    <ActionApproval
      name={contextMenuModals?.filePick?.show ? __("Удаление файлов") : __("Удалить файл")}
      text={textPopup()}
      set={close}
      callback={pathname.startsWith("/cart") ? deleteFileForce : deleteFile}
      approve={__("Удалить")}
    >
      <div className={styles.fileActionWrap}>
        <File
          format={contextMenuModals?.filePick?.show ? "FILES" : contextMenuModals?.items[0]?.ext}
          color={contextMenuModals?.items[0]?.color}
        />
      </div>
    </ActionApproval>
  );
}

export default DeleteFile;
