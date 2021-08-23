import React from "react";

import styles from "./Chat.module.sass";
import SearchField from "../SearchField";
import StorageSize from "../StorageSize";
import Notifications from "../Notifications";
import Profile from "../Profile";

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

        </div>
    )
}

export default Chat;