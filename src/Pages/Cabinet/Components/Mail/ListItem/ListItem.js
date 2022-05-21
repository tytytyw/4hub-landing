import React, { useState } from "react";
import styles from "./ListItem.module.sass";
import PropTypes from "prop-types";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import MailMenu from "../MailMenu/MailMenu";
import { useMailMenu } from "../../../../../generalComponents/collections";
import classnames from "classnames";

function ListItem({ mail }) {
  const [isShowMailMenu, setIsShowMailMenu] = useState(true);
  const toggleEvents = () => {
    setIsShowMailMenu((prevState) => !prevState);
  };
  const linksMailMenuClass = isShowMailMenu ? styles.linksMailMenuShow : styles.linksMailMenuHide;
  const mailMenuClass = isShowMailMenu ? styles.mailMenuOpen : "";

  return (
    <>
      <div className={classnames(styles.wrapper, mailMenuClass)} onClick={toggleEvents}>
        <div className={styles.mail}>{mail}</div>
        <PlayIcon className={`${styles.playButton}`} />
      </div>
      <div className={classnames(styles.mailMenu, linksMailMenuClass)}>
        {useMailMenu().map((item, i) => {
          return <MailMenu item={item} index={i} key={i} />;
        })}
      </div>
    </>
  );
}

export default ListItem;

ListItem.propTypes = {
  mail: PropTypes.string
};
