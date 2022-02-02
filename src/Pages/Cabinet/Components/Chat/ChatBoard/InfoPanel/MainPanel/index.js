import classNames from "classnames";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { imageSrc } from "../../../../../../../generalComponents/globalVariables";
import styles from "./MainPanel.module.sass";

import { ReactComponent as TriangleIcon } from "../../../../../../../assets/PrivateCabinet/play-grey.svg";

const MainPanel = ({ setAction }) => {
	const selectedContact = useSelector(
		(state) => state.Cabinet.chat.selectedContact
	);
	const [notificationsMute, setNotificationsMute] = useState(false);
	const userId = useSelector((state) => state.Cabinet.chat.userId);

	const deleteBtnType = () => {
		if (selectedContact?.isGroup) {
			const admins = selectedContact.users
				.filter((u) => u.is_admin)
				.map((u) => u.id_user);
			if (admins.includes(userId)) {
				// user is admin
				return {
					text: "Удалить группу",
					callback: () =>
						setAction({
							text: `Вы действительно хотите удалить группу ${selectedContact?.name}?`,
							type: "deleteChatGroup",
							name: "Удалить",
						}),
				};
			} else {
				// user not admin
				return {
					text: "Покинуть группу",
					callback: () =>
						setAction({
							text: `Вы действительно хотите покинуть группу ${selectedContact?.name}?`,
							type: "leaveFromChatGroup",
							name: "Покинуть",
						}),
				};
			}
		}
		return {
			text: "Очистить историю",
			callback: () => console.log("clear messages"),
		};
	};

	const getAvatarSrc = () => {
		return (
			selectedContact?.icon?.[0] ||
			`${imageSrc}assets/PrivateCabinet/${
				selectedContact?.isGroup ? "chatGroup" : "profile-noPhoto"
			}.svg`
		);
	};

	return (
		<div className={styles.wrapper}>
			<div className={classNames(styles.avatarWrapper, styles.borderBottom)}>
            <div style={{backgroundImage: `url(${getAvatarSrc()})`}} className={styles.blurBackground}></div>
				<img className={styles.avatar} alt="avatar" src={getAvatarSrc()} />
			</div>
			<div className={styles.menu}>
				<div>
					<div className={classNames(styles.menuItem, styles.borderBottom)}>
						<div className={styles.leftSide}>
							<span className={styles.menuItemName}>Мультимедиа</span>
						</div>
						<div className={styles.leftSide}>
							<span className={styles.menuItemText}>({810})</span>
							<TriangleIcon className={styles.triangleIcon} />
						</div>
					</div>

					<div className={classNames(styles.menuItem, styles.borderBottom)}>
						<div className={styles.leftSide}>
							<span className={styles.menuItemName}>Документы</span>
						</div>
						<div className={styles.leftSide}>
							<span className={styles.menuItemText}>({810})</span>
							<TriangleIcon className={styles.triangleIcon} />
						</div>
					</div>

					<div className={classNames(styles.menuItem, styles.borderBottom)}>
						<div className={styles.leftSide}>
							<span className={styles.menuItemName}>Аудио</span>
						</div>
						<div className={styles.leftSide}>
							<span className={styles.menuItemText}>({810})</span>
							<TriangleIcon className={styles.triangleIcon} />
						</div>
					</div>

					<div className={classNames(styles.menuItem, styles.borderBottom)}>
						<div className={styles.leftSide}>
							<span className={styles.menuItemName}>Ссылки</span>
						</div>
						<div className={styles.leftSide}>
							<span className={styles.menuItemText}>({810})</span>
							<TriangleIcon className={styles.triangleIcon} />
						</div>
					</div>

					{!selectedContact.is_secret_chat ? (
						<div
							className={classNames(
								styles.menuItem,
								styles.borderBottom,
								styles.hoverDisable
							)}
						>
							<div className={styles.leftSide}>
								<span className={styles.menuItemName}>Добавить участника</span>
							</div>
							<div
								className={styles.leftSide}
								onClick={() =>
									setAction(
										selectedContact?.isGroup
											? { type: "addUsersToGroup" }
											: {
													type: "addChat",
													chatsType: "groups",
													initialUser: selectedContact,
											  }
									)
								}
							>
								<button className={styles.textBtn}>Добавить</button>
							</div>
						</div>
					) : (
						""
					)}

					<div
						className={classNames(
							styles.menuItem,
							styles.borderBottom,
							styles.positionRelative,
							styles.hoverDisable
						)}
					>
						<div className={styles.leftSide}>
							<span className={styles.menuItemName}>Уведомления</span>
						</div>
						<div
							className={classNames(styles.switcher)}
							onClick={() => setNotificationsMute((state) => !state)}
						>
							<div
								className={classNames({
									[styles.switchActive]: !notificationsMute,
									[styles.switch]: true,
								})}
							/>
						</div>
					</div>
				</div>

				<div
					className={classNames(styles.menuItem, styles.borderTop)}
					onClick={deleteBtnType()?.callback}
				>
					<div className={styles.leftSide}>
						<span className={styles.menuItemName}>{deleteBtnType()?.text}</span>
					</div>
					<div className={styles.leftSide}></div>
				</div>
			</div>
		</div>
	);
};

export default MainPanel;
