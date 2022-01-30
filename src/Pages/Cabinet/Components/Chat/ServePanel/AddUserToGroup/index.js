import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./AddUserToGroup.module.sass";

import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import SearchField from "../../../../../../generalComponents/SearchField";
import UsersList from "../../CreateChat/UsersList";

const AddUserToGroup = ({oldUsers}) => {
	const [search, setSearch] = useState("");
	const [selectedUsers, setSelectedUsers] = useState([]);
	const id_company = useSelector((state) => state.user.id_company);
	const contactList = useSelector((state) =>
		id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
	);
    const usersList = contactList.filter(contact => !oldUsers.some(oldUser => (oldUser.id === contact.id_real_user)))
	const changeSelectedContacts = (contact) => {
		const isSelected = selectedUsers.filter((c) => c.id === contact.id).length;
		setSelectedUsers((state) =>
			isSelected
				? state.filter((item) => item.id !== contact.id)
				: [contact, ...state]
		);
	};
    
	return (
		<ActionApproval
			set={() => console.log("() => set()")}
			callback={() => console.log("() => callback()")}
			name="Добавить участников в группу"
			approve="Добавить"
			childrenWidth={457}
		>
			<SearchField value={search} setValue={setSearch} />
			<div className={styles.usersList}>
				<UsersList
					//TODO: filter contactList
					usersList={usersList}
					search={search}
					selectedUsers={selectedUsers}
					setSelectedUsers={changeSelectedContacts}
					userContextMenu={"checkBox"}
				/>
			</div>
		</ActionApproval>
	)
};

export default AddUserToGroup;
