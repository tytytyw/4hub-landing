import { useLocales } from "react-localized";
import { typeCheck } from "./generalHelpers";
import { TASK_TYPES, TYPES } from "./globalVariables";
import { addHours, format } from "date-fns";

const d = new Date();

export function useMonths() {
  const { __ } = useLocales();
  return (year) => [
    {
      id: 0,
      name: __("Январь"),
      declensionName: __("Января"),
      code: 1,
      days: 31
    },
    {
      id: 1,
      name: __("Февраль"),
      declensionName: __("Февраля"),
      code: 4,
      days: year % 4 === 0 ? 29 : 28
    },
    { id: 2, name: __("Март"), declensionName: __("Марта"), code: 4, days: 31 },
    {
      id: 3,
      name: __("Апрель"),
      declensionName: __("Апреля"),
      code: 0,
      days: 30
    },
    { id: 4, name: __("Май"), declensionName: __("Мая"), code: 2, days: 31 },
    { id: 5, name: __("Июнь"), declensionName: __("Июня"), code: 5, days: 30 },
    { id: 6, name: __("Июль"), declensionName: __("Июля"), code: 0, days: 31 },
    {
      id: 7,
      name: __("Август"),
      declensionName: __("Августа"),
      code: 3,
      days: 31
    },
    {
      id: 8,
      name: __("Сентябрь"),
      declensionName: __("Сентября"),
      code: 6,
      days: 30
    },
    {
      id: 9,
      name: __("Октябрь"),
      declensionName: __("Октября"),
      code: 1,
      days: 31
    },
    {
      id: 10,
      name: __("Ноябрь"),
      declensionName: __("Ноября"),
      code: 4,
      days: 30
    },
    {
      id: 11,
      name: __("Декабрь"),
      declensionName: __("Декабря"),
      code: 6,
      days: 31
    }
  ];
}

export const useGetMonthByIndex = () => {
  const months = useMonths();
  return (index) => {
    const findMonth = months.find((item) => item.id === index);
    return findMonth.name;
  };
};

export function useDaysOfWeeks() {
  const { __ } = useLocales();
  return {
    short: [__("Пн"), __("Вт"), __("Ср"), __("Чт"), __("Пн"), __("Сб"), __("Вс")],
    code: [2, 3, 4, 5, 6, 0, 1]
  };
}

const centuryCode = (year) => {
  const century = Number(String(year).slice(0, 2));
  if (century % 4 === 0) return 6;
  if (century % 4 === 1) return 4;
  if (century % 4 === 2) return 2;
  if (century % 4 === 3) return 0;
};

const yearCode = (year) => {
  const short = Number(String(year).slice(2));
  if (year >= 2000) return (centuryCode(year) + short + Math.floor(short / 4)) % 7;
};

export const getDate = (n) => {
  return {
    day: d.getDate() < 9 ? `${n === 0 ? n : ""}${d.getDate()}` : d.getDate(),
    month: d.getMonth() < 9 ? `${n === 0 ? n : ""}${d.getMonth() + 1}` : d.getMonth(),
    year: d.getFullYear()
  };
};

const useRenderDaysInMonth = () => {
  const months = useMonths();
  return (month, obj) => {
    let days = month === 1 ? months(obj?.year)[month].days : months(obj?.year)[month].days;
    let arr = [];
    for (let i = 1; i <= days; i++) {
      arr.push(i);
    }
    return arr;
  };
};

const useDayInWeek = () => {
  const months = useMonths();
  return (obj) => {
    if (obj.year % 4 === 0 && Number(obj.month) <= 2) {
      return {
        firstDay: ((1 + months()[Number(obj.month) - 1].code + yearCode(obj.year)) % 7) - 1,
        today: ((obj.day + months()[Number(obj.month) - 1].code + yearCode(obj.year)) % 7) - 1,
        lastDay:
          ((months()[Number(obj.month) - 1].days + months()[Number(obj.month) - 1].code + yearCode(obj.year)) % 7) - 1
      };
    } else {
      return {
        firstDay: (1 + months()[Number(obj.month) - 1].code + yearCode(obj.year)) % 7,
        today: (obj.day + months()[Number(obj.month) - 1].code + yearCode(obj.year)) % 7,
        lastDay: (months()[Number(obj.month) - 1].days + months()[Number(obj.month) - 1].code + yearCode(obj.year)) % 7
      };
    }
  };
};

