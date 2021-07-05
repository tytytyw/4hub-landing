import React, {useState} from "react";
import { useSelector } from "react-redux";
import styles from "./WorkSpace.module.sass";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile";
import ServePanel from "../../ServePanel";
import WorkBars from "../../WorkElements/WorkBars";
import BottomPanel from "../../ButtomPanel";
import FileBar from "../../WorkElements/FileBar";
import WorkLines from "../../WorkElements/WorkLines";
import FileLine from "../../WorkElements/FileLine";
import WorkBarsPreview from "../../WorkElements/WorkBarsPreview";
import WorkLinesPreview from "../../WorkElements/WorkLinesPreview";
import ContextMenu from "../../../../../generalComponents/ContextMenu";
import { contextMenuFile } from "../../../../../generalComponents/collections";
import ActionApproval from "../../../../../generalComponents/ActionApproval";
import File from "../../../../../generalComponents/Files";
import RecentFiles from "../../RecentFiles";
import CustomizeFile from "../../CustomizeFile";
import ShareFile from "../../ContextMenuComponents/ContextMenuFile/ShareFile/ShareFile";
import OptionButtomLine from "../../WorkElements/OptionButtomLine";
import CopyLink from "../../ContextMenuComponents/ContextMenuFile/CopyLink/CopyLink";
import CreateZip from "../../CreateZip";
import FileProperty from "../../FileProperty";

