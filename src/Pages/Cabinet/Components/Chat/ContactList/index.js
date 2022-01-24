import React, { useEffect } from "react";

import styles from "./ContactList.module.sass";
import { useDispatch, useSelector } from "react-redux";
import {
	onGetContacts,
	onGetCompanyContacts,
} from "../../../../../Store/actions/CabinetActions";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { createContactStatus } from "../../../../../generalComponents/chatHelper";
import classNames from "classnames";
import { ReactComponent as AddContactIcon } from "../../../../../assets/PrivateCabinet/addContact-2.svg";
import CustomChatItem from "../CustomChatItem";

const ContactList = ({
	search,
	sideMenuCollapsed,
	selectedContact,
	setSelectedContact,
	setAction,
	currentDate,
}) => {
	const id_company = useSelector((state) => state.user.id_company);
	const contactList = useSelector((state) =>
		id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(id_company ? onGetCompanyContacts() : onGetContacts());
	}, []); //eslint-disable-line

	const renderContactList = () =>
		contactList.map((contact, i) => {
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
					subtitle={createContactStatus(contact.is_user, currentDate, contact.real_user_date_last, contact.is_online, contact.real_user_date_gmt)}
					status={createContactStatus(contact.is_user, currentDate, contact.real_user_date_last, contact.is_online, contact.real_user_date_gmt)}
					avatar={
						contact?.icon?.[0] ||
						`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
					}
				/>
			);
		});

	return (
		<div className={styles.listWrap}>
			<div
				className={classNames({
					[styles.item]: true,
					[styles.active]: false,
					[styles.addContact]: true,
				})}
				onClick={() => {
					setAction({ type: "addContact", name: "Добавить контакт", text: "" });
					setSelectedContact(null);
				}}
				title="Добавить контакт"
			>
				<div className={styles.iconWrap}>
					<AddContactIcon width={19} height={22} />
				</div>
				{sideMenuCollapsed ? (
					""
				) : (
					<span className={styles.text}>Добавить контакт</span>
				)}
			</div>
			{contactList ? (
				<div className={styles.list}>{renderContactList()}</div>
			) : null}
		</div>
	);
};

export default ContactList;
