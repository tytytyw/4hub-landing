import React from "react";
import {useSelector} from 'react-redux'
import styles from "../FileLine.module.sass"

import File from '../../../../../../generalComponents/Files'
import {imageSrc} from '../../../../../../generalComponents/globalVariables';
import {ReactComponent as FolderIcon} from "../../../../../../assets/PrivateCabinet/folder-2.svg";
import {colors} from "../../../../../../generalComponents/collections";


const FileInfo = ({file}) => {
    const size = useSelector(state => state.Cabinet.size)

	return (
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
				<div className={styles.fileName}>
					{file?.name && file?.name.slice(0, file?.name.lastIndexOf("."))}
				</div>

				<div className={styles.fileInfo}>
					<span className={styles.fileDate}>{file?.ctime?.split(" ")[0]}</span>
					<span className={styles.fileSize}>{file?.size_now}</span>
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
	);
};

export default FileInfo