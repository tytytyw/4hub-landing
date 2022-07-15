import { TasksTypes } from "Store/types";

const INITIAL_STATE = {
  dep: [],
  currentDep: null,
  myTasks: [],
  chosenTask: null,
  filters: { type: "", year: "", month: "", day: "" },
  isHistory: false
};

export const TasksReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TasksTypes.CHOOSE_DEPARTMENT:
      return { ...state, currentDep: payload };

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

    case TasksTypes.ADD_TASK_COMMENT: {
      const newTasks = [...state.myTasks];
      newTasks.forEach((item) => (item.id === payload.id_task ? item.comments.push(payload) : null));
      return { ...state, myTasks: newTasks };
    }

    case TasksTypes.SELECT_FILTER:
      return { ...state, filters: { ...payload } };

    case TasksTypes.IS_HISTORY:
      return { ...state, isHistory: payload };

    default:
      return state;
  }
};
