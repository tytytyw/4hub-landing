import classNames from "classnames";
import React, { useState, useEffect, useRef } from "react";
import styles from "./CreateChat.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import ProfileUpload from "../../../Components/MyProfile/UserForm/ProfileUpload";
import AvatarBackground from "../../../../../assets/PrivateCabinet/circle.svg";
import ActionApproval from "../../../../../generalComponents/ActionApproval";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import UsersList from "./UsersList";
import { onGetChatGroups, onGetSecretChatsList } from "../../../../../Store/actions/CabinetActions";
import api from "../../../../../api";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const CreateChat = ({
  title,
  maxCountUsers,
  nullifyAction,
  setShowSuccessPopup,
  selectedContact,
  componentType,
  currentDate,
  initialUser
}) => {
  const { __ } = useLocales();
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContact] = useState(initialUser ? [initialUser] : []);
  const [step, setStep] = useState("one");
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [image, setImage] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [showActionApproval, setShowActionApproval] = useState({
    type: null,
    show: false
  });
  const [loadingType, setLoadingType] = useState("");
  const dispatch = useDispatch();
  const inputWrapRef = useRef();
  const [inputWrapHeight, setInputWrapHeight] = useState(0);
  const userId = useSelector((state) => state.Cabinet.chat.userId);
  const uid = useSelector((state) => state.user.uid);
  const id_company = useSelector((state) => state.user.id_company);
  const contactList = useSelector((state) =>
    id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
  );

  const changeSelectedContacts = (contact) => {
    const isSelected = selectedContacts.filter((c) => c.id === contact.id).length;
    setSelectedContact((state) => (isSelected ? state.filter((item) => item.id !== contact.id) : [contact, ...state]));
  };

  const renderSelectedContacts = () => {
    if (!selectedContacts) return null;
    return selectedContacts.map((contact) => {
      return (
        <div className={styles.contact_wrap} key={contact.id}>
          <img
            className={styles.avatar}
            src={contact?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
            alt="avatar"
          />
          <span className={styles.name}>{`${contact?.sname || ""} ${contact?.name || ""}`}</span>
        </div>
      );
    });
  };

  const uploadImage = (event) => {
    const file = event.target.files[0] ?? null;
    setImage(file && file.type.substr(0, 5) === "image" ? file : null);
  };

  const onExit = () => {
    setPreviewAvatar(null);
    setImage(null);
    nullifyAction();
  };

  useEffect(() => {
    setSearch("");
    setInputWrapHeight(inputWrapRef?.current?.offsetHeight);
    if (selectedContacts.length && maxCountUsers === 1) setShowActionApproval({ type: "secretChat", show: true });
  }, [selectedContacts, maxCountUsers]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewAvatar(reader.result);
      reader.readAsDataURL(image);
    }
    // eslint-disable-next-line
  }, [image]);

  useEffect(() => {
    if (componentType === "edit") {
      setSelectedContact(Object.values(selectedContact?.users));
      setGroupName(selectedContact?.name);
    }
    return () => onExit();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (step === "exit") onExit();
  }, [step]); //eslint-disable-line

  const stepHandler = (direction) => {
    // for create group
    if (maxCountUsers > 1) {
      if (direction === "forward" && selectedContacts.length) {
        if (step === "one") setStep("two");
        else if (step === "two") onSubmit();
      }
      if (direction === "back") {
        setStep((step) => (step === "two" ? "one" : "exit"));
      }
      // for create secret chat
    } else if (maxCountUsers === 1 && direction === "back") onExit();
  };

  const onSubmit = () => {
    if (showActionApproval.show)
      setShowActionApproval((state) => {
        return { ...state, show: false };
      });
    setLoadingType("squarify");
    const formData = new FormData();
    if (image) formData.append("file", image);
    const users = selectedContacts.map((item) => item.id_real_user);
    users.push(userId);
    formData.append("id_user_to", JSON.stringify(users));
    if (componentType === "edit") formData.append("id_group", selectedContact.id);
    const apiUrl =
      showActionApproval.type === "secretChat"
        ? // secret chat
          //TODO: remove deadline
          `/ajax/chat_group_sec_add.php?uid=${uid}&name=${selectedContacts[0].name}&deadline=2042-01-28 10:37:35`
        : // group		    //_ add or _edit
          `/ajax/chat_group_${componentType}.php?uid=${uid}&name=${groupName}`;
    api
      .post(apiUrl, formData)
      .then((res) => {
        if (res.data.ok) {
          dispatch(showActionApproval.type === "secretChat" ? onGetSecretChatsList() : onGetChatGroups());
          if (componentType === "add")
            setShowSuccessPopup({
              title:
                showActionApproval.type === "secretChat"
                  ? __("Секретный чат успешно создан")
                  : __("Новая группа успешно создана"),
              text: ""
            });
          onExit();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoadingType(""));
  };

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles.darkTheme]: chatTheme.name === "dark"
      })}
    >
      <div className={styles.header}>
        <div className={classNames(styles.backBtn, styles.button)} onClick={() => stepHandler("back")}>
          <div className={styles.arrow}></div>
          Назад
        </div>
        <div className={styles.title}>
          {maxCountUsers > 1 && step === "one"
            ? __(
                `Выберите пользователей ${selectedContacts.length}/${new Intl.NumberFormat("ru-RU").format(
                  maxCountUsers
                )}`
              )
            : ""}
          {maxCountUsers === 1 ? title : ""}
          {step === "two" ? title : ""}
        </div>
        {maxCountUsers > 1 ? (
          <div
            className={classNames({
              [styles.forwardBtn]: true,
              [styles.button]: true,
              [styles.disable]: !selectedContacts.length || (step === "two" && !groupName)
            })}
            onClick={() => stepHandler("forward")}
          >
            {step === "one" ? __("Далее") : ""}
            {step === "two" ? `${componentType === "add" ? __("Создать") : __("Сохранить")}` : ""}
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className={styles.main}>
        {step === "one" ? (
          <div className={styles.inputAreaWrap} ref={inputWrapRef}>
            <div className={styles.inputArea}>
              <div className={styles.scrollContainer}>
                <input
                  className={styles.input}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={__("Введите имя пользователя")}
                />
                {renderSelectedContacts()}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.groupSettings}>
            <div className={styles.avatar}>
              <ProfileUpload
                name="profileImg"
                preview={previewAvatar}
                onChange={uploadImage}
                background={AvatarBackground}
              />
            </div>
            <input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className={styles.name}
              placeholder={__("Введите имя группы")}
            />
          </div>
        )}
        <div className={styles.contactsList} style={{ height: `calc(100vh - ${inputWrapHeight}px - 68px - 90px)` }}>
          <UsersList
            usersList={step === "one" ? contactList : selectedContacts}
            search={search}
            selectedUsers={selectedContacts}
            setSelectedUsers={step === "one" ? changeSelectedContacts : () => {}}
            userContextMenu={step === "one" ? "checkBox" : ""}
            disableHover={step === "two"}
            currentDate={currentDate}
          />
        </div>
      </div>
      {showActionApproval?.show ? (
        <ActionApproval
          name={__("Начать секретный чат")}
          text={__(
            `Вы действительно хотите создать секртеный чат с ${selectedContacts[0].name || ""} ${
              selectedContacts[0].sname || ""
            }?`
          )}
          set={() => {
            setShowActionApproval(false);
            setSelectedContact([]);
          }}
          callback={onSubmit}
          approve={__("Создать")}
        >
          <img
            className={styles.avatar}
            src={selectedContacts[0]?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
            alt="avatar"
          />
        </ActionApproval>
      ) : null}
      {loadingType ? (
        <Loader
          position="absolute"
          zIndex={10000}
          containerType="bounceDots"
          type="bounceDots"
          background="transparent"
          animation={false}
          width="100px"
          height="100px"
        />
      ) : null}
    </div>
  );
};

export default CreateChat;

CreateChat.defaultProps = {
  maxCountUsers: 1000
};

CreateChat.propTypes = {
  title: PropTypes.string,
  maxCountUsers: PropTypes.number,
  nullifyAction: PropTypes.func.isRequired,
  setShowSuccessPopup: PropTypes.func.isRequired,
  selectedContact: PropTypes.object,
  componentType: PropTypes.string,
  currentDate: PropTypes.objectOf(PropTypes.string).isRequired,
  initialUser: PropTypes.object
};
