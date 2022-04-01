import React from "react";
import styles from "./CustomChatItem.module.sass";
import classNames from "classnames";
import { ReactComponent as LockIcon } from "../../../../../assets/PrivateCabinet/password.svg";
import PropTypes from "prop-types";

const CustomChatItem = ({
  selectedContact,
  setSelectedContact,
  sideMenuCollapsed,
  chatItem,
  title,
  subtitle,
  avatar,
  isSubList,
  setCollapseMembersList,
  status,
  contextMenu,
  disableHover,
  setMouseParams,
  contextMenuList,
  paddingRight,
  notificationsCounter
}) => {
  const onChatItemClick = (e, isMenu) => {
    if (isMenu)
      setMouseParams({
        x: e.clientX,
        y: e.clientY,
        width: 210,
        height: 25,
        contextMenuList
      });

    if (chatItem?.id === selectedContact?.id && setCollapseMembersList) {
      setCollapseMembersList(state => !state);
    } else setSelectedContact({ ...chatItem, status });
  };
  return (
    <div
      className={classNames({
        [styles.item]: true,
        [styles.sublist]: isSubList,
        [styles.sideMenuCollapsed]: sideMenuCollapsed,
        [styles.active]:
          selectedContact &&
          selectedContact?.id === chatItem.id &&
          !!selectedContact?.is_secret_chat === !!chatItem.is_secret_chat,
        [styles.disableHover]: disableHover
      })}
      style={{ paddingRight }}
      onClick={onChatItemClick}
      title={sideMenuCollapsed ? title : ""}
    >
      <div className={styles.groupName}>
        <div className={styles.avatarWrapper}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          {chatItem.is_online ? (
            <div className={styles.onlineIndicator}></div>
          ) : (
            ""
          )}
        </div>
        {sideMenuCollapsed ? (
          chatItem.is_secret_chat && (
            <LockIcon className={styles.secretChatIcon} />
          )
        ) : (
          <div className={styles.info}>
            <div className={styles.title}>
              {title}{" "}
              {chatItem.is_secret_chat ? (
                <LockIcon className={styles.secretChatIcon} />
              ) : (
                ""
              )}
            </div>
            <div className={styles.subtitle}>{subtitle}</div>
          </div>
        )}
      </div>
      <div className={styles.rightWrap}>
        <div
          className={classNames({
            [styles.notificationsCounter]: true,
            [styles.hidden]: !notificationsCounter
          })}
        >
          {notificationsCounter}
        </div>
        {contextMenu === "contextMenu" ? (
          <div
            className={styles.menuWrap}
            onClick={e => onChatItemClick(e, true)}
          >
            <span className={styles.menu} />
          </div>
        ) : null}
        {contextMenu === "checkBox" ? (
          <div
            className={classNames({
              [styles.radioContact]: true,
              [styles.radioContactChosen]: selectedContact?.filter(
                c => c.id === chatItem.id
              ).length
            })}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CustomChatItem;

CustomChatItem.defaultProps = {
  isSubList: false,
  contextMenu: "contextMenu",
  disableHover: false,
  setMouseParams: () => {},
  contextMenuList: "",
  paddingRight: "",
  notificationsCounter: null
};

CustomChatItem.propTypes = {
  selectedContact: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setSelectedContact: PropTypes.func.isRequired,
  sideMenuCollapsed: PropTypes.bool,
  chatItem: PropTypes.object.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  isSubList: PropTypes.bool,
  setCollapseMembersList: PropTypes.func,
  status: PropTypes.string,
  contextMenu: PropTypes.string,
  disableHover: PropTypes.bool,
  setMouseParams: PropTypes.func,
  contextMenuList: PropTypes.string,
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  notificationsCounter: PropTypes.number
};
