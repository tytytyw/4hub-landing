import classNames from "classnames";
import React from "react";
import styles from "./Message.module.sass";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";

function Message({ message, selectedContact }) {
	return (
		<div className={classNames(styles.wrapper, styles[message.type])}>
			{message.type === "inbox" ? (
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
				<p className={styles.text}>{message.text}</p>
			</div>
		</div>
	);
}

export default Message;
