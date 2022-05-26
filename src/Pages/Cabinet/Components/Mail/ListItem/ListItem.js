import React, { useState } from "react";
import styles from "./ListItem.module.sass";
import PropTypes from "prop-types";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import MailMenu from "../MailMenu/MailMenu";
import { useStandardMail } from "../../../../../generalComponents/collections";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { onSetMailPath, getMails } from "../../../../../Store/actions/CabinetActions";

function ListItem({ mail, open }) {
  const dispatch = useDispatch();
  const { mailList } = useSelector((s) => s.Cabinet);
  const [isShowMailMenu, setIsShowMailMenu] = useState(open);
  const STANDARD_MAIL = useStandardMail(mail);
  const toggleEvents = () => {
    setIsShowMailMenu((prevState) => !prevState);
  };
  const linksMailMenuClass = isShowMailMenu ? styles.linksMailMenuShow : styles.linksMailMenuHide;
  const mailMenuClass = isShowMailMenu ? styles.mailMenuOpen : "";
  //mylog
  console.log(mailList);
  const renderMailCategory = () => {
    return Object.entries(STANDARD_MAIL).map(([key, item], i) => {
      return (
        <MailMenu
          item={item}
          key={i}
          icon={`${imageSrc}assets/PrivateCabinet/mail/${key.toLowerCase()}.svg`}
          onClick={() => handleListItemClick(item.path)}
          isChosen={item.path === mailList.path}
        />
      );
    });
  };

  const handleListItemClick = (path) => {
    dispatch(onSetMailPath(path));
    dispatch(getMails());
  };

  return (
    <>
      <div className={classnames(styles.wrapper, mailMenuClass)} onClick={toggleEvents}>
        <div className={styles.mail}>{mail}</div>
        <PlayIcon className={`${styles.playButton}`} />
      </div>
      <div className={classnames(styles.mailMenu, linksMailMenuClass)}>{renderMailCategory()}</div>
    </>
  );
}

export default ListItem;

ListItem.propTypes = {
  mail: PropTypes.string,
  open: PropTypes.bool
};
