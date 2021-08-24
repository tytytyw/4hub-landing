import React, {useEffect, useState} from "react";

import styles from "./WorkSpace.module.sass";
import {ReactComponent as FolderIcon} from "../../../../../assets/PrivateCabinet/play-grey.svg";
import {ReactComponent as ChatIcon} from "../../../../../assets/PrivateCabinet/chat-2.svg";
import {ReactComponent as ContactsIcon} from "../../../../../assets/PrivateCabinet/men.svg";
import {ReactComponent as SettingsIcon} from "../../../../../assets/PrivateCabinet/gear-6.svg";
import ContactList from "../ContactList";
import BottomPanel from "../../BottomPanel";

const WorkSpace = () => {

    const [boardOption, setBoardOption] = useState('chats');

    return(
        <div className={styles.chatWorkSpaceWrap}>
            <div className={styles.contactsBoard}>
                <div className={styles.header}>
                    <div className={styles.headerName}>
                        <ChatIcon id={styles.headerArrow} />
                        <span>Чат</span>
                    </div>
                    <FolderIcon id={styles.headerArrow} />
                </div>
                <div className={styles.boardOptions}>
                    <ChatIcon
                        className={`${styles.option} ${boardOption === 'chats' ? styles.selected : ''}`}
                        onClick={() => setBoardOption('chats')}
                    />
                    <ContactsIcon
                        className={`${styles.option} ${boardOption === 'contacts' ? styles.selected : ''}`}
                        onClick={() => setBoardOption('contacts')}
                    />
                    <SettingsIcon
                        className={`${styles.option} ${boardOption === 'settings' ? styles.selected : ''}`}
                        onClick={() => setBoardOption('settings')}
                    />
                </div>
                <div className={styles.searchField}>
                    <input placeholder='Введите имя пользователя' type='text'/>
                    <img src='./assets/PrivateCabinet/magnifying-glass-2.svg' alt='search' className={styles.searchGlass} />
                </div>
            </div>
            <div className={styles.list}>
                <ContactList />
            </div>
            <BottomPanel />
        </div>
    )
}

export default WorkSpace;