import { GET_CALENDAR_TASKS } from "Store/types";

const INITIAL_STATE = {
  dayTasks: []
};

export const CalendarReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_CALENDAR_TASKS:
      return { ...state, dayTasks: payload };

    default:
      return state;
  }
};
