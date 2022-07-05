import classNames from "classnames";
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Message.module.sass";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useMessageTime } from "../../../../../../generalComponents/chatHelper";
import VideoMessagePlayer from "./VideoMessagePlayer";
import VoiceMessagePlayer from "./VoiceMessagePlayer";
import FileMessage from "./FileMessage";
import VideoPlayer from "../../CreateCameraMedia/VideoPlayer";
import PropTypes from "prop-types";
import { messageProps, selectedContactProps } from "types/Chat";
import { imageFormats, calcImageSize } from "../../../../../../generalComponents/chatHelper";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { useScrollElementOnScreen } from "../../../../../../generalComponents/Hooks";

function Message({ message, selectedContact, currentDate, setMouseParams, contextMenuList, setIsReadMessage }) {
  const messageTime = useMessageTime();
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const userId = useSelector((state) => state.Cabinet.chat.userId);
  const text = message.text.split("\n");
  const messageType = message.id_user === userId ? "outbox" : "inbox";
  const gmt = useSelector((state) => state?.user?.userInfo?.gmt); // server time zone
  const videoPlayerRef = useRef();
  const attachmentsWrapperRef = useRef();
  const previewFile = useSelector((s) => s.Cabinet.modals.previewFile);
  const dispatch = useDispatch();
  const [isRead, setIsRead] = useState(message.is_read === "1");

  const setMessageToRead = async () => {
    if (messageType === "inbox" && message.is_read === "0" && !isRead) {
      setIsRead(true);
      setIsReadMessage({
        action: "chat_message_update",
        id_messages: [message.id],
        is_read: 1
      });
    }
  };
  const [containerRef] = useScrollElementOnScreen(
    {
      root: null,
      rootMargin: "0px",
      threshold: 0
    },
    setMessageToRead
  );

  const attachmentIsOnlyImages = () => {
    const files = message.attachment;
    if (!Array.isArray(files)) return false;
    return files.every((file) => imageFormats.some((imageFormat) => file.ext === imageFormat));
  };

  const renderAttachment = () => {
    if (Array.isArray(message.attachment) && message.attachment[0]?.kind === "audio_message") {
      return (
        <VoiceMessagePlayer
          src={message.attachment[0]?.link}
          histogramData={message.attachment[0]?.histogramData ?? []}
          inboxMessage={messageType === "inbox"}
        />
      );
    }
    if (Array.isArray(message.attachment) && message.attachment[0]?.kind === "video_message") {
      return <VideoMessagePlayer video={message.attachment[0]} />;
    }
    if (
      (Array.isArray(message.attachment) && message.attachment[0]?.kind === "file") ||
      (Array.isArray(message.attachment) && message.attachment[0]?.kind?.includes("image"))
    ) {
      return message.attachment?.map((file, i) =>
        attachmentIsOnlyImages() ? (
          <img
            key={file.fid + i}
            className={styles.imagePreview}
            src={file.link}
            alt={file.name}
            style={{
              height: calcImageSize(attachmentsWrapperRef?.current, message.attachment.length).height,
              width: calcImageSize(attachmentsWrapperRef?.current, message.attachment.length).width
            }}
            onClick={() =>
              dispatch(
                onSetModals("previewFile", {
                  ...previewFile,
                  open: true,
                  file
                })
              )
            }
          />
        ) : (
          <FileMessage
            key={file.fid}
            file={file}
            size={message.attachment.length > 1 ? "small" : ""}
            amount={message.attachment.length}
          />
        )
      );
    }
    if (Array.isArray(message.attachment) && message.attachment[0]?.kind === "video") {
      return (
        <VideoPlayer
          source={message.attachment[0]?.link}
          videoPlayerRef={videoPlayerRef}
          visualEffects={message.attachment[0]?.visualEffects}
        />
      );
    }
    return "";
  };

  const isViewedStatus = () => (
    <div
      className={classNames(styles.isViewedStatus, {
        [styles.isHidden]: messageType === "inbox"
      })}
    >
      <div className={styles.statusSend}>&#10003;</div>
      <div
        className={classNames(styles.statusViewed, {
          [styles.statusNotViewed]: message.is_read === "0"
        })}
      >
        &#10003;
      </div>
    </div>
  );

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles[messageType]]: true,
        [styles.darkTheme]: chatTheme.name === "dark"
      })}
      ref={containerRef}
    >
      {messageType === "inbox" ? (
        <img
          src={selectedContact?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
          alt="avatar"
          className={styles.avatar}
        />
      ) : (
        ""
      )}
      <div className={styles.contentWrapper}>
        <div className={styles.flexContainer}>
          {Array.isArray(message.attachment) ? (
            message.attachment[0]?.kind === "video_message" ? (
              renderAttachment()
            ) : (
              <div
                className={classNames({
                  [styles.content]: true,
                  [styles.file_content]:
                    (Array.isArray(message.attachment) && message.attachment[0]?.kind === "image") ||
                    (Array.isArray(message.attachment) && message.attachment[0]?.kind === "file"),
                  [styles.audio_content]:
                    Array.isArray(message.attachment) && message.attachment[0]?.kind === "audio_message",
                  [styles.video_content]: Array.isArray(message.attachment) && message.attachment[0]?.kind === "video",
                  [styles.severalAttachments]: message.attachment?.length > 1
                })}
              >
                <div
                  className={classNames({
                    [styles.attachmentsWrapper]: true,
                    [styles.withText]: message.text,
                    [styles.twoRows]: message.attachment?.length > 10,
                    [styles.previewImages]: attachmentIsOnlyImages()
                  })}
                  ref={attachmentsWrapperRef}
                >
                  {renderAttachment()}
                </div>
                <div className={styles.textWrapper}>
                  {text.map((item, index) => (
                    <p key={index} className={styles.text}>
                      {item}
                    </p>
                  ))}
                </div>
                {isViewedStatus()}
              </div>
            )
          ) : (
            <div className={classNames(styles.wrapper, styles[messageType])}>
              <div className={styles.contentWrapper}>
                {text.map((item, index) => (
                  <p key={index} className={styles.content}>
                    {item}
                  </p>
                ))}
                {isViewedStatus()}
              </div>
            </div>
          )}
          {messageType !== "inbox" || (Array.isArray(message.attachment) && message.attachment[0]?.kind === "file") ? (
            <div className={styles.menuWrapper}>
              <div
                className={styles.menu}
                onClick={(e) => {
                  setMouseParams({
                    x: e.clientX,
                    y: e.clientY,
                    width: 215,
                    height: 25,
                    contextMenuList,
                    message: { ...message, messageType }
                  });
                }}
              >
                <span className={styles.dot} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.time}>{messageTime(currentDate, message.ut, gmt)}</div>
      </div>
    </div>
  );
}

export default Message;

Message.defaultProps = {
  contextMenuList: "message"
};

Message.propTypes = {
  message: messageProps.isRequired,
  selectedContact: PropTypes.exact(selectedContactProps),
  currentDate: PropTypes.instanceOf(Date).isRequired,
  setMouseParams: PropTypes.func.isRequired,
  contextMenuList: PropTypes.string,
  setIsReadMessage: PropTypes.func
};
