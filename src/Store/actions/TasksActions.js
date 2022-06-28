import api from "api";
import { checkResponseStatus } from "generalComponents/generalHelpers";
import { MODALS, TOP_MESSAGE_TYPE } from "generalComponents/globalVariables";
import { TasksTypes } from "Store/types";
import { onSetModals } from "./CabinetActions";

// department actions
export const selectDepartment = (data) => ({
  type: TasksTypes.SELECT_TASK_DEPARTMENT,
  payload: data
});

export const onFetchTaskDepartment = () => async (dispatch, getState) => {
  const uid = getState().user.uid;
  try {
    const res = await api.get(`/ajax/task_dep_list.php?uid=${uid}`);
    checkResponseStatus(res.data.ok);
    dispatch({ type: TasksTypes.GET_TASK_DEPARTMENT, payload: res.data.tasks });
  } catch (error) {
    // TODO -mk- fixed error message
    dispatch(onSetModals(MODALS.ERROR, { open: true, message: "Files failed to load." }));
    console.log(error);
  }
};

export const onCreateTaskDepartment = (messages) => async (dispatch, getState) => {
  const uid = getState().user.uid;
  const params = getState().Cabinet.modals.taskModals.params;
  try {
    dispatch(onSetModals(MODALS.LOADER, true));
    const { data } = await api.post(
      `/ajax/task_dep_add.php?uid=${uid}&name=${params.title}&icon=${params.icon ? params.icon : ""}`
    );
    checkResponseStatus(data.ok);
    dispatch({ type: TasksTypes.ADD_TASK_DEPARTMENT, payload: { name: data.name, id: data.id, icon: data.icon } });
    dispatch(
      onSetModals(MODALS.SUCCESS, {
        open: true,
        message: messages.success
      })
    );
  } catch (error) {
    // TODO -mk- fixed error message
    dispatch(onSetModals("topMessage", { open: true, type: "error", message: "Додавить раздел не удалось" }));
    console.log(error);
  } finally {
    dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
    dispatch(onSetModals(MODALS.LOADER, false));
  }
};

export const onEditTaskDepartment = (messages) => async (dispatch, getState) => {
  const uid = getState().user.uid;
  const params = getState().Cabinet.modals.taskModals.params;
  try {
    dispatch(onSetModals(MODALS.LOADER, true));
    const { data } = await api.post(
      `/ajax/task_dep_edit.php?uid=${uid}&name=${params.title}&icon=${params.icon}&id_dep=${params.id}`
    );
    checkResponseStatus(data.ok);

    dispatch({ type: TasksTypes.EDIT_TASK_DEPARTMENT, payload: { name: data.name, id: data.id, icon: data.icon } });
    dispatch(
      onSetModals(MODALS.SUCCESS, {
        open: true,
        message: messages.success
      })
    );
  } catch (error) {
    // TODO -mk- fixed error message
    dispatch(
      onSetModals("topMessage", { open: true, type: "error", message: '__("Новый раздел создать не удалось")' })
    );
    console.log(error);
  } finally {
    dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
    dispatch(onSetModals(MODALS.LOADER, false));
  }
};

export const onDeleteDepartment = (messages) => async (dispatch, getState) => {
  const uid = getState().user.uid;
  const params = getState().Cabinet.modals.taskModals.params;

  try {
    dispatch(onSetModals(MODALS.LOADER, true));
    const { data } = await api.post(`/ajax/task_dep_del.php?uid=${uid}&id_dep=${params.id}`);
    checkResponseStatus(data.ok);
    dispatch({ type: TasksTypes.DELETE_TASK_DEPARTMENT, payload: data.id_dep });
    dispatch(
      onSetModals(MODALS.SUCCESS, {
        open: true,
        message: messages.success
      })
    );
  } catch (error) {
    // TODO -mk- fixed error message
    dispatch(
      onSetModals("topMessage", { open: true, type: "error", message: '__("Новый раздел создать не удалось")' })
    );
    console.log(error);
  } finally {
    dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
    dispatch(onSetModals(MODALS.LOADER, false));
  }
};

