import React from "react";

import styles from "./EmojiArea.module.sass";

const EmojiArea = () => {
  return (
      <div className={styles.emojiAreaWrap}>
        <span className={styles.titleName}>Эмодзи</span>
        <img src="./assets/PrivateCabinet/tmp/Bitmap.png" alt="img" />
      </div>
  )
};

export default EmojiArea;