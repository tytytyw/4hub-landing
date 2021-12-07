import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Contacts.module.sass";
import ContactList from "./ContactList/ContactList";
import UserInfo from "./UserInfo/UserInfo";
import AddContact from "./AddContact/AddContact";
import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import api from "../../../../../../api";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { onGetCompanyContacts }  from "../../../../../../Store/actions/CabinetActions";

const Contacts = ({setLoadingType, setShowSuccessMessage}) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [action, setAction] = useState({ type: "", name: "", text: "" });
    const nullifyAction = () => setAction({ type: "", name: "", text: "" });

    const id_company = useSelector((state) => state.user.id_company);
	const uid = useSelector((state) => state.user.uid);
    const contactList = useSelector((state) => state.Cabinet.companyContactList);
    const dispatch = useDispatch();

    const deleteContact = () => {
        nullifyAction()
        api.get(`/ajax/org_contacts_del.php?uid=${uid}&id_company=${id_company}&id=${selectedItem.id}`)
        .then(() => {
            dispatch(onGetCompanyContacts(setShowSuccessMessage, 'Контакт удален'))
            // setShowSuccessMessage('Контакт удален')
            setSelectedItem(null)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => selectedItem ? nullifyAction() : '', [selectedItem])

	return (
		<div className={styles.wrapper}>
			<ContactList
                data={contactList}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                action={action.type}
                setAction={setAction} 
            />
            <div className={styles.content}>
                {selectedItem && <UserInfo  selectedItem={selectedItem} setAction={setAction} />}
                {action.type === 'addContact'
                    ? <AddContact nullifyAction={nullifyAction} setLoadingType={setLoadingType} setShowSuccessMessage={setShowSuccessMessage} />
                    : null}
            </div>
            {action.type === "deleteContact" ? (
				<ActionApproval
					name={action.name}
					text={action.text}
					set={nullifyAction}
					callback={deleteContact}
					approve={'Удалить'}
				>
                    <img
						className={styles.avatar}
						src={
							selectedItem?.icon?.[0] ||
							`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
						}
						alt="avatar"
					/>
                </ActionApproval>
			) : null}
		</div>
	);
};

export default Contacts;
