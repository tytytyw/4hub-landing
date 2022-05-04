import React, { useEffect, useState } from "react";

import styles from "./SendFriend.module.sass";
import PopUp from "../../../../../generalComponents/PopUp";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { ReactComponent as ChatIcon } from "../../../../../assets/PrivateCabinet/sms.svg";
import ContactSearch from "../Contacts/ContactList/ContactSearch/ContactSearch";
import RadioCheck from "./RadioCheck/RadioCheck";
import Button from "../Button";
import { useSelector } from "react-redux";
import {
  emptyProfileImage,
  getContactName,
  messengersIcons,
  titlesSoc,
} from "../Contacts/consts";
import api from "../../../../../api";
import classNames from "classnames";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const SendFriend = ({ set, selectedItem }) => {
  const { __ } = useLocales();
  const contacts = useSelector((state) => state.Cabinet.contactList);
  const uid = useSelector((state) => state.user.uid);

  const [to, setTo] = useState(null);
  const [selectedSoc, setSelectedSoc] = useState(null);
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState(contacts);

  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const filterArray = contacts.filter((item) => {
      const name = item.name.toLowerCase();
      const searchValue = search.toLowerCase();
      return name.includes(searchValue);
    });

    setContactList(filterArray);
  }, [search]); // eslint-disable-line

  const onSubmit = (event) => {
    event.preventDefault();

    if (selectedSoc && selectedContact) {
      api
        .get(`/ajax/contacts_send.php`, {
          params: {
            uid,
            id: selectedItem?.id,
            to,
            type: selectedSoc === "email" ? "email" : "sms",
          },
        })
        .then(() => {
          set(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <PopUp set={set}>
      <form noValidate onSubmit={onSubmit} className={styles.wrapper2}>
        <div className={styles.header}>
          <div className={styles.profileWrap}>
            <img
              className={styles.profileImg}
              src={selectedItem?.icon?.[0] || emptyProfileImage}
              alt="pie-chart"
            />
            <span>
              Поделиться контактом &nbsp;<b>{getContactName(selectedItem)}</b>
            </span>
          </div>
          <span className={styles.close} onClick={() => set(false)}>
            <span className={styles.times} />
          </span>
        </div>

        <div className={styles.share}>
          <div className={styles.blockTitle}>
            <span className={styles.titleIcon}>
              <ChatIcon />
            </span>
            <span className={styles.info}>{__("Поделиться с помощью:")}</span>
          </div>
          <div className={styles.socials}>
            <li
              onClick={() => {
                setSelectedSoc("email");
                setTo(selectedContact?.email?.[0]);
              }}
              className={classNames({
                [styles.socialsItem]: true,
                [styles.active]: selectedSoc === "email",
              })}
            >
              <img
                className={styles.socialIcon}
                src={imageSrc + "assets/PrivateCabinet/email.svg"}
                alt="Email"
              />
              <p>Email</p>
            </li>
            {selectedContact?.mes.map((item, index) => (
              <li
                onClick={() => {
                  setSelectedSoc(item?.type);
                  const messItem = selectedContact?.mes?.find(
                    (mess) => mess?.type === item?.type
                  );
                  setTo(messItem?.link);
                }}
                className={classNames({
                  [styles.socialsItem]: true,
                  [styles.active]: selectedSoc === item?.type,
                })}
                key={index}
              >
                <img
                  className={styles.socialIcon}
                  src={messengersIcons[item?.type]}
                  alt={titlesSoc[item?.type]}
                />
                <p>{titlesSoc[item?.type]}</p>
              </li>
            ))}
            <li className={styles.socialsItem}>
              <img
                className={styles.socialIcon}
                src={imageSrc + "assets/PrivateCabinet/more.svg"}
                alt="Email"
              />
              <p>{__("Ещё")}</p>
            </li>
          </div>
        </div>

        <div className={styles.contacts}>
          <div className={styles.contactsWrap}>
            <div className={styles.contactsTop}>
              <div className={styles.blockTitle}>
                <span className={styles.info}>{__("Контакты")}</span>
              </div>
              <div className={styles.search}>
                <ContactSearch onChangeHandler={(value) => setSearch(value)} />
              </div>
            </div>

            <ul className={styles.contactsList}>
              {contactList.map((item, index) => {
                if (item?.id === selectedItem?.id) return null;
                return (
                  <RadioCheck
                    item={item}
                    name="user_id"
                    key={index}
                    selected={selectedContact}
                    onChange={() => setSelectedContact(item)}
                  />
                );
              })}
            </ul>
          </div>
        </div>

        <div className={styles.actionBlock}>
          <Button type="submit" className={styles.actionBtn}>
            {__("Отправить")}
          </Button>
        </div>
      </form>
    </PopUp>
  );
};

export default SendFriend;

SendFriend.propTypes = {
  set: PropTypes.func,
  selectedItem: PropTypes.shape({
    id: PropTypes.string,
    icon: PropTypes.array,
  }),
};
