import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./Message.module.sass";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { messageTime } from "../../../../../../generalComponents/chatHelper";
import VideoMessagePlayer from "./VideoMessagePlayer";
import VoiceMessagePlayer from "./VoiceMessagePlayer";
import FileMessage from "./FileMessage";

function Message({
	message,
	selectedContact,
	currentDate,
	setMouseParams,
	contextMenuList = "message",
}) {
	const userId = useSelector((state) => state.Cabinet.chat.userId);
	const text = message.text.split("\n");
	const messageType = message.id_user === userId ? "outbox" : "inbox";
	const gmt = useSelector((state) => state?.user?.userInfo?.gmt); // server time zone

	const renderAttachment = () => {
		if (message.attachment?.kind === "audio_message") {
			return (
				<VoiceMessagePlayer
					src={message.attachment.link}
					histogramData={message.attachment?.histogramData??[]}
					inboxMessage={messageType === "inbox"}
				/>
			);
		}
		if (message.attachment?.kind === "video_message") {
			return <VideoMessagePlayer video={message.attachment} />;
		}
		if (message.attachment?.kind === "file") {
			return <FileMessage file={message.attachment} />;
		}
		return "";
	};

	return (
		<div className={classNames(styles.wrapper, styles[messageType])}>
			{messageType === "inbox" ? (
				<img
					src={
						selectedContact?.icon?.[0] ||
						`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
					}
					alt="avatar"
					className={styles.avatar}
				/>
			) : (
				""
			)}
			<div className={styles.contentWrapper}>
				<div className={styles.flexContainer}>
					{message.attachment?.kind === "video_message" ? (
						renderAttachment()
					) : (
						<div
							className={classNames({
								[styles.content]: true,
								[styles.audio_content]:
									message.attachment?.kind === "audio_message",
							})}
						>
							{renderAttachment()}
							{text.map((item, index) => (
								<p key={index} className={styles.text}>
									{item}
								</p>
							))}
						</div>
					)}
					{messageType !== "inbox" || message.attachment?.kind === "file" ? <div className={styles.menuWrapper}>
						<div
							className={styles.menu}
							onClick={(e) => {
								setMouseParams({
									x: e.clientX,
									y: e.clientY,
									width: 215,
									height: 25,
									contextMenuList,
									message: {...message, messageType},
								});
							}}
						>
							<span className={styles.dot} />
						</div>
					</div> : ''}
				</div>
				<div className={styles.time}>
					{messageTime(currentDate, message.ut, gmt)}
				</div>
			</div>
		</div>
	);
}

export default Message;
