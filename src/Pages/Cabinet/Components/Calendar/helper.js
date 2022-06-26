export const getYears = () => {
  const years = [];
  for (let i = new Date().getFullYear(); i >= 1920; i--) {
    years.push({ id: i, text: `${i} год` });
  }
  return years;
};

export const getDays = () => {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push({ id: i, text: `${i} день` });
  }
  return days;
};

export const months = [
  { id: 0, text: "Январь" },
  { id: 1, text: "Февраль" },
  { id: 2, text: "Март" },
  { id: 3, text: "Апрель" },
  { id: 4, text: "Май" },
  { id: 5, text: "Июнь" },
  { id: 6, text: "Июль" },
  { id: 7, text: "Август" },
  { id: 8, text: "Сентябрь" },
  { id: 9, text: "Октябрь" },
  { id: 10, text: "Ноябрь" },
  { id: 11, text: "Декабрь" }
];

export const days = [
  { id: 1, day: "Пн" },
  { id: 2, day: "Вт" },
  { id: 3, day: "Ср" },
  { id: 4, day: "Чт" },
  { id: 5, day: "Пт" },
  { id: 6, day: "Сб" },
  { id: 0, day: "Вс" }
];

export const hours = [
  { text: "9:00", value: 9 },
  { text: "10:00", value: 10 },
  { text: "11:00", value: 11 },
  { text: "12:00", value: 12 },
  { text: "13:00", value: 13 },
  { text: "14:00", value: 14 },
  { text: "15:00", value: 15 },
  { text: "16:00", value: 16 },
  { text: "17:00", value: 17 },
  { text: "18:00", value: 18 },
  { text: "19:00", value: 19 },
  { text: "20:00", value: 20 },
  { text: "21:00", value: 21 },
  { text: "22:00", value: 22 },
  { text: "23:00", value: 23 }
];

export const monthNameType = {
  0: "Января",
  1: "Февраля",
  2: "Марта",
  3: "Апреля",
  4: "Мая",
  5: "Июня",
  6: "Июля",
  7: "Августа",
  8: "Сентября",
  9: "Октября",
  10: "Ноября",
  11: "Декабря"
};

export const weekDays = [
  { id: 1, name: "Вс" },
  { id: 2, name: "Пн" },
  { id: 3, name: "Вт" },
  { id: 4, name: "Ср" },
  { id: 5, name: "Чт" },
  { id: 6, name: "Пт" },
  { id: 7, name: "Сб" }
];
