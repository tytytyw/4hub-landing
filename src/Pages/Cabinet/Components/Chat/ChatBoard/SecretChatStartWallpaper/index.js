import React from "react";
import styles from "./SecretChatStartWallpaper.module.sass";

const SecretChatStartWallpaper = ({children}) => {
	return (
		<div className={styles.wrap}>
			<h4 className={styles.title}>Секретный чат</h4>
			<ul className={styles.list}>
				<li className={styles.text}> Используют оконечное шифрование</li>
				<li className={styles.text}>Не хранятся на серверах</li>
                <li className={styles.text}>Позволяют удалеть переписку по таймеру</li>
                <li className={styles.text}>Не позволяют пересылать сообщения</li>
			</ul>
			{children}
		</div>
	);
};

export default SecretChatStartWallpaper;
