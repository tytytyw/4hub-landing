import React, { useRef, useState } from "react";

import styles from "./WorkSpace.module.sass";
import CreateChat from "../CreateChat";
import BottomPanel from "../../BottomPanel";
import ChatBoard from "../ChatBoard";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile";

const WorkSpace = ({
	selectedContact,
	sideMenuCollapsed,
	boardOption,
	setShowSuccessPopup,
	nullifyAction,
	action,
	currentDate,
}) => {
	const [cursorPosition, setCursorPosition] = useState(0);
	const inputRef = useRef();
	const insertToInput = (value) => {
		if (inputRef.current) {
			inputRef.current.value =
				inputRef.current.value.slice(0, cursorPosition) +
				value +
				" " +
				inputRef.current.value.slice(cursorPosition);
			inputRef.current.focus();
			inputRef.current.selectionStart = cursorPosition + 3;
			inputRef.current.selectionEnd = cursorPosition + 3;
		}
	};

	return (
		<div className={styles.chatWorkSpaceWrap}>
			<div className={styles.header}>
				<SearchField />
				<div className={styles.infoHeader}>
					<StorageSize />
					<Notifications />
					<Profile />
				</div>
			</div>
			<div className={styles.main}>
				{selectedContact && !action.type ? (
					<ChatBoard
						inputRef={inputRef}
						setCursorPosition={setCursorPosition}
						selectedContact={selectedContact}
						insertToInput={insertToInput}
						sideMenuCollapsed={sideMenuCollapsed}
						boardOption={boardOption}
						setShowSuccessPopup={setShowSuccessPopup}
					/>
				) : (
					""
				)}
				{action.type === "addChat" ? (
					<CreateChat
						title={action.name}
						maxCountUsers={action?.chatsType === "groups" ? 200 : 1}
						nullifyAction={nullifyAction}
						setShowSuccessPopup={setShowSuccessPopup}
						componentType={'add'}
						currentDate={currentDate}
					/>
				) : ''}
				{action.type === "editChatGroup" ? (
					<CreateChat
						title={action.name}
						maxCountUsers={200}
						nullifyAction={nullifyAction}
						setShowSuccessPopup={setShowSuccessPopup}
						selectedContact={selectedContact}
						componentType={'edit'}
						currentDate={currentDate}
					/>
				) : ''}
			</div>

			<BottomPanel />
		</div>
	);
};

export default WorkSpace;
