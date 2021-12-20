import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import styles from "./Chat.module.sass";
import {ReactComponent as FolderIcon} from "../../../../assets/PrivateCabinet/play-grey.svg";
import {ReactComponent as ChatIcon} from "../../../../assets/PrivateCabinet/chat-2.svg";
import {ReactComponent as ContactsIcon} from "../../../../assets/PrivateCabinet/men.svg";
import {ReactComponent as SettingsIcon} from "../../../../assets/PrivateCabinet/gear-6.svg";
import {ReactComponent as PhoneIcon} from "../../../../assets/PrivateCabinet/phone-5.svg";
import AddContact from './AddContact'
import {imageSrc} from '../../../../generalComponents/globalVariables';
import ContactList from "./ContactList";
import WorkSpace from "./WorkSpace";
import classNames from "classnames";
import SuccessMessage from "../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage";
import {onGetUserInfo} from "../../../../Store/actions/startPageAction";
import SuccessPopup from "./SuccessPopup";

const Chat = ({setMenuItem}) => {

    const [boardOption, setBoardOption] = useState('contacts');
    const [search, setSearch] = useState('');
    const [sideMenuCollapsed, setSideMenuCollapsed] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [action, setAction] = useState({ type: "", name: "", text: "" });
    const nullifyAction = () => setAction({ type: "", name: "", text: "" });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setMenuItem('Chat')
        dispatch(onGetUserInfo());
        return () => setMenuItem('')
    }, []); //eslint-disable-line

    return(
        <div className={styles.chatComponent}>
            <div className={classNames({[styles.sideMenu]: true, [styles.sideMenuCollapsed]: sideMenuCollapsed })}>
                <div className={styles.header}>
                    <div className={styles.headerName}>
                        <ChatIcon id={styles.headerIcon} title="" />
                        {sideMenuCollapsed ? null : <span>Чат</span>}
                    </div>
                    <FolderIcon
                        onClick={() => setSideMenuCollapsed(value => !value)}
                        id={styles.headerArrow}
                        title={sideMenuCollapsed ? 'развернуть' : 'свернуть'} />
                </div>
                <div className={styles.boardOptions}>
                    <ContactsIcon
                        className={`${styles.option} ${boardOption === 'contacts' ? styles.selected : ''}`}
                        onClick={() => setBoardOption('contacts')}
                        title="Контакты"
                    />
                    <PhoneIcon
                        className={`${styles.option} ${boardOption === 'calls' ? styles.selected : ''}`}
                        onClick={() => setBoardOption('calls')}
                        title="Недавние звонки"
                    />
                    <ChatIcon
                        className={`${styles.option} ${boardOption === 'chats' ? styles.selected : ''}`}
                        onClick={() => setBoardOption('chats')}
                        title="Чаты"
                    />
                    <SettingsIcon
                        className={`${styles.option} ${boardOption === 'settings' ? styles.selected : ''}`}
                        onClick={() => setBoardOption('settings')}
                        title="Настройки"
                    />
                </div>
                {sideMenuCollapsed
                    ? null
                    : <div className={styles.searchField}>
                            <input
                                placeholder='Введите имя пользователя' type='text'
                                onChange={e => setSearch(e.target.value)}
                                value={search}
                            />
                            <img
                                src={imageSrc + `assets/PrivateCabinet/${search ? 'garbage.svg' : 'magnifying-glass-2.svg'}`}
                                alt='search' className={styles.searchGlass}
                                onClick={() => setSearch('')}
                            />
                    </div>
                }
                <div className={styles.list} style={{height: `calc(100% - 68px - 68px - ${sideMenuCollapsed ? '0' :'60'}px)`}}>
                    {boardOption === 'contacts'
                    ? <ContactList
                        search={search}
                        sideMenuCollapsed={sideMenuCollapsed}
                        selectedContact={selectedContact}
                        setSelectedContact={setSelectedContact}
                        setAction={setAction}
                    />
                    : null}
                </div>
            </div>
            <WorkSpace
                boardOption={boardOption}
                selectedContact={selectedContact}
                sideMenuCollapsed={sideMenuCollapsed}
                setShowSuccessPopup={setShowSuccessPopup}
            />
            {action.type === "addContact" ? (
                <AddContact action={action} nullifyAction={nullifyAction} setShowSuccessPopup={setShowSuccessPopup} />
			) : null}
            {showSuccessMessage && (
				<SuccessMessage
					showSuccessMessage={showSuccessMessage}
					setShowSuccessMessage={setShowSuccessMessage}
				/>
			)}
            {showSuccessPopup ? <SuccessPopup title={showSuccessPopup?.title} text={showSuccessPopup?.text} set={() => setShowSuccessPopup(false)} /> : ''}
        </div>
    )
}

export default Chat;