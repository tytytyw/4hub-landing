import React from "react";
import {useSelector} from "react-redux";

import styles from "./ChatBoard.module.sass";
import {ReactComponent as AddContactIcon} from "../../../../../assets/PrivateCabinet/addContact.svg";
import {ReactComponent as PhoneIcon} from "../../../../../assets/PrivateCabinet/phone-5.svg";
import {ReactComponent as CameraIcon} from "../../../../../assets/PrivateCabinet/film.svg";
import {ReactComponent as InfoIcon} from "../../../../../assets/PrivateCabinet/info-2.svg";
import {ReactComponent as AddIcon} from "../../../../../assets/PrivateCabinet/add-2.svg";
import {ReactComponent as FileIcon} from "../../../../../assets/PrivateCabinet/file-4.svg";
import {ReactComponent as PictureIcon} from "../../../../../assets/PrivateCabinet/photo-5.svg";
import {ReactComponent as RadioIcon} from "../../../../../assets/PrivateCabinet/radio-3.svg";
import {imageSrc} from '../../../../../generalComponents/globalVariables';

const ChatBoard = ({inputRef, setCursorPosition}) => {

    //TODO - Need to change after chat is developed
    const contactList = useSelector(state => state.Cabinet.contactList)

    const findCursorPosition = () => setCursorPosition(inputRef.current.selectionStart);

    return (
        <div className={styles.chatBoardWrap}>
            <header className={styles.chatBoardHeader}>
                {contactList?.length > 0 ? <div className={styles.groupName}>
                    <img src={contactList?.[0]?.icon?.[0]} alt="img" className={styles.avatar} />
                    <div className={styles.info}>
                        <div className={styles.name}>{`${contactList?.[0]?.sname} ${contactList?.[0]?.name}`}</div>
                        <div className={styles.status}>в сети 29 мин. назад</div>
                    </div>
                </div> : null}
                <div className={styles.headerOptions}>
                    <AddContactIcon className={styles.icon} />
                    <PhoneIcon className={styles.icon} />
                    <CameraIcon className={styles.icon} />
                    <InfoIcon className={styles.icon} />
                </div>
            </header>
            <main className={styles.chatBoardMessageList}>

            </main>
            <footer className={styles.chatBoardFooter}>
                <div className={styles.downloadOptions}>
                    <AddIcon />
                    <FileIcon />
                    <PictureIcon />
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
                </div>
            </footer>
        </div>
    )
}

export default ChatBoard;