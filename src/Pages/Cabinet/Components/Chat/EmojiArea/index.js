import React from "react";

import styles from "./EmojiArea.module.sass";
import EmojiPicker from "emoji-picker-react";
import { useDispatch } from "react-redux";

const EmojiArea = () => {
	const dispatch = useDispatch();
  const onEmojiClick = (event, emojiObject) => dispatch({type:"INSERT_EMODJI" , payload: emojiObject.emoji})

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