const WorkSpace = ({
	setBlob,
	blob,
	chosenFile,
	setChosenFile,
	listCollapsed,
	setItem,
	workElementsView,
	setWorkElementsView,
	renderMenuItems,
	mouseParams,
	setMouseParams,
	action,
	setAction,
	nullifyAction,
	nullifyFilePick,
	callbackArrMain,
	additionalMenuItems,
	deleteFile,
	setFilePreview,
	filePreview,
	fileSelect,
	fileLoading,
	filePick,
	setFilePick,
	showLinkCopy,
	setShowLinkCopy,
	archiveFile,
	chosenFolder,
	showSuccessMessage,
	setShowSuccessMessage,
}) => {
	const fileList = useSelector((state) => state.PrivateCabinet.fileList);
	const recentFiles = useSelector((state) => state.PrivateCabinet.recentFiles);

	const [foundFiles, setFoundFiles] = useState(null)

	// Types of Files view
	const renderFiles = (Type) => {
		if (!fileList?.files) return null;
		const array = foundFiles ? foundFiles : fileList.files

		return array.map((file, i) => {
			return (
				<Type
					key={i}
					file={file}
					setChosenFile={setChosenFile}
					chosen={
						filePick.show
							? filePick.files.findIndex((el) => el === file.fid) >= 0
							: chosenFile?.fid === file?.fid
					}
					setMouseParams={setMouseParams}
					setAction={setAction}
					filePreview={filePreview}
					setFilePreview={setFilePreview}
					setFilePick={setFilePick}
					filePick={filePick}
				/>
			);
		});
	};

	const onActiveCallbackArrMain = (type) => {
        let index;
        callbackArrMain.forEach((el, i) => el.type === type ? index = i : undefined);
        callbackArrMain[index].callback(callbackArrMain, index);
    };

	return (
		<>
			<div
				className={`${styles.workSpaceWrap} ${
					listCollapsed ? styles.workSpaceWrapCollapsed : undefined
				}`}
			>
				<div className={styles.header}>
					<SearchField setChosenFile={setChosenFile} />
					<div className={styles.infoHeader}>
						<StorageSize />
						<Notifications />
						<Profile setItem={setItem} />
					</div>
				</div>
				{recentFiles?.length > 0 && (
					<RecentFiles
						setFilePreview={setFilePreview}
						filePreview={filePreview}
					/>
				)}
				<ServePanel
					setBlob={setBlob}
					blob={blob}
					setView={setWorkElementsView}
					view={workElementsView}
					chosenFile={chosenFile}
					setAction={setAction}
					fileSelect={fileSelect}
					chooseSeveral={() => setFilePick({...filePick, files: [], show: !filePick.show})}
					archive={() => onActiveCallbackArrMain('archive')}
                	share={() => onActiveCallbackArrMain('share')}
				/>
				{workElementsView === "bars" ? (
					<WorkBars
						fileLoading={fileLoading}
						fileSelect={fileSelect}
						filePick={filePick}
					>
						{renderFiles(FileBar)}
					</WorkBars>
				) : null}
				{workElementsView === "lines" ? (
					<WorkLines fileLoading={fileLoading}>
						{renderFiles(FileLine)}
					</WorkLines>
				) : null}
				{workElementsView === "preview" ? (
					<WorkBarsPreview file={chosenFile}>
						{renderFiles(FileBar)}
					</WorkBarsPreview>
				) : null}
				{workElementsView === "workLinesPreview" ? (
					<WorkLinesPreview
						file={chosenFile}
						hideFileList={true}
					></WorkLinesPreview>
				) : null}

				{filePick.show ? (
					<OptionButtomLine
						callbackArrMain={callbackArrMain}
						filePick={filePick}
						setFilePick={setFilePick}
						actionName={"Редактировать"}
						setAction={setAction}
						action={action}
						actionName={filePick.intoZip ? 'Сжать в Zip' : 'Редактировать'}
					/>
				) : null}
				<BottomPanel />
			</div>
			{mouseParams !== null ? (
				<ContextMenu
					params={mouseParams}
					setParams={setMouseParams}
					tooltip={true}
				>
					<div className={styles.mainMenuItems}>
						{renderMenuItems(contextMenuFile.main, callbackArrMain)}
					</div>
					<div className={styles.additionalMenuItems}>
						{renderMenuItems(contextMenuFile.additional, additionalMenuItems)}
					</div>
				</ContextMenu>
			) : null}
			{action.type === "delete" ? (
				<ActionApproval
					name={action.name}
					text={action.text}
					set={nullifyAction}
					callback={deleteFile}
					approve={"Удалить"}
				>
					<div className={styles.fileActionWrap}>
						<File format={chosenFile?.ext} color={chosenFile?.color} />
					</div>
				</ActionApproval>
			) : null}
			{action.type === "customize" || filePick.customize ? (
				<CustomizeFile
					title={
						filePick.customize ? `Редактировать выбранные файлы` : action.name
					}
					file={chosenFile}
					close={filePick.customize ? nullifyFilePick : nullifyAction}
					filePick={filePick}
					setFilePick={setFilePick}
				/>
			) : null}
			{action.type === "intoZip" ? (
				<CreateZip
					close={nullifyAction}
					file={chosenFile}
					title={action.name}
					info={chosenFolder}
					filePick={filePick}
                	nullifyFilePick={nullifyFilePick}
				/>
			) : null}
			<form
				style={{ display: "none" }}
				name="downloadFile"
				action="/ajax/download.php"
				method="post"
			>
				<input
					style={{ display: "none" }}
					name="fid"
					value={chosenFile?.fid || ""}
					readOnly
				/>
			</form>
			<iframe
				style={{ display: "none" }}
				title={"print"}
				frameBorder="0"
				scrolling="no"
				id="frame"
			/>
			{action.type === "share" ? (
				<ShareFile
					file={chosenFile}
					files={filePick.files}
					close={nullifyAction}
					action_type={action.type}
					showSuccessMessage={showSuccessMessage}
					setShowSuccessMessage={setShowSuccessMessage}
				/>
			) : null}
			{action.type === "resend" ? (
				<ShareFile
					file={chosenFile}
					files={filePick.files}
					close={nullifyAction}
					action_type={"send"}
					showSuccessMessage={showSuccessMessage}
					setShowSuccessMessage={setShowSuccessMessage}
				/>
			) : null}
			{action.type === "archive" ? (
				<ActionApproval
					name={action.name}
					text={action.text}
					set={nullifyAction}
					callback={archiveFile}
					approve={"Архивировать"}
				>
					<div className={styles.fileActionWrap}>
						<File format={chosenFile?.ext} color={chosenFile?.color} />
					</div>
				</ActionApproval>
			) : null}
			{action.type === "properties" ? (
				<FileProperty close={nullifyAction} file={chosenFile} />
			) : null}
			{showLinkCopy && (
				<CopyLink fid={chosenFile?.fid} setShowLinkCopy={setShowLinkCopy} />
			)}
		</>
	);
};

export default WorkSpace;
