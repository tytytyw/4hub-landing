import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Chat.module.sass";
import { ReactComponent as FolderIcon } from "../../../../assets/PrivateCabinet/play-grey.svg";
import { ReactComponent as ChatIcon } from "../../../../assets/PrivateCabinet/chat-2.svg";
import { ReactComponent as ContactsIcon } from "../../../../assets/PrivateCabinet/men.svg";
import { ReactComponent as SettingsIcon } from "../../../../assets/PrivateCabinet/gear-6.svg";
import { ReactComponent as PhoneIcon } from "../../../../assets/PrivateCabinet/phone-5.svg";
import AddContact from "./AddContact";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import ContactList from "./ContactList";
import ChatList from "./ChatList";
import WorkSpace from "./WorkSpace";
import classNames from "classnames";
import SuccessMessage from "../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage";
import { onGetUserInfo } from "../../../../Store/actions/startPageAction";
import SuccessPopup from "./SuccessPopup";
import ContextMenu from '../../../../generalComponents/ContextMenu';
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem';
import ActionApproval from "../../../../generalComponents/ActionApproval";
import { contextMenuChatGroup } from '../../../../generalComponents/collections';
import { groupDelete } from "../ContextMenuComponents/ContexMenuChat/ChatMenuHelper";

const Chat = ({ setMenuItem }) => {
	const [boardOption, setBoardOption] = useState("contacts");
	const [search, setSearch] = useState("");
	const [sideMenuCollapsed, setSideMenuCollapsed] = useState(false);
	const [selectedContact, setSelectedContact] = useState(null);
	const [action, setAction] = useState({ type: "", name: "", text: "" });
	const nullifyAction = () => setAction({ type: "", name: "", text: "" });
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const dispatch = useDispatch();
	const [mouseParams, setMouseParams] = useState(null);
	const uid = useSelector((state) => state.user.uid);

	const closeContextMenu = () => {
        setMouseParams(null);
		nullifyAction()
    }

    const renderContextMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={() => type[i]?.callback(type, i)}
                imageSrc={imageSrc + `assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    };
	const callbackArrMainGroup = [
		{
			type: 'editChatGroup',
			name: 'Редактировать',
			text: ``, 
			callback: (list, index) => setAction(list[index])
		},
        {
			type: 'deleteChatGroup',
			name: 'Удалить',
			text: `Вы действительно хотите удалить группу ${selectedContact?.name}?`,
			callback: (list, index) =>
			setAction({
				text: list[index].text,
				type: list[index].type,
				name: list[index].name,
			})
		},
	]

	const deleteChatGroup = () => {
		//TODO: add is_admin validation
		groupDelete(
			selectedContact,
			dispatch,
			uid,
			setShowSuccessMessage,
			"Группа удалена"
		);
		nullifyAction();
		setSelectedContact(null);
	}

	useEffect(() => {
		setMenuItem("Chat");
		dispatch(onGetUserInfo());
		return () => setMenuItem("");
	}, []); //eslint-disable-line

    useEffect(() => {
		setSelectedContact(null)
	}, [boardOption]); //eslint-disable-line
    
	return (
		<div className={styles.chatComponent}>
			<div
				className={classNames({
					[styles.sideMenu]: true,
					[styles.sideMenuCollapsed]: sideMenuCollapsed,
				})}
			>
				<div className={styles.header}>
					<div className={styles.headerName}>
						<ChatIcon id={styles.headerIcon} title="" />
						{sideMenuCollapsed ? null : <span>Чат</span>}
					</div>
					<FolderIcon
						onClick={() => setSideMenuCollapsed((value) => !value)}
						id={styles.headerArrow}
						title={sideMenuCollapsed ? "развернуть" : "свернуть"}
					/>
				</div>
				<div className={styles.boardOptions}>
					<ContactsIcon
						className={`${styles.option} ${
							boardOption === "contacts" ? styles.selected : ""
						}`}
						onClick={() => setBoardOption("contacts")}
						title="Контакты"
					/>
					<PhoneIcon
						className={`${styles.option} ${
							boardOption === "calls" ? styles.selected : ""
						}`}
						onClick={() => setBoardOption("calls")}
						title="Недавние звонки"
					/>
					<ChatIcon
						className={`${styles.option} ${
							boardOption === "chats" ? styles.selected : ""
						}`}
						onClick={() => setBoardOption("chats")}
						title="Чаты"
					/>
					<SettingsIcon
						className={`${styles.option} ${
							boardOption === "settings" ? styles.selected : ""
						}`}
						onClick={() => setBoardOption("settings")}
						title="Настройки"
					/>
				</div>
				{sideMenuCollapsed ? null : (
					<div className={styles.searchField}>
						<input
							placeholder="Введите имя пользователя"
							type="text"
							onChange={(e) => setSearch(e.target.value)}
							value={search}
						/>
						<img
							src={
								imageSrc +
								`assets/PrivateCabinet/${
									search ? "garbage.svg" : "magnifying-glass-2.svg"
								}`
							}
							alt="search"
							className={styles.searchGlass}
							onClick={() => setSearch("")}
						/>
					</div>
				)}
				<div
					style={{
						height: `calc(100% - 68px - 68px - ${
							sideMenuCollapsed ? "0" : "60"
						}px)`,
					}}
				>
					{boardOption === "contacts" ? (
						<ContactList
							search={search}
							sideMenuCollapsed={sideMenuCollapsed}
							selectedContact={selectedContact}
							setSelectedContact={setSelectedContact}
							setAction={setAction}
						/>
					) : null}
					{boardOption === "chats" ? (
						<ChatList
							search={search}
							sideMenuCollapsed={sideMenuCollapsed}
							selectedContact={selectedContact}
							setSelectedContact={setSelectedContact}
							setAction={setAction}
							mouseParams={mouseParams}
							setMouseParams={setMouseParams}
							action={action}
							closeContextMenu={closeContextMenu}
							deleteChatGroup={deleteChatGroup}
						/>
					) : null}
				</div>
			</div>
			<WorkSpace
				boardOption={boardOption}
				selectedContact={selectedContact}
				sideMenuCollapsed={sideMenuCollapsed}
				setShowSuccessPopup={setShowSuccessPopup}
                nullifyAction={nullifyAction}
                action={action}
			/>
			{action.type === "addContact" ? (
				<AddContact
					action={action}
					nullifyAction={nullifyAction}
					setShowSuccessPopup={setShowSuccessPopup}
				/>
			) : null}
			{showSuccessMessage && (
				<SuccessMessage
					showSuccessMessage={showSuccessMessage}
					setShowSuccessMessage={setShowSuccessMessage}
				/>
			)}
			{showSuccessPopup ? (
				<SuccessPopup
					title={showSuccessPopup?.title}
					text={showSuccessPopup?.text}
					set={() => setShowSuccessPopup(false)}
				/>
			) : (
				""
			)}
			{mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={false}>
                <div className={styles.ContextMenuItems}>{renderContextMenuItems(contextMenuChatGroup, callbackArrMainGroup)}</div>
            </ContextMenu> : null}
			{action.type === "deleteChatGroup" ? (
				<ActionApproval
					name={action.name}
					text={action.text}
					set={closeContextMenu}
					callback={deleteChatGroup}
					approve={'Удалить'}
				>
					<div className={styles.groupLogoWrap}>
						<img className={styles.groupLogo} src={selectedContact?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/chatGroup.svg`} alt='group logo' />
					</div>
				</ActionApproval>
			) : null}
		</div>
	);
};

export default Chat;
