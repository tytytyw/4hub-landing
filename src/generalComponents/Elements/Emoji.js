import React from "react";

import styles from "./Emoji.module.sass";
import { smiles } from "../collections";
import classnames from "classnames";
import { imageSrc } from "../globalVariables";
import { useLocales } from "react-localized";

const Emoji = ({ emoji, setEmoji, title, editableClass = "" }) => {
  const { __ } = useLocales();
  if (!title) {
    title = __("Добавить эмоджи");
  }
  const set = (el) => (emoji === el ? setEmoji("") : setEmoji(el));

  const renderEmoji = (smiles) => {
    return smiles.map((el, i) => {
      return (
        <div
          key={i}
          className={classnames({
            [styles.emoji]: true,
            [styles.emojiChosen]: emoji === el,
          })}
          onClick={() => set(el)}
        >
          <img
            src={`${imageSrc}assets/PrivateCabinet/smiles/${el}.svg`}
            alt="smile"
          />
        </div>
      );
    });
  };

  return (
    <div
      className={`${styles.emojiWrap} ${
        editableClass ? styles[editableClass] : ""
      }`}
    >
      <span className={styles.title}>{title}</span>
      <div className={styles.emojiRow}>
        {renderEmoji(smiles.slice(0, smiles.length / 2))}
      </div>
      <div className={styles.emojiRow}>
        {renderEmoji(smiles.slice(smiles.length / 2))}
      </div>
    </div>
  );
};

export default Emoji;
