import React, { useEffect, useRef, useState } from "react";

import styles from "./CopyLinkShare.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CopyIcon } from "../../../../../../assets/PrivateCabinet/copy.svg";
import { ReactComponent as UserIcon } from "../../../../../../assets/PrivateCabinet/userIcon.svg";
import { ReactComponent as WorldIcon } from "../../../../../../assets/PrivateCabinet/world.svg";
import {onGetContacts, onSetModals} from "../../../../../../Store/actions/CabinetActions";
import Loader from "../../../../../../generalComponents/Loaders/4HUB";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import api from "../../../../../../api";
import Error from "../../../../../../generalComponents/Error";

function CopyLinkShare() {
    const { items, action_type } = useSelector(s => s.Cabinet.modals.contextMenuModals);
    const item = items[0];
	const uid = useSelector(state => state.user.uid);
	const contactList = useSelector((state) => state.Cabinet.contactList);
	const contextMenuModals = useSelector((state) => state.Cabinet.modals.contextMenuModals);
	const [url, setUrl] = useState("Загрузка...");
	const [review, setReview] = useState({ text: "Просмотр" });
	const [context, setContext] = useState("");
	const linkRef = useRef("");
	const [chosenContacts, setChosenContacts] = useState([]);
	const [sendAccess, setSendAccess] = useState(false);
	const [notify, setNotify] = useState(false);
	const [prim, setPrim] = useState("");
	const [error, setError] = useState({error: false, message: 'Request Error'});
	const closeError = () => {setError(state => ({...state, error: false, message: 'Request Error'}))}
	const dispatch = useDispatch();

	const saveChanges = () => {
        dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: '', items: [], action_type: ''}))
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

	const getLink = (status) => {
		setUrl('Загрузка...')
		if(item?.is_dir === 0) {
			item?.file_link ? setUrl(item.file_link) : setError(state => ({...state, error: true, message: `Ссылка на файл не найдена. Попробуйте еще раз`}));
		} else {
			let stat = '$&is_read=1'
			if(status === 'write') stat = '$&is_read=0'
			const url = `/ajax/${action_type}.php?uid=${uid}&dir=${item?.path}&email=$GUEST${stat}`;
			api.get(url)
				.then(res => {
					if(!!res.data.ok) {
						setUrl(res.data.link_shere_to_user)
					} else {
						setError(state => ({...state, error: true, message: `${res?.data?.error ?? error.message}`}))
					}
				})
				.catch(err => setError(state => ({...state, error: true, message: `${err}`})));
		}
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
			dispatch(onSetModals('topMessage', {open: true, message: "Ссылка скопирована"}))
			// setShowSuccessMessage("Ссылка скопирована");
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

	const sendProject = () => {
		//TODO add api
        saveChanges();
	};

	return (
		<PopUp set={saveChanges}>
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
			{!sendAccess ? (
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
										<div className={styles.contactTitleWrap}>
											<img  className={styles.notebookIcon} src={`${imageSrc}assets/PrivateCabinet/notebook-of-contacts.svg`} alt="img" />
											<span>Контакты</span>
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
					</main>
					<div className={styles.buttonsWrap}>
						<div className={styles.cancel} onClick={saveChanges}>
							Отмена
						</div>
						<div className={`${styles.add}`} onClick={saveChanges}>
							Готово
						</div>
					</div>
				</div>
			) : null}
			<input ref={linkRef} type="text" style={{ display: "none" }} />
			{error.error && <Error error={error.error} set={closeError} message={error.message} />}
		</PopUp>
	);
}

export default CopyLinkShare;
