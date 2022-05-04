import React from "react";
import styles from "./SecretChatStartWallpaper.module.sass";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const SecretChatStartWallpaper = ({ children }) => {
  const { __ } = useLocales();

  return (
    <div className={styles.wrap}>
      <h4 className={styles.title}>{__("Секретный чат")}</h4>
      <ul className={styles.list}>
        <li className={styles.text}>{__("Используют оконечное шифрование")}</li>
        <li className={styles.text}>{__("Не хранятся на серверах")}</li>
        <li className={styles.text}>{__("Позволяют удалеть переписку по таймеру")}</li>
        <li className={styles.text}>{__("Не позволяют пересылать сообщения")}</li>
      </ul>
      {children}
    </div>
  );
};

export default SecretChatStartWallpaper;

SecretChatStartWallpaper.propTypes = {
  children: PropTypes.any
};
