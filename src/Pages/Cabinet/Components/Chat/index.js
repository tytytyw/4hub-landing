import React, {useState} from "react";

import styles from "./Chat.module.sass";
import {ReactComponent as FolderIcon} from "../../../../assets/PrivateCabinet/play-grey.svg";
import {ReactComponent as ChatIcon} from "../../../../assets/PrivateCabinet/chat-2.svg";
import {ReactComponent as ContactsIcon} from "../../../../assets/PrivateCabinet/men.svg";
import {ReactComponent as SettingsIcon} from "../../../../assets/PrivateCabinet/gear-6.svg";
import {ReactComponent as PhoneIcon} from "../../../../assets/PrivateCabinet/phone-5.svg";
import {imageSrc} from '../../../../generalComponents/globalVariables';

import ContactList from "./ContactList";
import WorkSpace from "./WorkSpace";

const Chat = () => {

    const [boardOption, setBoardOption] = useState('contacts');
    const [search, setSearch] = useState('');

    return(
        <div className={styles.chatComponent}>
            <div className={styles.sideMenu}>
                <div className={styles.header}>
                    <div className={styles.headerName}>
                        <ChatIcon id={styles.headerIcon} />
                        <span>Чат</span>
                    </div>
                    <FolderIcon id={styles.headerArrow} />
                </div>
                <div className={styles.boardOptions}>
                    <ContactsIcon
                        className={`${styles.option} ${boardOption === 'contacts' ? styles.selected : ''}`}
                        onClick={() => setBoardOption('contacts')}
                    />
                    <PhoneIcon
                        className={`${styles.option} ${boardOption === 'calls' ? styles.selected : ''}`}
                        onClick={() => setBoardOption('calls')}
                    />
                    <ChatIcon
                        className={`${styles.option} ${boardOption === 'chats' ? styles.selected : ''}`}
                        onClick={() => setBoardOption('chats')}
                    />
                    <SettingsIcon
                        className={`${styles.option} ${boardOption === 'settings' ? styles.selected : ''}`}
                        onClick={() => setBoardOption('settings')}
                    />
                </div>
                <div className={styles.searchField}>
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
                <div className={styles.list}>
                    {boardOption === 'contacts' ? <ContactList search={search} /> : null}
                </div>
            </div>
            <WorkSpace />
        </div>
    )
}

export default Chat;