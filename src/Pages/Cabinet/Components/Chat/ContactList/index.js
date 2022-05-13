import React, { useEffect } from "react";

import styles from "./ContactList.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { onGetContacts, onGetCompanyContacts } from "../../../../../Store/actions/CabinetActions";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { useCreateContactStatus } from "../../../../../generalComponents/chatHelper";
import classNames from "classnames";
import { ReactComponent as AddContactIcon } from "../../../../../assets/PrivateCabinet/addContact-2.svg";
import CustomChatItem from "../CustomChatItem";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const ContactList = ({ search, sideMenuCollapsed, setSelectedContact, setAction, currentDate, setMouseParams }) => {
  const { __ } = useLocales();
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const createContactStatus = useCreateContactStatus();
  const id_company = useSelector((state) => state.user.id_company);
  const contactList = useSelector((state) =>
    id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
  );
  const selectedContact = useSelector((state) => state.Cabinet.chat.selectedContact);
  const gmt = useSelector((state) => state?.user?.userInfo?.gmt); // server time zone
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(id_company ? onGetCompanyContacts() : onGetContacts());
  }, []); //eslint-disable-line

  const renderContactList = () =>
    contactList.map((contact) => {
      if (
        !(
          contact?.name?.toLowerCase().includes(search.toLowerCase()) ||
          contact?.sname?.toLowerCase().includes(search.toLowerCase())
        )
      )
        return null;
      return (
        <CustomChatItem
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
          sideMenuCollapsed={sideMenuCollapsed}
          chatItem={contact}
          key={"contact_" + contact.id}
          title={`${contact?.sname} ${contact?.name}`}
          subtitle={createContactStatus(
            contact.is_user,
            currentDate,
            contact.real_user_date_last,
            contact.is_online,
            gmt
          )}
          status={createContactStatus(
            contact.is_user,
            currentDate,
            contact.real_user_date_last,
            contact.is_online,
            gmt
          )}
          avatar={contact?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
          setMouseParams={setMouseParams}
          contextMenuList={"contact"}
        />
      );
    });

  return (
    <div
      className={classNames({
        [styles.listWrap]: true,
        [styles.darkTheme]: chatTheme.name === "dark"
      })}
    >
      <div
        className={classNames({
          [styles.item]: true,
          [styles.active]: false,
          [styles.addContact]: true
        })}
        onClick={() => {
          setAction({
            type: "addContact",
            name: __("Добавить контакт"),
            text: __("")
          });
          setSelectedContact(null);
        }}
        title={__("Добавить контакт")}
      >
        <div className={styles.iconWrap}>
          <AddContactIcon width={19} height={22} />
        </div>
        {sideMenuCollapsed ? "" : <span className={styles.text}>{__("Добавить контакт")}</span>}
      </div>
      {contactList ? <div className={styles.list}>{renderContactList()}</div> : null}
    </div>
  );
};

export default ContactList;

ContactList.propTypes = {
  search: PropTypes.string,
  sideMenuCollapsed: PropTypes.bool,
  setSelectedContact: PropTypes.func.isRequired,
  setAction: PropTypes.func.isRequired,
  currentDate: PropTypes.objectOf(PropTypes.string).isRequired,
  setMouseParams: PropTypes.func.isRequired
};
