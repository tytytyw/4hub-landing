import React, { useState, useEffect } from "react";
import SafeIcon from "../../../Safe/SafeIcon";
import classNames from "classnames";
import { useSelector } from "react-redux";
import styles from "./ShareSafe.module.sass";
import api from "../../../../../../api";
import PopUp from "../../../../../../generalComponents/PopUp";
import Error from "../../../../../../generalComponents/Error";
import StoragePeriod from "../StoragePeriod/StoragePeriod";
import ShareToMessengers from "../ShareToMessengers/ShareToMessengers";
import SetPassword from "../SetPassword/SetPassword";
import { ReactComponent as Password } from "../../../../../../assets/PrivateCabinet/password.svg";
import { ReactComponent as Calendar } from "../../../../../../assets/PrivateCabinet/calendar-6.svg";
import { ReactComponent as Pensil } from "../../../../../../assets/PrivateCabinet/edit.svg";
import { ReactComponent as Eye } from "../../../../../../assets/PrivateCabinet/eye.svg";
import { ReactComponent as Download } from "../../../../../../assets/PrivateCabinet/download-2.svg";
import {imageSrc} from '../../../../../../generalComponents/globalVariables';

function ShareSafe({ safe, close, setShowSuccessMessage, setLoadingType }) {
	const [error, setError] = useState(false);
	const [emptyField, setEmptyField] = useState(false);
	const [displaySetPassword, setDisplaySetPassword] = useState(false);
	const [displayMessengers, setDisplayMessengers] = useState(false);
	const [displayStotagePeriod, setDisplayStotagePeriod] = useState(false);
	const [dateValue, setDateValue] = useState("");
	const [timeValue, setTimeValue] = useState({
		hours: "",
		minutes: "",
		seconds: "",
	});
	const uid = useSelector((state) => state.user.uid);
	const [data, setData] = useState({
		user_to: "",
		prim: "",
		deadline: "",
		pass: "",
		is_read: 1,
		is_write: 1,
		is_download: 1,
	});
	const setTime = (time, limit) => {
		return time < limit ? (time < 10 ? `0${time}` : time) : time[0];
	};
	const switchOn = (value) => {
		setData((data) => ({ ...data, [value]: data[value] ? 0 : 1 }));
	};

	useEffect(() => {
		setData((data) => ({
			...data,
			deadline: dateValue
				? `${dateValue} ${
						timeValue.hours ? setTime(timeValue.hours, 24) : "23"
				  }:${timeValue.minutes ? setTime(timeValue.minutes, 60) : "59"}`
				: "",
		}));
	}, [dateValue, timeValue]); // eslint-disable-line react-hooks/exhaustive-deps

	const onShareSafe = () => {
		setLoadingType("squarify");
		api
			.get(
				`/ajax/safe_share.php?uid=${uid}&id_safe=${safe.id}&pass=${data.pass}&user_to=${data.user_to}&prim=${data.prim}&deadline=${data.deadline}&is_read=${data.is_read}&is_write=${data.is_write}&is_download=${data.is_download}`
			)
			.then((res) => {
				if (res.data.ok === 1) {
					setShowSuccessMessage("Отправлено");
					close();
				} else if (res.data.error) {
					setError(
						res.data.error.includes("user_to") &&
							res.data.error.includes("not found")
							? "Пользователь не найден"
							: res.data.error
					);
				} else {
					setError("Что-то пошло не так. Повторите попытку позже");
					console.log(res);
				}
			})
			.catch((err) => {
				setError(`${err}`);
			})
			.finally(() => setLoadingType(""));
	};

	const onAddPass = (password) => {
		setData((data) => ({ ...data, pass: password }));
	};

	return (
		<PopUp set={close}>
			{!displayStotagePeriod && (
				<div className={styles.ShareFile_wrap}>
					{
						<div className={classNames(styles.header, styles.border_bottom)}>
							<div className={styles.innerFileWrap}>
								<SafeIcon type={safe.id_color} />
							</div>

							<div className={styles.descriptionWrap}>
								<div className={styles.fileName}>{safe.name}</div>
								<div className={styles.innerFileInfo}>
									<div className={styles.descriptionGroup}>
										<div
											className={classNames({
												[styles.tagBlock]: true,
												[styles.stag]: !!safe?.tags,
											})}
										>
											{safe?.tags && `#${safe.tags}`}
										</div>
										{safe.id_fig && (
											<img
												src={`${imageSrc}/assets/PrivateCabinet/signs/${safe.id_fig}.svg`}
												alt="sign"
											/>
										)}
										{safe.id_emo && (
											<img
												src={`${imageSrc}/assets/PrivateCabinet/smiles/${safe.id_emo}.svg`}
												alt="emoji"
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					}
					<div className={classNames(styles.recipient, styles.border_bottom)}>
						<p className={styles.recipient_title}>{displayMessengers ? 'Предоставить доступ с помощью' : 'Кому'}:</p>
						{!displayMessengers && (
							<div className={styles.recipient_mail}>
								<input
									className={emptyField ? styles.empty : ""}
									onClick={() => setEmptyField(false)}
									onChange={(e) =>
										setData((data) => ({ ...data, user_to: e.target.value }))
									}
									value={data.user_to}
									placeholder="Эл.адрес или имя"
									type="text"
								></input>
							</div>
						)}
						{displayMessengers && (
							<ShareToMessengers setDisplayMessengers={setDisplayMessengers} user_to={data.user_to} />
						)}
						{!displayMessengers &&<div className={styles.recipient_messenger}>
							<span onClick={() => setDisplayMessengers(true)}>
								Отправить через мессенджер
							</span>
						</div>}
						
					</div>
					<div className={classNames(styles.comment, styles.border_bottom)}>
						<textarea
							onChange={(e) =>
								setData((data) => ({ ...data, prim: e.target.value }))
							}
							value={data.prim}
							placeholder="Добавить комментарий к Сейфу"
							type="text"
						></textarea>
					</div>
					<div className={classNames(styles.row_item, styles.border_bottom)}>
						<div className={styles.ico_wrap}>
							<Password width={16} height={20} className={styles.row_ico} />
						</div>
						<div className={styles.input_wrap}>
							<p className={styles.input_title}>Временный пароль</p>
							<span className={styles.input_descrp}>
								Установите временный пароль для выбранного Вами пользователя
							</span>
						</div>
						<span
							onClick={() => setDisplaySetPassword(true)}
							className={styles.set_btn}
						>
							Установить
						</span>
					</div>
					<div className={classNames(styles.row_item, styles.border_bottom)}>
						<div className={styles.ico_wrap}>
							<Calendar width={17} height={17}  className={styles.row_ico} />
						</div>
						<div className={styles.input_wrap}>
							<p className={styles.input_title}>Срок доступа к сейфу</p>
							<span className={styles.input_descrp}>
								Установите срок доступа к сейфу для выбранного Вами пользователя
							</span>
						</div>
						<span
							onClick={() => setDisplayStotagePeriod(true)}
							className={styles.set_btn}
						>
							Установить
						</span>
					</div>
					<div className={classNames(styles.share_link, styles.border_bottom)}>
						<h5 className={styles.share_link_title}>
							Взаимодействие с информацией в сейфе
						</h5>
						<div className={styles.row_item}>
							<div className={styles.ico_wrap}>
								<Pensil width={17} height={17}  className={styles.row_ico} />
							</div>
							<div className={styles.input_wrap}>
								<p className={styles.input_title}>Редактирование</p>
								<span className={styles.input_descrp}>
									Все пользователи, которым предоставлен доступ к сейфу, могут
									редактировать его содержание
								</span>
							</div>
							<div
								className={classNames({
									[styles.switcherActive]: data?.is_write,
									[styles.switcher]: true,
								})}
								onClick={() => switchOn("is_write")}
							>
								<div
									className={classNames({
										[styles.switchActive]: data?.is_write,
										[styles.switch]: true,
									})}
								/>
							</div>
						</div>
						<div className={styles.row_item}>
							<div className={styles.ico_wrap}>
								<Eye width={21} height={14}  className={styles.row_ico} />
							</div>
							<div className={styles.input_wrap}>
								<p className={styles.input_title}>Просмотр</p>
								<span className={styles.input_descrp}>
									Все пользователи, которым предоставлен доступ к сейфу, могут
									просматривать содержание сейфа
								</span>
							</div>
							<div
								className={classNames({
									[styles.switcherActive]: data?.is_read,
									[styles.switcher]: true,
								})}
								onClick={() => switchOn("is_read")}
							>
								<div
									className={classNames({
										[styles.switchActive]: data?.is_read,
										[styles.switch]: true,
									})}
								/>
							</div>
						</div>
						<div className={styles.row_item}>
							<div className={styles.ico_wrap}>
								<Download width={21} height={21}  className={styles.row_ico} />
							</div>
							<div className={styles.input_wrap}>
								<p className={styles.input_title}>Скачивание</p>
								<span className={styles.input_descrp}>
									Все пользователи, которым предоставлен доступ к сейфу, могут
									скачать содержание сейфа
								</span>
							</div>
							<div
								className={classNames({
									[styles.switcherActive]: data?.is_download,
									[styles.switcher]: true,
								})}
								onClick={() => switchOn("is_download")}
							>
								<div
									className={classNames({
										[styles.switchActive]: data?.is_download,
										[styles.switch]: true,
									})}
								/>
							</div>
						</div>
					</div>
					<div className={styles.buttonsWrap}>
						<div className={styles.cancel} onClick={() => close()}>
							Отмена
						</div>
						<div
							className={styles.add}
							onClick={() => {
								data.user_to ? onShareSafe() : setEmptyField(true);
							}}
						>
							Отправить
						</div>
					</div>
				</div>
			)}
			{error && <Error error={error} set={close} message={error} />}

			{displayStotagePeriod && (
				<StoragePeriod
					safe={safe}
					setDisplayStotagePeriod={setDisplayStotagePeriod}
					dateValue={dateValue}
					setDateValue={setDateValue}
					timeValue={timeValue}
					setTimeValue={setTimeValue}
				/>
			)}

			{displaySetPassword && (
				<SetPassword
					onAddPass={onAddPass}
					setDisplaySetPassword={setDisplaySetPassword}
				/>
			)}
		</PopUp>
	);
}

export default ShareSafe;
