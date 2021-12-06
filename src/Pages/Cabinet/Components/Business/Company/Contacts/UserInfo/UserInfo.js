import React from "react";
import styles from "./UserInfo.module.sass";
import { imageSrc } from "../../../../../../../generalComponents/globalVariables";
import { ReactComponent as ShareIcon } from "../../../../../../../assets/PrivateCabinet/share.svg";
import { ReactComponent as EditIcon } from "../../../../../../../assets/PrivateCabinet/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../../../../assets/PrivateCabinet/garbage.svg";
import { ReactComponent as PhoneIcon } from "../../../../../../../assets/PrivateCabinet/phone-3.svg";
import { ReactComponent as MailIcon } from "../../../../../../../assets/PrivateCabinet/mail-3.svg";
import classNames from "classnames";

function UserInfo({ selectedItem }) {
	const renderContactItem = (array, type) => {
		if (!array) return null;
		return array.map((value, index) => {
			return (
				<div className={styles.inputWrap} key={type + index}>
					<div className={styles.iconWrap}>
						{type === "phone" ? <PhoneIcon /> : <MailIcon />}
					</div>
					<input readOnly className={styles.input} value={value} />
				</div>
			);
		});
	};
    const renderSocialItem = (array) => {
		if (!array) return null;
		return array.map((item) => {
            if (item.type === 'skype') item.type = 'skype-2'
			return (
				<div className={styles.inputWrap} key={item.type}>
					<div className={classNames(styles.iconWrap, styles.iconWrap_soc)}>
                        <img width={30} height={30} src={`${imageSrc}assets/PrivateCabinet/socials/${item.type}.svg`} alt={item.type} />
					</div>
					<input readOnly className={styles.input} value={item.link} />
				</div>
			);
		});
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.emptyBlock}></div>
				<div className={styles.avatar}>
					<img
						className={styles.picture}
						src={
							selectedItem?.icon?.[0] ||
							`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
						}
						alt="avatar"
					/>
				</div>
				<div className={styles.buttons}>
					<div className={styles.iconView}>
						<ShareIcon className={styles.iconShare} />
					</div>

					<div className={styles.iconView}>
						<EditIcon className={styles.iconShare} />
					</div>

					<div className={styles.iconView}>
						<DeleteIcon height={17} className={styles.iconTrash} />
					</div>
				</div>
			</div>
			<p className={styles.name}>
				{`${selectedItem?.name} ${selectedItem?.sname}`}
			</p>

			{/* //TODO: рендер несольких номеров */}
			{/* mes:[link: '',type: 'viber'] */}
			{/* soc:[link: '',type: 'vk'] */}
			{/* <div className={styles.inputWrap}>
            <img className={styles.icon} src={`${imageSrc}assets/PrivateCabinet/socials/skype-2.svg`} alt='icon' />
                <input className={styles.input} value={selectedItem?.tel[0]} />
            </div>
            <div className={styles.inputWrap}>
            <img className={styles.icon} src={`${imageSrc}assets/PrivateCabinet/socials/skype-2.svg`} alt='icon' />
                <input className={styles.input} value={selectedItem?.email[0]} />
            </div>
            <div className={styles.inputWrap}>
                <img className={styles.icon} src={`${imageSrc}assets/PrivateCabinet/socials/skype-2.svg`} alt='icon' />
                <input className={styles.input} value={'+38 095 11 774'} />
            </div>
            <div className={styles.inputWrap}>
                <img className={styles.icon} src={`${imageSrc}assets/PrivateCabinet/socials/facebook.svg`} alt='icon' />
                <input className={styles.input} value={'+38 095 11 774'} />
            </div> */}
			{renderContactItem(selectedItem?.tel, "phone")}
            {renderContactItem(selectedItem?.email, "mail")}
            {renderSocialItem(selectedItem?.mes)}
            {renderSocialItem(selectedItem?.soc)}
		</div>
	);
}

export default UserInfo;
