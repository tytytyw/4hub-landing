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