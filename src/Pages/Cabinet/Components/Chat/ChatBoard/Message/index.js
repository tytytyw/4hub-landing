import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./Message.module.sass";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { messageTime } from "../../../../../../generalComponents/chatHelper";

function Message({ message, selectedContact, currentDate }) {
	const userId = useSelector((state) => state.Cabinet.chat.userId);
	const text = message.text.split("\n");
	const messageType = message.id_user === userId ? "outbox" : "inbox";
	const gmt = useSelector((state) => state?.user?.userInfo?.gmt); // server time zone

	const renderAttachment = () => {
		if (message.attachment?.type?.includes('audio')) {
			return (
				<audio controls src={message.attachment.link}></audio>
			)
		}
		if (message.attachment?.type?.includes('video')) {
			return (
				<video controls src={message.attachment.link}></video>
			)
		}
		return ""
	}

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
			<div className={styles.textWrapper}>
				<div className={classNames(styles.content)}>
					{renderAttachment()}
					{text.map((item, index) => (
						<p key={index} className={styles.text}>
							{item}
						</p>
					))}
				</div>
				<div className={styles.time}>
					{messageTime(currentDate, message.ut, gmt)}
				</div>
			</div>
		</div>
	);
}

export default Message;
