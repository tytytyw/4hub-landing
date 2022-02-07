import classNames from "classnames";
import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import styles from "./Message.module.sass";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { messageTime } from "../../../../../../generalComponents/chatHelper";


function Message({ message, selectedContact, currentDate }) {
	const userId = useSelector((state) => state.Cabinet.chat.userId);
    const text = message.text.split('\n')
	const messageType = message.id_user === userId ? 'outbox' : 'inbox'
	const gmt = useSelector(state => state?.user?.userInfo?.gmt) // server time zone
	const [messageTIme, setMessageTime] = useState(message.isNewMessage ? 'только что' : messageTime(currentDate, message.ut, gmt))

	useEffect(() => {
		// replace 'только что' after 10 seconds for fresh message
		const timeout = message.isNewMessage ? setTimeout(() => {setMessageTime(messageTime(currentDate, message.ut, gmt))}, 10000) : null
		return () => {
			if (message.isNewMessage) clearTimeout(timeout)
		};
	}, []); //eslint-disable-line

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
					{text.map((item, index) => <p key={index} className={styles.text}>{item}</p>)}
				</div>
				<div className={styles.time}>{messageTIme}</div>
			</div>
			
		</div>
	);
}

export default Message;
