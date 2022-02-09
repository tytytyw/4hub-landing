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
import { useSelector } from "react-redux";
import classNames from "classnames";
import InviteUser from "./InviteUser";
import Message from "./Message";
import InfoPanel from "./InfoPanel";
import TextArea from "./TextArea";

const ChatBoard = ({
	sideMenuCollapsed,
	boardOption,
	setShowSuccessPopup,
	setAction,
	setMouseParams,
	currentDate,
	addMessage,
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

	const scrollToBottom = () => {
		endMessagesRef?.current?.scrollIntoView();
	};
	useEffect(() => scrollToBottom, [messages, selectedContact]);

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
					{rightPanelContentType === "emo" ? <EmojiArea /> : null}
					{rightPanelContentType === "info" ? (
						<InfoPanel setAction={setAction} />
					) : null}
				</div>
			</main>
			<footer className={styles.chatBoardFooter}>
				<div className={styles.downloadOptions}>
					<AddIcon title="Вставить файл" />
				</div>
				<TextArea addMessage={addMessage} />
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
