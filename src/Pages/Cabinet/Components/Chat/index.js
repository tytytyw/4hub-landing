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
import { onGetReсentChatsList } from "../../../../Store/actions/CabinetActions";
import SuccessPopup from "./SuccessPopup";
import ContextMenu from '../../../../generalComponents/ContextMenu';
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem';
import ActionApproval from "../../../../generalComponents/ActionApproval";
import SearchField from "../../../../generalComponents/SearchField";
import AddUserToGroup from "./ServePanel/AddUserToGroup"
import { contextMenuChat } from '../../../../generalComponents/collections';
import { groupDelete, secretChatDelete } from "../ContextMenuComponents/ContexMenuChat/ChatMenuHelper";
import {onGetChatMessages, onSetSelectedContact} from "../../../../Store/actions/CabinetActions";

const Chat = ({ setMenuItem }) => {
	const [boardOption, setBoardOption] = useState("contacts");
	const [search, setSearch] = useState("");
	const [sideMenuCollapsed, setSideMenuCollapsed] = useState(false);
	const selectedContact = useSelector((state) => state.Cabinet.chat.selectedContact);
	const [action, setAction] = useState({ type: "", name: "", text: "" });
	const nullifyAction = () => setAction({ type: "", name: "", text: "" });
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [date, setDate] = useState(new Date());
	const dispatch = useDispatch();
	const [mouseParams, setMouseParams] = useState(null);
	const uid = useSelector((state) => state.user.uid);
	const userId = useSelector((state) => state.Cabinet.chat.userId);

	const closeContextMenu = () => {
        setMouseParams(null);
		nullifyAction()
    }
	
	const setSelectedContact = (contact) => selectedContact !== contact ? dispatch(onSetSelectedContact(contact)) : ''

    const renderContextMenuItems = (target, type) => {
		let contextMenuItems = target;
		if (selectedContact?.isGroup) {
			const admins = selectedContact.users.filter(u => u.is_admin).map(u => u.id_user)

			if (!admins.includes(userId)) {
				// user not admin of group
				const onlyAdminItemsTypes = ['editChatGroup', 'deleteUserFromGroup'];
				const filteredMenu = [...target].filter(item => !onlyAdminItemsTypes.includes(item.type));
				contextMenuItems = filteredMenu
			}
		}
        return contextMenuItems.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={() => type[i]?.callback(type, i)}
                imageSrc={imageSrc + `assets/PrivateCabinet/ContextMenuChat/${item.img}.svg`}
            />
        })
    };

	const callbackArr = {
		group: [
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
		],
		secretChat: [
			{
				type: 'deleteSecretChat',
				name: 'Удалить',
				text: `Вы действительно хотите удалить секретный чат c ${selectedContact?.name}?`,
				callback: (list, index) =>
				setAction({
					text: list[index].text,
					type: list[index].type,
					name: list[index].name,
				})
			},
		],
		recentChat: [],
		userInGroup: [
			{
				type: 'clearMessages',
				name: 'Очистить историю',
				text: ``,
				callback: (list, index) =>
				setAction({
					text: list[index].text,
					type: list[index].type,
					name: list[index].name,
				})
			},
			{
				type: 'blockUser',
				name: 'Заблокировать',
				text: ``,
				callback: (list, index) =>
				setAction({
					text: list[index].text,
					type: list[index].type,
					name: list[index].name,
				})
			},
			{
				type: 'deleteUserFromGroup',
				name: 'Удалить из группы',
				text: ``,
				callback: (list, index) =>
				setAction({
					text: list[index].text,
					type: list[index].type,
					name: list[index].name,
				})
			},
		],
	}

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

	const deleteSecretChat = () => {
		secretChatDelete(
			selectedContact,
			dispatch,
			uid,
			setShowSuccessMessage,
			"Секретный чат удален"
		);
		nullifyAction();
		setSelectedContact(null);
	}

	useEffect(() => {
		setMenuItem("Chat");
		dispatch(onGetUserInfo());
		dispatch(onGetReсentChatsList());

		const timer = setInterval(() => {// Creates an interval which will update the current data every minute
			setDate(new Date());
		  }, 60 * 1000);
		return () => {
			setMenuItem("");
			clearInterval(timer);
			setSelectedContact(null);
		};
		
	}, []); //eslint-disable-line

	useEffect(() => {
		if (selectedContact) dispatch(onGetChatMessages(selectedContact))
	}, [selectedContact?.id]); //eslint-disable-line
    
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
					<div className={styles.borderBottom}>
						<SearchField value={search} setValue={setSearch} />
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
							currentDate={date}
							setMouseParams={setMouseParams}
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
							currentDate={date}
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
				currentDate={date}
				setAction={setAction}
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
                <div className={styles.ContextMenuItems}>
					{renderContextMenuItems(contextMenuChat[mouseParams.contextMenuList], callbackArr[mouseParams.contextMenuList])}
				</div>
            </ContextMenu> : null}
			{action.type === "deleteChatGroup" || action.type === "deleteSecretChat" ? (
				<ActionApproval
					name={action.name}
					text={action.text}
					set={closeContextMenu}
					callback={action.type === "deleteChatGroup" ? deleteChatGroup : deleteSecretChat}
					approve={'Удалить'}
				>
					<div className={styles.groupLogoWrap}>
						<img className={styles.groupLogo} src={selectedContact?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/${action.type === "deleteChatGroup" ? 'chatGroup' : 'profile-noPhoto'}.svg`} alt='group logo' />
					</div>
				</ActionApproval>
			) : null}
			{action.type === 'addUsersToGroup' ? <AddUserToGroup group={selectedContact} nullifyAction={nullifyAction} /> : ''}
		</div>
	);
};

export default Chat;
