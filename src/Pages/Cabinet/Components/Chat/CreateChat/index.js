import classNames from "classnames";
import React, {useState} from "react";
import styles from "./CreateChat.module.sass";
import {useSelector} from "react-redux";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import CustomChatItem from '../CustomChatItem'

const CreateChat = ({title='Новая группа'}) => {
    const [search, setSearch] = useState("");
    const [selectedContact, setSelectedContact] = useState([]);

    const id_company = useSelector(state => state.user.id_company)
    const contactList = useSelector(state => id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList);

    const renderContactList = () =>
		contactList?.map((contact, i) => {
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
					setSelectedContact={(contact) => setSelectedContact(state => [...state, contact])}
					sideMenuCollapsed={false}
					chatItem={contact}
					key={'contact_'+contact.id}
                    title={`${contact?.sname} ${contact?.name}`}
                    subtitle={'в сети 29 мин. назад'}
					status={'в сети 29 мин. назад'}
                    avatar={contact?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
                    contextMenu='checkBox'
				/>
			);
		});

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={classNames(styles.backBtn, styles.button)}>
                    <div className={styles.arrow}></div>
                    Назад
                </div>
				<div className={styles.title}>{title}</div>
				<div className={classNames(styles.forwardBtn, styles.button)}>Далее</div>
			</div>
            <div className={styles.main}>
                <div className={styles.inputAreaWrap}>
                    <div className={styles.inputArea}>
                        <input className={styles.input} />
                    </div>
                </div>
                {renderContactList()}
            </div>
		</div>
	);
};

export default CreateChat;
