import { TasksTypes } from "Store/types";

const INITIAL_STATE = {
  dep: [],
  currentDep: { id: "worktask", icon: "", name: "" }
  // myTasks: {},
};

export const TasksReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TasksTypes.GET_TASK_DEPARTMENT:
      return { ...state, dep: payload };

    case TasksTypes.EDIT_TASK_DEPARTMENT: {
      const newDep = [...state.dep];
      const index = newDep.findIndex((item) => item.id === payload.id);
      newDep.splice(index, 1, payload);
      return { ...state, dep: newDep };
    }

    case TasksTypes.ADD_TASK_DEPARTMENT:
      return { ...state, dep: [...state.dep, payload] };

    case TasksTypes.SELECT_TASK_DEPARTMENT:
      return { ...state, currentDep: payload };

    case TasksTypes.DELETE_TASK_DEPARTMENT:
      return { ...INITIAL_STATE, dep: state.dep.filter((item) => item.id !== payload) };

    default:
      return state;
  }
};
