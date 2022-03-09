import api from '../api';
import { onGetCompanyContacts, onGetContacts } from '../Store/actions/CabinetActions';

export const contactDelete = (contact, id_company, dispatch, uid, nullifyAction) => {
	nullifyAction()
	const addOrgParams = () => id_company ? `&id_company=${id_company}` : ''
    api.post(`/ajax/${id_company ? 'org_' : ''}contacts_del.php?uid=${uid}&id=${contact.id}${addOrgParams()}`)
        .then(res => {if(res.data.ok) {
            dispatch(id_company ? onGetCompanyContacts() : onGetContacts());
    } else { console.log(res?.error) }})
        .catch(err => console.log(err));
};

export const monthToString = (month) => {
	switch (month) {
		case 0:
			return " Января";
		case 1:
			return " Февраля";
		case 2:
			return " Марта";
		case 3:
			return " Апреля";
		case 4:
			return " Мая";
		case 5:
			return " Июня";
		case 6:
			return " Июля";
		case 7:
			return " Августа";
		case 8:
			return " Сентября";
		case 9:
			return " Октября";
		case 10:
			return " Ноября";
		case 11:
			return " Декабря";
		default:
			return `.${month}`;
	}
};

const gtmToString = (gmt) => {
	if (gmt > 9) return `+${gmt}:00`
	if (gmt > 0) return `+0${gmt}:00`
	if (gmt === 0) return `+00:00`
	if (gmt < 0) return gmt < -9 ? `${gmt}:00` : `-0${gmt * -1}:00`
	return ""
}

export const createContactStatus = (
	isUser,
	currentDate,
	contactLastVisitDate,
	isOnline,
	gmt
) => {
	if (!isUser) return "Пользователя нет в системе 4Hub";
	if (!gmt || !contactLastVisitDate || !currentDate) return "";

	const lastVisitWithGmt = new Date(
		contactLastVisitDate.replace(' ','T') + gtmToString(gmt)
	);
	const timeToString = lastVisitWithGmt.toLocaleTimeString("ru");
	const lastVisitTime = timeToString.slice(0, timeToString.lastIndexOf(":"));
	const lastVisitDate = lastVisitWithGmt.toLocaleDateString("ru");

	if (currentDate.getFullYear() === lastVisitWithGmt.getFullYear()) {
		//this year
		if (currentDate.getMonth() === lastVisitWithGmt.getMonth()) {
			if (currentDate.getDate() === lastVisitWithGmt.getDate()) {
				//today
				const minutesDifference =
					(currentDate - new Date(lastVisitWithGmt)) / 60000;
				if (minutesDifference > 12 * 60) {
					// more than 12 hours ago
					return `сегодня в ${lastVisitTime}`;
				} else if (minutesDifference <= 60) {
					//less than an hour ago
					const minutes = Math.floor(minutesDifference);
					//contact online
					return minutes < 1 || isOnline === 1
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
			} else if (currentDate.getDate() - 1 === lastVisitWithGmt.getDate()) {
				//yesterday
				return `вчера в ${lastVisitTime}`;
			}
		}
		return `был в сети ${lastVisitWithGmt.getDate()}${monthToString(
			lastVisitWithGmt.getMonth()
		)}`;
	}
	//not this year
	return `был в сети ${lastVisitDate}`;
};

export const messageTime = (currentDate, message_ut, gmt) => {
	if (!gmt || !message_ut || !currentDate) return "";

	const date = new Date(message_ut.replace(' ','T') + gtmToString(gmt));
	const time = date.toLocaleTimeString("ru");
	const minutesDifference = (currentDate - date) / 60000;
	if (minutesDifference >= 60) {
		return time.slice(0, time.lastIndexOf(':'))
	} else {
		return minutesDifference >= 1
		? `${Math.floor(minutesDifference)} мин назад`
		: minutesDifference < 0.5
			? 'только что'
			: 'менее минуты назад'
	}
}
