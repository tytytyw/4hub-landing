import React, { useState, useEffect, useRef } from "react";

import styles from "./ChatBoard.module.sass";
import {ReactComponent as AddIcon} from "../../../../../assets/PrivateCabinet/add-2.svg";
import {ReactComponent as SmileIcon} from "../../../../../assets/PrivateCabinet/smile.svg";
import {ReactComponent as RadioIcon} from "../../../../../assets/PrivateCabinet/radio-3.svg";
import {ReactComponent as PlayIcon} from "../../../../../assets/PrivateCabinet/play-grey.svg";
import {ReactComponent as SendIcon} from "../../../../../assets/PrivateCabinet/send.svg";
import EmojiArea from "../EmojiArea";
import ServePanel from "../ServePanel";
import { ReactComponent as AddFirstContactIcon } from "../../../../../assets/PrivateCabinet/addFirstContact.svg";
import {useSelector} from "react-redux";
import classNames from "classnames";
import InviteUser from './InviteUser'
import Message from './Message'

const ChatBoard = ({inputRef, setCursorPosition, insertToInput, sideMenuCollapsed, boardOption, setShowSuccessPopup, setAction}) => {
    const [rightPanel, setRightPanel] = useState('')
    const id_company = useSelector(state => state.user.id_company)
    const contactList = useSelector(state => id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList);
    const selectedContact = useSelector((state) => state.Cabinet.chat.selectedContact);
    const userId = useSelector((state) => state.Cabinet.chat.userId);
    const endMessagesRef = useRef();

    const [textAreaValue, setTextAreaValue] = useState('')
    const [messages, setMessages] = useState(selectedContact.messages || [])

    const renderMessages = (messages) => {
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
        const newMessage = {text, id_user: userId}
        if (text) setMessages(messages => [...messages, newMessage])
        setTimeout(() => {
            setTextAreaValue('')
            inputRef.current.style.height = '25px'
        })
    }

    //TODO - Need to change after chat is developed
    const findCursorPosition = () => setCursorPosition(inputRef.current.selectionStart);

    const keyPress = (e) => {
        findCursorPosition()
        if (e.keyCode === 13 && !e.shiftKey) addMessage(textAreaValue)
    }

    const onTextAreaChange = (e) => {
        setTextAreaValue(e.target.value)
        e.target.style.height = 'auto'
        e.target.style.height = e.target.value ? e.target.scrollHeight + 'px': '25px'
    }
    const scrollToBottom = () => {
        endMessagesRef?.current?.scrollIntoView()
    }
    useEffect(() => scrollToBottom, [messages, selectedContact])

    //TODO connect to webSockets
    // const socket = new WebSocket("wss://fs2.mh.net.ua/ws/")
    // socket.onopen = function(e) {
    //     console.log(e)
    //     alert("[open] is connect");
    //     };
    // socket.onmessage = function(e) {
    //     console.log(`[message] ${e.data}`);
    // };
    // socket.close();

    useEffect(() => setMessages(selectedContact?.messages ?? []), [selectedContact])

    return (
        <div className={styles.chatBoardWrap}>

            {selectedContact ? <ServePanel selectedContact={selectedContact} setAction={setAction} /> : ''}
            <main className={styles.chatBoardMessageList}>
                <div style={{width: rightPanel ? 'calc(100% - 200px)' : '100%'}} className={styles.chatArea}>
                    {contactList?.length === 0 && boardOption === 'contacts' ? <AddFirstContactIcon className={classNames({[styles.addFirstContactIcon]: true, [styles.collapsedMenu]: sideMenuCollapsed})} /> : ''}
                    {selectedContact?.is_user === 0 ? <InviteUser contact={selectedContact} setShowSuccessPopup={setShowSuccessPopup} /> : renderMessages(messages)}
                    <div ref={endMessagesRef} />
                </div>
                <div className={styles.rightPanel}>
                    {rightPanel === 'emo' ? <EmojiArea insertToInput={insertToInput} /> : null}
                </div>
            </main>
            <footer className={styles.chatBoardFooter}>
                <div className={styles.downloadOptions}>
                    <AddIcon title='Вставить файл' />
                </div>
                <div className={styles.textMessage}>
                    <textarea
                        ref={inputRef}
                        type="text"
                        placeholder="Введите текст сообщения"
                        className={styles.textInput}
                        onClick={findCursorPosition}
                        rows={1}
                        onKeyDown={keyPress}
                        onChange={onTextAreaChange}
                        value={textAreaValue}

                    />
                    <SendIcon className={classNames({[styles.messageImg]: true, [styles.active]: textAreaValue.length})} onClick={() => addMessage(textAreaValue)} />
                </div>
                <div className={styles.sendOptions}>
                    <div title='Аудио сообщение' className={styles.button}><RadioIcon title='' /></div>
                    <div title='Видео сообщение' className={styles.button}><PlayIcon title='' className={styles.triangle} /></div>
                    <div title='Смайлики' className={styles.button} onClick={() => setRightPanel(state => state ==='emo' ? '' : 'emo')} ><SmileIcon title='' /></div>
                </div>
            </footer>
        </div>
    )
}

export default ChatBoard;