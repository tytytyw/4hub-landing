export const getDays = (cDay) => {
  const date = new Date(cDay);
  date.setDate(1);

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const result = [];
  for (let i = 1; i <= lastDay; i++) {
    result.push(i);
  }

  return result;
};

export const getPrevMonthDays = (cDay) => {
  const date = new Date(cDay);
  date.setDate(1);

  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const firstDayIndex = date.getDay();

  const result = [];
  for (let i = firstDayIndex; i > 0; i--) {
    result.push(prevLastDay - i + 1);
  }

  return result;
};

export const getNextMonthDays = (cDay) => {
  const date = new Date(cDay);
  date.setDate(1);

  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const result = [];
  for (let i = 1; i <= nextDays; i++) {
    result.push(i);
  }

  return result;
};

export const getAllDays = () => {
  const result = [];
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 31; j++) {
      result.push(j);
    }
  }
  return result;
};
