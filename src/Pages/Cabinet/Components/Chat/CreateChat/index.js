import classNames from "classnames";
import React, { useState, useEffect } from "react";
import styles from "./CreateChat.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import CustomChatItem from "../CustomChatItem";
import ProfileUpload from "../../../Components/MyProfile/UserForm/ProfileUpload";
import AvatarBackground from "../../../../../assets/PrivateCabinet/circle.svg";
import ActionApproval from "../../../../../generalComponents/ActionApproval";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import {
	onGetChatGroups,
	onGetChatGroupsMembers,
} from "../../../../../Store/actions/CabinetActions";
import api from "../../../../../api";

const CreateChat = ({
	title,
	maxCountUsers = 1000,
	nullifyAction,
	setShowSuccessPopup,
}) => {
	const [search, setSearch] = useState("");
	const [selectedContacts, setSelectedContact] = useState([]);
	const [step, setStep] = useState("one");
	const [previewAvatar, setPreviewAvatar] = useState(null);
	const [image, setImage] = useState(null);
	const [groupName, setGroupName] = useState("");
	const [showActionApproval, setShowActionApproval] = useState(false);
	const [loadingType, setLoadingType] = useState("");
	const dispatch = useDispatch();

	const uid = useSelector((state) => state.user.uid);
	const id_company = useSelector((state) => state.user.id_company);
	const contactList = useSelector((state) =>
		id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
	);

	const changeSelectedContacts = (contact) => {
		const isSelected = selectedContacts.filter(
			(c) => c.id === contact.id
		).length;
		setSelectedContact((state) =>
			isSelected
				? state.filter((item) => item.id !== contact.id)
				: [...state, contact]
		);
	};

	const renderSelectedContacts = () => {
		if (!selectedContacts) return null;
		return selectedContacts.map((contact) => {
			return (
				<div className={styles.contact_wrap} key={contact.id}>
					<img
						className={styles.avatar}
						src={
							contact?.icon?.[0] ||
							`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
						}
						alt="avatar"
					/>
					<span className={styles.name}>{`${contact?.sname || ""} ${
						contact?.name || ""
					}`}</span>
				</div>
			);
		});
	};

	const uploadImage = (event) => {
		const file = event.target.files[0] ?? null;
		setImage(file && file.type.substr(0, 5) === "image" ? file : null);
	};

	const onExit = () => {
		setPreviewAvatar(null);
		setImage(null);
		nullifyAction();
	};

	useEffect(() => {
		setSearch("");
		if (selectedContacts.length && maxCountUsers === 1)
			setShowActionApproval(true);
	}, [selectedContacts, maxCountUsers]);

	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => setPreviewAvatar(reader.result);
			reader.readAsDataURL(image);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image]);

	useEffect(() => {
		return () => onExit();
	}, []); //eslint-disable-line

	useEffect(() => {
		if (step === "exit") onExit();
	}, [step]); //eslint-disable-line

	const renderContactList = (contactList) =>
		contactList?.map((contact, i) => {
			if (
				!(
					contact?.name?.toLowerCase().includes(search.toLowerCase()) ||
					contact?.sname?.toLowerCase().includes(search.toLowerCase())
				)
			)
				return null;
			return (
				<CustomChatItem
					selectedContact={selectedContacts}
					setSelectedContact={
						step === "one" ? changeSelectedContacts : () => {}
					}
					sideMenuCollapsed={false}
					chatItem={contact}
					key={"contact_" + contact.id}
					title={`${contact?.sname} ${contact?.name}`}
					subtitle={"в сети 29 мин. назад"}
					status={"в сети 29 мин. назад"}
					avatar={
						contact?.icon?.[0] ||
						`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
					}
					contextMenu={step === "one" ? "checkBox" : ""}
					disableHover={step === "two"}
				/>
			);
		});

	const stepHandler = (direction) => {
		// for create group
		if (maxCountUsers > 1) {
			if (direction === "forward" && selectedContacts.length) {
				if (step === "one") setStep("two");
				else if (step === "two") onSubmit();
			}
			if (direction === "back") {
				setStep((step) => (step === "two" ? "one" : "exit"));
			}
			// for create secret chat
		} else if (maxCountUsers === 1 && direction === "back") onExit();
	};

	const onSubmit = () => {
		setLoadingType("squarify")
		//for create group
		if (maxCountUsers > 1) {
			const formData = new FormData();
			if (image) formData.append("file", image);
			formData.append(
				"id_user_to",
				JSON.stringify(selectedContacts.map((item) => item.id))
			);
			api
				.post(`/ajax/chat_group_add.php?uid=${uid}&name=${groupName}`, formData)
				.then((res) => {
					if (res.data.ok) {
						dispatch(onGetChatGroups());
						dispatch(onGetChatGroupsMembers(res.data.id_group));
						setShowSuccessPopup({
							title: "Новая группа успешно создана",
							text: "",
						});
						onExit();
					}
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setLoadingType(""));
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div
					className={classNames(styles.backBtn, styles.button)}
					onClick={() => stepHandler("back")}
				>
					<div className={styles.arrow}></div>
					Назад
				</div>
				<div className={styles.title}>
					{maxCountUsers > 1 && step === "one"
						? `Выберите пользователей ${
								selectedContacts.length
						}/${new Intl.NumberFormat("ru-RU").format(maxCountUsers)}`
						: ""}
					{maxCountUsers === 1 ? title : ""}
					{step === "two" ? title : ""}
				</div>
				{maxCountUsers > 1 ? (
					<div
						className={classNames({
							[styles.forwardBtn]: true,
							[styles.button]: true,
							[styles.disable]:
								!selectedContacts.length || (step === "two" && !groupName),
						})}
						onClick={() => stepHandler("forward")}
					>
						{step === "one" ? "Далее" : ""}
						{step === "two" ? "Создать" : ""}
					</div>
				) : (
					<div />
				)}
			</div>
			<div className={styles.main}>
				{step === "one" ? (
					<div className={styles.inputAreaWrap}>
						<div className={styles.inputArea}>
							<input
								className={styles.input}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							{renderSelectedContacts()}
						</div>
					</div>
				) : (
					<div className={styles.groupSettings}>
						<div className={styles.avatar}>
							<ProfileUpload
								name="profileImg"
								preview={previewAvatar}
								onChange={uploadImage}
								background={AvatarBackground}
							/>
						</div>
						<input
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
							className={styles.name}
							placeholder="Введите имя группы"
						/>
					</div>
				)}
				<div className={styles.contactsList}>
					{renderContactList(step === "one" ? contactList : selectedContacts)}
				</div>
			</div>
			{showActionApproval ? (
				<ActionApproval
					name={"Начать секретный чат"}
					text={`Вы действительно хотите создать секртеный чат с ${
						selectedContacts[0].name || ""
					} ${selectedContacts[0].sname || ""}?`}
					set={() => {
						setShowActionApproval(false);
						setSelectedContact([]);
					}}
					// callback={deleteContact}
					approve={"Создать"}
				>
					<img
						className={styles.avatar}
						src={
							selectedContacts[0]?.icon?.[0] ||
							`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
						}
						alt="avatar"
					/>
				</ActionApproval>
			) : null}
			{loadingType ? (
				<Loader
					position="absolute"
					zIndex={10000}
					containerType="bounceDots"
					type="bounceDots"
					background="white"
					animation={false}
					width="100px"
					height="100px"
				/>
			) : null}
		</div>
	);
};

export default CreateChat;
