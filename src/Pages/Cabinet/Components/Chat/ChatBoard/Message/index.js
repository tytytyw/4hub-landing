import classNames from "classnames";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./Message.module.sass";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useMessageTime } from "../../../../../../generalComponents/chatHelper";
import VideoMessagePlayer from "./VideoMessagePlayer";
import VoiceMessagePlayer from "./VoiceMessagePlayer";
import FileMessage from "./FileMessage";
import VideoPlayer from "../../CreateCameraMedia/VideoPlayer";
import PropTypes from "prop-types";

function Message({
  message,
  selectedContact,
  currentDate,
  setMouseParams,
  contextMenuList
}) {
  const messageTime = useMessageTime();
  const chatTheme = useSelector(state => state.Cabinet.chat.theme)
  const userId = useSelector(state => state.Cabinet.chat.userId);
  const text = message.text.split("\n");
  const messageType = message.id_user === userId ? "outbox" : "inbox";
  const gmt = useSelector(state => state?.user?.userInfo?.gmt); // server time zone
  const videoPlayerRef = useRef();

  const renderAttachment = () => {
    if (message.attachment?.kind === "audio_message") {
      return (
        <VoiceMessagePlayer
          src={message.attachment.link}
          histogramData={message.attachment?.histogramData ?? []}
          inboxMessage={messageType === "inbox"}
        />
      );
    }
    if (message.attachment?.kind === "video_message") {
      return <VideoMessagePlayer video={message.attachment} />;
    }
    if (
      message.attachment?.kind === "file" ||
      message.attachment?.kind?.includes("image")
    ) {
      return <FileMessage file={message.attachment} />;
    }
    if (message.attachment?.kind === "video") {
      return (
        <VideoPlayer
          source={message.attachment.link}
          videoPlayerRef={videoPlayerRef}
          visualEffects={message.attachment.visualEffects}
        />
      );
    }
    return "";
  };

  return (
    <div className={classNames({ [styles.wrapper]: true, [styles[messageType]]: true, [styles.darkTheme]: chatTheme.name === 'dark' })}>
      {messageType === "inbox" ? (
        <img
          src={
            selectedContact?.icon?.[0] ||
            `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
          }
          alt="avatar"
          className={styles.avatar}
        />
      ) : (
        ""
      )}
      <div className={styles.contentWrapper}>
        <div className={styles.flexContainer}>
          {message.attachment?.kind === "video_message" ? (
            renderAttachment()
          ) : (
            <div
              className={classNames({
                [styles.content]: true,
                [styles.file_content]:
                  message.attachment?.kind === "image" ||
                  message.attachment?.kind === "file",
                [styles.audio_content]:
                  message.attachment?.kind === "audio_message",
                [styles.video_content]: message.attachment?.kind === "video"
              })}
            >
              {renderAttachment()}
              <div className={styles.textWrapper}>
                {text.map((item, index) => (
                  <p key={index} className={styles.text}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}
          {messageType !== "inbox" || message.attachment?.kind === "file" ? (
            <div className={styles.menuWrapper}>
              <div
                className={styles.menu}
                onClick={e => {
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
        <div className={styles.time}>
          {messageTime(currentDate, message.ut, gmt)}
        </div>
      </div>
    </div>
  );
}

export default Message;

Message.defaultProps = {
  contextMenuList: "message"
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  selectedContact: PropTypes.object.isRequired,
  currentDate: PropTypes.object.isRequired,
  setMouseParams: PropTypes.func.isRequired,
  contextMenuList: PropTypes.string
};
