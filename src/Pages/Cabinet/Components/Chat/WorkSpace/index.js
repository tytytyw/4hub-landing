import React, {useRef, useState} from "react";

import styles from "./WorkSpace.module.sass";

import BottomPanel from "../../BottomPanel";
import ChatBoard from "../ChatBoard";
import EmojiArea from "../EmojiArea";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile";

const WorkSpace = ({selectedContact}) => {

    const [cursorPosition, setCursorPosition] = useState(0);
    const inputRef = useRef();
    const insertToInput = (value) => {
        if(inputRef.current) {
            inputRef.current.value = inputRef.current.value.slice(0, cursorPosition) + value + ' ' + inputRef.current.value.slice(cursorPosition);
            inputRef.current.focus();
            inputRef.current.selectionStart = cursorPosition + 3;
            inputRef.current.selectionEnd = cursorPosition + 3;
        }
    }

    return(
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
                <ChatBoard inputRef={inputRef} setCursorPosition={setCursorPosition} selectedContact={selectedContact} />
                <EmojiArea insertToInput={insertToInput} />
            </div>

            <BottomPanel />
        </div>
    )
}

export default WorkSpace;