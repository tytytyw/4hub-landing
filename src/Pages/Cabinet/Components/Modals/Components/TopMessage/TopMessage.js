import React, { useEffect, useState } from "react";
import styles from "./TopMessage.module.sass";

import { useSelector, useDispatch } from "react-redux";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";

function TopMessage() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const topMessage = useSelector((s) => s.Cabinet.modals.topMessage);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      onSetModals("topMessage", {
        ...topMessage,
        open: false,
        type: "message",
        message: ""
      })
    );
  };

  const clearStoreMessage = () => {
    dispatch(
      onSetModals("topMessage", {
        ...topMessage,
        open: true,
        type: "message",
        message: ""
      })
    );
  };

  const checkNewMessage = () => {
    if (messages.length > 0) {
      setCurrentMessage(messages[0]);
      setMessages((s) => s.filter((it, i) => i !== 0));
    } else {
      if (currentMessage !== null) {
        closeModal();
      }
    }
  };

  useEffect(() => {
    if (topMessage.message.length > 0) {
      setMessages((s) => [...s, { type: topMessage.type, message: topMessage.message }]);
      clearStoreMessage();
    }
  }, [topMessage.message]); //eslint-disable-line

  // Should work only on first render after messages was updated
  useEffect(() => {
    if (currentMessage === null) {
      checkNewMessage();
    }
  }, [messages]); //eslint-disable-line

  useEffect(() => {
    setTimeout(() => {
      checkNewMessage();
    }, 3000);
  }, [currentMessage]); //eslint-disable-line

  return (
    <>
      {currentMessage !== null ? (
        <div className={styles.wrap}>
          <div className={styles[currentMessage.type]}>{currentMessage.message}</div>
        </div>
      ) : null}
    </>
  );
}

export default TopMessage;
