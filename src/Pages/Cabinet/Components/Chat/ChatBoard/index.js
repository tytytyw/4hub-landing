import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./ChatBoard.module.sass";
import { ReactComponent as AddIcon } from "../../../../../assets/PrivateCabinet/add-2.svg";
import { ReactComponent as SmileIcon } from "../../../../../assets/PrivateCabinet/smile.svg";
import { ReactComponent as RadioIcon } from "../../../../../assets/PrivateCabinet/radio-3.svg";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import { ReactComponent as TimerIcon } from "../../../../../assets/PrivateCabinet/alarmClock.svg";
import EmojiArea from "../EmojiArea";
import ServePanel from "../ServePanel";
import SecretChatStartWallpaper from "./SecretChatStartWallpaper";
import { ReactComponent as AddFirstContactIcon } from "../../../../../assets/PrivateCabinet/addFirstContact.svg";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import InviteUser from "./InviteUser";
import Message from "./Message";
import InfoPanel from "./InfoPanel";
import { addNewChatMessage } from "../../../../../Store/actions/CabinetActions";
import TextArea from "./TextArea";

const ChatBoard = ({
	sideMenuCollapsed,
	boardOption,
	setShowSuccessPopup,
	setAction,
	setMouseParams,
	currentDate,
}) => {
	const [rightPanelContentType, setRightPanelContentType] = useState("");
	const id_company = useSelector((state) => state.user.id_company);
	const contactList = useSelector((state) =>
		id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
	);
	const selectedContact = useSelector(
		(state) => state.Cabinet.chat.selectedContact
	);
	const endMessagesRef = useRef();


	const messages = useSelector((state) => state.Cabinet.chat.messages);
	const uid = useSelector((state) => state.user.uid);
	const userId = useSelector((state) => state.Cabinet.chat.userId);

	const [socket, setSocket] = useState(null);
	const [socketReconnect, setSocketReconnect] = useState(true);
	const dispatch = useDispatch();

	const renderMessages = useMemo(() => {
		if (selectedContact?.is_secret_chat && messages?.length === 0)
			return <SecretChatStartWallpaper />;
		if (!messages?.length || !selectedContact) return null;
		return messages.map((msg, index) => {
			return (
				<Message
					message={msg}
					selectedContact={selectedContact}
					key={index}
					currentDate={currentDate}
				/>
			);
		});
	}, [messages, currentDate, selectedContact]);

	const addMessage = (text) => {
		if (text && socket) {
			const sendMessage = (params) => {
				socket.send(JSON.stringify({ ...params, uid, id_company, text }));
			};
			sendMessage(
				selectedContact.isGroup
					? {
							action: "chat_group_message_add",
							id_group: selectedContact.id_group,
							is_group: true,
					  }
					: {
							action: "chat_message_send",
							id_user_to: selectedContact.id_real_user,
							id_contact: selectedContact.id,
					  }
			);
		}
	};


	const scrollToBottom = () => {
		endMessagesRef?.current?.scrollIntoView();
	};
	useEffect(() => scrollToBottom, [messages, selectedContact]);

	// webSockets
	const onConnectOpen = (e) => {
		socket.send(JSON.stringify({ action: "uid", uid }));
	};

	const onWebSocketsMessage = (e) => {
		const data = JSON.parse(e.data);

		if (data.action === "Ping") socket.send(JSON.stringify({ action: "Pong" }));
		// PrivateMessage - direct message; PublicMessage- message from group
		if (data.action === "PrivateMessage" || data.action === "PublicMessage") {
			const newMsg = {
				id: data.api?.id_message,
				id_user: data.api?.id_user,
				id_user_to: data.api?.id_user_to,
				text: data.text,
				ut: data.api?.ut_message,
				isNewMessage: true,
			};
			if (data.is_group && selectedContact.isGroup) {
				dispatch({
					type: "NEW_LAST_GROUP_MESSAGE",
					payload: { id_group: data.id_group, text: data.text },
				});

				if (data.id_group !== selectedContact.id_group)
					dispatch({
						type: "INCREASE_NOTIFICATION_COUNTER",
						payload: `group_${data.id_group}`,
					});
			}

			if (
				(data.is_group &&
					selectedContact.isGroup &&
					data.id_group === selectedContact.id) ||
				(!data.is_group &&
					!selectedContact.isGroup &&
					(data.id_contact === selectedContact.id ||
						data.id_user_to === userId))
			) {
				dispatch(addNewChatMessage(newMsg));
			} else {
				console.log("new message from dont selectedContact");
			}
		}
	};

	const onConnectClose = (e) => {
		console.log("connection closed", e);
		setSocketReconnect(true);
	};

	useEffect(() => {
		if (socketReconnect) {
			setSocketReconnect(false);
			setSocket(new WebSocket("wss://fs2.mh.net.ua/ws/"));
		}
		return () => socket?.close();
	}, [socketReconnect]); //eslint-disable-line

	useEffect(() => {
		//TODO: move to Store
		if (selectedContact)
			dispatch({
				type: "SET_NOTIFICATION_COUNTER",
				payload: {
					id: selectedContact.isGroup
						? `group_${selectedContact.id_group}`
						: `contact_${selectedContact.id}`,
					value: 0,
				},
			});

		if (socket) {
			socket.addEventListener("open", onConnectOpen);
			socket.addEventListener("close", onConnectClose);
			socket.addEventListener("message", onWebSocketsMessage);
		}
		return () => {
			socket?.removeEventListener("message", onWebSocketsMessage);
			socket?.removeEventListener("open", onConnectOpen);
			socket?.removeEventListener("close", onConnectClose);
		};
	}, [socket, selectedContact]); //eslint-disable-line

	return (
		<div className={styles.chatBoardWrap}>
			{selectedContact ? (
				<ServePanel
					selectedContact={selectedContact}
					setAction={setAction}
					setRightPanelContentType={setRightPanelContentType}
				/>
			) : (
				""
			)}
			<main className={styles.chatBoardMessageList}>
				<div
					style={{
						width: rightPanelContentType ? "calc(100% - 200px)" : "100%",
					}}
					className={styles.chatArea}
				>
					{contactList?.length === 0 && boardOption === "contacts" ? (
						<AddFirstContactIcon
							className={classNames({
								[styles.addFirstContactIcon]: true,
								[styles.collapsedMenu]: sideMenuCollapsed,
							})}
						/>
					) : (
						""
					)}
					{selectedContact?.is_user === 0 ? (
						<InviteUser
							contact={selectedContact}
							setShowSuccessPopup={setShowSuccessPopup}
						/>
					) : (
						renderMessages
					)}
					<div ref={endMessagesRef} />
				</div>
				<div className={styles.rightPanelContentType}>
					{rightPanelContentType === "emo" ? (
						<EmojiArea />
					) : null}
					{rightPanelContentType === "info" ? (
						<InfoPanel setAction={setAction} />
					) : null}
				</div>
			</main>
			<footer className={styles.chatBoardFooter}>
				<div className={styles.downloadOptions}>
					<AddIcon title="Вставить файл" />
				</div>
				<TextArea
					addMessage={addMessage}
				/>
				<div className={styles.sendOptions}>
					<div title="Аудио сообщение" className={styles.button}>
						<RadioIcon title="" />
					</div>
					<div title="Видео сообщение" className={styles.button}>
						<PlayIcon title="" className={styles.triangle} />
					</div>
					<div
						title="Смайлики"
						className={styles.button}
						onClick={() =>
							setRightPanelContentType((state) =>
								state === "emo" ? "" : "emo"
							)
						}
					>
						<SmileIcon title="" />
					</div>
					{selectedContact?.is_secret_chat ? (
						<div
							title="Таймер сообщений"
							className={styles.button}
							onClick={(e) =>
								setMouseParams({
									x: e.clientX,
									y: e.clientY,
									width: 59,
									height: 15,
									contextMenuList: "timer",
								})
							}
						>
							<TimerIcon title="" />
						</div>
					) : null}
				</div>
			</footer>
		</div>
	);
};

export default ChatBoard;
