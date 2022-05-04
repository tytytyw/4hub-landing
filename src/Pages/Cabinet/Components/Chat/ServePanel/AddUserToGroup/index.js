import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AddUserToGroup.module.sass";

import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import SearchField from "../../../../../../generalComponents/SearchField";
import UsersList from "../../CreateChat/UsersList";
import Loader from "../../../../../../generalComponents/Loaders/4HUB";
import { onGetChatGroups } from "../../../../../../Store/actions/CabinetActions";

import api from "../../../../../../api";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const AddUserToGroup = ({ group, nullifyAction }) => {
  const { __ } = useLocales();
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const [search, setSearch] = useState("");
  const [loadingType, setLoadingType] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const id_company = useSelector((state) => state.user.id_company);
  const contactList = useSelector((state) =>
    id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
  );
  const usersList = contactList.filter(
    (contact) =>
      contact.is_user &&
      !group?.users?.some((oldUser) => oldUser.id === contact.id_real_user)
  );
  const uid = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();

  const changeSelectedContacts = (contact) => {
    const isSelected = selectedUsers.filter((c) => c.id === contact.id).length;
    setSelectedUsers((state) =>
      isSelected
        ? state.filter((item) => item.id !== contact.id)
        : [contact, ...state]
    );
  };

  const onSubmit = () => {
    if (selectedUsers.length) {
      setLoadingType("squarify");
      const formData = new FormData();
      const users = [...selectedUsers.map((user) => user.id_real_user)];
      formData.append("id_user_to", JSON.stringify(users));
      formData.append("id_group", group.id);
      api
        .post(`/ajax/chat_group_user_add.php?uid=${uid}`, formData)
        .then((res) => {
          if (res.data.ok) {
            dispatch(onGetChatGroups(group));
            nullifyAction();
          }
        })
        .finally(() => setLoadingType(""));
    }
  };

  return (
    <ActionApproval
      set={nullifyAction}
      callback={onSubmit}
      name={__("Добавить участников в группу")}
      approve={__("Добавить")}
      childrenWidth={457}
      disableActionBtn={!selectedUsers?.length}
      style={
        chatTheme.name === "dark"
          ? { background: "#272727", color: "#fff" }
          : {}
      }
    >
      <SearchField
        value={search}
        setValue={setSearch}
        style={
          chatTheme.name === "dark"
            ? { background: "#292929", color: "#fff" }
            : {}
        }
      />
      <div className={styles.usersList}>
        {usersList.length ? (
          <UsersList
            usersList={usersList}
            search={search}
            selectedUsers={selectedUsers}
            setSelectedUsers={changeSelectedContacts}
            userContextMenu={"checkBox"}
          />
        ) : (
          <div className={styles.noUsersMsg}>
            {__("все контакты уже добавлены в группу")}
          </div>
        )}
      </div>
      {loadingType ? (
        <Loader
          position="absolute"
          zIndex={10000}
          containerType="bounceDots"
          type="bounceDots"
          background="white"
          animation={false}
          width="100px"
          height="100px"
        />
      ) : null}
    </ActionApproval>
  );
};

export default AddUserToGroup;

AddUserToGroup.propTypes = {
  group: PropTypes.object.isRequired,
  nullifyAction: PropTypes.func.isRequired,
};
