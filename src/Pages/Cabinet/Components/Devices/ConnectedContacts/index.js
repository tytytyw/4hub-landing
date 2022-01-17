import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./ConnectedContacts.module.sass";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import classNames from "classnames";
import ContactItem from "../ContactItem";

const ConnectedContacts = ({ listCollapsed, setMouseParams, listSize }) => {
	const connectedContacts = useSelector(
		(state) => state.Cabinet.connectedContacts
	);
	const [collapse, setCollapse] = useState(true);

	const renderContacts = () => {
		return connectedContacts.map((contact, index) => {
			return (
				<ContactItem
					listSize={listSize}
					key={index}
					contact={contact}
					active={contact?.active}
					setMouseParams={setMouseParams}
					listCollapsed={listCollapsed}
				/>
			);
		});
	};

	return (
		<div className={classNames({[styles.wrapper]: true, [styles.hidden]: collapse,})}>
			<div
				className={classNames({
					[styles.titleWrap]: true,
					[styles.titleCollapsed]: !!listCollapsed,
					[styles.titleWrapChosen]: !!collapse,
				})}
				onClick={() => setCollapse(!collapse)}
			>
				<span title={listCollapsed ? 'Подключенные пользователи' : ''} className={styles.title}>Подключенные пользователи</span>
				<PlayIcon
					className={classNames({
						[styles.playButton]: true,
						[styles.revert]: collapse,
					})}
                    title={collapse ? 'Свернуть' : 'Развернуть'}
				/>
			</div>
			<div
				className={classNames({
					[styles.innerContacts]: true,
					
				})}
			>
				{collapse && renderContacts()}
                {/* TODO: remove */}
                {collapse && renderContacts()}
                {collapse && renderContacts()}
                {collapse && renderContacts()}
                {collapse && renderContacts()}
                {collapse && renderContacts()}
                {collapse && renderContacts()}
                {collapse && renderContacts()}
			</div>
		</div>
	);
};

export default ConnectedContacts;
