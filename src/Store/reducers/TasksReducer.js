import { TasksTypes } from "Store/types";

const INITIAL_STATE = {
  dep: [],
  myTasks: [],
  chosenTask: null
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

    case TasksTypes.DELETE_TASK_DEPARTMENT:
      return { ...state, currentDep: INITIAL_STATE.currentDep, dep: state.dep.filter((item) => item.id !== payload) };

    case TasksTypes.GET_TASKS:
      return { ...state, myTasks: payload };

    case TasksTypes.ADD_TASK:
      return { ...state, myTasks: [...state.myTasks, payload] };

    case TasksTypes.EDIT_TASK: {
      const newTasks = [...state.myTasks];
      const index = newTasks.findIndex((item) => item.id === payload.id);
      newTasks.splice(index, 1, payload);
      return { ...state, myTasks: newTasks };
    }

    case TasksTypes.DELETE_TASK:
      return { ...state, myTasks: state.myTasks.filter((item) => item.id !== payload) };

    case TasksTypes.SELECT_TASK:
      return { ...state, chosenTask: payload };

    default:
      return state;
  }
};
