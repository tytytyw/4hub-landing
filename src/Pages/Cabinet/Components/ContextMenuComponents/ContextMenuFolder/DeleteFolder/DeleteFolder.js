import React from "react";
import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import styles from "../../../MyFolders/WorkSpace/WorkSpace.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { onLoadFolders, onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { useLocales } from "react-localized";
import api from "api";
import { ReactComponent as FolderIcon } from "../../../../../../assets/PrivateCabinet/folder-2.svg";
import { LIBRARY } from "generalComponents/globalVariables";
import { checkResponseStatus, getDepartment } from "generalComponents/generalHelpers";

function DeleteFolder() {
  const { __ } = useLocales();
  const uid = useSelector((s) => s.user.uid);
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

  const deleteFolder = () => {
    api
      .post(`/ajax/dir_del.php?uid=${uid}&dir=${contextMenuModals.params.title}&dep=${getDepartment()}`)
      .then((res) => {
        if (checkResponseStatus(res.data.ok)) {
          dispatch(onLoadFolders(LIBRARY.API_GET_FOLDERS));
          showMessage(__("Папка удалена"));
        } else {
          showMessage(__("Папка не удалена. Попробуйте еще раз!"));
        }
      })
      .catch(() => showMessage(__("Папка не удалена. Попробуйте еще раз!")));
  };

  return (
    <ActionApproval
      name={__("Удаление папки")}
      text={__("Вы действительно хотите удалить выбранную папку?")}
      set={close}
      callback={deleteFolder}
      approve={__("Удалить")}
    >
      <div className={styles.fileActionWrap}>
        <div className={styles.fileActionWrap}>
          <FolderIcon style={{ width: "100%", height: "auto" }} />
        </div>
      </div>
    </ActionApproval>
  );
}

export default DeleteFolder;
