import React, { useState, useEffect, useRef } from "react";

import styles from "./ChatBoard.module.sass";
import {ReactComponent as AddIcon} from "../../../../../assets/PrivateCabinet/add-2.svg";
import {ReactComponent as SmileIcon} from "../../../../../assets/PrivateCabinet/smile.svg";
import {ReactComponent as RadioIcon} from "../../../../../assets/PrivateCabinet/radio-3.svg";
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import EmojiArea from "../EmojiArea";
import ServePanel from "../ServePanel";
import { ReactComponent as AddFirstContactIcon } from "../../../../../assets/PrivateCabinet/addFirstContact.svg";
import {useSelector} from "react-redux";
import classNames from "classnames";
import InviteUser from './InviteUser'
import Message from './Message'

const ChatBoard = ({inputRef, setCursorPosition, selectedContact, insertToInput, sideMenuCollapsed, boardOption, setShowSuccessPopup}) => {
    const [rightPanel, setRightPanel] = useState('')
    const id_company = useSelector(state => state.user.id_company)
    const contactList = useSelector(state => id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList);

    const endMessagesRef = useRef();

    const [messages, setMessages] = useState([
        {text: 'Добрый день, задание срочное прошу не затягивать', type: 'outbox'},
        {text: 'большую коллекцию размеров outboxи форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков', type: 'inbox'},
    ])

    const renderMessages = () => {
        if (!messages?.length || !selectedContact) return null
        return (
            messages.map((msg, index) => {
                return (
                    <Message message={msg} selectedContact={selectedContact} key={index} />
                )
            })
        )
    }
    const addMessage = (text) => {
        const newMessage = {text, type: 'outbox'}
        if (text) setMessages(messages => [...messages, newMessage])
        setTimeout(() => {
            inputRef.current.value = '';
            inputRef.current.style.height = '25px'
        })
    }

    //TODO - Need to change after chat is developed
    const findCursorPosition = () => setCursorPosition(inputRef.current.selectionStart);

    const keyPress = (e) => {
        findCursorPosition()
        if (e.keyCode === 13 && !e.shiftKey) addMessage(inputRef.current.value)
    }

    const onTextAreaChange = (e) => {
        e.target.style.height = 'auto'
        e.target.style.height = e.target.value ? e.target.scrollHeight + 'px': '25px'
    }
    const scrollToBottom = () => {
        endMessagesRef?.current?.scrollIntoView()
    }
    useEffect(() => scrollToBottom, [messages, selectedContact])
    
    return (
        <div className={styles.chatBoardWrap}>

            <ServePanel selectedContact={selectedContact}></ServePanel>
            <main className={styles.chatBoardMessageList}>
                <div style={{width: rightPanel ? 'calc(100% - 200px)' : '100%'}} className={styles.chatArea}>
                    {contactList?.length === 0 && boardOption === 'contacts' ? <AddFirstContactIcon className={classNames({[styles.addFirstContactIcon]: true, [styles.collapsedMenu]: sideMenuCollapsed})} /> : ''}
                    {selectedContact?.is_user === 0 ? <InviteUser contact={selectedContact} setShowSuccessPopup={setShowSuccessPopup} /> : renderMessages()}
                    <div ref={endMessagesRef} />
                </div>
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
                    <textarea
                        ref={inputRef}
                        type="text"
                        placeholder="Введите текст сообщения"
                        className={styles.textInput}
                        onClick={findCursorPosition}
                        rows={1}
                        onKeyDown={keyPress}
                        onChange={onTextAreaChange}
                    />
                </div>
                <div className={styles.sendOptions}>
                    <div className={styles.button}><RadioIcon /></div>
                    <div className={`${styles.button} ${styles.triangle}`} />
                    <div className={styles.button} onClick={() => setRightPanel(state => state ==='emo' ? '' : 'emo')} ><SmileIcon /></div>
                </div>
            </footer>
        </div>
    )
}

export default ChatBoard;