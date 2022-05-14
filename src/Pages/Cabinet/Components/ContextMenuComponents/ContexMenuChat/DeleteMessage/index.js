import React from "react";
import { useSelector } from "react-redux";
import styles from "./DeleteMessage.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import classNames from "classnames";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { messageProps } from "types/Chat";

const DeleteMessage = ({ set, message, nullifyAction, deleteMessage }) => {
  const { __ } = useLocales();
  const text = message?.text?.split("\n").slice(0, 5) ?? [];
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);

  const onAproveBtnHandler = () => {
    nullifyAction();
    deleteMessage(message);
  };

  return (
    <PopUp set={set} background={chatTheme.name === "dark" ? "#292929" : ""}>
      <div
        className={classNames({
          [styles.wrap]: true,
          [styles.darkTheme]: chatTheme.name === "dark"
        })}
      >
        <div className={styles.cross} onClick={set} />
        <span className={styles.title}>Удалить сообщение</span>
        <div className={styles.subTitle}>{__("Вы действительно хотите удалить сообщение?")}</div>
        {message.text?.length ? (
          <div className={styles.textWrap}>
            {text.map((item, index) => (
              <p key={index} className={styles.text}>
                {index === 4 && message.text.length > 5 ? `${item}...` : item}
              </p>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className={styles.buttonsWrap}>
          <div className={classNames(styles.cancel, styles.button)} onClick={set}>
            {__("Отмена")}
          </div>
          <div
            className={classNames(styles.action, styles.button)}
            // onClick={() => onAproveBtnHandler()}
          >
            {__("Удалить у меня")}
          </div>
          <div className={classNames(styles.action, styles.button)} onClick={() => onAproveBtnHandler()}>
            {__("Удалить у всех")}
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default DeleteMessage;

DeleteMessage.propTypes = {
  set: PropTypes.func.isRequired,
  message: messageProps.isRequired,
  nullifyAction: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired
};
