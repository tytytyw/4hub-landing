import React from "react";
import File from "../../../../../generalComponents/Files";
import styles from "./FileItem.module.sass";
import "../../../../../generalComponents/colors.sass";
import classNames from "classnames";
import {imageSrc} from '../../../../../generalComponents/globalVariables';

const FileItem = ({
	file,
	listCollapsed,
	mouseParams,
	setMouseParams,
	setChosenFile,
	setFilePreview,
	filePreview,
	chosen,
	filePick,
	setFilePick
}) => {

	const onPickFile = () => {
		if(filePick.show) {
			const isPicked = filePick.files.filter(el => el === file.fid);
			isPicked.length > 0 ? setFilePick({...filePick, files: filePick.files.filter(el => el !== file.fid)}) : setFilePick({...filePick, files: [...filePick.files, file.fid]});
		}
		setChosenFile(file);
	}

	return (
		<div
			className={classNames({[styles.file_wrap]: true, [styles.chosen]:chosen})}
			onClick={onPickFile}
			onDoubleClick={() => setFilePreview({...filePreview, view: true, file})}
		>
			<div className={styles.file_icon}>
				<File color={file.color} format={file.ext} />
			</div>
			{!listCollapsed && (
				<div className={styles.file_info}>
					<p className={styles.name}>{file.name}</p>
					<div className={styles.descr}>
						<span className={styles.file_date}>{file.ctime.split(" ")[0]}</span>
						<span className={styles.file_size}>{file.size_now}</span>
					</div>
				</div>
			)}
			<div className={styles.symbols}>
				{!listCollapsed && (
					<>
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
						<div>
							{file?.is_pass ? (
								<img src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt="lock"></img>
							) : null}
						</div>
					</>
				)}

				<div
					className={styles.file_menu}
					onClick={(e) => {
						setMouseParams({
							x: e.clientX,
							y: e.clientY,
							width: 200,
							height: 25,
						});
					}}
				>
					<span className={styles.dots}></span>
				</div>
			</div>
		</div>
	);
};

export default FileItem;
