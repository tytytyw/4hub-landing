import React from "react";
import {useDispatch, useSelector} from "react-redux";
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
import {onSetPaint} from "../../../../../Store/actions/CabinetActions";


const ServePanel = ({selectedContact, setAction}) => {
    const dispatch = useDispatch();
	const paint = useSelector(state => state.Cabinet.paint);

	return (
		<div className={styles.chatBoardHeader}>
			{selectedContact ? (
				<div className={styles.groupName}>
					<img
						src={
							selectedContact?.icon?.[0] ||
							`${imageSrc}assets/PrivateCabinet/${selectedContact?.isGroup? 'chatGroup' : 'profile-noPhoto'}.svg`
						}
						alt="img"
						className={styles.avatar}
					/>
					<div className={styles.info}>
						<div
							className={styles.name}
						>{`${selectedContact?.sname || ''} ${selectedContact?.name || ''}`}</div>
						<div className={styles.status}>{selectedContact?.status || ''}</div>
					</div>
				</div>
			) : null}
			{selectedContact ? (
				<div className={styles.headerOptions}>
                    {(selectedContact.id_real_user && selectedContact.id_real_user !== '0') || selectedContact.isGroup ? <div
						onClick={() => setAction(selectedContact?.isGroup ? {type: 'addUsersToGroup'} : {type: 'addChat', chatsType: "groups", initialUser: selectedContact})}
						className={styles.iconView}
						title={selectedContact.isGroup ? 'Добавить участников в группу' : `Создать групповой чат с ${selectedContact.name}`}
					>
						<AddContactIcon title="" className={styles.addContactIcon} />
					</div> : null}
                    <div className={styles.iconView}><PhoneIcon /></div>
                    <div className={styles.iconView}><VideoIcon /></div>
                    <div className={styles.separating} />
                    <div className={styles.iconView}><CopyLinkIcon /></div>
                    <div
						className={classNames(styles.iconView, styles.PicInPicIcon)}
						onClick={() => dispatch(onSetPaint('mutualEdit', {...paint.mutualEdit, open: true, destination: 'global/all'}))}
					>
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
