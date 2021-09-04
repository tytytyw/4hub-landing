import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./FilesGroup.module.sass";
import WorkBars from "../../../WorkElements/WorkBars";
import WorkBarsPreview from "../../../WorkElements/WorkBarsPreview";
import FileLineShort from "../FileLineShort/index";
import FileBar from "../../WorkElements/FileBar";
import FileLine from "../../WorkElements/FileLine";
import classNames from "classnames";
import { ReactComponent as PlayIcon } from "../../../../../../assets/PrivateCabinet/play-grey.svg";

function FilesGroup({
	fileList,
	filePreview,
	setFilePreview,
	callbackArrMain,
	chosenFile,
	setChosenFile,
	filePick,
	setFilePick,
	setAction,
	setMouseParams,
	mounthName,
    index
}) {
	const [collapse, setCollapse] = useState(index === 0);
	const workElementsView = useSelector((state) => state.PrivateCabinet.view);

	const renderFiles = (Type, shareLink) => {
		if (!fileList || fileList.length === 0) return null;
		return fileList.files?.map((file, index) => (
			<Type
				key={index}
				file={file}
				setChosenFile={setChosenFile}
				chosenFile={chosenFile}
				setMouseParams={setMouseParams}
				setAction={setAction}
				filePreview={filePreview}
				setFilePreview={setFilePreview}
				setFilePick={setFilePick}
				filePick={filePick}
				chosen={
					filePick.show
						? filePick.files.findIndex((el) => el === file.fid) >= 0
						: chosenFile?.fid === file?.fid
				}
				callbackArrMain={callbackArrMain}
				shareLink={shareLink}
			/>
		));
	};

	return (
		<div className={styles.fileWrap}>
			{fileList?.files.length > 0 && <div
				onClick={() => {
					setCollapse(!collapse);
				}}
				className={styles.collapseHeader}
			>
				<p className={styles.dateName}>{mounthName}</p>
				<div className={styles.buttonsWrap}>
					<button className={styles.collapseBtn}>
						{fileList?.files.length ?? 0} объектов
					</button>
					<div
						className={classNames({
							[styles.arrowFile]: true,
							[styles.active]: !!collapse,
						})}
					>
						<PlayIcon
							className={classNames({
								[styles.playButton]: true,
								[styles.revert]: !!collapse,
							})}
						/>
					</div>
				</div>
			</div>}

			{collapse &&
				workElementsView !== "preview" &&
				workElementsView !== "workLinesPreview" && (
					<div className={styles.fileDate}>
						{/* TODO: заменить дату при получении сгруппированного на даты списка файлов  */}
						{fileList?.files.length > 0 && <p>10.08.2020</p>}
					</div>
				)}

			{workElementsView === "bars" && collapse ? (
				<WorkBars filePick={filePick} hideUploadFile={true}>{renderFiles(FileBar)}</WorkBars>
			) : null}

			{workElementsView === "lines" && collapse ? (
				<div className={styles.collapseContent}>
					{renderFiles(FileLine, true)}
				</div>
			) : null}

			{workElementsView === "preview" && collapse ? (
				<WorkBarsPreview
					file={chosenFile}
					filePick={filePick}
				>
					{renderFiles(FileBar)}
				</WorkBarsPreview>
			) : null}
			{workElementsView === "workLinesPreview" && collapse ? (
				<div>{renderFiles(FileLineShort, true)}</div>
			) : null}
		</div>
	);
}

export default FilesGroup;
