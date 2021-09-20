import React from "react";

import styles from "./EmojiArea.module.sass";
import EmojiPicker from "emoji-picker-react";

const EmojiArea = ({insertToInput}) => {

    const onEmojiClick = (event, emojiObject) => insertToInput(emojiObject.emoji);

  return (
      <div className={styles.emojiAreaWrap}>
        <span className={styles.titleName}>Эмодзи</span>
          <EmojiPicker
              disableSearchBar={true}
              pickerStyle={{
                  width: '100%',
                  height: '95%'
              }}
              onEmojiClick={onEmojiClick}
          />
      </div>
  )
};

export default EmojiArea;