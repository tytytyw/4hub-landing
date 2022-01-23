import classNames from "classnames";
import React from "react";
import styles from "./Message.module.sass";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";

function Message({ message, selectedContact }) {
    const text = message.text.split('\n')
	const messageType = message.id_user === selectedContact.id_real_user ? 'outbox' : 'inbox'

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
			<div className={classNames(styles.content)}>
                {text.map((item, index) => <p key={index} className={styles.text}>{item}</p>)}
			</div>
		</div>
	);
}

export default Message;
