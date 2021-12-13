import React, { useState } from "react";

import styles from "./ChatBoard.module.sass";
import {ReactComponent as AddContactIcon} from "../../../../../assets/PrivateCabinet/addContact.svg";
import {ReactComponent as PhoneIcon} from "../../../../../assets/PrivateCabinet/phone-5.svg";
import {ReactComponent as CameraIcon} from "../../../../../assets/PrivateCabinet/film.svg";
import {ReactComponent as InfoIcon} from "../../../../../assets/PrivateCabinet/info-2.svg";
import {ReactComponent as AddIcon} from "../../../../../assets/PrivateCabinet/add-2.svg";
import {ReactComponent as SmileIcon} from "../../../../../assets/PrivateCabinet/smile.svg";
import {ReactComponent as RadioIcon} from "../../../../../assets/PrivateCabinet/radio-3.svg";
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import EmojiArea from "../EmojiArea";


const ChatBoard = ({inputRef, setCursorPosition, selectedContact, insertToInput}) => {
    const [rightPanel, setRightPanel] = useState('')

    //TODO - Need to change after chat is developed

    const findCursorPosition = () => setCursorPosition(inputRef.current.selectionStart);

    return (
        <div className={styles.chatBoardWrap}>
            <header className={styles.chatBoardHeader}>
                {selectedContact ? <div className={styles.groupName}>
                    <img src={selectedContact?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`} alt="img" className={styles.avatar} />
                    <div className={styles.info}>
                        <div className={styles.name}>{`${selectedContact?.sname} ${selectedContact?.name}`}</div>
                        <div className={styles.status}>в сети 29 мин. назад</div>
                    </div>
                </div> : null}
                {selectedContact ? <div className={styles.headerOptions}>
                    <AddContactIcon className={styles.icon} />
                    <PhoneIcon className={styles.icon} />
                    <CameraIcon className={styles.icon} />
                    <InfoIcon className={styles.icon} />
                </div> : null}
            </header>
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