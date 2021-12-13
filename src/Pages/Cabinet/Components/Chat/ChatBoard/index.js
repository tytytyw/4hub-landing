import React, { useState } from "react";

import styles from "./ChatBoard.module.sass";
import {ReactComponent as AddIcon} from "../../../../../assets/PrivateCabinet/add-2.svg";
import {ReactComponent as SmileIcon} from "../../../../../assets/PrivateCabinet/smile.svg";
import {ReactComponent as RadioIcon} from "../../../../../assets/PrivateCabinet/radio-3.svg";
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import EmojiArea from "../EmojiArea";
import ServePanel from "../ServePanel";


const ChatBoard = ({inputRef, setCursorPosition, selectedContact, insertToInput}) => {
    const [rightPanel, setRightPanel] = useState('')

    //TODO - Need to change after chat is developed

    const findCursorPosition = () => setCursorPosition(inputRef.current.selectionStart);

    return (
        <div className={styles.chatBoardWrap}>

            <ServePanel selectedContact={selectedContact}></ServePanel>
            <main className={styles.chatBoardMessageList}>
                <div className={styles.chatArea}></div>
                <div className={styles.rightPanel}>
                    {rightPanel === 'emo' ? <EmojiArea insertToInput={insertToInput} /> : null}
                </div>
            </main>
            <footer className={styles.chatBoardFooter}>
                <div className={styles.downloadOptions}>
                    <AddIcon />
                </div>
                <div className={styles.textMessage}>
                    <img src={imageSrc + "assets/PrivateCabinet/send.svg"} alt="img" className={styles.messageImg} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Введите текст сообщения"
                        className={styles.textInput}
                        onClick={findCursorPosition}
                        onChange={findCursorPosition}
                    />
                </div>
                <div className={styles.sendOptions}>
                    <div className={styles.button}><RadioIcon /></div>
                    <div className={`${styles.button} ${styles.triangle}`}/>
                    <div className={styles.button} onClick={() => setRightPanel(state => state ==='emo' ? '' : 'emo')} ><SmileIcon /></div>
                </div>
            </footer>
        </div>
    )
}

export default ChatBoard;