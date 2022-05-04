import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TextArea.module.sass";
import { ReactComponent as SendIcon } from "../../../../../../assets/PrivateCabinet/send.svg";
import classNames from "classnames";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { actionProps } from "../../../../../../types/Action";

const TextArea = ({
  onAddMessage,
  action,
  nullifyAction,
  initialTextValue = "",
  saveTextButtonRef = null,
  editMessage
}) => {
  const { __ } = useLocales();
  const chatTheme = useSelector(state => state.Cabinet.chat.theme);

  const textAreaRef = useRef();
  const [cursorPosition, setCursorPosition] = useState(0);
  const [textAreaValue, setTextAreaValue] = useState(initialTextValue);
  const [editingMessage, setEditingMessage] = useState(false);
  const insertEmodji = useSelector(state => state.Cabinet.chat.insertEmodji);
  const dispatch = useDispatch();

  const findCursorPosition = () => {
    setCursorPosition(textAreaRef.current.selectionStart);
  };

  const cleareTextArea = () => {
    setCursorPosition(0);
    setTimeout(() => {
      if (textAreaRef.current) {
        setTextAreaValue("");
        textAreaRef.current.style.height = "24px";
      }
    });
  };

  const keyPress = e => {
    findCursorPosition();
    if (e.keyCode === 13 && !e.shiftKey) {
      sendHandler();
    }
  };

  const onTextAreaChange = e => {
    findCursorPosition();
    setTextAreaValue(e.target.value);
  };

  const sendHandler = () => {
    // TODO: add edit message socket action
    editingMessage
      ? editMessage(action.message, textAreaValue)
      : onAddMessage(textAreaValue);
    cleareTextArea();
    nullifyAction();
  };

  useEffect(() => {
    if (insertEmodji) {
      setTextAreaValue(
        text =>
          text.slice(0, cursorPosition) +
          insertEmodji +
          text.slice(cursorPosition)
      );
      dispatch({ type: "INSERT_EMODJI", payload: "" });

      textAreaRef.current.focus();
      setTimeout(() => {
        textAreaRef.current.selectionStart = cursorPosition + 2;
        textAreaRef.current.selectionEnd = cursorPosition + 2;
      }, 0);

      setCursorPosition(position => position + 2);
    }
    // eslint-disable-next-line
  }, [insertEmodji]);

  useEffect(() => {
    if (action?.type === "editMessage") {
      const saveTextValue = textAreaValue;
      setTextAreaValue(action?.message.text);
      setEditingMessage(true);
      return () => {
        setTextAreaValue(saveTextValue);
        setEditingMessage(false);
      };
    }
    // eslint-disable-next-line
  }, [action]);

  useEffect(() => {
    const textarea = textAreaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textAreaValue
      ? textarea.scrollHeight + "px"
      : "24px";
  }, [textAreaValue]);

  return (
    <div
      className={classNames({
        [styles.textMessage]: true,
        [styles.darkTheme]: chatTheme.name === "dark"
      })}>
      <textarea
        ref={textAreaRef}
        type="text"
        placeholder={__("Введите текст сообщения")}
        className={styles.textInput}
        onClick={findCursorPosition}
        rows={1}
        onKeyDown={keyPress}
        onChange={onTextAreaChange}
        value={textAreaValue}
      />

      <span ref={saveTextButtonRef} onClick={sendHandler}>
        <SendIcon
          className={classNames({
            [styles.messageImg]: true,
            [styles.active]: textAreaValue.length
          })}
        />
      </span>
    </div>
  );
};

export default TextArea;

TextArea.defaultProps = {
  initialTextValue: "",
  saveTextButtonRef: null
};

TextArea.propTypes = {
  onAddMessage: PropTypes.func.isRequired,
  action: actionProps,
  nullifyAction: PropTypes.func.isRequired,
  initialTextValue: PropTypes.string,
  saveTextButtonRef: PropTypes.object,
  editMessage: PropTypes.func
};
