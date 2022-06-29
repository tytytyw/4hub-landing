import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./WorkSpace.module.sass";
import CreateChat from "../CreateChat";
import BottomPanel from "../../BottomPanel";
import ChatBoard from "../ChatBoard";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile/Profile";
import { addNewChatMessage } from "../../../../../Store/actions/CabinetActions";
import DeleteMessage from "../../ContextMenuComponents/ContexMenuChat/DeleteMessage";
import CreateCameraMedia from "../CreateCameraMedia";
import SelectFile from "../SelectFile";
import Settings from "../Settings";
import PropTypes from "prop-types";
import { onEditChatMessage, onDeleteChatMessage } from "../../../../../Store/actions/CabinetActions";
import classNames from "classnames";
import { actionProps } from "../../../../../types/Action";
import { fileChatProps } from "types/File";

const WorkSpace = ({
  sideMenuCollapsed,
  boardOption,
  setShowSuccessPopup,
  nullifyAction,
  action,
  currentDate,
  setAction,
  setMouseParams,
  file,
  setFile,
  showSettings,
  setShowSettings
}) => {
  const [socket, setSocket] = useState(null);
  const [socketReconnect, setSocketReconnect] = useState(true);
  const uid = useSelector((state) => state.user.uid);
  const userId = useSelector((state) => state.Cabinet.chat.userId);
  const id_company = useSelector((state) => state.user.id_company);
  const endMessagesRef = useRef();
  const dispatch = useDispatch();
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const [attachedFiles, setAttachedFiles] = useState(null);
  const selectedContact = useSelector((state) => state.Cabinet.chat.selectedContact);
  const messageLifeTime = useSelector((state) => state.Cabinet.chat.messageLifeTime);

  const scrollToBottom = () => {
    endMessagesRef?.current?.scrollIntoView();
  };

  // webSockets
  const onConnectOpen = () => {
    console.log(`Socket connection for user ${uid} opened`);
    socket.send(JSON.stringify({ action: "uid", uid }));
  };

  const onWebSocketsMessage = (e) => {
    const data = JSON.parse(e.data);

    const isForGroups = data.is_group && selectedContact?.isGroup;
    const isForSecretChat = data.is_secret_chat && selectedContact?.is_secret_chat;
    const isForChats = !data.is_group && !selectedContact?.isGroup;
    const isForSelectedGroup = isForGroups && data.id_group === selectedContact?.id;
    const isForSelectedChat = isForChats && (data.id_contact === selectedContact?.id || data.id_user_to === userId);
    // && data.api.id_user === selectedContact?.id_real_user
    const isForSelectedSecretChat = isForSecretChat && data.id_group === selectedContact?.id;

    if (data.action === "Ping") socket.send(JSON.stringify({ action: "Pong" }));
    // PrivateMessage - direct message; PublicMessage- message from group
    if (data.action === "PrivateMessage" || data.action === "PublicMessage") {
      const newMsg = {
        id: data.api?.id_message,
        id_user: data.api?.id_user,
        id_user_to: data.api?.id_user_to,
        text: data.text,
        ut: data.api?.ut_message,
        isNewMessage: true,
        attachment: data.attachment
      };

      if (isForGroups) {
        dispatch({
          type: "NEW_LAST_GROUP_MESSAGE",
          payload: { id_group: data.id_group, text: data.text }
        });
      }
      if (isForSelectedGroup || isForSelectedChat || isForSelectedSecretChat) {
        dispatch(addNewChatMessage(newMsg));
      } else {
        console.log("new message from dont selectedContact");

        if (data.id_group && !isForSelectedGroup) {
          dispatch({
            type: "INCREASE_NOTIFICATION_COUNTER",
            payload: `group_${data.id_group}`
          });
        }
        if (!data.id_group && !isForSelectedChat) {
          dispatch({
            type: "INCREASE_NOTIFICATION_COUNTER",
            payload: `chat_${data.api.id_user}`
          });
        }
      }
    }
    if (
      (data.action === "chat_group_message_edit" || data.action === "chat_message_edit") &&
      (isForSelectedGroup || isForSelectedSecretChat || isForSelectedChat)
    ) {
      dispatch(
        onEditChatMessage({ attachment: data.attachment, text: data.text }, { id: data.id_message, day: data.day })
      );
    }
    if (
      (data.action === "chat_group_message_del" || data.action === "chat_message_del") &&
      (isForSelectedChat || isForSelectedGroup || isForSelectedSecretChat)
    ) {
      dispatch(onDeleteChatMessage({ id: data.id_message, day: data.day }));
    }
  };

  const onConnectClose = (e) => {
    console.log("connection closed", e);
    setSocketReconnect(true);
  };

  const addMessage = (text, file) => {
    if ((text || file || attachedFiles?.length) && socket) {
      const attachment = file ? [file] : attachedFiles?.length ? [...attachedFiles] : undefined;
      const sendMessage = (params) => {
        socket.send(JSON.stringify({ ...params, uid, id_company, text, attachment }));
      };
      if (attachedFiles?.length) setAttachedFiles(null);
      sendMessage(
        selectedContact?.isGroup
          ? {
              action: "chat_group_message_add",
              id_group: selectedContact?.id_group,
              is_group: true
            }
          : selectedContact.is_secret_chat
          ? {
              action: "chat_group_message_add",
              id_group: selectedContact?.id_group,
              is_secret_chat: true,
              deadline: messageLifeTime
            }
          : {
              action: "chat_message_send",
              id_user_to: selectedContact?.id_real_user,
              id_contact: selectedContact?.id
            }
      );
    }
  };

  const editMessage = (message, newText) => {
    // TODO: add attachment deleting
    if (newText && newText !== action.message.text) {
      const sendSocketMessage = (params) => {
        socket.send(
          JSON.stringify({
            ...params,
            attachment: message.attachment,
            uid,
            id_message: message.id,
            text: newText,
            day: message.day
          })
        );
      };

      sendSocketMessage(
        message.id_group
          ? {
              action: "chat_group_message_edit",
              id_group: message.id_group,
              is_group: true,
              is_secret_chat: !!selectedContact.is_secret_chat
            }
          : {
              action: "chat_message_edit",
              id_user_to: selectedContact?.id_real_user,
              id_contact: selectedContact?.id
            }
      );
    }
  };

  const deleteMessage = (message) => {
    const sendSocketMessage = (params) => {
      socket.send(
        JSON.stringify({
          ...params,
          uid,
          id_message: message.id,
          day: message.day
        })
      );
    };

    sendSocketMessage(
      message.id_group
        ? {
            action: "chat_group_message_del",
            id_group: message.id_group,
            is_group: true,
            is_secret_chat: !!selectedContact.is_secret_chat
          }
        : {
            action: "chat_message_del",
            id_user_to: selectedContact?.id_real_user,
            id_contact: selectedContact?.id
          }
    );
  };

  const renderCreateCameraMedia = useCallback(
    () => (
      <CreateCameraMedia
        nullifyAction={nullifyAction}
        addMessage={addMessage}
        socket={socket}
        scrollToBottom={scrollToBottom}
      />
    ),
    [action] // eslint-disable-line
  );

  useEffect(() => {
    if (socketReconnect) {
      setSocketReconnect(false);
      setSocket(new WebSocket("wss://fs2.mh.net.ua/ws/"));
    }
    return () => socket?.close();
  }, [socketReconnect]); //eslint-disable-line

  useEffect(() => {
    //TODO: move to Store
    if (selectedContact)
      dispatch({
        type: "SET_NOTIFICATION_COUNTER",
        payload: {
          id:
            selectedContact?.isGroup || selectedContact?.is_secret_chat
              ? `group_${selectedContact?.id_group}`
              : `chat_${selectedContact?.id_real_user}`,
          value: 0
        }
      });

    if (socket) {
      socket.addEventListener("open", onConnectOpen);
      socket.addEventListener("close", onConnectClose);
      socket.addEventListener("message", onWebSocketsMessage);
    }
    return () => {
      socket?.removeEventListener("message", onWebSocketsMessage);
      socket?.removeEventListener("open", onConnectOpen);
      socket?.removeEventListener("close", onConnectClose);
    };
  }, [socket, selectedContact]); //eslint-disable-line

  return (
    <div
      className={classNames({
        [styles.chatWorkSpaceWrap]: true,
        [styles.darkTheme]: chatTheme.name === "dark"
      })}
    >
      <div className={styles.header}>
        <SearchField chatTheme={chatTheme.name} />
        <div className={styles.infoHeader}>
          <StorageSize />
          <Notifications />
          <Profile theme={chatTheme.name} />
        </div>
      </div>
      {showSettings && <Settings close={() => setShowSettings(false)} />}
      <div className={styles.main} style={showSettings ? { height: "calc(100% - 179px - 90px)" } : {}}>
        {selectedContact && action.type !== "addChat" && action.type !== "editChatGroup" ? (
          <ChatBoard
            sideMenuCollapsed={sideMenuCollapsed}
            boardOption={boardOption}
            setShowSuccessPopup={setShowSuccessPopup}
            action={action}
            setAction={setAction}
            setMouseParams={setMouseParams}
            currentDate={currentDate}
            addMessage={addMessage}
            nullifyAction={nullifyAction}
            file={file}
            setFile={setFile}
            socket={socket}
            endMessagesRef={endMessagesRef}
            scrollToBottom={scrollToBottom}
            editMessage={editMessage}
            showSettings={showSettings}
            attachedFiles={attachedFiles}
            setAttachedFiles={setAttachedFiles}
          />
        ) : (
          ""
        )}
        {action.type === "addChat" ? (
          <CreateChat
            title={action.name}
            maxCountUsers={action?.chatsType === "groups" ? 200 : 1}
            nullifyAction={nullifyAction}
            setShowSuccessPopup={setShowSuccessPopup}
            componentType={"add"}
            currentDate={currentDate}
            initialUser={action.initialUser}
          />
        ) : (
          ""
        )}
        {action.type === "editChatGroup" ? (
          <CreateChat
            title={action.name}
            maxCountUsers={200}
            nullifyAction={nullifyAction}
            setShowSuccessPopup={setShowSuccessPopup}
            selectedContact={selectedContact}
            componentType={"edit"}
            currentDate={currentDate}
          />
        ) : (
          ""
        )}
        {action.type === "deleteMessage" ? (
          <DeleteMessage
            set={nullifyAction}
            message={action.message}
            nullifyAction={nullifyAction}
            deleteMessage={deleteMessage}
          ></DeleteMessage>
        ) : null}
      </div>
      {action?.type === "createMediaFromCamera" ? renderCreateCameraMedia() : ""}
      {action?.type === "selectFile" ? (
        <SelectFile nullifyAction={nullifyAction} attachedFiles={attachedFiles} setAttachedFiles={setAttachedFiles} />
      ) : (
        ""
      )}

      <BottomPanel />
    </div>
  );
};

export default WorkSpace;

WorkSpace.propTypes = {
  sideMenuCollapsed: PropTypes.bool,
  boardOption: PropTypes.string,
  setShowSuccessPopup: PropTypes.func.isRequired,
  nullifyAction: PropTypes.func.isRequired,
  action: actionProps,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  setAction: PropTypes.func.isRequired,
  setMouseParams: PropTypes.func.isRequired,
  file: fileChatProps,
  setFile: PropTypes.func.isRequired,
  showSettings: PropTypes.bool,
  setShowSettings: PropTypes.func.isRequired
};
