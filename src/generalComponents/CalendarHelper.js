const d = new Date();

export const months = (year) => [
    {id: 0, name: 'Январь', code: 1, days: 31},
    {id: 1, name: 'Февраль', code: 4, days: year % 4 === 0 ? 29 : 28},
    {id: 2, name: 'Март', code: 4, days: 31},
    {id: 3, name: 'Апрель', code: 0, days: 30},
    {id: 4, name: 'Май', code: 2, days: 31},
    {id: 5, name: 'Июнь', code: 5, days: 30},
    {id: 6, name: 'Июль', code: 0, days: 31},
    {id: 7, name: 'Август', code: 3, days: 31},
    {id: 8, name: 'Сентябрь', code: 6, days: 30},
    {id: 9, name: 'Октябрь', code: 1, days: 31},
    {id: 10, name: 'Ноябрь', code: 4, days: 30},
    {id: 11, name: 'Декабрь', code: 6, days: 31}
];

export const daysOfWeeks = {
  short: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс',],
  code: [2, 3, 4, 5, 6, 0, 1,]
};

const centuryCode = (year) => {
    const century = Number(String(year).slice(0, 2));
    if(century % 4 === 0) return 6;
    if(century % 4 === 1) return 4;
    if(century % 4 === 2) return 2;
    if(century % 4 === 3) return 0;
};

const yearCode = (year) => {
    const short = Number(String(year).slice(2));
    if(year >= 2000) return ((centuryCode(year) + short + Math.floor(short / 4)) % 7);
};

export const getDate = (n) => {
    return{day: d.getDate(), month: d.getMonth() < 9 ? `${n === 0 ? n : ''}${d.getMonth() + 1}` : d.getMonth(), year: d.getFullYear()}
};

const renderDaysInMonth = (month, obj) => {
    let days = month === 1 ? months(obj?.year)[month].days : months(obj?.year)[month].days;
    let arr = [];
    for(let i = 1; i <= days; i++) {
        arr.push(i);
    }
    return arr;
};

const dayInWeek = (obj) => {
    if(obj.year % 4 === 0 && Number(obj.month) <= 2) {
        return {
            firstDay: ((1 + months()[Number(obj.month) - 1].code + yearCode(obj.year)) % 7) - 1,
            today: ((obj.day + months()[Number(obj.month) - 1].code + yearCode(obj.year)) % 7) - 1,
            lastDay: ((months()[Number(obj.month) - 1].days + months()[Number(obj.month) - 1].code + yearCode(obj.year)) % 7) - 1
        }
    } else {
        return {
            firstDay: (1 + months()[Number(obj.month) - 1].code + yearCode(obj.year)) % 7,
            today: (obj.day + months()[Number(obj.month) - 1].code + yearCode(obj.year)) % 7,
            lastDay: (months()[Number(obj.month) - 1].days + months()[Number(obj.month) - 1].code + yearCode(obj.year)) % 7
        }
    }
};

const renderBeforeDays = (month, i) => {
    const arr = [];
    for(let j = 0; j < i; j++) {
        arr.unshift(months()[month].days - j);
    }
    return arr;
};

const renderAfterDays = (last) => {
    let arr = [];
    for (let i = 1; i <= (6 - last); i++) {
        arr.push(i);
    }
    return arr;
};

export const generateCalendar = (strings, obj) => {
    const arr = [];
    obj.month === '1' ? arr.push(renderBeforeDays(11, daysOfWeeks.code.indexOf(dayInWeek(obj).firstDay), obj)) : arr.push(renderBeforeDays(Number(obj.month) - 2, daysOfWeeks.code.indexOf(dayInWeek(obj).firstDay)));
    arr.push(renderDaysInMonth(Number(obj.month) - 1, obj));
    arr.push(renderAfterDays(daysOfWeeks.code.indexOf(dayInWeek(obj).lastDay)));
    if(strings * 7 > arr.flat().length) {
        if(arr[0].length === 0) {
            arr.splice(0, 1, (obj.month === '1' ? renderBeforeDays(11, 7) : renderBeforeDays(Number(obj.month) - 2, 7)));
        }
        if(strings * 7 > arr.flat().length) {
            let number = arr[2][arr[2].length - 1] + 1 || 1;
            if(obj.year % 4 === 0 && Number(obj.month) <= 2) {
                for(let i = 0; i <= (strings * 7 - arr.flat().length); i++) {
                    arr[2].push(number);
                    number++;
                }
            } else {
                for(let i = number; i < (number + 7); i++) {
                arr[2].push(i);
            }
            }
        }
    }
    return arr;
};

export const areEqual = (a, b) => {
  if(!a || !b) return false;
  return a.day === b.day &&
         a.month === b.month &&
         a.year === b.year;
};
