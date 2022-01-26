import React from "react";

import styles from "./FileLine.module.sass";
import File from "../../../../../../generalComponents/Files";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
// import {ReactComponent as DownLoadIcon} from '../../../../../../assets/PrivateCabinet/download.svg'
import { ReactComponent as PrintIcon } from "../../../../../../assets/PrivateCabinet/print.svg";
// import {ReactComponent as SettingsIcon} from '../../../../../../assets/PrivateCabinet/settings.svg'
// import {ReactComponent as DeleteIcon} from '../../../../../../assets/PrivateCabinet/delete.svg'
import { ReactComponent as ShareIcon } from "../../../../../../assets/PrivateCabinet/share.svg";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { ReactComponent as FolderIcon } from "../../../../../../assets/PrivateCabinet/folder-2.svg";
import { ReactComponent as ArrowIcon } from "../../../../../../assets/PrivateCabinet/play-grey.svg";
import { colors } from "../../../../../../generalComponents/collections";

const FileLine = ({
	file,
	setChosenFile,
	chosen,
	setMouseParams,
	setAction,
	setFilePreview,
	filePreview,
	filePick,
	setFilePick,
	callbackArrMain,
	folderSelect,
	openFolderMenu,
	sideMenuChosenItem,
}) => {
	const size = useSelector((state) => state.Cabinet.size);

	//TODO: get actual avatar and name from api
	const avatarSrc = useSelector((state) => state?.user?.userInfo?.icon[0]);
	const ownerName =
		(useSelector((state) => state?.user?.userInfo?.name) || "") +
		" " +
		(useSelector((state) => state?.user?.userInfo?.sname) || "");

	const printFile = () => {
		setTimeout(() => {
			callbackArrMain.forEach((item) => {
				if (item.type === "print") item.callback(file);
			});
		}, 0);
	};

	const onShareFile = () => {
		setTimeout(() => {
			callbackArrMain.forEach((item) => {
				if (item.type === "share") setAction(item);
			});
		}, 0);
	};

	const onPickFile = () => {
		if (filePick.show) {
			const isPicked = filePick.files.filter((el) => el === file?.fid);
			isPicked.length > 0
				? setFilePick({
						...filePick,
						files: filePick.files.filter((el) => el !== file?.fid),
				  })
				: setFilePick({ ...filePick, files: [...filePick.files, file?.fid] });
		}
		setChosenFile(file);
	};

	const handleDoubleClick = () => {
		if (file?.is_dir) {
			folderSelect(file);
		} else {
			setFilePreview({ ...filePreview, view: true, file });
		}
	};

	return (
		<div
			onClick={onPickFile}
			onDoubleClick={handleDoubleClick}
			className={classNames({
				[styles.wrapper]: true,
				[styles.active]: chosen,
				[styles?.[`wrapper_${size}`]]: size !== "medium",
			})}
		>
			<div className={styles.fileAbout}>
				<div
					className={`${styles.file} ${file?.is_dir ? styles.fileFolder : ""}`}
				>
					{file?.is_dir ? (
						<FolderIcon
							className={`${styles.folderIcon} ${
								colors.filter((el) => el.color === file?.color)[0]?.name
							}`}
						/>
					) : (
						<File
							color={file?.is_write === "0" ? "#C1C1C1" : file?.color}
							format={file?.ext}
							className={styles.mainFile}
						/>
					)}
				</div>

				<div className={styles.infoWrap}>
					<div title={file?.name} className={styles.fileName}>
						{file?.name && file?.name.slice(0, file?.name.lastIndexOf("."))}
					</div>

					<div className={styles.fileInfo}>
						<span className={styles.fileDate} title={file?.ctime?.split(" ")[0]}>{file?.ctime?.split(" ")[0]}</span>
						<span className={styles.fileSize} title={file?.size_now}>{file?.size_now}</span>
						{size !== "small" && (
							<div className={styles.symbols}>
								{file?.is_pass === 1 && (
									<img
										className={styles.locked}
										src={`${imageSrc}assets/PrivateCabinet/locked.svg`}
										alt="lock"
									/>
								)}
								{file?.fig && (
									<img
										className={styles.sign}
										src={`${imageSrc}assets/PrivateCabinet/signs/${file?.fig}.svg`}
										alt="sign"
									/>
								)}
								{file?.emo && (
									<img
										className={styles.smile}
										src={`${imageSrc}assets/PrivateCabinet/smiles/${file?.emo}.svg`}
										alt="emoji"
									/>
								)}
							</div>
						)}
					</div>
				</div>

				{size === "small" && (
					<div className={styles.symbols}>
						{file?.is_pass === 1 && (
							<img
								className={styles.locked}
								src={`${imageSrc}assets/PrivateCabinet/locked.svg`}
								alt="lock"
							/>
						)}
						{file?.fig && (
							<img
								className={styles.sign}
								src={`${imageSrc}assets/PrivateCabinet/signs/${file?.fig}.svg`}
								alt="sign"
							/>
						)}
						{file?.emo && (
							<img
								className={styles.smile}
								src={`${imageSrc}assets/PrivateCabinet/smiles/${file?.emo}.svg`}
								alt="emoji"
							/>
						)}
					</div>
				)}
			</div>
			<div className={styles.actionBlock}>
				<div className={styles.settingWrap}>
					{sideMenuChosenItem === "sharedI" && <span></span>}
					<button className={styles.setting}>Только просмотр</button>
					{sideMenuChosenItem === "sharedI" ? (
						<span className={styles.arrowIcon}>
							<ArrowIcon />
						</span>
					) : null}
				</div>
				<img
					alt="avatar"
					className={styles.ownerAvatar}
					src={avatarSrc}
					title={ownerName}
				/>
				<span className={styles.storageInfo}>
					Срок хранения: Осталось (8дней)
				</span>
				<div className={styles.optionsWrap}>
					{file?.ext !== "ZIP" && file?.is_dir !== 1 && (
						<div className={styles.iconView}>
							<PrintIcon onClick={printFile} />
						</div>
					)}

					<div className={classNames(styles.iconView, styles.iconShare)}>
						<ShareIcon onClick={onShareFile} />
					</div>

					<div
						className={styles.menuWrap}
						onClick={(e) => {
							file?.is_dir
								? openFolderMenu(e, file)
								: setMouseParams({
										x: e.clientX,
										y: e.clientY,
										width: 240,
										height: 25,
								  });
						}}
					>
						<span className={styles.menu} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default FileLine;
