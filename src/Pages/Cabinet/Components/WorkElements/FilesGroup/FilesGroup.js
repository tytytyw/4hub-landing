import React, {useState} from "react";
import {useSelector} from "react-redux";
import styles from "./FilesGroup.module.sass";
import WorkBars from "../WorkBars";
import FileBar from "../FileBar";
import classNames from "classnames";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import FileLine from "../FileLine";

function FilesGroup({
	fileList, filePick, index, fileLoading, fileSelect,
	filesPage, setFilesPage, title,
	fileRef, chosenFolder, gLoader, renderFiles
}) {

	const [collapse, setCollapse] = useState(true); //first one to collapse - index === 0
	const workElementsView = useSelector((state) => state.Cabinet.view);


	return (
		<div className={styles.fileWrap}>
			{fileList.length > 0 && <div
				onClick={() => {
					setCollapse(!collapse);
				}}
				className={styles.collapseHeader}
			>
				<p className={styles.dateName}>{title}</p>
				<div className={styles.buttonsWrap}>
					<button className={styles.collapseBtn}>
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
			</>}
		</div>
	);
}

export default FilesGroup;
