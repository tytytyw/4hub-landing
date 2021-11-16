import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import styles from "./FilesGroup.module.sass";
import WorkBars from "../WorkBars";
import FileBar from "../FileBar";
import classNames from "classnames";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import FileLine from "../FileLine";
import FileLineShort from "../FileLineShort";

function FilesGroup({
	fileList, filePick, index, fileLoading, fileSelect,
	filesPage, setFilesPage, title, setChosenFolder,
	fileRef, chosenFolder, gLoader, renderFiles, params = null
}) {

	const [collapse, setCollapse] = useState(true); //first one to collapse - index === 0
	const workElementsView = useSelector((state) => state.Cabinet.view);
	const workBarsPreviewGroupRef = useRef(null);

	const handleChangeGroup = () => {
		setChosenFolder(state => ({...state, group: {title, amount: fileList?.length}}))
	}

	return (
		<>
			{workElementsView === "preview"
				? <div
					className={styles.group}
					ref={workBarsPreviewGroupRef}
					onClick={handleChangeGroup}
				>{renderFiles(FileBar, fileList)}</div>
				: <div className={styles.fileWrap}>
				{fileList.length > 0 && <div
					onClick={() => {
						setCollapse(!collapse);
					}}
					className={styles.collapseHeader}
				>
					<p className={`${styles.dateName} ${workElementsView === "workLinesPreview" ? styles.dateNameShort : ''}`}>{title}</p>
					<div className={styles.buttonsWrap}>
						<button className={`${styles.collapseBtn} ${workElementsView === "workLinesPreview" ? styles.collapseBtnShort : ''}`}>
							{fileList.length ?? 0} объектов
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
				<>
					{workElementsView === "bars" && (
						<WorkBars
							filePick={filePick}
							fileLoading={fileLoading}
							fileSelect={fileSelect}
							filesPage={filesPage}
							setFilesPage={setFilesPage}
							fileRef={fileRef}
							chosenFolder={chosenFolder}
							gLoader={gLoader}
							hideUploadFile={true}
						>{renderFiles(FileBar, fileList)}</WorkBars>
					)}
					{workElementsView === "lines" && (
						<div className={styles.collapseContent}>
							{renderFiles(FileLine, fileList)}
						</div>
					)}
					{workElementsView === "workLinesPreview" && (
						<div className={styles.collapseContentShort}>
							{renderFiles(FileLineShort, fileList, params)}
						</div>
					)}
				</>}
			</div>}
		</>
	);
}

export default FilesGroup;
