import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Chat.module.sass";
import { ReactComponent as FolderIcon } from "../../../../assets/PrivateCabinet/play-grey.svg";
import { ReactComponent as ChatIcon } from "../../../../assets/PrivateCabinet/chat-2.svg";
import { ReactComponent as ContactsIcon } from "../../../../assets/PrivateCabinet/men.svg";
import { ReactComponent as SettingsIcon } from "../../../../assets/PrivateCabinet/gear-6.svg";
import { ReactComponent as PhoneIcon } from "../../../../assets/PrivateCabinet/phone-5.svg";
import AddContact from "./AddContact";
import { imageSrc, MODALS } from "../../../../generalComponents/globalVariables";
import ContactList from "./ContactList";
import ChatList from "./ChatList";
import WorkSpace from "./WorkSpace";
import classNames from "classnames";
import SuccessMessage from "../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage";
import { onGetUserInfo } from "../../../../Store/actions/startPageAction";
import {
  onGetReсentChatsList,
  onSetMessageLifeTime,
  onSetSelectedContact,
  onSetModals
} from "../../../../Store/actions/CabinetActions";
import SuccessPopup from "./SuccessPopup";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import ActionApproval from "../../../../generalComponents/ActionApproval";
import SearchField from "../../../../generalComponents/SearchField";
import AddUserToGroup from "./ServePanel/AddUserToGroup";
import { useContextMenuChat } from "../../../../generalComponents/collections";
import { groupDelete, secretChatDelete, leaveGroup } from "../ContextMenuComponents/ContexMenuChat/ChatMenuHelper";
import { contactDelete } from "../../../../generalComponents/chatHelper";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { clearAllChatMessages } from "./chatService";

