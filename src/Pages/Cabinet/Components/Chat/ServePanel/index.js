import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ServePanel.module.sass";
import classNames from "classnames";
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import {ReactComponent as AddContactIcon} from "../../../../../assets/PrivateCabinet/addContact.svg";
import {ReactComponent as PhoneIcon} from "../../../../../assets/PrivateCabinet/phone-5.svg";
import {ReactComponent as VideoIcon} from "../../../../../assets/PrivateCabinet/film.svg";
import {ReactComponent as CameraIcon} from "../../../../../assets/PrivateCabinet/camera.svg";
import {ReactComponent as InfoIcon} from "../../../../../assets/PrivateCabinet/info-2.svg";
import {ReactComponent as CopyLinkIcon} from "../../../../../assets/PrivateCabinet/copy-link.svg";
import {ReactComponent as PictureIcon} from "../../../../../assets/PrivateCabinet/picture-2.svg";

const ServePanel = ({selectedContact}) => {
	return (
		<div className={styles.chatBoardHeader}>
			{selectedContact ? (
				<div className={styles.groupName}>
					<img
						src={
							selectedContact?.icon?.[0] ||
							`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`
						}
						alt="img"
						className={styles.avatar}
					/>
					<div className={styles.info}>
						<div
							className={styles.name}
						>{`${selectedContact?.sname} ${selectedContact?.name}`}</div>
						<div className={styles.status}>в сети 29 мин. назад</div>
					</div>
				</div>
			) : null}
			{selectedContact ? (
				<div className={styles.headerOptions}>
                    <div className={styles.iconView}><AddContactIcon className={styles.addContactIcon} /></div>
                    <div className={styles.iconView}><PhoneIcon /></div>
                    <div className={styles.iconView}><VideoIcon /></div>
                    <div className={styles.separating} />
                    <div className={styles.iconView}><CopyLinkIcon /></div>
                    <div className={classNames(styles.iconView, styles.PicInPicIcon)}>
                        <PictureIcon /><div className={styles.line} /><PictureIcon />
                    </div>
                    <div className={styles.iconView}><CameraIcon /></div>
                    <div className={styles.iconView}><InfoIcon /></div>
				</div>
			) : null}
		</div>
	);
};

export default ServePanel;
