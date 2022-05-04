import React, { useEffect, useRef, useState } from "react";

import api from "../../../../../../api";
import styles from "./CopyLink.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CopyIcon } from "../../../../../../assets/PrivateCabinet/copy.svg";
import { ReactComponent as UserIcon } from "../../../../../../assets/PrivateCabinet/userIcon.svg";
import { ReactComponent as WorldIcon } from "../../../../../../assets/PrivateCabinet/world.svg";
import { onGetContacts } from "../../../../../../Store/actions/CabinetActions";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { ReactComponent as FolderIcon } from "../../../../../../assets/PrivateCabinet/folder-2.svg";
import { colors } from "../../../../../../generalComponents/collections";
import Loader from "../../../../../../generalComponents/Loaders/4HUB";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { projectFolderStructure } from "../../../../../../types/Project";

function CopyLinkFolder({ nullifyAction, folder, setShowSuccessMessage, setLoadingType }) {
  const { __ } = useLocales();
  const uid = useSelector((state) => state.user.uid);
  const contactList = useSelector((state) => state.Cabinet.contactList);
  const fileList = useSelector((state) => state.Cabinet.fileList);
  const [url, setUrl] = useState(__("Загрузка..."));
  const [review, setReview] = useState({ text: __("Просмотр") });
  const [access, setAccess] = useState({ text: "limited" });
  const [context, setContext] = useState("");
  const linkRef = useRef("");
  const [chosenContacts, setChosenContacts] = useState([]);
  const [sendAccess, setSendAccess] = useState(false);
  const [notify, setNotify] = useState(false);
  const [prim, setPrim] = useState("");
  const dispatch = useDispatch();

  const saveChanges = () => {
    nullifyAction();
  };

  const checkContextMenu = (e) => {
    if (!context) {
      e.nativeEvent.path.forEach((el) => {
        if (typeof el.className === "string" && el.className.includes(styles.contacts)) onOpenContacts();
        if (typeof el.className === "string" && el.className.includes(styles.review)) setContext("review");
        if (typeof el.className === "string" && el.className.includes(styles.openList)) setContext("access");
      });
    } else {
      let block = false;
      e.nativeEvent.path.forEach((el) => {
        if (typeof el.className === "string" && el.className.includes(styles.contactsList)) block = true;
      });
      if (!block) setContext("");
    }
  };

  const getLink = (status) => {
    setUrl(__("Загрузка..."));
    let stat = "$&is_read=1";
    if (status === "write") stat = "$&is_read=0";
    const url = `/ajax/dir_access_add.php?uid=${uid}&dir=${folder.path}&email=$GUEST${stat}`;
    api
      .get(url)
      .then((res) => setUrl(res.data.link_shere_to_user))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getLink();
  }, []); // eslint-disable-line

  const copyLink = () => {
    if (url) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url);
      } else {
        linkRef.current.value = url;
        linkRef.current.focus();
        linkRef.current.select();
        document.execCommand("copy");
        linkRef.current.value = "";
      }
      setShowSuccessMessage(__("Ссылка скопирована"));
    }
  };

  const onOpenContacts = () => {
    dispatch(onGetContacts());
    setContext("addContacts");
  };

  const renderContacts = () => {
    if (!contactList)
      return <Loader type="switch" position="absolute" background="white" width="200px" height="200px" />;
    return contactList.map((contact, i) => {
      const index = chosenContacts?.findIndex((c) => c.id === contact.id);
      return (
        <div
          key={i}
          className={styles.contact}
          // TODO - Need to optimize code - too long rendering changeContact
          onClick={() => chooseContact(contact, index)}
        >
          <div className={`${styles.radioContact} ${index > -1 ? styles.radioContactChosen : ""}`} />
          <img src={imageSrc + contact.icon[0]} alt="img" />
          <div className={styles.contactInfo}>
            <span>{contact.name}</span>
            <span>{contact.email[0]}</span>
          </div>
        </div>
      );
    });
  };

  const renderView = () => (
    <div className={styles.reviewOptions}>
      <div
        className={styles.reviewOption}
        onClick={() => {
          setReview({ ...review, text: __("Просмотр") });
          getLink();
        }}
      >
        <div className={`${styles.radio} ${review.text === __("Просмотр") ? styles.radioChosen : ""}`} />
        <div className={styles.description}>Просмотр</div>
      </div>
      <div className={styles.reviewOption} onClick={() => setReview({ ...review, text: __("Скачивание") })}>
        <div className={`${styles.radio} ${review.text === __("Скачивание") ? styles.radioChosen : ""}`} />
        <div>Скачивание</div>
      </div>
      <div
        className={`${styles.reviewOption} ${styles.reviewOptionLast}`}
        onClick={() => {
          setReview({ ...review, text: __("Редактировать") });
          getLink("write");
        }}
      >
        <div className={`${styles.radio} ${review.text === __("Редактировать") ? styles.radioChosen : ""}`} />
        <div>Редактировать</div>
      </div>
      <span className={styles.descr}>{__("Может упорядочивать, добавлять и редактировать файл")}</span>
    </div>
  );

  const chooseContact = (contact, index) => {
    if (index) {
      setChosenContacts([...chosenContacts, contact]);
    } else {
      deleteContact(index);
    }
  };

  const deleteContact = (index) => {
    let list = chosenContacts;
    list.splice(index, 1);
    setChosenContacts(list);
    if (list.length === 0) setSendAccess(false);
  };

  const rendercontactsSend = () => {
    return contactList.map((contact, i) => (
      <div key={i} className={styles.listItem} onClick={() => deleteContact(i)}>
        <img src={imageSrc + contact.icon[0]} alt="img" />
        <div className={styles.contactInfo}>
          <span>{contact.email[0]}</span>
        </div>
      </div>
    ));
  };

  const sendFolder = () => {
    const path = fileList.path;
    const access = review.text === __("Просмотр");
    setLoadingType("squarify");
    chosenContacts.forEach((c, i) => {
      api
        .get(`/ajax/dir_access_add.php?uid=${uid}&dir=${path}&email=${c.email[0]}&is_read=${access}&prim=${prim}`)
        .then((res) => {
          if (res.data.ok === 1) {
            console.log("success");
          } else {
            console.log("fail");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          if (chosenContacts.length - 1 === i) {
            setLoadingType("");
            setShowSuccessMessage(__("Ссылка отправлена на почту"));
            nullifyAction();
          }
        });
    });
  };

  return (
    <PopUp set={nullifyAction}>
      {sendAccess && chosenContacts.length > 0 ? (
        <div className={styles.sendLinkWrap} onClick={checkContextMenu}>
          <header>
            <div className={styles.backbutton} onClick={() => setSendAccess(false)}>
              <img src="./assets/PrivateCabinet/arrow.svg" alt="img" />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>{__("Предоставьте доступ пользователям и группам")}</div>
            </div>
          </header>
          <main>
            <div className={styles.sendAccessWrap}>
              <div className={styles.contactWrap}>
                <div className={styles.listWrap}>{rendercontactsSend()}</div>
                <div className={styles.review}>
                  <span>{review.text}</span>
                  <img
                    src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
                    alt="copy"
                    className={context === "review" ? styles.imageReverse : ""}
                  />
                  {context === "review" ? renderView() : null}
                </div>
              </div>
              <div className={styles.notificationUserWrap} onClick={() => setNotify(!notify)}>
                <div className={notify ? styles.notifyEnable : styles.notifyDisable} />
                <span>{__("Уведомить пользователя")}</span>
              </div>
              <div className={styles.message}>
                <textarea placeholder="Добавить сообщение" value={prim} onChange={(e) => setPrim(e.target.value)} />
              </div>
              <div className={`${styles.folder}`}>
                <FolderIcon
                  className={`${styles.folderIcon} ${colors.filter((el) => el.color === folder.info.color)[0]?.name}`}
                />
                <div className={styles.folderInfo}>{folder.info.name}</div>
              </div>
              <div className={styles.buttonsWrap}>
                <div className={styles.cancel} onClick={() => setSendAccess(false)}>
                  {__("Отмена")}
                </div>
                <div className={styles.send} onClick={sendFolder}>
                  {__("Отправить")}
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : null}
      {!sendAccess || chosenContacts.length === 0 ? (
        <div className={styles.copyLinkWrap} onClick={checkContextMenu}>
          <header>
            <div className={styles.circle}>
              <CopyIcon className={styles.copyIcon} />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>{__("Скопируйте ссылку")}</div>
              <div className={styles.description}>
                {__("для того чтобы отправить ссылку нажмите кнопку копировать ссылку")}
              </div>
            </div>
          </header>
          <main>
            <div className={styles.copyLink}>
              <div className={styles.link}>{url}</div>
              <div className={styles.copy} onClick={copyLink}>
                {__("Копировать ссылку")}
              </div>
            </div>
            <div className={styles.accessUsers}>
              <div className={styles.infoWrap}>
                <div className={styles.circle}>
                  <UserIcon className={styles.userIcon} />
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>{__("Предоставьте доступ пользователям и группам")}</div>
                  <div className={styles.description}>{__("совместный доступ не настроен")}</div>
                </div>
              </div>
              <div className={styles.contacts} onClick={onOpenContacts}>
                <span>Контакты</span>
                <img
                  src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
                  alt="copy"
                  className={context === "addContacts" ? styles.imageReverse : ""}
                />
                {context === "addContacts" ? (
                  <div className={styles.contactsList}>
                    <div className={styles.contactsHeader}>
                      <img src={imageSrc + "assets/PrivateCabinet/notebook-of-contacts.svg"} alt="img" />
                      <span>{__("Контакты")}</span>
                    </div>
                    <div className={styles.line} />
                    <div className={styles.contactsSearchBar}>
                      <input type="text" placeholder={__("Введите имя или email")} />
                      <img src={imageSrc + "assets/PrivateCabinet/magnifying-glass-2.svg"} alt="img" />
                    </div>
                    <div className={styles.contactList}>{renderContacts()}</div>
                    <div className={styles.buttonWrap}>
                      <div
                        className={`${chosenContacts.length > 0 ? styles.button : styles.buttonDisabled}`}
                        onClick={() => setSendAccess(true)}
                      >
                        {__("Готово")}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.line} />
            <div className={styles.chosenUsers}>
              <div className={styles.infoWrap}>
                <div className={styles.circle}>
                  <WorldIcon className={styles.worldIcon} />
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>{__("Доступные пользователи, у которых есть ссылка")}</div>
                  <div className={styles.description}>{__("просматривать могут все у кого есть ссылка")}</div>
                </div>
              </div>
              <div className={styles.openList}>
                <img
                  src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
                  alt="copy"
                  className={context === "access" ? styles.imageReverse : ""}
                />
                {context === "access" ? (
                  <div className={styles.reviewOptions}>
                    <div className={styles.reviewOption} onClick={() => setAccess({ ...access, text: "limited" })}>
                      <div className={`${styles.radio} ${access.text === "limited" ? styles.radioChosen : ""}`} />
                      <div className={styles.description}>{__("Доступ ограниченный")}</div>
                    </div>
                    <div className={styles.reviewOption} onClick={() => setAccess({ ...access, text: "onLink" })}>
                      <div className={`${styles.radio} ${access.text === "onLink" ? styles.radioChosen : ""}`} />
                      <div>{__("Доступные пользователям, у которых есть ссылка")}</div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className={styles.review}>
                <span>{review.text}</span>
                <img
                  src={imageSrc + "assets/PrivateCabinet/play-black.svg"}
                  alt="copy"
                  className={context === "review" ? styles.imageReverse : ""}
                />
                {context === "review" ? renderView() : null}
              </div>
            </div>
          </main>
          <div className={styles.buttonsWrap}>
            <div className={styles.cancel} onClick={nullifyAction}>
              {__("Отмена")}
            </div>
            <div className={`${styles.add}`} onClick={saveChanges}>
              {__("Готово")}
            </div>
          </div>
        </div>
      ) : null}
      <input ref={linkRef} type="text" style={{ display: "none" }} />
    </PopUp>
  );
}

export default CopyLinkFolder;

CopyLinkFolder.propTypes = {
  nullifyAction: PropTypes.func,
  folder: projectFolderStructure,
  setShowSuccessMessage: PropTypes.func,
  setLoadingType: PropTypes.func
};
