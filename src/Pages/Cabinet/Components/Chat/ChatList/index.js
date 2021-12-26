import React, { useState, useEffect } from "react";

import styles from "./ChatList.module.sass";
import { useDispatch, useSelector } from "react-redux";
// import {onGetContacts, onGetCompanyContacts} from "../../../../../Store/actions/CabinetActions";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import classNames from "classnames";
import { ReactComponent as GroupsIcon } from "../../../../../assets/PrivateCabinet/men.svg";
import { ReactComponent as SecretChatIcon } from "../../../../../assets/PrivateCabinet/bubble-chat.svg";

const ChatList = ({
	// search,
	sideMenuCollapsed,
	selectedContact,
	setSelectedContact,
	setAction,
}) => {
	// const dispatch = useDispatch();
	const [chatsType, setChatsType] = useState("chats");

	//TODO Chats list
	const chatList = useSelector((state) => state.Cabinet.contactList);

	useEffect(() => {
		// dispatch(chatList());
	}, []); //eslint-disable-line\

	const renderChatsList = () => {
		if (!chatList) return null;

		return chatList.map((chat, i) => {
			// if (!(chat?.name?.toLowerCase().includes(search.toLowerCase()) || chat?.sname?.toLowerCase().includes(search.toLowerCase()))) return null
			return (
				<div
					className={classNames({
						[styles.item]: true,
						[styles.active]: selectedContact?.id === chat.id,
					})}
					key={i}
					onClick={() => setSelectedContact(chat)}
					title={sideMenuCollapsed ? `${chat?.sname} ${chat?.name}` : ""}
				>
					<div className={styles.groupName}>
						<img
							src={
								chat?.icon?.[0] ||
								`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
							}
							alt="img"
							className={styles.avatar}
						/>
						{sideMenuCollapsed ? null : (
							<div className={styles.info}>
								<div
									className={styles.name}
								>{`${chat?.sname} ${chat?.name}`}</div>
								<div className={styles.status}>в сети 29 мин. назад</div>
							</div>
						)}
					</div>
					<div className={styles.functionWrap}>
						<div
							className={styles.menuWrap}
							// onClick={e => setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 25})}
						>
							<span className={styles.menu} />
						</div>
					</div>
				</div>
			);
		});
	};

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
						? `Создать ${chatsType === "chats" ? "групповой" : "секретный"} чат`
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
						Создать {chatsType === "chats" ? "групповой" : "секретный"} чат
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

			{ChatList ? renderChatsList() : null}
		</div>
	);
};

export default ChatList;
