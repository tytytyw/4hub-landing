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
    {id: 1, text: 'Январь'},
    {id: 2, text: 'Февраль'},
    {id: 3, text: 'Март'},
    {id: 4, text: 'Апрель'},
    {id: 5, text: 'Май'},
    {id: 6, text: 'Июнь'},
    {id: 7, text: 'Июль'},
    {id: 8, text: 'Август'},
    {id: 9, text: 'Сентябрь'},
    {id: 10, text: 'Октябрь'},
    {id: 11, text: 'Ноябрь'},
    {id: 12, text: 'Декабрь'},
]