import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatBoard.module.sass";
import { ReactComponent as AddIcon } from "../../../../../assets/PrivateCabinet/add-2.svg";
import { ReactComponent as SmileIcon } from "../../../../../assets/PrivateCabinet/smile.svg";
import { ReactComponent as RadioIcon } from "../../../../../assets/PrivateCabinet/radio-3.svg";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import { ReactComponent as SendIcon } from "../../../../../assets/PrivateCabinet/send.svg";
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

const ChatBoard = ({
	inputRef,
	setCursorPosition,
	insertToInput,
	sideMenuCollapsed,
	boardOption,
	setShowSuccessPopup,
	setAction,
	setMouseParams,
}) => {
	const [rightPanelContentType, setRightPanelContentType] = useState("");
	const id_company = useSelector((state) => state.user.id_company);
	const contactList = useSelector((state) =>
		id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
	);
	const selectedContact = useSelector(
		(state) => state.Cabinet.chat.selectedContact
	);
	const userId = useSelector((state) => state.Cabinet.chat.userId);
	const endMessagesRef = useRef();

	const [textAreaValue, setTextAreaValue] = useState("");
	const messages = useSelector((state) => state.Cabinet.chat.messages);
	const uid = useSelector((state) => state.user.uid);

	const [socket, setSocket] = useState(null);
	const dispatch = useDispatch();

	const renderMessages = (messages) => {
		if (selectedContact?.is_secret_chat && messages?.length === 0)
			return <SecretChatStartWallpaper />;
		if (!messages?.length || !selectedContact) return null;
		return messages.map((msg, index) => {
			return (
				<Message message={msg} selectedContact={selectedContact} key={index} />
			);
		});
	};
	const addMessage = (text) => {
		const newMessage = { text, id_user: userId };
		//TODO: remove
		if (text) messages.push(newMessage);
		setTimeout(() => {
			setTextAreaValue("");
			inputRef.current.style.height = "25px";
		});

		//TODO:
		socket.send(
			JSON.stringify({
				action: "chat_message_send",
				uid,
				id_contact: selectedContact.id,
				id_user_to: selectedContact.id_real_user,
				text,
				// is param added manually?
				id_user: userId
			})
		);
	};

	//TODO - Need to change after chat is developed
	const findCursorPosition = () =>
		setCursorPosition(inputRef.current.selectionStart);

	const keyPress = (e) => {
		findCursorPosition();
		if (e.keyCode === 13 && !e.shiftKey) addMessage(textAreaValue);
	};

	const onTextAreaChange = (e) => {
		setTextAreaValue(e.target.value);
		e.target.style.height = "auto";
		e.target.style.height = e.target.value
			? e.target.scrollHeight + "px"
			: "25px";
	};
	const scrollToBottom = () => {
		endMessagesRef?.current?.scrollIntoView();
	};
	useEffect(() => scrollToBottom, [messages, selectedContact]);

	// TODO: webSockets
	const onConnectOpen = (e) => {
		socket.send(JSON.stringify({ action: "uid", uid }));
	};

	const onWebSocketsMessage = (e) => {
		const data = JSON.parse(e.data);

		if (data.action === "Ping") socket.send(JSON.stringify({ action: "Pong" }));
		if (data.action === "PublicMessage") {
			const newMsg = {
				id: "15", //fake
				id_user: data.id_user,
				id_user_to: data.id_user_to,
				text: data.text,
				// ut: "2022-01-21 10:47:13",
			}
			dispatch(addNewChatMessage(newMsg))
		}
	};

	const onConnectClose = (e) => {
		console.log("connection closed", e);
	};

	useEffect(() => {
		setSocket(new WebSocket("wss://fs2.mh.net.ua/ws/"));
	}, []);

	useEffect(() => {
		if (socket) {
			socket.addEventListener("open", onConnectOpen);
			socket.addEventListener("close", onConnectClose);
			socket.addEventListener("message", onWebSocketsMessage);
		}
		return () => {
			socket?.removeEventListener("message", onWebSocketsMessage);
			socket?.removeEventListener("open", onConnectOpen);
			socket?.removeEventListener("close", onConnectClose);
			socket?.close();
		};
	}, [socket]);

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
						renderMessages(messages)
					)}
					<div ref={endMessagesRef} />
				</div>
				<div className={styles.rightPanelContentType}>
					{rightPanelContentType === "emo" ? (
						<EmojiArea insertToInput={insertToInput} />
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
				<div className={styles.textMessage}>
					<textarea
						ref={inputRef}
						type="text"
						placeholder="Введите текст сообщения"
						className={styles.textInput}
						onClick={findCursorPosition}
						rows={1}
						onKeyDown={keyPress}
						onChange={onTextAreaChange}
						value={textAreaValue}
					/>
					<SendIcon
						className={classNames({
							[styles.messageImg]: true,
							[styles.active]: textAreaValue.length,
						})}
						onClick={() => addMessage(textAreaValue)}
					/>
				</div>
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
