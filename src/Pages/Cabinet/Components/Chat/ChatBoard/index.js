import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./ChatBoard.module.sass";

import EmojiArea from "../EmojiArea";
import ServePanel from "../ServePanel";
import SecretChatStartWallpaper from "./SecretChatStartWallpaper";
import { ReactComponent as AddFirstContactIcon } from "../../../../../assets/PrivateCabinet/addFirstContact.svg";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import InviteUser from "./InviteUser";
import Message from "./Message";
import InfoPanel from "./InfoPanel";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import VideoRecordPreview from "./VideoRecordPreview";
import { monthToString } from "../../../../../generalComponents/chatHelper";
import { useScrollElementOnScreen } from "../../../../../generalComponents/Hooks";
import { onGetChatMessages } from "../../../../../Store/actions/CabinetActions";
import ChatBoardFooter from "./ChatBoardFooter";

const ChatBoard = ({
	sideMenuCollapsed,
	boardOption,
	setShowSuccessPopup,
	action,
	setAction,
	setMouseParams,
	currentDate,
	addMessage,
	nullifyAction,
	file,
	setFile,
}) => {
	const [rightPanelContentType, setRightPanelContentType] = useState("");
	const id_company = useSelector((state) => state.user.id_company);
	const contactList = useSelector((state) =>
		id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
	);
	const selectedContact = useSelector(
		(state) => state.Cabinet.chat.selectedContact
	);
	const [mediaRecorder, setMediaRecorder] = useState(null);
	const [isRecording, setIsRecording] = useState(false);
	const [ducationTimer, setDucationTimer] = useState(0);
	const endMessagesRef = useRef();
	const chatArea = useRef();
	const footerRef = useRef();
	const videoMessagePreview = useRef();
	const [videoPreview, setVideoPreview] = useState(null);
	const [messagesPage, setMessagesPage] = useState(1);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const [chatBoardOldHeight, setChatBoardOldHeight] = useState(0);
	const search = useSelector((state) => state.Cabinet.search);
	const dispatch = useDispatch();

	const messages = useSelector((state) => state.Cabinet.chat.messages);

	const renderMessages = (day) => {
		const messagesOfDay = [...messages[day]].reverse();
		return messagesOfDay.map((msg, index) => {
			return (
				<Message
					message={{ ...msg, day }}
					selectedContact={selectedContact}
					key={`id:${msg.id} ut:${msg.ut}`}
					currentDate={currentDate}
					setMouseParams={setMouseParams}
				/>
			);
		});
	};

	const dateToString = (date) => {
		if (date === "today") return "Сегодня";
		if (date === "yesterday") return "Вчера";
		const arr = date.split("-").reverse();
		const day = arr[0];
		const month = monthToString(+arr[1] - 1);
		const year = currentDate.getFullYear() === +arr[2] ? "" : arr[2];
		return `${+day} ${month} ${year}`;
	};

	const renderGroups = useMemo(() => {
		if (
			selectedContact?.is_secret_chat &&
			(messages === null || (messages && Object.keys(messages)?.length === 0))
		)
			return (
				<SecretChatStartWallpaper>
					{messages === null ? (
						<Loader
							type="bounceDots"
							position="static"
							background="transparent"
							zIndex={5}
							width="100px"
							height="100px"
							containerType="bounceDots"
						/>
					) : (
						""
					)}
				</SecretChatStartWallpaper>
			);

		if (typeof messages !== "object" || !messages)
			return (
				<Loader
					type="bounceDots"
					position="absolute"
					background="white"
					zIndex={5}
					width="100px"
					height="100px"
					containerType="bounceDots"
				/>
			);
		const days = Object.keys(messages).reverse();
		return days.map((day) =>
			messages[day]?.length && selectedContact ? (
				<div className={styles.dateGroup} key={day}>
					<div className={styles.date}>
						<span className={styles.text}>{dateToString(day)}</span>
					</div>
					{renderMessages(day)}
				</div>
			) : null
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages, currentDate, selectedContact]);

	const onSuccessLoading = (result) => {
		if (typeof result === "object") {
			let moreElements = false;
			for (let key in result) {
				if (result[key].length > 0) moreElements = true;
			}
			setTimeout(() => {
				moreElements
					? setMessagesPage((filesPage) => filesPage + 1)
					: setMessagesPage(0);
				setLoadingMessages(false);
			}, 500);
		} else {
			setTimeout(() => {
				setMessagesPage(0);
				setLoadingMessages(false);
			}, 500);
		}
	};
	const load = (entry) => {
		if (entry.isIntersecting && !loadingMessages && messagesPage !== 0) {
			setChatBoardOldHeight(chatArea.current.scrollHeight);

			setLoadingMessages(true);
			dispatch(
				onGetChatMessages(
					selectedContact,
					search,
					messagesPage,
					onSuccessLoading
				)
			);
		}
	};
	const options = { root: null, rootMargin: "0px", threshold: 0 };
	const [startMessagesRef] = useScrollElementOnScreen(options, load);

	const recordCancel = () => {
		if (mediaRecorder) {
			const cleareTracks = () =>
				mediaRecorder.stream.getTracks().forEach((track) => track.stop());
			mediaRecorder?.state === "active" && recordEnd();
			mediaRecorder && cleareTracks();
			setMediaRecorder(null);
			setVideoPreview(null);
		}
		setIsRecording(false);
	};
	const mouseUpHandler = (e) => {
		//for recording
		const mouseUpOnFooter = footerRef?.current?.offsetTop + 90 < e.pageY;
		mouseUpOnFooter && ducationTimer > 1 ? recordEnd() : recordCancel();
	};
	const recordEnd = () => {
		mediaRecorder?.stop();
	};

	useEffect(() => {
		if (isRecording) {
			const timer = setInterval(() => {
				setDucationTimer((sec) => sec + 1);
			}, 1000);
			return () => {
				clearInterval(timer);
				setDucationTimer(0);
			};
		}
	}, [isRecording]);

	const scrollToBottom = () => {
		endMessagesRef?.current?.scrollIntoView();
	};

	useEffect(() => {
		if (
			chatBoardOldHeight &&
			messagesPage &&
			chatArea.current.scrollHeight - chatBoardOldHeight
		) {
			chatArea?.current?.scrollTo(
				0,
				chatArea.current.scrollHeight - chatBoardOldHeight
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages]);

	useEffect(() => {
		setMessagesPage(1);
		scrollToBottom();
	}, [selectedContact]);

	return (
		<div
			className={classNames({
				[styles.chatBoardWrap]: true,
				[styles.recoring]: isRecording,
			})}
			onMouseLeave={recordCancel}
			onMouseUp={mouseUpHandler}
		>
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
					className={classNames({
						[styles.chatAreaWrapper]: true,
						[styles.center]:
							selectedContact?.is_secret_chat &&
							(!messages || (messages && Object.keys(messages).length === 0)),
					})}
					style={{
						width: rightPanelContentType ? "calc(100% - 200px)" : "100%",
					}}
				>
					<div className={styles.chatArea} ref={chatArea}>
						<div
							className={classNames({
								[styles.bottomLine]: true,
								[styles.bottomLineHidden]: messagesPage === 0,
							})}
							ref={startMessagesRef}
						>
							{messagesPage !== 1 ? (
								<Loader
									type="bounceDots"
									position="absolute"
									background="white"
									zIndex={5}
									width="100px"
									height="100px"
									containerType="bounceDots"
								/>
							) : (
								""
							)}
						</div>
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
							renderGroups
						)}
						<div ref={endMessagesRef} />
					</div>
					{action?.type === "editMessage" ? (
						// TODO: add api when it will be ready
						<div
							className={styles.editingMessage}
							style={{
								width: rightPanelContentType
									? "calc(100% - 65px)"
									: "calc(100% - 200px - 65px)",
							}}
						>
							<div className={styles.line}></div>
							<p className={styles.text}>{action.message.text}</p>
							<div className={styles.close} onClick={nullifyAction} />
						</div>
					) : (
						""
					)}
				</div>
				<div className={styles.rightPanelContentType}>
					{rightPanelContentType === "emo" ? <EmojiArea /> : null}
					{rightPanelContentType === "info" ? (
						<InfoPanel setAction={setAction} />
					) : null}
				</div>
			</main>
			<ChatBoardFooter
				footerRef={footerRef}
				isRecording={isRecording}
				ducationTimer={ducationTimer}
				addMessage={addMessage}
				action={action}
				setMouseParams={setMouseParams}
				nullifyAction={nullifyAction}
				setRightPanelContentType={setRightPanelContentType}
				setIsRecording={setIsRecording}
				mediaRecorder={mediaRecorder}
				setMediaRecorder={setMediaRecorder}
				setVideoPreview={setVideoPreview}
				videoMessagePreview={videoMessagePreview}
				recordCancel={recordCancel}
				file={file}
				setFile={setFile}
			/>

			{videoPreview ? (
				<VideoRecordPreview
					isVideoMessage={videoMessagePreview}
					ducationTimer={ducationTimer}
					timeLimit={60 * 10}
					recordEnd={recordEnd}
				/>
			) : (
				""
			)}
		</div>
	);
};

export default ChatBoard;
