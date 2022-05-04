import React from "react";
import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import styles from "../../../MyFolders/WorkSpace/WorkSpace.module.sass";
import File from "../../../../../../generalComponents/Files";
import { useDispatch, useSelector } from "react-redux";
import { onAddRecentFiles, onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { fileDelete } from "../../../../../../generalComponents/fileMenuHelper";
import { useLocales } from "react-localized";

function DeleteFile() {
  const { __ } = useLocales();
  const uid = useSelector((s) => s.user.uid);
  const fileList = useSelector((s) => s.Cabinet.fileList);
  const contextMenuModals = useSelector((s) => s.Cabinet.modals.contextMenuModals);
  const dispatch = useDispatch();

  const close = () =>
    dispatch(
      onSetModals("contextMenuModals", {
        ...contextMenuModals,
        type: "",
        items: [],
        filePick: null
      })
    );

  const showMessage = (message) => {
    dispatch(onSetModals("topMessage", { open: true, type: "message", message }));
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

  return (
    <ActionApproval
      name={contextMenuModals?.filePick?.show ? __("Удаление файлов") : __("Удалить файл")}
      text={
        contextMenuModals?.filePick?.show
          ? __("Вы действительно хотите удалить выбранные файлы?")
          : contextMenuModals?.items[0]?.fname
      }
      set={close}
      callback={deleteFile}
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
