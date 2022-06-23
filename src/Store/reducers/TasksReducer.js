import { TasksTypes } from "Store/types";

const INITIAL_STATE = {
  dep: [],
  currentDep: { id: "worktask", icon: "", name: "" }
};

export const TasksReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TasksTypes.GET_TASK_DEPARTMENT:
    case TasksTypes.EDIT_TASK_DEPARTMENT:
      return { ...state, dep: payload };

    case TasksTypes.ADD_TASK_DEPARTMENT:
      return { ...state, dep: [...state.dep, payload] };

    case TasksTypes.SELECT_TASK_DEPARTMENT:
      return { ...state, currentDep: payload };

    case TasksTypes.DELETE_TASK_DEPARTMENT:
      return { ...INITIAL_STATE, dep: payload };

    default:
      return state;
  }
};
