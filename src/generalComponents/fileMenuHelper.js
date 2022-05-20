import api from "../api";
import { onDeleteFile, onDeleteSafeFile, onChooseFiles, onSetModals } from "../Store/actions/CabinetActions";

export const fileDelete = (file, dispatch, uid, set, msg) => {
  api
    .post(`/ajax/file_del.php?uid=${uid}&dir=${file.gdir}&fid=${file.fid}`)
    .then((res) => {
      if (res.data.ok === 1) {
        dispatch(onDeleteFile(file));
        if (set) set(msg);
      } else {
        console.log(res?.error);
      }
    })
    .catch((err) => console.log(err));
};

export const safeFileDelete = (id_safe, file, dispatch, uid, set, msg) => {
  api
    .post(`/ajax/safe_file_del.php?uid=${uid}&fid=${file}&id_safe=${id_safe}`)
    .then((res) => {
      if (res.data.ok === 1) {
        dispatch(onDeleteSafeFile(file));
        if (set) set(msg);
      } else {
        console.log(res?.error);
      }
    })
    .catch((err) => console.log(err));
};

export const fileCartRestore = (fileId, dispatch, uid, message, __) => {
  api
    .get(`/ajax/file_restore.php?uid=${uid}&fid=${fileId}`)
    .then((res) => {
      if (res.data.ok === 1) {
        dispatch(onChooseFiles("", "", 1, "", "", "", "trash_list", ""));
        dispatch(
          onSetModals("topMessage", {
            open: true,
            type: "message",
            message
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