// Task actions
export const onSelectTask = (data) => ({
  type: TasksTypes.SELECT_TASK,
  payload: data
});

export const onAddNewTask = (payload, messages) => async (dispatch, getState) => {
  try {
    dispatch(onSetModals(MODALS.LOADER, true));

    const params = {
      uid: getState().user.uid,
      name: payload.name,
      id_type: payload.eventType,
      id_dep: payload.idDep,
      prim: payload.text,
      date_start: payload.dateStart,
      date_end: payload.dateEnd,
      time_start: payload.timeStart,
      color: payload.color,
      emoji: payload.emoji,
      symbol: payload.figure,
      id_act: payload.idAct,
      emails: payload.emails,
      tag: payload.tagOption
    };
    const { data } = await api.get(`/ajax/task_add.php`, { params });
    checkResponseStatus(data.ok);
    // TODO need to fix - different modals for different types of tasks
    // dispatch(
    //   onSetModals(MODALS.CALENDAR, {
    //     type: CALENDAR_MODALS.SUCCESS_ADD,
    //     params: data.task
    //   })
    // );
    dispatch({ type: TasksTypes.ADD_TASK, payload: data.task });
  } catch (error) {
    dispatch(onSetModals(MODALS.TOP_MESSAGE, { open: true, type: TOP_MESSAGE_TYPE.ERROR, message: messages.error }));
    console.log(error);
  } finally {
    dispatch(onSetModals(MODALS.LOADER, false));
    dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
  }
};

export const onGetAllTasks = () => async (dispatch, getState) => {
  try {
    const response = await api.get(`ajax/task_get.php`, {
      params: {
        uid: getState().user.uid
      }
    });
    checkResponseStatus(response.data.ok);
    dispatch({
      type: TasksTypes.GET_TASKS,
      payload: response.data.tasks ?? []
    });
  } catch (error) {
    dispatch(onSetModals(MODALS.ERROR, { open: true, message: "error" }));
    console.log(error);
  }
};

export const onDeleteTask = (id, message, error) => async (dispatch, getState) => {
  try {
    dispatch(onSetModals(MODALS.LOADER, true));

    const { data } = await api.delete(`ajax/task_del.php`, {
      params: {
        uid: getState().user.uid,
        id_task: id
      }
    });
    checkResponseStatus(data.ok);

    dispatch({ type: TasksTypes.DELETE_TASK, payload: data.id_task });
    dispatch(
      onSetModals(MODALS.SUCCESS, {
        open: true,
        message
      })
    );
  } catch (e) {
    dispatch(onSetModals(MODALS.ERROR, { open: true, message: error }));
    console.log(e);
  } finally {
    dispatch(onSetModals(MODALS.LOADER, false));
    dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
  }
};

export const onEditTask = (payload, messages) => async (dispatch, getState) => {
  try {
    dispatch(onSetModals(MODALS.LOADER, true));

    const params = {
      name: payload.name,
      id_task: payload.idTask,
      id_type: payload.eventType,
      id_dep: payload.idDep,
      prim: payload.text,
      date_start: payload.dateStart,
      date_end: payload.dateEnd,
      time_start: payload.timeStart,
      uid: getState().user.uid,
      color: payload.color,
      emoji: payload.emoji,
      symbol: payload.figure,
      id_act: payload.idAct,
      emails: payload.emails,
      tag: payload.tagOption
    };
    const { data } = await api.get(`ajax/task_edit.php`, { params });
    checkResponseStatus(data.ok);
    dispatch({ type: TasksTypes.EDIT_TASK, payload: data.task });
    dispatch(
      onSetModals(MODALS.SUCCESS, {
        open: true,
        message: messages.success
      })
    );
  } catch (err) {
    dispatch(onSetModals(MODALS.ERROR, { open: true, message: messages.error }));
    console.log(err);
  } finally {
    dispatch(onSetModals(MODALS.LOADER, false));
    dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
  }
};
