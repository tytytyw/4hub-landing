import api from "api";
import { checkResponseStatus } from "generalComponents/generalHelpers";
import { MODALS } from "generalComponents/globalVariables";
import { TasksTypes } from "Store/types";
import { onSetModals } from "./CabinetActions";

export const onChoosDep = (dep) => ({ type: TasksTypes.CHOOSE_DEPARTMENT, payload: dep });

export const onFetchTaskDepartment = (messages) => async (dispatch, getState) => {
  const uid = getState().user.uid;
  try {
    const res = await api.get(`/ajax/task_dep_list.php?uid=${uid}`);
    checkResponseStatus(res.data.ok);
    dispatch({
      type: TasksTypes.GET_TASK_DEPARTMENT,
      payload: res.data.tasks ?? []
    });
  } catch (error) {
    dispatch(
      onSetModals(MODALS.ERROR, {
        open: true,
        message: messages
      })
    );
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
    dispatch({
      type: TasksTypes.ADD_TASK_DEPARTMENT,
      payload: { name: data.name, id: data.id, icon: data.icon, is_system: "0" }
    });
    dispatch(
      onSetModals(MODALS.SUCCESS, {
        open: true,
        message: messages.success
      })
    );
    dispatch(onChoosDep({ name: data.name, id: data.id, icon: data.icon }));
  } catch (error) {
    dispatch(
      onSetModals(MODALS.ERROR, {
        open: true,
        message: messages.error
      })
    );
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

    dispatch({
      type: TasksTypes.EDIT_TASK_DEPARTMENT,
      payload: { name: data.name, id: data.id, icon: data.icon, is_system: "0" }
    });
    dispatch(
      onSetModals(MODALS.SUCCESS, {
        open: true,
        message: messages.success
      })
    );
  } catch (error) {
    dispatch(
      onSetModals(MODALS.ERROR, {
        open: true,
        message: messages.error
      })
    );
    console.log(error);
  } finally {
    dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
    dispatch(onSetModals(MODALS.LOADER, false));
  }
};

export const onDeleteDepartment = (messages, department) => async (dispatch, getState) => {
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
    dispatch(onChoosDep(department));
  } catch (error) {
    dispatch(
      onSetModals(MODALS.ERROR, {
        open: true,
        message: messages.error
      })
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
      id_type: payload.id_type,
      id_dep: payload.id_dep,
      prim: payload.prim,
      date_start: payload.date_start,
      date_end: payload.date_end,
      time_start: payload.time_start,
      color: payload.id_color,
      emoji: payload.id_emo,
      symbol: payload.id_fig,
      id_act: payload.id_act,
      emails: payload.emails,
      tag: payload.tags
    };
    const { data } = await api.get(`/ajax/task_add.php`, { params });
    checkResponseStatus(data.ok);
    dispatch(
      onSetModals(MODALS.SUCCESS, {
        open: true,
        message: messages.success
      })
    );
    dispatch({ type: TasksTypes.ADD_TASK, payload: data.task });
  } catch (error) {
    dispatch(
      onSetModals(MODALS.ERROR, {
        open: true,
        message: messages.error
      })
    );
    console.log(error);
  } finally {
    dispatch(onSetModals(MODALS.LOADER, false));
    dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
  }
};

export const onGetAllTasks = (messages) => async (dispatch, getState) => {
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
    dispatch(
      onSetModals(MODALS.ERROR, {
        open: true,
        message: messages
      })
    );
    console.log(error);
  }
};

export const onDeleteTask = (id, messages) => async (dispatch, getState) => {
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
        message: messages.success
      })
    );
  } catch (e) {
    dispatch(onSetModals(MODALS.ERROR, { open: true, message: messages.error }));
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
      uid: getState().user.uid,
      name: payload.name,
      id_type: payload.id_type,
      id_dep: payload.id_dep,
      prim: payload.prim,
      date_start: payload.date_start,
      date_end: payload.date_end,
      time_start: payload.time_start,
      color: payload.id_color,
      emoji: payload.id_emo,
      symbol: payload.id_fig,
      id_act: payload.id_act,
      emails: payload.emails,
      tag: payload.tags,
      id_task: payload.id,
      id_status: payload.id_status
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

export const onAddTaskComment = (payload, messages, isClose) => async (dispatch, getState) => {
  try {
    const params = {
      uid: getState().user.uid,
      text: payload.text,
      id_task: payload.id_task
    };
    const { data } = await api.get(`ajax/task_com_add.php`, { params });
    checkResponseStatus(data.ok);
    dispatch({ type: TasksTypes.ADD_TASK_COMMENT, payload: data.comment });
    isClose &&
      dispatch(
        onSetModals(MODALS.SUCCESS, {
          open: true,
          message: messages.success
        })
      );
  } catch (e) {
    dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
    dispatch(onSetModals(MODALS.ERROR, { open: true, message: messages.error }));
    console.log(e);
  } finally {
    isClose && dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
  }
};
