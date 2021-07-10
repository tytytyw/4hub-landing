export const getYears = () => {
    const years = []
    for (let i = (new Date()).getFullYear(); i >= 1920; i--) {
        years.push({id: i, text: `${i} год`})
    }
    return years
}

export const getDays = () => {
    const days = []
    for (let i = 1; i <= 31; i++) {
        days.push({id: i, text: `${i} день`})
    }
    return days
}

export const months = [
    {id: 0, text: 'Январь'},
    {id: 1, text: 'Февраль'},
    {id: 2, text: 'Март'},
    {id: 3, text: 'Апрель'},
    {id: 4, text: 'Май'},
    {id: 5, text: 'Июнь'},
    {id: 6, text: 'Июль'},
    {id: 7, text: 'Август'},
    {id: 8, text: 'Сентябрь'},
    {id: 9, text: 'Октябрь'},
    {id: 10, text: 'Ноябрь'},
    {id: 11, text: 'Декабрь'},
]

export const taskTypesColor = {
    1: '#25AB27',
    2: '#E4791C',
    3: '#A11CE4',
}

export const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export const days = [
    {id: 2, day: 'Вт', number: '11'},
    {id: 3, day: 'Ср', number: '12'},
    {id: 4, day: 'Чт', number: '13'},
    {id: 5, day: 'Пн', number: '14'},
    {id: 6, day: 'Сб', number: '15'},
    {id: 7, day: 'Вс', number: '16'},
]

export const hours = [
    {value: '9:00'},
    {value: '10:00'},
    {value: '11:00'},
    {value: '12:00'},
    {value: '13:00'},
    {value: '14:00'},
    {value: '15:00'},
    {value: '16:00'},
    {value: '17:00'},
    {value: '18:00'},
    {value: '19:00'},
    {value: '20:00'},
    {value: '21:00'},
    {value: '22:00'},
    {value: '23:00'},
]