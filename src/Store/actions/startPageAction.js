import api from "../../api";
import { LOG_DATA, UPDATE_SETTINGS, USER_INFO } from "../types";
import { onSetModals, changeChatTheme } from "./CabinetActions";
import { MODALS } from "../../generalComponents/globalVariables";
import { themes } from '../../generalComponents/chatHelper'
import { setStorageItem } from "../../generalComponents/StorageHelper";

export const onLog = data => {
  return {
    type: LOG_DATA,
    payload: data
  };
};

export const onGetUserInfo = () => (dispatch, getState) => {
  api
    .get(`/ajax/user_get.php?uid=${getState().user.uid}`)
    .then(res => {
      if (res.data?.lang) {
        setStorageItem("lang", res.data?.lang);
      }
      dispatch({
        type: USER_INFO,
        payload: res.data
      });
      if (res.data?.chat_theme) {
        const chatTheme = themes.find(theme => theme.name === res.data?.chat_theme)
        dispatch(changeChatTheme(chatTheme))
      }
    })
    .catch(err => console.log(err));
};

export const onChangeSettings = (data, cb) => async (dispatch, getState) => {
  const formData = new FormData();
  formData.set("theme", data.theme);
  formData.set("lang", data.lang);
  formData.set("notify", data.notify);
  formData.set("uid", getState().user.uid);

  api
    .post(`/ajax/user_edit2.php`, formData)
    .then(res => {
      if (res.data.ok === 1 || res.data.ok === true) {
        setStorageItem("lang", data.lang);
        dispatch(
          onSetModals(MODALS.SUCCESS, {
            open: true,
            title: "Success",
            message: "Settings successfully changed"
          })
        );
        dispatch({
          type: UPDATE_SETTINGS,
          payload: data
        });
        if (typeof cb === "function") cb();
      }
    })
    .catch(() =>
      dispatch(
        onSetModals(MODALS.ERROR, {
          open: true,
          message: "Failed to update settings"
        })
      )
    );
};

export const updateSettings = settings => ({
  type: UPDATE_SETTINGS,
  payload: settings
});