const Chat = ({ setMenuItem }) => {
  const { __ } = useLocales();
  const contextMenuChat = useContextMenuChat();
  const [boardOption, setBoardOption] = useState("contacts");
  const [search, setSearch] = useState("");
  const [sideMenuCollapsed, setSideMenuCollapsed] = useState(false);
  const selectedContact = useSelector((state) => state.Cabinet.chat.selectedContact);
  const [action, setAction] = useState({ type: "", name: "", text: "" });
  const nullifyAction = () => setAction({ type: "", name: "", text: "" });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [mouseParams, setMouseParams] = useState(null);
  const uid = useSelector((state) => state.user.uid);
  const userId = useSelector((state) => state.Cabinet.chat.userId);
  const [file, setFile] = useState(null);
  const messageLifeTime = useSelector((state) => state.Cabinet.chat.messageLifeTime);
  const id_company = useSelector((state) => state.user.id_company);
  const contextMenuModals = useSelector((state) => state.Cabinet.modals.contextMenuModals);
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef();
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);

  const closeContextMenu = () => {
    setMouseParams(null);
    nullifyAction();
  };

  const setSelectedContact = (contact) => (selectedContact !== contact ? dispatch(onSetSelectedContact(contact)) : "");

  const onInputFiles = (e) => {
    setFile(e.target.files[0]);
    e.target.value = "";
  };

  const renderContextMenuItems = (target, type) => {
    let newTarget = target;
    let newType = type;
    if (selectedContact?.isGroup) {
      const admins = selectedContact.users.filter((u) => u.is_admin).map((u) => u.id_user);
      const filterContextMenu = (arr, filter) => arr.filter((item) => !filter.includes(item.type));
      if (!admins.includes(userId)) {
        // user not admin of group
        const onlyAdminItemsTypes = ["editChatGroup", "deleteUserFromGroup", "deleteChatGroup"];
        newTarget = filterContextMenu(target, onlyAdminItemsTypes);
        newType = filterContextMenu(type, onlyAdminItemsTypes);
      } else {
        // user is admin
        const onlyNotAdminItemsTypes = ["leaveFromChatGroup"];
        newTarget = filterContextMenu(target, onlyNotAdminItemsTypes);
        newType = filterContextMenu(type, onlyNotAdminItemsTypes);
      }
    }
    return newTarget.map((item, i) => {
      return (
        <ContextMenuItem
          key={i}
          width={mouseParams.width}
          height={mouseParams.height}
          color={newType && newType[i] && newType[i]?.value === messageLifeTime ? "#4086F1" : ""}
          text={item.name}
          callback={() => newType[i]?.callback(newType, i)}
          imageSrc={item.img !== undefined ? imageSrc + `assets/PrivateCabinet/ContextMenuChat/${item.img}.svg` : null}
        />
      );
    });
  };

  const callbackArr = {
    contact: [
      {
        name: __("Очистить историю у меня"),
        type: "clearMessages",
        callback: () => {
          clearAllChatMessages(uid, selectedContact, 0)
            .catch((e) => {
              console.log(e);
              dispatch(MODALS.ERROR, { open: true, message: __("Ошибка удаления всех сообщений") });
            })
            .finally(() => {
              const newContact = selectedContact;
              dispatch(onSetSelectedContact(null));
              dispatch(onSetSelectedContact(newContact));
            });
        }
      },
      {
        name: __("Очистить историю у всех"),
        type: "clearAllMessages",
        callback: () => {
          clearAllChatMessages(uid, selectedContact, 1)
            .catch((e) => {
              console.log(e);
              dispatch(MODALS.ERROR, { open: true, message: __("Ошибка удаления всех сообщений") });
            })
            .finally(() => {
              const newContact = selectedContact;
              dispatch(onSetSelectedContact(null));
              dispatch(onSetSelectedContact(newContact));
            });
        }
      },
      { name: __("Заблокировать"), type: "blockUser" },
      { name: __("Отметить непрочитанным"), type: "markAsUnread" },
      {
        name: __("Удалить контакт"),
        type: __("deleteContact"),
        text: __(`Вы действительно хотите удалить контакт ${selectedContact?.name}?`),
        callback: (list, index) =>
          setAction({
            text: list[index].text,
            type: list[index].type,
            name: list[index].name
          })
      }
    ],
    group: [
      {
        type: "editChatGroup",
        name: __("Редактировать"),
        text: ``,
        callback: (list, index) => setAction(list[index])
      },
      {
        type: "deleteChatGroup",
        name: __("Удалить"),
        text: __(`Вы действительно хотите удалить группу ${selectedContact?.name}?`),
        callback: (list, index) =>
          setAction({
            text: list[index].text,
            type: list[index].type,
            name: list[index].name
          })
      },
      {
        type: "leaveFromChatGroup",
        name: __("Покинуть"),
        text: __(`Вы действительно хотите покинуть группу ${selectedContact?.name}?`),
        callback: (list, index) =>
          setAction({
            text: list[index].text,
            type: list[index].type,
            name: list[index].name
          })
      }
    ],
    secretChat: [
      {
        type: "deleteSecretChat",
        name: __("Удалить"),
        text: __(`Вы действительно хотите удалить секретный чат c ${selectedContact?.name}?`),
        callback: (list, index) =>
          setAction({
            text: list[index].text,
            type: list[index].type,
            name: list[index].name
          })
      }
    ],
    recentChat: [],
    userInGroup: [
      {
        type: "clearMessages",
        name: __("Очистить историю у меня"),
        text: ``,
        callback: (list, index) =>
          setAction({
            text: list[index].text,
            type: list[index].type,
            name: list[index].name
          })
      },
      {
        type: "clearAllMessages",
        name: __("Очистить историю у всех"),
        text: ``,
        callback: (list, index) =>
          setAction({
            text: list[index].text,
            type: list[index].type,
            name: list[index].name
          })
      },
      {
        type: "blockUser",
        name: __("Заблокировать"),
        text: ``,
        callback: (list, index) =>
          setAction({
            text: list[index].text,
            type: list[index].type,
            name: list[index].name
          })
      },
      {
        type: "deleteUserFromGroup",
        name: __("Удалить из группы"),
        text: ``,
        callback: (list, index) =>
          setAction({
            text: list[index].text,
            type: list[index].type,
            name: list[index].name
          })
      }
    ],
    timer: [
      {
        name: __("1 час"),
        value: 3600,
        callback: (list, index) => dispatch(onSetMessageLifeTime(list[index].value))
      },
      {
        name: __("45 мин."),
        value: 2700,
        callback: (list, index) => dispatch(onSetMessageLifeTime(list[index].value))
      },
      {
        name: __("30 мин."),
        value: 1800,
        callback: (list, index) => dispatch(onSetMessageLifeTime(list[index].value))
      },
      {
        name: __("15 мин."),
        value: 900,
        callback: (list, index) => dispatch(onSetMessageLifeTime(list[index].value))
      },
      {
        name: __("10 мин."),
        value: 600,
        callback: (list, index) => dispatch(onSetMessageLifeTime(list[index].value))
      },
      {
        name: __("5 мин."),
        value: 300,
        callback: (list, index) => dispatch(onSetMessageLifeTime(list[index].value))
      },
      {
        name: __("1 мин."),
        value: 60,
        callback: (list, index) => dispatch(onSetMessageLifeTime(list[index].value))
      },

      {
        name: __("30 сек."),
        value: 30,
        callback: (list, index) => dispatch(onSetMessageLifeTime(list[index].value))
      },
      {
        name: __("20 сек."),
        value: 20,
        callback: (list, index) => dispatch(onSetMessageLifeTime(list[index].value))
      }
    ],
    message: [
      {
        name: __("Редактировать сообщение"),
        type: "editMessage",
        text: __(""),
        callback: () => setAction({ type: "editMessage", message: mouseParams.message })
      },
      {
        name: __("Скачать"),
        type: "download",
        callback: () =>
          dispatch(
            onSetModals("contextMenuModals", {
              ...contextMenuModals,
              type: "DownloadFile",
              items: [mouseParams.message.attachment],
              authorizedSafe: null
            })
          )
      },
      {
        name: __("Удалить сообщение"),
        type: "deleteMessage",
        callback: () => setAction({ type: "deleteMessage", message: mouseParams.message })
      }
    ],
    uploadFile: [
      {
        name: __("Камера"),
        type: "createMediaFromCamera",
        callback: () => setAction({ type: "createMediaFromCamera" })
      },
      {
        name: __("Файлы с системы 4Hub"),
        type: "selectFile",
        callback: () => setAction({ type: "selectFile" })
      },
      {
        name: __("Файлы с компьютера"),
        type: "addPcFile",
        title: __("Выберите файл"),
        callback: () => fileInputRef.current.click()
      }
    ]
  };

  const filterContextMenu = (arr) => {
    let filtredArr = arr;
    if (mouseParams.contextMenuList === "message") {
      if (mouseParams.message.messageType === "outbox") {
        // message without text
        filtredArr = filtredArr.filter((item) => (!mouseParams.message.text ? item.type !== "editMessage" : true));
      }
      if (mouseParams.message.messageType === "inbox") {
        // inbox with file
        filtredArr = filtredArr.filter((item) =>
          mouseParams.message.attachment?.kind === "file" ? item.type === "download" : false
        );
      }
      // without file
      filtredArr = filtredArr.filter((item) =>
        mouseParams.message.attachment?.kind !== "file" ? item.type !== "download" : true
      );
    }
    return filtredArr;
  };

  const deleteChatGroup = () => {
    groupDelete(selectedContact, dispatch, uid, setShowSuccessMessage, __("Группа удалена"));
    nullifyAction();
    setSelectedContact(null);
  };

  const leaveChatGroup = () => {
    leaveGroup(selectedContact, userId, dispatch, uid, setShowSuccessMessage, __("Вы покинули группу"));
    nullifyAction();
    setSelectedContact(null);
  };

  const deleteSecretChat = () => {
    secretChatDelete(selectedContact, dispatch, uid, setShowSuccessMessage, __("Секретный чат удален"));
    nullifyAction();
    setSelectedContact(null);
  };

  useEffect(() => {
    setMenuItem("Chat");
    dispatch(onGetUserInfo());
    dispatch(onGetReсentChatsList());

    const timer = setInterval(() => {
      // Creates an interval which will update the current data every 20sec
      setDate(new Date());
    }, 20 * 1000);
    return () => {
      setMenuItem("");
      clearInterval(timer);
      setSelectedContact(null);
    };
  }, []); //eslint-disable-line

  useEffect(() => {
    if (selectedContact) dispatch({ type: "GET_MESSAGES", payload: null });
  }, [selectedContact]); //eslint-disable-line

  return (
    <div
      className={classNames({
        [styles.chatComponent]: true,
        [styles.darkTheme]: chatTheme.name === "dark"
      })}
      style={{ background: chatTheme.background, color: chatTheme.textColor }}
    >
      <div
        className={classNames({
          [styles.sideMenu]: true,
          [styles.sideMenuCollapsed]: sideMenuCollapsed
        })}
      >
        <div className={styles.header}>
          <div className={styles.headerName}>
            <ChatIcon id={styles.headerIcon} title="" />
            {sideMenuCollapsed ? null : <span>Чат</span>}
          </div>
          <FolderIcon
            onClick={() => setSideMenuCollapsed((value) => !value)}
            id={styles.headerArrow}
            title={sideMenuCollapsed ? __("развернуть") : __("свернуть")}
          />
        </div>
        <div className={styles.boardOptions}>
          <ContactsIcon
            className={classNames({
              [styles.option]: true,
              [styles.selected]: boardOption === "contacts"
            })}
            onClick={() => setBoardOption("contacts")}
            title={__("Контакты")}
          />
          <PhoneIcon
            className={classNames({
              [styles.option]: true,
              [styles.selected]: boardOption === "calls"
            })}
            onClick={() => setBoardOption("calls")}
            title={__("Недавние звонки")}
          />
          <ChatIcon
            className={classNames({
              [styles.option]: true,
              [styles.selected]: boardOption === "chats"
            })}
            onClick={() => setBoardOption("chats")}
            title={__("Чаты")}
          />
          <SettingsIcon
            className={classNames({
              [styles.selected]: showSettings,
              [styles.option]: true
            })}
            onClick={() => setShowSettings((prevBool) => !prevBool)}
            title={__("Настройки")}
          />
        </div>
        {sideMenuCollapsed ? null : (
          <div className={styles.borderBottom}>
            <SearchField
              value={search}
              setValue={setSearch}
              style={{
                background: chatTheme.inputBgColor,
                color: chatTheme.inputColor
              }}
            />
          </div>
        )}
        <div
          style={{
            height: `calc(100% - 68px - 68px - ${sideMenuCollapsed ? "0" : "60"}px)`,
            background: chatTheme.background,
            color: chatTheme.textColor
          }}
        >
          {boardOption === "contacts" ? (
            <ContactList
              search={search}
              sideMenuCollapsed={sideMenuCollapsed}
              setSelectedContact={setSelectedContact}
              setAction={setAction}
              currentDate={date}
              setMouseParams={setMouseParams}
            />
          ) : null}
          {boardOption === "chats" ? (
            <ChatList
              search={search}
              sideMenuCollapsed={sideMenuCollapsed}
              setSelectedContact={setSelectedContact}
              setAction={setAction}
              mouseParams={mouseParams}
              setMouseParams={setMouseParams}
              action={action}
              closeContextMenu={closeContextMenu}
              deleteChatGroup={deleteChatGroup}
              currentDate={date}
            />
          ) : null}
        </div>
      </div>
      <WorkSpace
        boardOption={boardOption}
        sideMenuCollapsed={sideMenuCollapsed}
        setShowSuccessPopup={setShowSuccessPopup}
        nullifyAction={nullifyAction}
        action={action}
        currentDate={date}
        setAction={setAction}
        setMouseParams={setMouseParams}
        file={file}
        setFile={setFile}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      {action.type === "addContact" ? (
        <AddContact action={action} nullifyAction={nullifyAction} setShowSuccessPopup={setShowSuccessPopup} />
      ) : null}
      {showSuccessMessage && (
        <SuccessMessage showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} />
      )}
      {showSuccessPopup ? (
        <SuccessPopup
          title={showSuccessPopup?.title}
          text={showSuccessPopup?.text}
          set={() => setShowSuccessPopup(false)}
          style={chatTheme.name === "dark" ? { background: "#272727", color: "#fff" } : {}}
        />
      ) : (
        ""
      )}
      {mouseParams !== null ? (
        <ContextMenu
          params={mouseParams}
          setParams={setMouseParams}
          tooltip={false}
          withoutOffset={mouseParams.contextMenuList === "timer" ? true : false}
          style={chatTheme.name === "dark" ? { boxShadow: " 0 2px 5px #272727" } : {}}
        >
          <div className={styles.ContextMenuItems}>
            {renderContextMenuItems(
              filterContextMenu(contextMenuChat[mouseParams.contextMenuList]),
              filterContextMenu(callbackArr[mouseParams.contextMenuList])
            )}
          </div>
        </ContextMenu>
      ) : null}
      {action.type === "deleteChatGroup" || action.type === "deleteSecretChat" ? (
        <ActionApproval
          name={action.name}
          text={action.text}
          set={closeContextMenu}
          callback={action.type === "deleteChatGroup" ? deleteChatGroup : deleteSecretChat}
          approve={__("Удалить")}
          style={chatTheme.name === "dark" ? { background: "#272727", color: "#fff" } : {}}
        >
          <div className={styles.groupLogoWrap}>
            <img
              className={styles.groupLogo}
              src={
                selectedContact?.icon?.[0] ||
                `${imageSrc}assets/PrivateCabinet/${
                  action.type === "deleteChatGroup" ? "chatGroup" : "profile-noPhoto"
                }.svg`
              }
              alt="group logo"
            />
          </div>
        </ActionApproval>
      ) : null}
      {action.type === "leaveFromChatGroup" ? (
        <ActionApproval
          name={action.name}
          text={action.text}
          set={closeContextMenu}
          callback={leaveChatGroup}
          approve={__("Покинуть")}
        >
          <div className={styles.groupLogoWrap}>
            <img
              className={styles.groupLogo}
              src={selectedContact?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/chatGroup.svg`}
              alt="group logo"
            />
          </div>
        </ActionApproval>
      ) : null}
      {action.type === "deleteContact" ? (
        <ActionApproval
          name={action.name}
          text={action.text}
          set={nullifyAction}
          callback={() => contactDelete(selectedContact, id_company, dispatch, uid, nullifyAction)}
          approve={__("Удалить")}
        >
          <div className={styles.groupLogoWrap}>
            <img
              className={styles.groupLogo}
              src={selectedContact?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
              alt="group logo"
            />
          </div>
        </ActionApproval>
      ) : null}
      {action.type === "addUsersToGroup" ? (
        <AddUserToGroup group={selectedContact} nullifyAction={nullifyAction} />
      ) : (
        ""
      )}
      <div style={{ display: "none" }}>
        <input type="file" onChange={onInputFiles} ref={fileInputRef} />
      </div>
    </div>
  );
};

export default Chat;

Chat.propTypes = {
  setMenuItem: PropTypes.func.isRequired
};
