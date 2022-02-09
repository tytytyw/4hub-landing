import React from "react";
import { useSelector } from "react-redux";

import styles from "./WorkSpace.module.sass";
import CreateChat from "../CreateChat";
import BottomPanel from "../../BottomPanel";
import ChatBoard from "../ChatBoard";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile";

const WorkSpace = ({
	sideMenuCollapsed,
	boardOption,
	setShowSuccessPopup,
	nullifyAction,
	action,
	currentDate,
	setAction,
	setMouseParams
}) => {
	const selectedContact = useSelector(
		(state) => state.Cabinet.chat.selectedContact
	);

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
				{selectedContact && action.type !== 'addChat' && action.type !== 'editChatGroup' ? (
					<ChatBoard
						sideMenuCollapsed={sideMenuCollapsed}
						boardOption={boardOption}
						setShowSuccessPopup={setShowSuccessPopup}
						setAction={setAction}
						setMouseParams={setMouseParams}
						currentDate={currentDate}
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
						initialUser={action.initialUser}
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
