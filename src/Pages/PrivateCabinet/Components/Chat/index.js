import React from "react";

import styles from "./Chat.module.sass";
import SearchField from "../SearchField";
import StorageSize from "../StorageSize";
import Notifications from "../Notifications";
import Profile from "../Profile";
import WorkSpace from "./WorkSpace";

const Chat = () => {

    return(
        <div className={styles.chatComponent}>
            <div className={styles.header}>
                <SearchField />
                <div className={styles.infoHeader}>
                    <StorageSize />
                    <Notifications />
                    <Profile />
                </div>
            </div>
            <WorkSpace />
        </div>
    )
}

export default Chat;