import React, { useState, useEffect } from "react";
import styles from "./AddContact.module.sass";
import { imageSrc } from "../../../../../../../generalComponents/globalVariables";
import { ReactComponent as PhoneIcon } from "../../../../../../../assets/PrivateCabinet/phone-3.svg";
import { ReactComponent as MailIcon } from "../../../../../../../assets/PrivateCabinet/mail-3.svg";
import classNames from "classnames";
import ProfileUpload from "../../../../MyProfile/UserForm/ProfileUpload"

const AddContact = () => {
	const [userData, setUserData] = useState({})
	const [image, setImage] = useState(null)
	const [preview, setPreview] = useState(null)

	const messengers = ['viber', 'whatsapp', 'telegram', 'skype']
	const socials = ['twitter', 'linkedin', 'facebook', 'instagram', 'vk']


	const onChange = (key, value, group) => {
		if (key === 'phone') {
			value = value.replace(/\D/gim, '')
			const number = value.replace(/(\+)*(\()*(\))*\s*(-)*/g, '');
			const length = number.length;
			value = `${value && '+'}${number.substring(0, 2)}${length > 2 ? ' (' + number.substring(2, 5) : number.substring(2, 5)}${ length > 5 ? ') ' + number.substring(5, 8) : number.substring(5, 8)}${ length > 8 ? '-' + number.substring(8, 10) : number.substring(8, 10)}${length > 10 ? '-' + number.substring(10, number.length) : number.substring(10, number.length)}`;
		}

		setUserData(group
			? state => {return {...state, [group]: {...state[group], [key]: value}}}
			: state => {return {...state, [key]: value}})
	}

	const renderContactItem = (array, type) => {
		if (!array) return null;
		return array.map((placeholder, index) => {
			return (
				<div className={styles.inputWrap} key={type + index}>
					<div className={styles.iconWrap}>
						{type === "phone" ? <PhoneIcon /> : <MailIcon />}
					</div>
					<input
						className={styles.input}
						placeholder={placeholder}
						value={userData[type] || ''}
						onChange={(e) => onChange(type, e.target.value)}
					/>
				</div>
			);
		});
	};

    const renderSocialItem = (array, group) => {
		if (!array) return null;
		return array.map((item) => {
			return (
				<div className={styles.inputWrap} key={item}>
					<div className={classNames(styles.iconWrap, styles.iconWrap_soc)}>
                        <img width={30} height={30} src={`${imageSrc}assets/PrivateCabinet/socials/${item === 'skype' ? 'skype-2' : item}.svg`} alt={item} />
					</div>
					<input
						className={styles.input}
						placeholder={item[0].toUpperCase() + item.slice(1)}
						value={userData[group]?.[item] || ''}
						onChange={(e) => onChange(item, e.target.value, group)}
					/>
				</div>
			);
		});
	};

	const uploadImage = event => {
        const file = event.target.files[0] ?? null
        if (file && file.type.substr(0, 5) === 'image') {
            setImage(file)
        } else {
            setImage(null)
        }
    }


	useEffect(() => {
        if (image) {
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result)
            reader.readAsDataURL(image)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])


	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.avatar}>
					<ProfileUpload
						name='profileImg'
						preview={preview}
						onChange={uploadImage}
					/>
				</div>
			</div>
			<p className={styles.label}>
				<span className={styles.text}>{!preview ? "Загрузите фото контакта" : ""}</span>
			</p>
			<div className={styles.inputWrap}>
				<input
					className={styles.input}
					placeholder='Имя'
					value={userData.name || ''}
					onChange={(e) => onChange('name', e.target.value)}
				/>
			</div>
			<div className={styles.inputWrap}>
				<input
					className={styles.input}
					placeholder='Фамилия'
					value={userData.sname || ''}
					onChange={(e) => onChange('sname', e.target.value)}
				/>
			</div>
			<div className={styles.inputWrap}>
				<input
					className={styles.input}
					placeholder='Отчество'
					value={userData.pname || ''}
					onChange={(e) => onChange('pname', e.target.value)}
				/>
			</div>
			{renderContactItem(['Введите номер телефона'], "phone")}
            {renderContactItem(['Введите email'], "mail")}
            {renderSocialItem(socials, 'soc')}
			{renderSocialItem(messengers, 'mes')}
		</div>
	);
}

export default  AddContact;
