import React from "react";
import styles from "./CustomChatItem.module.sass";
import classNames from "classnames";
import { ReactComponent as LockIcon } from "../../../../../assets/PrivateCabinet/password.svg";

const CustomChatItem = ({
	selectedContact,
	setSelectedContact,
	sideMenuCollapsed,
	chatItem,
	title,
	subtitle,
	avatar,
	isSubList = false,
	setCollapseMembersList,
	status,
	contextMenu = "contextMenu",
	disableHover = false,
	setMouseParams = () => {},
	contextMenuList = '',
	paddingRight = ''
}) => {
	const onChatItemClick = (e, isMenu) => {
		if (isMenu)
			setMouseParams({ x: e.clientX, y: e.clientY, width: 210, height: 25, contextMenuList });

		if (chatItem?.id === selectedContact?.id && setCollapseMembersList) {
			setCollapseMembersList((state) => !state);
		} else setSelectedContact({ ...chatItem, status });
	};
	return (
		<div
			className={classNames({
				[styles.item]: true,
				[styles.sublist]: isSubList,
				[styles.sideMenuCollapsed]: sideMenuCollapsed,
				[styles.active]: selectedContact && selectedContact?.id === chatItem.id,
				[styles.disableHover]: disableHover,
			})}
			style={{paddingRight}}
			onClick={onChatItemClick}
			title={sideMenuCollapsed ? title : ""}
		>
			<div className={styles.groupName}>
				<div className={styles.avatarWrapper}>
					<img src={avatar} alt="avatar" className={styles.avatar} />
					{chatItem.is_online ? <div className={styles.onlineIndicator}></div> : ''}
				</div>
				{sideMenuCollapsed ? (
					chatItem.is_secret_chat && (
						<LockIcon className={styles.secretChatIcon} />
					)
				) : (
					<div className={styles.info}>
						<div className={styles.title}>
							{title}{" "}
							{chatItem.is_secret_chat ? (
								<LockIcon className={styles.secretChatIcon} />
							) : (
								""
							)}
						</div>
						<div className={styles.subtitle}>{subtitle}</div>
					</div>
				)}
			</div>
			<div className={styles.functionWrap}>
				{contextMenu === "contextMenu" ? (
					<div
						className={styles.menuWrap}
						onClick={(e) => onChatItemClick(e, true)}
					>
						<span className={styles.menu} />
					</div>
				) : null}
				{contextMenu === "checkBox" ? (
					<div
						className={classNames({
							[styles.radioContact]: true,
							[styles.radioContactChosen]: selectedContact?.filter(
								(c) => c.id === chatItem.id
							).length,
						})}
					/>
				) : null}
			</div>
		</div>
	);
};

export default CustomChatItem;
