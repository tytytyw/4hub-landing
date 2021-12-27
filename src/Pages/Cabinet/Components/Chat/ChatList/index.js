import React, { useState, useEffect } from "react";

import styles from "./ChatList.module.sass";
import { useSelector } from "react-redux";
import CustomChatItem from "../CustomChatItem";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import classNames from "classnames";
import { ReactComponent as GroupsIcon } from "../../../../../assets/PrivateCabinet/men.svg";
import { ReactComponent as SecretChatIcon } from "../../../../../assets/PrivateCabinet/bubble-chat.svg";

const ChatList = ({
	search,
	sideMenuCollapsed,
	selectedContact,
	setSelectedContact,
	setAction,
}) => {
	// const dispatch = useDispatch();
	const [chatsType, setChatsType] = useState("chats");
	const [collapseMembersList, setCollapseMembersList] = useState(false);

	//TODO: Chats list
	const chatList = useSelector((state) => state.Cabinet.contactList) || [];
	const groupsList = [
		{ name: "1hub", members: [...chatList], id: "chat_1" },
		{ name: "2hub", members: [...chatList], id: "chat_2" },
		{ name: "3hub", members: [chatList[2]], id: "chat_3" },
	];

	useEffect(() => {
		// dispatch(chatList());
	}, []); //eslint-disable-line

	const renderChatsList = (chatList) => {
		if (!chatList) return null;

		return chatList.map((chat, i) => {
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
					key={chat.id}
					title={`${chat?.sname} ${chat?.name}`}
					subtitle={"в сети 29 мин. назад"}
					status={"в сети 29 мин. назад"}
					avatar={
						chat?.icon?.[0] ||
						`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
					}
				/>
			);
		});
	};

	const renderMembersList = (members, chatId) => {
		if (!members) return null;
		return members.map((member, i) => {
			return (
				<CustomChatItem
					selectedContact={selectedContact}
					setSelectedContact={() => {}}
					sideMenuCollapsed={sideMenuCollapsed}
					chatItem={member}
					key={chatId + "_user_" + member.id}
					title={member?.name}
					subtitle={"в сети 30 мин. назад"}
					avatar={
						member?.icon?.[0] ||
						`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
					}
					isSubList={true}
				/>
			);
		});
	};

	const renderGroupsList = () => {
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
						subtitle={"last message"}
						avatar={
							group?.icon?.[0] ||
							`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
						}
						setCollapseMembersList={setCollapseMembersList}
						status={`${
							group?.members?.length
						} участников группы ( ${0} онлайн )`}
					/>
					{selectedContact?.id === group.id && !collapseMembersList ? (
						<div key={"member_wrap" + group.id} className={styles.membersList}>
							{renderMembersList(group?.members, group.id)}
						</div>
					) : null}
				</div>
			);
		});
	};

	useEffect(() => {
		setSelectedContact(null);
	}, [chatsType, setSelectedContact]);
	useEffect(() => {
		setCollapseMembersList(false);
	}, [selectedContact]);

	return (
		<div className={styles.listWrap}>
			<div
				className={classNames({
					[styles.item]: true,
					[styles.active]: false,
					[styles.addChat]: true,
					[styles.collapsed]: sideMenuCollapsed,
				})}
				onClick={() =>
					setAction({
						type: "addChat",
						name: "Создать групповой чат",
						text: "",
					})
				}
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

			{chatsType === "chats" ? renderChatsList(chatList) : ""}
			{chatsType === "groups" ? renderGroupsList() : ""}
		</div>
	);
};

export default ChatList;
