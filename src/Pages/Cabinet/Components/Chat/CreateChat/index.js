import classNames from "classnames";
import React, { useState, useEffect } from "react";
import styles from "./CreateChat.module.sass";
import { useSelector } from "react-redux";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import CustomChatItem from "../CustomChatItem";
import ProfileUpload from "../../../Components/MyProfile/UserForm/ProfileUpload";
import AvatarBackground from '../../../../../assets/PrivateCabinet/circle.svg'

const CreateChat = ({ title = "Новая группа", maxCountUsers=200000, nullifyAction }) => {
	const [search, setSearch] = useState("");
	const [selectedContacts, setSelectedContact] = useState([]);
	const [step, setStep] = useState("one");
    const [previewAvatar, setPreviewAvatar] = useState(null)
    const [image, setImage] = useState(null)
    const [groupName, setGroupName] = useState('')

	const id_company = useSelector((state) => state.user.id_company);
	const contactList = useSelector((state) =>
		id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
	);

	const changeSelectedContacts = (contact) => {
		const isSelected = selectedContacts.filter(
			(c) => c.id === contact.id
		).length;
		setSelectedContact((state) =>
			isSelected
				? state.filter((item) => item.id !== contact.id)
				: [...state, contact]
		);
	};

	const renderSelectedContacts = () => {
		if (!selectedContacts) return null;
		return selectedContacts.map((contact) => {
			return (
				<div className={styles.contact_wrap} key={contact.id}>
					<img
						className={styles.avatar}
						src={
							contact?.icon?.[0] ||
							`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
						}
						alt="avatar"
					/>
					<span className={styles.name}>{`${contact?.sname || ""} ${
						contact?.name || ""
					}`}</span>
				</div>
			);
		});
	};

    const uploadImage = event => {
        const file = event.target.files[0] ?? null
        setImage((file && file.type.substr(0, 5) === 'image') ? file : null)
    }

    const onExit = () => {
        setPreviewAvatar(null)
        setImage(null)
        nullifyAction()
    }

	useEffect(() => {
		setSearch("");
	}, [selectedContacts]);

    useEffect(() => {
        if (image) {
            const reader = new FileReader()
            reader.onloadend = () => setPreviewAvatar(reader.result)
            reader.readAsDataURL(image)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])

    useEffect(() => {
        return () => onExit()
    }, []) //eslint-disable-line

    useEffect(() => {
        if (step === 'exit') onExit() 
    }, [step]) //eslint-disable-line

	const renderContactList = (contactList) =>
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
					selectedContact={selectedContacts}
					setSelectedContact={
						step === "one" ? changeSelectedContacts : () => {}
					}
					sideMenuCollapsed={false}
					chatItem={contact}
					key={"contact_" + contact.id}
					title={`${contact?.sname} ${contact?.name}`}
					subtitle={"в сети 29 мин. назад"}
					status={"в сети 29 мин. назад"}
					avatar={
						contact?.icon?.[0] ||
						`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
					}
					contextMenu={step === "one" ? "checkBox" : ""}
					disableHover={step === "two"}
				/>
			);
		});

        const stepHandler = (direction) => {
            // for create group
            if (maxCountUsers > 1) {
                if (direction === 'forward' && selectedContacts.length) setStep("two")
                if (direction === 'back') {
                    setStep(step => step === "two" ? 'one' : 'exit')
                }
            }
        }

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={classNames(styles.backBtn, styles.button)} onClick={() => stepHandler('back')}>
					<div className={styles.arrow}></div>
					Назад
				</div>
				<div className={styles.title}>
                    {maxCountUsers > 1 && step === 'one' ? `Выберите пользователей ${selectedContacts.length}/${new Intl.NumberFormat('ru-RU').format(maxCountUsers)}` : ''}
                    {step === 'two'? title : ''}
                </div>
				<div
					className={classNames({
						[styles.forwardBtn]: true,
						[styles.button]: true,
						[styles.disable]: !selectedContacts.length || (step === "two" && !groupName),
					})}
					onClick={() => stepHandler('forward')}
				>
					{step === "one" ? 'Далее' : ''}
                    {step === "two" ? 'Создать' : ''}
				</div>
			</div>
			<div className={styles.main}>
				{step === "one" ? (
					<div className={styles.inputAreaWrap}>
						<div className={styles.inputArea}>
							<input
								className={styles.input}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							{renderSelectedContacts()}
						</div>
					</div>
				) : (
					<div className={styles.groupSettings}>
						<div className={styles.avatar}>
							<ProfileUpload
								name="profileImg"
								preview={previewAvatar}
								onChange={uploadImage}
                                background={AvatarBackground}
							/>
						</div>
                        <input value={groupName} onChange={e => setGroupName(e.target.value)} className={styles.name} placeholder="Введите имя группы" />
					</div>
				)}
				<div className={styles.contactsList}>
					{renderContactList(step === "one" ? contactList : selectedContacts)}
				</div>
			</div>
		</div>
	);
};

export default CreateChat;
