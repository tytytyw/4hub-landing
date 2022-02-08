import React, { useState, useEffect, useMemo } from "react";

import styles from "./ChatList.module.sass";
import { useDispatch, useSelector } from "react-redux";
import CustomChatItem from "../CustomChatItem";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { createContactStatus } from "../../../../../generalComponents/chatHelper";
import classNames from "classnames";
import { ReactComponent as GroupsIcon } from "../../../../../assets/PrivateCabinet/men.svg";
import { ReactComponent as SecretChatIcon } from "../../../../../assets/PrivateCabinet/bubble-chat.svg";
import {
	onGetChatGroups,
	onGetReсentChatsList,
	onGetSecretChatsList,
} from "../../../../../Store/actions/CabinetActions";

const ChatList = ({
	search,
	sideMenuCollapsed,
	setSelectedContact,
	setAction,
	mouseParams,
	setMouseParams,
	currentDate,
}) => {
	const dispatch = useDispatch();
	const [chatsType, setChatsType] = useState("chats");
	const [collapseMembersList, setCollapseMembersList] = useState(true);
	const userId = useSelector((state) => state.Cabinet.chat.userId);
	const selectedContact = useSelector(
		(state) => state.Cabinet.chat.selectedContact
	);

	const recentChatsList = useSelector(
		(state) => state.Cabinet.chat.recentChatsList
	);
	const secretChatsList = useSelector(
		(state) => state.Cabinet.chat.secretChatsList
	);
	const [chatsList, setChatList] = useState([]);
	const groupsList = useSelector((state) => state.Cabinet.chat.groupsList);
	const gmt = useSelector((state) => state?.user?.userInfo?.gmt); // server time zone
	const recentGroupsMessages = useSelector(
		(state) => state.Cabinet.chat.recentGroupsMessages
	);
	const notificationsCounter = useSelector(
		(state) => state.Cabinet.chat.notificationsCounter
	);

	useEffect(() => {
		dispatch(onGetChatGroups());
		dispatch(onGetReсentChatsList());
		dispatch(onGetSecretChatsList());
	}, []); //eslint-disable-line

	useEffect(() => {
		setChatList([...recentChatsList, ...secretChatsList]);
	}, [recentChatsList, secretChatsList]); //eslint-disable-line

	const renderChatsList = useMemo(() => {
		if (!chatsList) return null;

		return chatsList.map((chat) => {
			if (
				!(
					chat?.name?.toLowerCase().includes(search.toLowerCase()) ||
					chat?.sname?.toLowerCase().includes(search.toLowerCase())
				)
			)
				return null;
			return (
				<CustomChatItem
					selectedContact={selectedContact}
					setSelectedContact={setSelectedContact}
					sideMenuCollapsed={sideMenuCollapsed}
					chatItem={chat}
					key={chat.id + (!!chat.is_secret_chat ? "_secretChat" : "")}
					title={`${chat?.sname || ""} ${chat?.name}`}
					subtitle={createContactStatus(
						chat.is_user,
						currentDate,
						chat.real_user_date_last,
						chat.is_online,
						gmt
					)}
					status={createContactStatus(
						chat.is_user,
						currentDate,
						chat.real_user_date_last,
						chat.is_online,
						gmt
					)}
					avatar={
						chat?.icon?.[0] ||
						`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
					}
					setMouseParams={setMouseParams}
					contextMenuList={chat.is_secret_chat ? "secretChat" : "recentChat"}
				/>
			);
		});
	}, [
		chatsList,
		currentDate,
		gmt,
		search,
		selectedContact,
		sideMenuCollapsed,
		setMouseParams,
		setSelectedContact,
	]);

	const renderGroupsList = useMemo(() => {
		const renderMembersList = (members, chatId) => {
			if (!members) return null;
			return members.map((member, i) => {
				if (member.id_user === userId) return null;
				return (
					<CustomChatItem
						selectedContact={selectedContact}
						setSelectedContact={() => {}}
						sideMenuCollapsed={sideMenuCollapsed}
						chatItem={member}
						key={chatId + "_user_" + member.id}
						title={member?.name}
						subtitle={createContactStatus(
							1,
							currentDate,
							member.date_last,
							member.is_online,
							gmt
						)}
						avatar={
							member?.icon?.[0] ||
							`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
						}
						isSubList={true}
						setMouseParams={setMouseParams}
						contextMenuList={"userInGroup"}
					/>
				);
			});
		};

		if (!groupsList) return null;
		return groupsList.map((group, i) => {
			if (
				!(
					group?.name?.toLowerCase().includes(search.toLowerCase()) ||
					group?.sname?.toLowerCase().includes(search.toLowerCase())
				)
			)
				return null;
			return (
				<div key={"wrap_" + group.id}>
					<CustomChatItem
						selectedContact={selectedContact}
						setSelectedContact={setSelectedContact}
						sideMenuCollapsed={sideMenuCollapsed}
						chatItem={group}
						key={group.id}
						title={group?.name}
						subtitle={recentGroupsMessages[group.id_group] || ""}
						avatar={
							group?.icon?.[0] ||
							`${imageSrc}assets/PrivateCabinet/chatGroup.svg`
						}
						setCollapseMembersList={setCollapseMembersList}
						status={`${group?.users?.length || 0} участников группы ( ${
							group.users.filter((user) => user?.is_online === 1).length
						} онлайн )`}
						setMouseParams={setMouseParams}
						contextMenuList={"group"}
						notificationsCounter={
							notificationsCounter[`group_${group.id_group}`]
						}
					/>
					{selectedContact?.id === group.id && !collapseMembersList ? (
						<div key={"member_wrap" + group.id} className={styles.membersList}>
							{renderMembersList(Object.values(group?.users), group.id)}
						</div>
					) : null}
				</div>
			);
		});
	}, [
		groupsList,
		userId,
		selectedContact,
		sideMenuCollapsed,
		currentDate,
		gmt,
		setMouseParams,
		search,
		setSelectedContact,
		recentGroupsMessages,
		notificationsCounter,
		collapseMembersList,
	]);

	useEffect(() => {
		// setSelectedContact(null);
		setAction({ type: "", name: "", text: "" });
	}, [chatsType]); //eslint-disable-line
	useEffect(() => {
		setCollapseMembersList(mouseParams ? true : false);
	}, [selectedContact]); //eslint-disable-line

	return (
		<div className={styles.listWrap}>
			<div
				className={classNames({
					[styles.item]: true,
					[styles.active]: false,
					[styles.addChat]: true,
					[styles.collapsed]: sideMenuCollapsed,
				})}
				onClick={() => {
					setAction({
						type: "addChat",
						name: `${
							chatsType === "chats" ? "Cекретный чат" : "Новая группа"
						} `,
						text: "",
						chatsType,
					});
					// setSelectedContact(null)
				}}
				title={
					sideMenuCollapsed
						? `Создать ${chatsType === "chats" ? "секретный" : "групповой"} чат`
						: ""
				}
			>
				<div className={styles.iconWrap}>
					{sideMenuCollapsed ? (
						<span className={styles.text}>Создать</span>
					) : (
						""
					)}
					{chatsType === "groups" ? (
						<GroupsIcon width={19} height={22} />
					) : null}
					{chatsType === "chats" ? (
						<SecretChatIcon width={19} height={22} />
					) : null}
				</div>

				{!sideMenuCollapsed ? (
					<span className={styles.text}>
						Создать {chatsType === "chats" ? "секретный" : "групповой"} чат
					</span>
				) : (
					""
				)}
			</div>

			<div
				className={classNames({
					[styles.chatsSwitcher]: true,
					[styles.collapsed]: sideMenuCollapsed,
				})}
			>
				<div
					className={classNames({
						[styles.item]: true,
						[styles.active]: chatsType === "chats",
						[styles.addChat]: true,
					})}
					onClick={() => setChatsType("chats")}
					title={sideMenuCollapsed ? "Чаты" : ""}
				>
					<span className={styles.text}>Чаты</span>
				</div>
				<div
					className={classNames({
						[styles.item]: true,
						[styles.active]: chatsType === "groups",
						[styles.addChat]: true,
					})}
					onClick={() => setChatsType("groups")}
					title={sideMenuCollapsed ? "Группы" : ""}
				>
					<span className={styles.text}>Группы</span>
				</div>
			</div>
			<div className={styles.list}>
				{chatsType === "chats" ? renderChatsList : ""}
				{chatsType === "groups" ? renderGroupsList : ""}
			</div>
		</div>
	);
};

export default ChatList;
