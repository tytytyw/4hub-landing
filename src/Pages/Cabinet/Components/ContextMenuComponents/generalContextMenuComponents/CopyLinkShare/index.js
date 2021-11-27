import React, { useEffect, useRef, useState } from "react";

// import api from "../../../../../../api";
import styles from "./CopyLinkShare.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import StoragePeriod from "./StoragePeriod/StoragePeriod";
import SetPassword from "./SetPassword/SetPassword";
import ShareToMessengers from "./ShareToMessengers/ShareToMessengers";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CopyIcon } from "../../../../../../assets/PrivateCabinet/copy.svg";
import { ReactComponent as UserIcon } from "../../../../../../assets/PrivateCabinet/userIcon.svg";
import { ReactComponent as WorldIcon } from "../../../../../../assets/PrivateCabinet/world.svg";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/PrivateCabinet/calendar-6.svg";
import { ReactComponent as PasswordIcon } from "../../../../../../assets/PrivateCabinet/password.svg";
// import { ReactComponent as FolderIcon } from "../../../../../assets/PrivateCabinet/folder-2.svg";
import { onGetContacts } from "../../../../../../Store/actions/CabinetActions";
import Loader from "../../../../../../generalComponents/Loaders/4HUB";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";

function CopyLinkShare({ nullifyAction, setShowSuccessMessage }) {
	// const uid = useSelector(state => state.user.uid);
	const contactList = useSelector((state) => state.Cabinet.contactList);
	const [url, setUrl] = useState("Загрузка...");
	const [review, setReview] = useState({ text: "Просмотр" });
	const [context, setContext] = useState("");
	const linkRef = useRef("");
	const [chosenContacts, setChosenContacts] = useState([]);
	const [sendAccess, setSendAccess] = useState(false);
	const [notify, setNotify] = useState(false);
	const [prim, setPrim] = useState("");

	// const [error, setError] = useState(false);
	// const [emptyField, setEmptyField] = useState(false);
	const [displayStotagePeriod, setDisplayStotagePeriod] = useState(false);
	const [displaySetPassword, setDisplaySetPassword] = useState(false);
	const [displayMessengers, setDisplayMessengers] = useState(false);
	const [dateValue, setDateValue] = useState("");
	const [timeValue, setTimeValue] = useState({
		hours: "",
		minutes: "",
		seconds: "",
	});
	const [compareLogin, setCompareLogin] = useState(true);
	// const uid = useSelector((state) => state.user.uid);

	const dispatch = useDispatch();

	const saveChanges = () => {
		nullifyAction();
	};

	const checkContextMenu = (e) => {
		if (!context) {
			e.nativeEvent.path.forEach((el) => {
				if (
					typeof el.className === "string" &&
					el.className.includes(styles.contacts)
				)
					onOpenContacts();
				if (
					typeof el.className === "string" &&
					el.className.includes(styles.review)
				)
					setContext("review");
			});
		} else {
			let block = false;
			e.nativeEvent.path.forEach((el) => {
				if (
					typeof el.className === "string" &&
					el.className.includes(styles.contactsList)
				)
					block = true;
			});
			if (!block) setContext("");
		}
	};

	const getLink = () => {
		setUrl("some url");
	};

	useEffect(() => {
		getLink();
	}, []); // eslint-disable-line

	const copyLink = () => {
		if (url) {
			if (navigator.clipboard && window.isSecureContext) {
				navigator.clipboard.writeText(url);
			} else {
				linkRef.current.value = url;
				linkRef.current.focus();
				linkRef.current.select();
				document.execCommand("copy");
				linkRef.current.value = "";
			}
			setShowSuccessMessage("Ссылка скопирована");
		}
	};

	const onOpenContacts = () => {
		dispatch(onGetContacts());
		setContext("addContacts");
	};

	const renderContacts = () => {
		if (!contactList)
			return (
				<Loader
					type="switch"
					position="absolute"
					background="white"
					width="200px"
					height="200px"
				/>
			);
		return contactList.map((contact, i) => {
			const index = chosenContacts?.findIndex((c) => c.id === contact.id);
			return (
				<div
					key={i}
					className={styles.contact}
					// TODO - Need to optimize code - too long rendering changeContact
					onClick={() => chooseContact(contact, index)}
				>
					<div
						className={`${styles.radioContact} ${
							index > -1 ? styles.radioContactChosen : ""
						}`}
					/>
					<img
						src={
							imageSrc +
							(contact.icon[0] || "assets/PrivateCabinet/profile-noPhoto.svg")
						}
						alt="img"
					/>
					<div className={styles.contactInfo}>
						<span>{contact.name}</span>
						<span>{contact.email[0]}</span>
					</div>
				</div>
			);
		});
	};

	const renderView = () => (
		<div className={styles.reviewOptions}>
			<div
				className={styles.reviewOption}
				onClick={() => {
					setReview({ ...review, text: "Просмотр" });
					getLink();
				}}
			>
				<div
					className={`${styles.radio} ${
						review.text === "Просмотр" ? styles.radioChosen : ""
					}`}
				/>
				<div className={styles.description}>Просмотр</div>
			</div>
			<div
				className={styles.reviewOption}
				onClick={() => setReview({ ...review, text: "Скачивание" })}
			>
				<div
					className={`${styles.radio} ${
						review.text === "Скачивание" ? styles.radioChosen : ""
					}`}
				/>
				<div>Скачивание</div>
			</div>
			<div
				className={`${styles.reviewOption} ${styles.reviewOptionLast}`}
				onClick={() => {
					setReview({ ...review, text: "Редактировать" });
					getLink("write");
				}}
			>
				<div
					className={`${styles.radio} ${
						review.text === "Редактировать" ? styles.radioChosen : ""
					}`}
				/>
				<div>Редактировать</div>
			</div>
			<span className={styles.descr}>
				Может упорядочивать, добавлять и редактировать файл
			</span>
		</div>
	);

	const chooseContact = (contact, index) => {
		if (index) {
			setChosenContacts([...chosenContacts, contact]);
		} else {
			deleteContact(index);
		}
	};

	const deleteContact = (index) => {
		let list = chosenContacts;
		list.splice(index, 1);
		setChosenContacts(list);
		if (list.length === 0) setSendAccess(false);
	};

	const rendercontactsSend = () => {
		return contactList.map((contact, i) => (
			<div key={i} className={styles.listItem} onClick={() => deleteContact(i)}>
				<img src={imageSrc + (contact.icon[0] || "assets/PrivateCabinet/profile-noPhoto.svg")} alt="img" />
				<div className={styles.contactInfo}>
					<span>{contact.email[0]}</span>
				</div>
			</div>
		));
	};

	const [targets, setTrargets] = useState([])

	const renderTargetsSend = () => {
		return targets.map((target, i) => (
			<div key={i} className={styles.listItem} onClick={(e) => deleteTarget(e.target.innerText)}>
				<div className={styles.contactInfo}>
					<span>{target}</span>
				</div>
			</div>	
		));
	};

	const deleteTarget = (value) => {
		const newTargetList = targets.filter(item => item !== value)
		setTrargets(newTargetList)
	}

	const addTarget = (target) => {
		const value = target.value
		if (target) {
			if (checkLogin(target))	{setTrargets(state => [...state, value]); target.value = ''}
		}
	}

	const sendProject = () => {
		//TODO add api
		nullifyAction();
	};

	const checkLogin = (target) => {
		let boolean = true;
        if(target.value[0] === '+') {
            const newVal = target.value.replace(/(\+)*(\()*(\))*\s*-*/g, '');
            if(/\D/.test(newVal)) boolean = false;
        } else {
            if(target.value.indexOf('@') === -1) boolean = false;
        }
        setCompareLogin(boolean);
		return boolean
    };

	return (
		<PopUp set={nullifyAction}>
			{sendAccess && chosenContacts.length > 0 ? (
				<div className={styles.sendLinkWrap} onClick={checkContextMenu}>
					<header>
						<div
							className={styles.backbutton}
							onClick={() => setSendAccess(false)}
						>
							<img
								src={imageSrc + "assets/PrivateCabinet/arrow.svg"}
								alt="img"
							/>
						</div>
						<div className={styles.details}>
							<div className={styles.title}>
								Предоставьте доступ пользователям и группам
							</div>
						</div>
					</header>
					<main>
						<div className={styles.sendAccessWrap}>
							<div className={styles.contactWrap}>
								<div className={styles.listWrap}>{rendercontactsSend()}</div>
								<div className={styles.review}>
									<span>{review.text}</span>
									<img
										src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
										alt="copy"
										className={context === "review" ? styles.imageReverse : ""}
									/>
									{context === "review" ? renderView() : null}
								</div>
							</div>
							<div
								className={styles.notificationUserWrap}
								onClick={() => setNotify(!notify)}
							>
								<div
									className={
										notify ? styles.notifyEnable : styles.notifyDisable
									}
								/>
								<span>Уведомить пользователя</span>
							</div>
							<div className={styles.message}>
								<textarea
									placeholder="Добавить сообщение"
									value={prim}
									onChange={(e) => setPrim(e.target.value)}
								/>
							</div>
							{/* <div className={`${styles.project}`}> */}
							{/* <FolderIcon
									className={`${styles.projectIcon} ${
										colors.filter((el) => el.color === project.info.color)[0]
											?.name
									}`}
								/> */}
							{/* <div className={styles.projectInfo}>{project.name}</div> */}
							{/* </div> */}
							<div className={styles.buttonsWrap}>
								<div
									className={styles.cancel}
									onClick={() => setSendAccess(false)}
								>
									Отмена
								</div>
								<div className={styles.send} onClick={sendProject}>
									Отправить
								</div>
							</div>
						</div>
					</main>
				</div>
			) : null}
			{!sendAccess && !displaySetPassword && !displayStotagePeriod ? (
				<div className={styles.copyLinkWrap} onClick={checkContextMenu}>
					<header>
						<div className={styles.circle}>
							<CopyIcon className={styles.copyIcon} />
						</div>
						<div className={styles.details}>
							<div className={styles.title}>Скопируйте ссылку</div>
							<div className={styles.description}>
								для того чтобы отправить ссылку нажмите кнопку копировать ссылку
							</div>
						</div>
					</header>
					<main>
						<div className={styles.copyLink}>
							<div className={styles.link}>{url}</div>
							<div className={styles.copy} onClick={copyLink}>
								Копировать ссылку
							</div>
						</div>
						<div className={styles.accessUsers}>
							<div className={styles.infoWrap}>
								<div className={styles.circle}>
									<UserIcon className={styles.userIcon} />
								</div>
								<div className={styles.details}>
									<div className={styles.title}>
										Предоставьте доступ пользователям и группам
									</div>
									<div className={styles.description}>
										совместный доступ не настроен
									</div>
								</div>
							</div>
							<div className={styles.contacts} onClick={onOpenContacts}>
								<span>Контакты</span>
								<img
									src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
									alt="copy"
									className={
										context === "addContacts" ? styles.imageReverse : ""
									}
								/>
								{context === "addContacts" ? (
									<div className={styles.contactsList}>
										<div className={styles.contactsHeader}>
											<div className={styles.target}>
												<div className={styles.input_wrap}>
													
													<div className={styles.listWrap}>{renderTargetsSend()}</div>
													<span className={!compareLogin ? styles.loginError : ''}>
														<input
															onBlur={e => {addTarget(e.target)}}
															onKeyPress={e => {if(e.code === 'Enter') {addTarget(e.target)}}}
															onChange={() => setCompareLogin(true)}
															type="text"
															placeholder="Введите имя или email"
														/>
													</span>
												</div>	
												<div className={styles.target__btn} onClick={()=> setDisplayMessengers(true)}>
													<span>Отправить через мессенжер</span>
												</div>		
											</div>
										</div>
										<div className={styles.line} />
										<div className={styles.contactsSearchBar}>
											<input type="text" placeholder="Введите имя или email" />
											<img
												src={
													imageSrc +
													"assets/PrivateCabinet/magnifying-glass-2.svg"
												}
												alt="img"
											/>
										</div>
										<div className={styles.contactList}>{renderContacts()}</div>
										<div className={styles.buttonWrap}>
											<div
												className={`${
													chosenContacts.length > 0
														? styles.button
														: styles.buttonDisabled
												}`}
												onClick={() => setSendAccess(true)}
											>
												Готово
											</div>
										</div>
									</div>
								) : null}
							</div>
						</div>
						<div className={styles.line} />
						<div className={styles.chosenUsers}>
							<div className={styles.infoWrap}>
								<div className={styles.circle}>
									<WorldIcon className={styles.worldIcon} />
								</div>
								<div className={styles.details}>
									<div className={styles.title}>
										Доступные пользователи, у которых есть ссылка
									</div>
									<div className={styles.description}>
										просматривать могут все у кого есть ссылка
									</div>
								</div>
							</div>
							<div className={styles.review}>
								<span>{review.text}</span>
								<img
									src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
									alt="copy"
									className={context === "review" ? styles.imageReverse : ""}
								/>
								{context === "review" ? renderView() : null}
							</div>
						</div>
						<div className={styles.line} />

						<div className={styles.storagePeriod}>
							<div className={styles.infoWrap}>
								<div className={styles.circle}>
									<CalendarIcon
										width={"18px"}
										height={"18px"}
										className={styles.userIcon}
									/>
								</div>
								<div className={styles.details}>
									<div className={styles.title}>Срок хранения файлов</div>
									<div className={styles.description}>
										Установите период на который ссылка будет активна
									</div>
								</div>
							</div>
							<div
								className={styles.btn}
								onClick={() => setDisplayStotagePeriod(true)}
							>
								<span>Установить</span>
							</div>
						</div>
						<div className={styles.line} />

						<div className={styles.setPassword}>
							<div className={styles.infoWrap}>
								<div className={styles.circle}>
									<PasswordIcon
										width={"15px"}
										height={"19px"}
										className={styles.userIcon}
									/>
								</div>
								<div className={styles.details}>
									<div className={styles.title}>Установить пароль</div>
									<div className={styles.description}>
										Вы можете установить пароль
									</div>
								</div>
							</div>
							<div
								className={styles.btn}
								onClick={() => setDisplaySetPassword(true)}
							>
								<span>Установить</span>
							</div>
						</div>
					</main>
					<div className={styles.buttonsWrap}>
						<div className={styles.cancel} onClick={nullifyAction}>
							Отмена
						</div>
						<div className={`${styles.add}`} onClick={saveChanges}>
							Готово
						</div>
					</div>
				</div>
			) : null}
			<input ref={linkRef} type="text" style={{ display: "none" }} />
			{displayStotagePeriod && (
				<StoragePeriod
					setDisplayStotagePeriod={setDisplayStotagePeriod}
					dateValue={dateValue}
					setDateValue={setDateValue}
					timeValue={timeValue}
					setTimeValue={setTimeValue}
				/>
			)}
			{displaySetPassword && (
				<SetPassword setDisplaySetPassword={setDisplaySetPassword} />
			)}
			{displayMessengers && (
				<ShareToMessengers setDisplayMessengers={setDisplayMessengers} onShareFolder={() => console.log('TODO: add func get a link')} />
			)}
		</PopUp>
	);
}

export default CopyLinkShare;
