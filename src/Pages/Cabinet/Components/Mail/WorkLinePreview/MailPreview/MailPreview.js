import React from "react";
import styles from "./MailPreview.module.sass";
import { ReactComponent as Clip } from "../../../../../../assets/PrivateCabinet/mail/clip.svg";
import { ReactComponent as Favorite } from "../../../../../../assets/PrivateCabinet/mail/favorite-stroke.svg";
import MailButtons from "../../MailButtons/MailButtons";
import { PREVIEW_MAIL_PATH } from "Store/types";
import { useSelector } from "react-redux";
import classNames from "classnames";

function MailPreview() {
  const { theme } = useSelector((state) => state.user.userInfo);
  return (
    <div className={classNames(styles.mailPreview, `scrollbar-thin-${theme}`)}>
      <div className={styles.header}>
        <div className={styles.top}>
          <div className={styles.favorite}>
            <Favorite />
          </div>
          <div className={styles.buttons}>
            <MailButtons path={PREVIEW_MAIL_PATH} />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.mailPgination}>{`< 3/400 >`}</div>
          <div className={styles.rightSide}>
            <div className={styles.time}>{`6 мин назад`}</div>
            <div className={styles.files}>
              <Clip />
              {`2 вложеных файла`}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.text}>
        <div className={styles.header}>
          <div className={styles.title}>{`Дизайн проект чатбот`}</div>
          <div className={styles.name}>{`Алина Квиталина   «AlinaKvitalina@gmail.com»`}</div>
        </div>
        <div
          className={styles.mail}
        >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse`}</div>
        <div
          className={styles.mail}
        >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse`}</div>
        <div
          className={styles.mail}
        >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse`}</div>
        <div
          className={styles.mail}
        >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse`}</div>
        <div
          className={styles.mail}
        >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse`}</div>
      </div>
    </div>
  );
}

export default MailPreview;
