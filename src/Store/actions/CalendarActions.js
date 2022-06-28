import api from "api";
import { checkResponseStatus } from "generalComponents/generalHelpers";
import { MODALS } from "generalComponents/globalVariables";
import { GET_CALENDAR_TASKS } from "Store/types";
import { onSetModals } from "./CabinetActions";

export const onGetAllTasksCalendar = () => async (dispatch, getState) => {
  try {
    dispatch(onSetModals(MODALS.LOADER, true));

    const { data } = await api.get(`ajax/task_calendar.php`, {
      params: {
        uid: getState().user.uid
      }
    });
    checkResponseStatus(data.ok);
    dispatch({
      type: GET_CALENDAR_TASKS,
      payload: data.tasks ?? []
    });

    dispatch(onSetModals(MODALS.LOADER, false));
  } catch (error) {
    dispatch(onSetModals(MODALS.ERROR, { open: true, message: "error" }));
    console.log(error);
  }
};
