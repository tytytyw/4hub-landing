import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import styles from "./ChatBoard.module.sass";

import EmojiArea from "../EmojiArea";
import ServePanel from "../ServePanel";
import SecretChatStartWallpaper from "./SecretChatStartWallpaper";
import { ReactComponent as AddFirstContactIcon } from "../../../../../assets/PrivateCabinet/addFirstContact.svg";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import InviteUser from "./InviteUser";
import Message from "./Message";
import InfoPanel from "./InfoPanel";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import VideoRecordPreview from "./VideoRecordPreview";
import { useDateToString } from "../../../../../generalComponents/CalendarHelper";
import { useScrollElementOnScreen } from "../../../../../generalComponents/Hooks";
import { onGetChatMessages } from "../../../../../Store/actions/CabinetActions";
import ChatBoardFooter from "./ChatBoardFooter";
import FileMessage from "./Message/FileMessage";
import PropTypes from "prop-types";
import { actionProps } from "../../../../../types/Action";
import { socketProps } from "../../../../../types/Socket";
import { fileProps } from "types/File";
import { useLocales } from "react-localized";
import { onSetModals } from "../../../../../Store/actions/CabinetActions";

const ChatBoard = ({
  sideMenuCollapsed,
  boardOption,
  setShowSuccessPopup,
  action,
  setAction,
  setMouseParams,
  currentDate,
  addMessage,
  nullifyAction,
  file,
  setFile,
  socket,
  endMessagesRef,
  scrollToBottom,
  editMessage,
  showSettings,
  attachedFiles,
  setAttachedFiles
}) => {
  const dateToString = useDateToString();
  const [rightPanelContentType, setRightPanelContentType] = useState("");
  const id_company = useSelector((state) => state.user.id_company);
  const contactList = useSelector((state) =>
    id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
  );
  const selectedContact = useSelector((state) => state.Cabinet.chat.selectedContact);

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [ducationTimer, setDucationTimer] = useState(0);
  const chatArea = useRef();
  const footerRef = useRef();
  const videoMessagePreview = useRef();
  const [videoPreview, setVideoPreview] = useState(null);
  const [messagesPage, setMessagesPage] = useState(1);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [chatBoardOldHeight, setChatBoardOldHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const search = useSelector((state) => state.Cabinet.search);
  const dispatch = useDispatch();
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const messages = useSelector((state) => state.Cabinet.chat.messages);
  const { __ } = useLocales();

  const renderMessages = (day) => {
    const messagesOfDay = [...messages[day]].reverse();
    return messagesOfDay.map((msg) => {
      if (!msg.id_user || !msg.id || !msg.id_user || !msg.id_user_to) {
        dispatch(
          onSetModals("topMessage", {
            open: true,
            type: "error",
            message: __("Ошибка загрузки сообщения")
          })
        );
        return null;
      }
      return (
        <Message
          message={{ ...msg, day }}
          selectedContact={selectedContact}
          key={`id:${msg.id} ut:${msg.ut}`}
          currentDate={currentDate}
          setMouseParams={setMouseParams}
        />
      );
    });
  };
  const renderGroups = useCallback(() => {
    if (selectedContact?.is_secret_chat && (messages === null || (messages && Object.keys(messages)?.length === 0)))
      return (
        <SecretChatStartWallpaper>
          {messages === null ? (
            <Loader
              type="bounceDots"
              position="static"
              background="transparent"
              zIndex={5}
              width="100px"
              height="100px"
              containerType="bounceDots"
            />
          ) : (
            ""
          )}
        </SecretChatStartWallpaper>
      );

    if (typeof messages !== "object" || !messages)
      return (
        <Loader
          type="bounceDots"
          position="absolute"
          background="white"
          zIndex={5}
          width="100px"
          height="100px"
          containerType="bounceDots"
        />
      );
    const days = Object.keys(messages).reverse();
    return days.map((day) =>
      messages[day]?.length && selectedContact ? (
        <div className={styles.dateGroup} key={day}>
          <div className={styles.date}>
            <span className={styles.text}>{dateToString(day)}</span>
          </div>
          {renderMessages(day)}
        </div>
      ) : null
    );
    // eslint-disable-next-line
  }, [messages, currentDate, selectedContact]);

  const onSuccessLoading = (result) => {
    if (typeof result === "object") {
      let moreElements = false;
      for (let key in result) {
        if (result[key].length > 0) moreElements = true;
      }
      setTimeout(() => {
        moreElements ? setMessagesPage((filesPage) => filesPage + 1) : setMessagesPage(0);
        setLoadingMessages(false);
      }, 500);
    } else {
      setTimeout(() => {
        setMessagesPage(0);
        setLoadingMessages(false);
      }, 500);
    }
  };
  const load = (entry) => {
    if (entry.isIntersecting && !loadingMessages && messagesPage !== 0) {
      setChatBoardOldHeight(chatArea.current.scrollHeight);

      setLoadingMessages(true);
      dispatch(onGetChatMessages(selectedContact, search, messagesPage, onSuccessLoading));
    }
  };
  const options = { root: null, rootMargin: "0px", threshold: 0 };
  const [startMessagesRef, isVisible] = useScrollElementOnScreen(options, load);

  const recordCancel = () => {
    if (mediaRecorder) {
      const cleareTracks = () => mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      mediaRecorder?.state === "active" && recordEnd();
      mediaRecorder && cleareTracks();
      setMediaRecorder(null);
      setVideoPreview(null);
    }
    setIsRecording(false);
  };
  const mouseUpHandler = (e) => {
    //for recording
    const mouseUpOnFooter = footerRef?.current?.offsetTop + 90 < e.pageY;
    mouseUpOnFooter && ducationTimer > 1 ? recordEnd() : recordCancel();
  };
  const recordEnd = () => {
    mediaRecorder?.stop();
  };
  const removeAttachedFile = (fid) => setAttachedFiles((prevFiles) => prevFiles.filter((file) => file.fid !== fid));

  const renderAttachedFiles = () => {
    return attachedFiles.map((file) => (
      <div className={styles.attachedFileWrap} key={file.fid}>
        <FileMessage file={file} size={"small"} style={{ margin: 0 }} />
        <div className={styles.remove} onClick={() => removeAttachedFile(file.fid)}></div>
      </div>
    ));
  };

  useEffect(() => {
    if (isRecording) {
      const timer = setInterval(() => {
        setDucationTimer((sec) => sec + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
        setDucationTimer(0);
      };
    }
  }, [isRecording]);

  useLayoutEffect(() => {
    if (chatBoardOldHeight && messagesPage && chatArea.current.scrollHeight - chatBoardOldHeight && isVisible) {
      chatArea?.current?.scrollTo(0, chatArea.current.scrollHeight - chatBoardOldHeight);
    }
    if (scrollPosition < 10) scrollToBottom();

    // eslint-disable-next-line
  }, [messages]);

  useEffect(() => {
    setMessagesPage(1);
  }, [selectedContact]);

  const onChatBoardScroll = (e) => {
    setScrollPosition(e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop);
  };

  return (
    <div
      className={classNames({
        [styles.chatBoardWrap]: true,
        [styles.recoring]: isRecording,
        [styles.darkTheme]: chatTheme.name === "dark"
      })}
      onMouseLeave={recordCancel}
      onMouseUp={mouseUpHandler}
    >
      {selectedContact && !showSettings ? (
        <ServePanel
          selectedContact={selectedContact}
          setAction={setAction}
          setRightPanelContentType={setRightPanelContentType}
        />
      ) : (
        ""
      )}
      <main className={styles.chatBoardMessageList}>
        <div
          className={classNames({
            [styles.chatAreaWrapper]: true,
            [styles.center]:
              selectedContact?.is_secret_chat && (!messages || (messages && Object.keys(messages).length === 0))
          })}
          style={{
            width: rightPanelContentType ? "calc(100% - 200px)" : "100%"
          }}
        >
          <div className={styles.chatArea} ref={chatArea} onScroll={onChatBoardScroll}>
            <div
              className={classNames({
                [styles.bottomLine]: true,
                [styles.bottomLineHidden]: messagesPage === 0
              })}
              ref={startMessagesRef}
            >
              {messagesPage !== 1 ? (
                <Loader
                  type="bounceDots"
                  position="absolute"
                  background="transparent"
                  zIndex={5}
                  width="100px"
                  height="100px"
                  containerType="bounceDots"
                />
              ) : (
                ""
              )}
            </div>
            {contactList?.length === 0 && boardOption === "contacts" ? (
              <AddFirstContactIcon
                className={classNames({
                  [styles.addFirstContactIcon]: true,
                  [styles.collapsedMenu]: sideMenuCollapsed
                })}
              />
            ) : (
              ""
            )}
            {selectedContact?.is_user === 0 ? (
              <InviteUser contact={selectedContact} setShowSuccessPopup={setShowSuccessPopup} />
            ) : (
              renderGroups()
            )}
            <div ref={endMessagesRef} />
          </div>
          {action?.type === "editMessage" ? (
            <div
              className={styles.editingMessage}
              style={{
                width: rightPanelContentType ? "calc(100% - 65px)" : "calc(100% - 200px - 65px)"
              }}
            >
              <div className={styles.line}></div>
              <p className={styles.text}>{action.message.text}</p>
              <div className={styles.close} onClick={nullifyAction} />
            </div>
          ) : (
            ""
          )}
          {Array.isArray(attachedFiles) && attachedFiles.length && !action?.type ? (
            <div
              className={styles.attachedFiles}
              style={{
                width: rightPanelContentType ? "calc(100% - 65px)" : "calc(100% - 200px - 65px)"
              }}
            >
              {renderAttachedFiles()}
              <div className={styles.close} onClick={() => setAttachedFiles(null)} />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.rightPanelContentType}>
          {rightPanelContentType === "emo" ? <EmojiArea /> : null}
          {rightPanelContentType === "info" ? <InfoPanel setAction={setAction} /> : null}
        </div>
      </main>
      {!showSettings && (
        <ChatBoardFooter
          footerRef={footerRef}
          isRecording={isRecording}
          ducationTimer={ducationTimer}
          addMessage={addMessage}
          action={action}
          setMouseParams={setMouseParams}
          nullifyAction={nullifyAction}
          setRightPanelContentType={setRightPanelContentType}
          setIsRecording={setIsRecording}
          mediaRecorder={mediaRecorder}
          setMediaRecorder={setMediaRecorder}
          setVideoPreview={setVideoPreview}
          videoMessagePreview={videoMessagePreview}
          recordCancel={recordCancel}
          file={file}
          setFile={setFile}
          scrollToBottom={scrollToBottom}
          socket={socket}
          editMessage={editMessage}
          attachedFiles={attachedFiles}
        />
      )}

      {videoPreview ? (
        <VideoRecordPreview
          isVideoMessage={videoMessagePreview}
          ducationTimer={ducationTimer}
          timeLimit={60 * 10}
          recordEnd={recordEnd}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ChatBoard;

ChatBoard.propTypes = {
  sideMenuCollapsed: PropTypes.bool,
  boardOption: PropTypes.string,
  setShowSuccessPopup: PropTypes.func.isRequired,
  action: actionProps,
  setAction: PropTypes.func.isRequired,
  setMouseParams: PropTypes.func.isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  addMessage: PropTypes.func.isRequired,
  nullifyAction: PropTypes.func.isRequired,
  file: fileProps,
  setFile: PropTypes.func.isRequired,
  socket: socketProps,
  endMessagesRef: PropTypes.exact({ current: PropTypes.instanceOf(Element) }),
  scrollToBottom: PropTypes.func.isRequired,
  editMessage: PropTypes.func.isRequired,
  showSettings: PropTypes.bool,
  attachedFiles: PropTypes.arrayOf(fileProps),
  setAttachedFiles: PropTypes.func
};
