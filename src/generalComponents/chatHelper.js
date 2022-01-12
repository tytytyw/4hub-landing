export const createContactStatus = (contact, currentDate) => {
    if (!contact.is_user) return "Пользователя нет в системе 4Hub";

    const lastVisitDate = {};
    // const contactDate = contact.ut; //expected '2022-01-12 19:32:46'
    const contactDate = '2022-01-12 21:00:00';

    [lastVisitDate.date, lastVisitDate.time] = contactDate.split(" ");
    lastVisitDate.time = `${lastVisitDate.time.split(":")[0]}:${
        lastVisitDate.time.split(":")[1]
    }`;
    [lastVisitDate.year, lastVisitDate.month, lastVisitDate.day] =
        lastVisitDate.date.split("-");

    if (currentDate.getFullYear() === +lastVisitDate.year) {
        //this year
        if (currentDate.getMonth() + 1 === +lastVisitDate.month) {
            if (currentDate.getDate() === +lastVisitDate.day) {
                //today
                const minutesDifference =
                    (currentDate - new Date(contactDate)) / 60000;
                if (minutesDifference > 12 * 60) {
                    // more than 12 hours ago
                    return `сегодня в ${lastVisitDate.time}`;
                } else if (minutesDifference <= 60) {
                    //less than an hour ago
                    const minutes = Math.floor(minutesDifference);
                    //contact online
                    return minutes < 1 || contact.is_online === 1
                        ? "в сети"
                        : `${minutes} мин. назад`;
                } else {
                    //more than an hour and less than 12 hours ago
                    const hours = Math.floor(minutesDifference / 60);
                    let word_ending = "a";
                    if (hours > 4) word_ending = "ов";
                    if (hours === 1) word_ending = "";
                    return `${hours > 1 ? hours : ""} час${word_ending} назад`;
                }
            } else if (currentDate.getDate() === +lastVisitDate.day - 1) {
                //yesterday
                return `вчера в ${lastVisitDate.time}`;
            }
        }
        const monthToString = (month) => {
            switch (month) {
                case "01":
                    return " Января";
                case "02":
                    return " Февраля";
                case "03":
                    return " Марта";
                case "04":
                    return " Апреля";
                case "05":
                    return " Мая";
                case "06":
                    return " Июня";
                case "07":
                    return " Июля";
                case "08":
                    return " Августа";
                case "09":
                    return " Сентября";
                case "10":
                    return " Октября";
                case "11":
                    return " Ноября";
                case "12":
                    return " Декабря";
                default:
                    return `.${month}`;
            }
        };
        return `был в сети ${+lastVisitDate.day}${monthToString(
            lastVisitDate.month
        )}`;
    }
    //not this year
    return `был в сети ${+lastVisitDate.day}.${lastVisitDate.month}.${lastVisitDate.year}`;
};