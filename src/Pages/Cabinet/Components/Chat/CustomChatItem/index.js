import React from "react";
import styles from "./CustomChatItem.module.sass";
import classNames from "classnames";
import { ReactComponent as LockIcon } from "../../../../../assets/PrivateCabinet/password.svg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { DARK, CHECKBOX, CONTEXT_MENU } from "../../../../../generalComponents/globalVariables";
import { selectedContactProps } from "../../../../../types/Chat";

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
  notificationsCounter,
  disableActions
}) => {
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const onChatItemClick = (e, isMenu) => {
    if (disableActions) return null;
    if (isMenu)
      setMouseParams({
        x: e.clientX,
        y: e.clientY,
        width: 230,
        height: 25,
        contextMenuList
      });

    if (chatItem?.id === selectedContact?.id && setCollapseMembersList) {
      setCollapseMembersList((state) => !state);
    } else {
      setSelectedContact({ ...chatItem, status });
    }
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
        [styles.disableHover]: disableHover,
        [styles.darkTheme]: chatTheme.name === DARK,
        [styles.disableActions]: disableActions
      })}
      style={{ paddingRight }}
      onClick={onChatItemClick}
      title={sideMenuCollapsed ? title : ""}
    >
      <div className={styles.groupName}>
        <div className={styles.avatarWrapper}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          {chatItem.is_online ? <div className={styles.onlineIndicator}></div> : ""}
        </div>
        {sideMenuCollapsed ? (
          chatItem.is_secret_chat && <LockIcon className={styles.secretChatIcon} />
        ) : (
          <div className={styles.info}>
            <div className={styles.title}>
              {title} {chatItem.is_secret_chat ? <LockIcon className={styles.secretChatIcon} /> : ""}
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
        {contextMenu === CONTEXT_MENU && !disableActions ? (
          <div className={styles.menuWrap} onClick={(e) => onChatItemClick(e, true)}>
            <span className={styles.menu} />
          </div>
        ) : null}
        {contextMenu === CHECKBOX && !disableActions ? (
          <div
            className={classNames({
              [styles.radioContact]: true,
              [styles.radioContactChosen]: selectedContact?.filter((c) => c.id === chatItem.id).length
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
  contextMenu: CONTEXT_MENU,
  disableHover: false,
  setMouseParams: () => {},
  contextMenuList: "",
  paddingRight: "",
  notificationsCounter: null,
  disableActions: false
};

CustomChatItem.propTypes = {
  selectedContact: PropTypes.exact(selectedContactProps),
  setSelectedContact: PropTypes.func,
  sideMenuCollapsed: PropTypes.bool,
  chatItem: PropTypes.exact(selectedContactProps),
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
  notificationsCounter: PropTypes.number,
  disableActions: PropTypes.bool
};
