import { LOG_DATA, UPDATE_SETTINGS, USER_INFO } from "../types";

const INITIAL_STATE = {
  uid: "",
  id_company: false,
  userInfo: null
};

export default function startPage(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOG_DATA: {
      const id = JSON.parse(action.payload.id_company);
      return { ...state, uid: action.payload.uid, id_company: id ?? "" };
    }
    case USER_INFO: {
      return { ...state, userInfo: action.payload };
    }
    case UPDATE_SETTINGS: {
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } };
    }
    default:
      return state;
  }
}
