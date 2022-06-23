import api from "api";
import { checkResponseStatus } from "generalComponents/generalHelpers";
import { MODALS } from "generalComponents/globalVariables";
import { TasksTypes } from "Store/types";
import { onSetModals } from "./CabinetActions";

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

export const onCreateTaskDepartment = () => async (dispatch, getState) => {
  const uid = getState().user.uid;
  const params = getState().Cabinet.modals.taskModals.params;
  try {
    const { data } = await api.post(
      `/ajax/task_dep_add.php?uid=${uid}&name=${params.title}&icon=${params.icon ? params.icon : ""}`
    );
    checkResponseStatus(data.ok);
    dispatch({ type: TasksTypes.ADD_TASK_DEPARTMENT, payload: { name: data.name, id: data.id, icon: data.icon } });
    // TODO -mk- fixed message
    dispatch(onSetModals("topMessage", { open: true, type: "message", message: "Раздел добавлен" }));
  } catch (error) {
    // TODO -mk- fixed error message
    dispatch(onSetModals("topMessage", { open: true, type: "error", message: "Изменить раздел не удалось" }));
    console.log(error);
  } finally {
    dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
  }
};

export const onEditTaskDepartment = () => async (dispatch, getState) => {
  const uid = getState().user.uid;
  const params = getState().Cabinet.modals.taskModals.params;
  const dep = getState().Tasks.dep;
  try {
    const { data } = await api.post(
      `/ajax/task_dep_edit.php?uid=${uid}&name=${params.title}&icon=${params.icon}&id_dep=${params.id}`
    );
    checkResponseStatus(data.ok);
    const index = dep.findIndex((el) => el.id === data.id);
    dep.splice(index, 1, { name: data.name, id: data.id, icon: data.icon });
    dispatch({ type: TasksTypes.EDIT_TASK_DEPARTMENT, payload: dep });
    // TODO -mk- fixed  message
    dispatch(onSetModals("topMessage", { open: true, type: "message", message: "Раздел изменён" }));
  } catch (error) {
    // TODO -mk- fixed error message
    dispatch(
      onSetModals("topMessage", { open: true, type: "error", message: '__("Новый раздел создать не удалось")' })
    );
    console.log(error);
  } finally {
    dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
  }
};

export const onDeleteDepartment = () => async (dispatch, getState) => {
  const uid = getState().user.uid;
  const params = getState().Cabinet.modals.taskModals.params;
  const dep = getState().Tasks.dep;
  try {
    const { data } = await api.post(`/ajax/task_dep_del.php?uid=${uid}&id_dep=${params.id}`);
    checkResponseStatus(data.ok);
    const deps = dep.filter((el) => el.id !== data.id);
    dispatch({ type: TasksTypes.DELETE_TASK_DEPARTMENT, payload: deps });
    // TODO -mk- fixed  message
    dispatch(onSetModals("topMessage", { open: true, type: "message", message: `Раздел  удалён` }));
  } catch (error) {
    // TODO -mk- fixed error message
    dispatch(
      onSetModals("topMessage", { open: true, type: "error", message: '__("Новый раздел создать не удалось")' })
    );
    console.log(error);
  } finally {
    dispatch(onSetModals(MODALS.TASKS, { type: MODALS.NO_MODAL, params: null }));
  }
};

export const selectDepartment = (data) => ({
  type: TasksTypes.SELECT_TASK_DEPARTMENT,
  payload: data
});