const useRenderBeforeDays = () => {
  const months = useMonths();
  return (month, i) => {
    const arr = [];
    for (let j = 0; j < i; j++) {
      arr.unshift(months()[month].days - j);
    }
    return arr;
  };
};

const renderAfterDays = (last) => {
  let arr = [];
  for (let i = 1; i <= 6 - last; i++) {
    arr.push(i);
  }
  return arr;
};

export const useGenerateCalendar = () => {
  const renderDaysInMonth = useRenderDaysInMonth();
  const dayInWeek = useDayInWeek();
  const renderBeforeDays = useRenderBeforeDays();
  const daysOfWeeks = useDaysOfWeeks();
  return (strings, obj) => {
    const arr = [];
    obj.month === "1"
      ? arr.push(renderBeforeDays(11, daysOfWeeks.code.indexOf(dayInWeek(obj).firstDay), obj))
      : arr.push(renderBeforeDays(Number(obj.month) - 2, daysOfWeeks.code.indexOf(dayInWeek(obj).firstDay)));
    arr.push(renderDaysInMonth(Number(obj.month) - 1, obj));
    arr.push(renderAfterDays(daysOfWeeks.code.indexOf(dayInWeek(obj).lastDay)));
    if (strings * 7 > arr.flat().length) {
      if (arr[0].length === 0) {
        arr.splice(0, 1, obj.month === "1" ? renderBeforeDays(11, 7) : renderBeforeDays(Number(obj.month) - 2, 7));
      }
      if (strings * 7 > arr.flat().length) {
        let number = arr[2][arr[2].length - 1] + 1 || 1;
        if (obj.year % 4 === 0 && Number(obj.month) <= 2) {
          for (let i = 0; i <= strings * 7 - arr.flat().length; i++) {
            arr[2].push(number);
            number++;
          }
        } else {
          for (let i = number; i < number + 7; i++) {
            arr[2].push(i);
          }
        }
      }
    }
    return arr;
  };
};

export const areEqual = (a, b) => {
  if (!a || !b) return false;
  return a.day === b.day && a.month === b.month && a.year === b.year;
};

export const useDateToString = () => {
  const { __ } = useLocales();
  const months = useMonths();
  return (date) => {
    if (date === "today") return __("Сегодня");
    if (date === "yesterday") return __("Вчера");
    const arr = date.split("-").reverse();
    const day = arr[0];
    const month = months()[+arr[1] - 1].declensionName;
    const year = d.getFullYear() === +arr[2] ? "" : arr[2];
    return `${+day} ${month} ${year}`;
  };
};

export function formatDateStandard(date) {
  if (typeCheck(date) === TYPES.DATE) {
    return format(date, "yyyy-MM-dd HH:mm:ss");
  } else {
    throw new Error("Type of the incoming parameter must be date");
  }
}

export function parseCalendarDateToDate(date) {
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
    const d = date.split(".");
    return new Date(`${d[2]}-${d[1]}-${d[0]}`);
  } else {
    throw new Error("Date does not correspond to format - dd.MM.yyyy");
  }
}

export function createArrayOfHoursPerDay(beginFrom, interval) {
  if (typeCheck(beginFrom) === TYPES.DATE) {
    let hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(format(addHours(beginFrom, i * interval), "HH:mm"));
    }
    return hours;
  } else {
    throw new Error("Type of the incoming parameter must be date");
  }
}

export const useEvents = () => {
  const { __ } = useLocales();
  return [
    { id: TASK_TYPES.TASK, name: __("Задача"), icon: "task" },
    { id: TASK_TYPES.BIRTHDAY, name: __("День рождение"), icon: "birthday" },
    { id: TASK_TYPES.ONLINE_MEETING, name: __("Встреча online"), icon: "online-meeting" },
    { id: TASK_TYPES.OFFLINE_MEETIGN, name: __("Встреча offline"), icon: "offline-meeting" },
    { id: TASK_TYPES.REMINDER, name: __("Напоминание"), icon: "reminder" },
    { id: TASK_TYPES.OTHER, name: __("Другое"), icon: "other" }
  ];
};
