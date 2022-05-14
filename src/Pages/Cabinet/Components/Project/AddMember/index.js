import React, { useEffect, useState } from "react";

import styles from "./AddMember.module.sass";
import PopUp from "../../../../../generalComponents/PopUp";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { ReactComponent as ChatIcon } from "../../../../../assets/PrivateCabinet/sms.svg";
import RadioCheck from "./RadioCheck/RadioCheck";
import { useSelector } from "react-redux";
import classNames from "classnames";
import {
  emptyProfileImage,
  getContactName,
  messengersData,
  messengersIcons,
  titlesSoc
} from "../../MyProfile/Contacts/consts";
import ContactSearch from "../../MyProfile/Contacts/ContactList/ContactSearch/ContactSearch";
import Button from "../../MyProfile/Button";
import { isCorrectData } from "../../MyProfile/Input/validation";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { selectedItemProps } from "../../../../../types/Contacts";

const AddMember = ({ set, selectedItem }) => {
  const { __ } = useLocales();
  const contacts = useSelector((state) => state.Cabinet.contactList);

  const [fields, setFields] = useState({});

  const [errors, setErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState({});
  const [blur, setBlur] = useState({});

  const [to, setTo] = useState(null);
  console.log(to);
  const [selectedSoc, setSelectedSoc] = useState(null);
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState(contacts);

  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const filterArray = contacts?.filter((item) => {
      console.log(getContactName(item));
      const name = getContactName(item).toLowerCase();
      const searchValue = search.toLowerCase();
      return name.includes(searchValue);
    });

    setContactList(filterArray);

    // eslint-disable-next-line
  }, [search]);

  const requiredInputs = ["name", "sname", "email", "pass", "password_r"];

  const onChangeHandler = (event) => {
    let { value, name } = event.target;

    if (!isCorrectData(value, name, fields, requiredInputs)) {
      setErrors({ ...errors, [name]: true });
    } else {
      setErrors({ ...errors, [name]: false });
      setSubmitErrors({ ...submitErrors, [name]: false });
    }

    setFields({ ...fields, [name]: value });
  };

  const onBlurHandler = (event) => {
    const { name } = event.target;
    setBlur({ ...blur, [name]: true });
  };

  //const isMistake = name => (errors?.[name] && blur?.[name]) || submitErrors?.[name]
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <PopUp set={set}>
      <form noValidate onSubmit={onSubmit} className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.profileWrap}>
            <img className={styles.profileImg} src={selectedItem?.icon?.[0] || emptyProfileImage} alt="pie-chart" />
            <span>{__("Дабавьте участника (ов)")}</span>
          </div>
          <span className={styles.close} onClick={() => set(false)}>
            <span className={styles.times} />
          </span>
        </div>

        <div className={styles.inputsBlock}>
          <div className={styles.block}>
            <label className={styles.label} htmlFor="name">
              {__("Имя Фамилия:")}
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder={__("Введите Ваше Имя и Фамилию")}
              value={fields?.name || ""}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
          </div>

          <div className={styles.block}>
            <label className={styles.label} htmlFor="email">
              {__("Email:")}
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder={__("Электронная почта ")}
              value={fields?.email || ""}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
          </div>

          <div className={styles.block}>
            <label className={styles.label} htmlFor="phone">
              {__("Телефон:")}
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder={__("Введите Ваш номер телефона")}
              value={fields?.phone || ""}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
          </div>
        </div>

        <div className={styles.share}>
          <div className={styles.blockTitle}>
            <span className={styles.titleIcon}>
              <ChatIcon />
            </span>
            <span className={styles.info}>{__("Поделиться с помощью:")}</span>
          </div>
          <ul className={styles.socials}>
            <li
              onClick={() => {
                setSelectedSoc("email");
                setTo(selectedContact?.email?.[0]);
              }}
              className={classNames({
                [styles.socialsItem]: true,
                [styles.active]: selectedSoc === "email"
              })}
            >
              <img className={styles.socialIcon} src={`${imageSrc}/assets/PrivateCabinet/email.svg`} alt="Email" />
              <p>Email</p>
            </li>
            {messengersData.map((item, index) => (
              <li
                onClick={() => {}}
                className={classNames({
                  [styles.socialsItem]: true,
                  [styles.active]: selectedSoc === item?.type
                })}
                key={index}
              >
                <img className={styles.socialIcon} src={messengersIcons[item?.type]} alt={titlesSoc[item?.type]} />
                <p>{titlesSoc[item?.type]}</p>
              </li>
            ))}
            <li className={styles.socialsItem}>
              <img className={styles.socialIcon} src={`${imageSrc}/assets/PrivateCabinet/more.svg`} alt="Email" />
              <p>{__("Ещё")}</p>
            </li>
          </ul>
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
              {contactList?.map((item, index) => {
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

export default AddMember;

AddMember.propTypes = {
  set: PropTypes.func,
  selectedItem: selectedItemProps
};
