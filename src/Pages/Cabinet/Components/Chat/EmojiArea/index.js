import React from "react";

import styles from "./EmojiArea.module.sass";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

const EmojiArea = () => {
  const dispatch = useDispatch();
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const onEmojiClick = (_, emojiObject) => dispatch({ type: "INSERT_EMODJI", payload: emojiObject.emoji });

  return (
    <div
      className={classNames({
        [styles.emojiAreaWrap]: true,
        [styles.darkTheme]: chatTheme.name === "dark"
      })}
    >
      <span className={styles.titleName}>Эмодзи</span>
      <EmojiPicker
        disableSearchBar={true}
        pickerStyle={{
          width: "100%",
          height: "95%",
          background: chatTheme.name === "dark" ? "#323232" : "",
          boxShadow: "none",
          border: "none"
        }}
        onEmojiClick={onEmojiClick}
      />
    </div>
  );
};

export default EmojiArea;
