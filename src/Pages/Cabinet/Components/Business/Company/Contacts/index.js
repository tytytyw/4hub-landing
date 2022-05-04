import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Contacts.module.sass";
import ContactList from "./ContactList/ContactList";
import UserInfo from "./UserInfo/UserInfo";
import AddContact from "./AddContact/AddContact";
import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import api from "../../../../../../api";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { onGetCompanyContacts } from "../../../../../../Store/actions/CabinetActions";
import ContextMenu from "../../../../../../generalComponents/ContextMenu";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { mouseParamsProps } from "../../../../../../types/MouseParams";

const Contacts = ({ setLoadingType, setShowSuccessMessage, mouseParams, setMouseParams, renderMenuItems }) => {
  const { __ } = useLocales();
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState({ type: "", name: "", text: "" });
  const nullifyAction = () => setAction({ type: "", name: "", text: "" });

  const id_company = useSelector((state) => state.user.id_company);
  const uid = useSelector((state) => state.user.uid);
  const contactList = useSelector((state) => state.Cabinet.companyContactList);
  const dispatch = useDispatch();

  const deleteContact = () => {
    nullifyAction();
    api
      .get(`/ajax/org_contacts_del.php?uid=${uid}&id_company=${id_company}&id=${selectedItem.id}`)
      .then(() => {
        dispatch(onGetCompanyContacts(setShowSuccessMessage, __("Контакт удален")));
        setSelectedItem(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const contextMenuContact = [
    { name: __("Поделиться"), img: "share", type: "shareContact" },
    { name: __("Редактировать"), img: "edit", type: "editContact" },
    { name: __("Удалить"), img: "garbage", type: "deleteContact" }
  ];
  const callbackArrMain = [
    {
      type: "deleteContact",
      name: __("Удаление контакта"),
      text: __(`Вы действительно хотите удалить контакт ${selectedItem?.name} ${selectedItem?.sname}?`),
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "editContact",
      name: __("Редактировать"),
      text: __(``),
      callback: (list, index) => setAction(list[index])
    }
  ];

  useEffect(() => (selectedItem ? nullifyAction() : ""), [selectedItem]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    () =>
      contactList && selectedItem ? setSelectedItem(contactList.filter((item) => item.id === selectedItem.id)[0]) : "",
    //eslint-disable-next-line
    [contactList]
  );

  return (
    <div className={styles.wrapper}>
      <ContactList
        data={contactList}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        action={action.type}
        setAction={setAction}
        setMouseParams={setMouseParams}
      />
      <div className={styles.content}>
        {selectedItem && action.type !== "editContact" && (
          <UserInfo selectedItem={selectedItem} setAction={setAction} />
        )}
        {action.type === "addContact" ? (
          <AddContact
            nullifyAction={nullifyAction}
            setLoadingType={setLoadingType}
            setShowSuccessMessage={setShowSuccessMessage}
            type="add"
          />
        ) : null}
        {action.type === "editContact" ? (
          <AddContact
            nullifyAction={nullifyAction}
            setLoadingType={setLoadingType}
            setShowSuccessMessage={setShowSuccessMessage}
            selectedItem={selectedItem}
            type="edit"
          />
        ) : null}
      </div>
      {action.type === "deleteContact" ? (
        <ActionApproval
          name={action.name}
          text={action.text}
          set={nullifyAction}
          callback={deleteContact}
          approve={__("Удалить")}
        >
          <img
            className={styles.avatar}
            src={selectedItem?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
            alt="avatar"
          />
        </ActionApproval>
      ) : null}
      {mouseParams !== null && mouseParams.type === "contextMenuContact" ? (
        <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={false}>
          <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuContact, callbackArrMain)}</div>
        </ContextMenu>
      ) : null}
    </div>
  );
};

export default Contacts;
Contacts.propTypes = {
  setLoadingType: PropTypes.func,
  setShowSuccessMessage: PropTypes.func,
  mouseParams: mouseParamsProps,
  setMouseParams: PropTypes.func,
  renderMenuItems: PropTypes.func
};
