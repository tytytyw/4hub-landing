import React, { useState, useEffect } from "react";
import SafeIcon from "../../../Safe/SafeIcon";
import classNames from "classnames";
import { useSelector } from "react-redux";
import styles from "./ShareSafe.module.sass";
import api from "../../../../../../api";
import PopUp from "../../../../../../generalComponents/PopUp";
import Error from "../../../../../../generalComponents/Error";
import StoragePeriod from "../StoragePeriod/StoragePeriod";
import { ReactComponent as Calendar } from "../../../../../../assets/PrivateCabinet/calendar-6.svg";

function ShareSafe({ safe, close, setShowSuccessMessage, setLoadingType }) {
	const [error, setError] = useState(false);
	const [emptyField, setEmptyField] = useState(false);
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
	});
	const setTime = (time, limit) => {
		return time < limit ? (time < 10 ? `0${time}` : time) : time[0];
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
				`/ajax/safe_share.php?uid=${uid}&id_safe=${safe.id}&user_to=${data.user_to}&prim=${data.prim}&deadline=${data.deadline}`
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
												src={`./assets/PrivateCabinet/signs/${safe.id_fig}.svg`}
												alt="sign"
											/>
										)}
										{safe.id_emo && (
											<img
												src={`./assets/PrivateCabinet/smiles/${safe.id_emo}.svg`}
												alt="emoji"
											/>
										)}
									</div>
								</div>
							</div>
							<div className={styles.buttons_wrap}>
								<div className={styles.close_wrap} onClick={close}>
									<span className={styles.close} />
								</div>
							</div>
						</div>
					}
					<div className={classNames(styles.recipient, styles.border_bottom)}>
						<p className={styles.recipient_title}>Кому:</p>
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
							<Calendar className={styles.row_ico} />
						</div>
						<div className={styles.input_wrap}>
							<p className={styles.input_title}>Срок хранения сейфа</p>
							<input
								value="Установите срок хранения сейфа (после завершения сейф будет удален)"
								type="button"
							></input>
						</div>
						<span
							onClick={() => setDisplayStotagePeriod(true)}
							className={styles.set_btn}
						>
							Установить
						</span>
					</div>
					<div className={styles.buttonsWrap}>
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
		</PopUp>
	);
}

export default ShareSafe;
