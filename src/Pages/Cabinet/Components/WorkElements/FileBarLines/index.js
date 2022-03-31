import React from "react";

import styles from "./FileBarLines.module.sass";
import File from "../../../../../generalComponents/Files";
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import { ReactComponent as UploadIcon } from "../../../../../assets/PrivateCabinet/upload.svg";
import { ReactComponent as PrintIcon } from "../../../../../assets/PrivateCabinet/print.svg";
import { ReactComponent as SettingsIcon } from "../../../../../assets/PrivateCabinet/settings.svg";

import { ReactComponent as ShareIcon } from "../../../../../assets/PrivateCabinet/share.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/PrivateCabinet/delete.svg";
import {onSetModals} from "../../../../../Store/actions/CabinetActions";
import {useDispatch, useSelector} from "react-redux";

const FileBar = ({ file, chosen, setChosenFile }) => {

	const dispatch = useDispatch();
	const previewFile = useSelector(s => s.Cabinet.modals.previewFile);
	const handleDoubleClick = () => dispatch(onSetModals('previewFile', {...previewFile, open: true, file}));

	return (
		<div
			className={`${styles.fileBar} ${chosen ? styles.fileBarChosen : null}`}
			onClick={() => setChosenFile(file)}
			onDoubleClick={handleDoubleClick}
		>
			<div className={styles.file_wrap}>
				<div className={styles.wrap_left}>
					<div className={styles.file_icon}>
						<File color={file.is_write === '0' ? '#C1C1C1' : file.color} format={file.ext} />
					</div>
					<div className={styles.file_info}>
						<p className={styles.name}>{file.name}</p>
						<div className={styles.descr}>
							<div className={styles.descr_wrap}>
								<span className={styles.file_date}>
									{file.ctime.split(" ")[0]}
								</span>
								<span className={styles.file_size}>{file.size_now}</span>
							</div>
							<div className={styles.symbols}>
								<div>
									{file?.is_pass ? (
										<img
											src={`${imageSrc}assets/PrivateCabinet/locked.svg`}
											alt="lock"
										/>
									) : null}
								</div>
								<div>
									{file?.fig ? (
										<img
											src={`${imageSrc}assets/PrivateCabinet/signs/${file.fig}.svg`}
											alt="fig"
										/>
									) : null}
								</div>
								<div>
									{file?.emo ? (
										<img
											src={`${imageSrc}assets/PrivateCabinet/smiles/${file.emo}.svg`}
											alt="emoji"
										/>
									) : null}
								</div>

								<div className={file.tag ? styles.ftag : styles.fEmtyTag}>
									{file.tag ? `#${file.tag}` : null}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.buttons}>
					<div className={styles.iconView}>
						<UploadIcon  className={styles.UploadIcon} />
					</div>
					<div className={styles.iconView}>
						<PrintIcon className={styles.PrintIco} />
					</div>
					<div className={styles.iconView}>
						<SettingsIcon className={styles.SettingsIco} />
					</div>
					<div className={styles.iconView}>
						<DeleteIcon className={styles.DeleteIcon} />
					</div>
					<div className={styles.iconView}>
						<ShareIcon className={styles.ShareIcon} />
					</div>

					<div className={styles.file_menu}>
						<span className={styles.dots}/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FileBar;
