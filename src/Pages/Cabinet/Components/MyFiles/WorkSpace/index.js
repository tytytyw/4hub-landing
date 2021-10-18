import React, {useEffect, useRef} from 'react';
import { useSelector } from "react-redux";
import styles from "./WorkSpace.module.sass";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile";
import ServePanel from "../../ServePanel";
import WorkBars from "../../WorkElements/WorkBars";
import BottomPanel from "../../BottomPanel";
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
import CustomizeFile from "../../ContextMenuComponents/ContextMenuFile/CustomizeFile";
import ShareFile from "../../ContextMenuComponents/ContextMenuFile/ShareFile/ShareFile";
import OptionButtomLine from "../../WorkElements/OptionButtomLine";
import CopyLink from "../../ContextMenuComponents/ContextMenuFile/CopyLink/CopyLink";
import CreateZip from "../../ContextMenuComponents/ContextMenuFile/CreateZip";
import FileProperty from "../../ContextMenuComponents/ContextMenuFile/FileProperty";

const WorkSpace = ({
	chosenFile,
	setChosenFile,
	listCollapsed,
	setItem,
	workElementsView,
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
    cancelArchive,
	fileAddCustomization,
	setFileAddCustomization,
	nullifyAddingSeveralFiles,
	saveCustomizeSeveralFiles,
	setLoadingType,
	filesPage,
	setFilesPage,
	gLoader,
    setGLoader,
	menuItem
}) => {
	const fileListAll = useSelector((state) => state.Cabinet.fileListAll);
	const recentFiles = useSelector((state) => state.Cabinet.recentFiles);
	const fileRef = useRef(null);

	useEffect(() => {
        if(fileListAll?.files.length <= 10) {
            setFilesPage(2);
            if(fileRef.current) {
                fileRef.current.scrollTop = 0;
            }
        }
    }, [fileListAll?.files, fileListAll?.path]); //eslint-disable-line

	// Types of Files view
	const renderFiles = (Type) => {
		
        if(!fileListAll?.files) return null;
		return fileListAll.files.map((file, i) => {
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
					callbackArrMain={callbackArrMain}
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
					<SearchField setChosenFile={setChosenFile} menuItem={menuItem} />
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
					chosenFile={chosenFile}
					setAction={setAction}
					fileSelect={fileSelect}
					archive={() => onActiveCallbackArrMain('archive')}
                	share={() => onActiveCallbackArrMain('share')}
					chooseSeveral={() => setFilePick({...filePick, files: [], show: !filePick.show})}
					filePick={filePick}
					fileAddCustomization={fileAddCustomization}
					setFileAddCustomization={setFileAddCustomization}
					addFile={fileSelect}
					menuItem={menuItem}
					setGLoader={setGLoader}
				/>
				{workElementsView === "bars" ? (
					<WorkBars
						filesPage={filesPage}
						setFilesPage={setFilesPage}
						gLoader={gLoader}
						fileRef={fileRef}
						fileLoading={fileLoading}
						fileSelect={fileSelect}
						filePick={filePick}
						hideUploadFile={fileListAll === null}
					>
						{renderFiles(FileBar)}
					</WorkBars>
				) : null}
				{workElementsView === "lines" ? (
					<WorkLines
						filesPage={filesPage}
						setFilesPage={setFilesPage}
						gLoader={gLoader}
						fileRef={fileRef}
						fileLoading={fileLoading}
						filePick={filePick}
					>
						{renderFiles(FileLine)}
					</WorkLines>
				) : null}
				{workElementsView === "preview" ? (
					<WorkBarsPreview
						filesPage={filesPage}
						setFilesPage={setFilesPage}
						gLoader={gLoader}
						fileRef={fileRef}
						file={chosenFile}
						filePick={filePick}
					>
						{renderFiles(FileBar)}
					</WorkBarsPreview>
				) : null}
				{workElementsView === "workLinesPreview" ? (
					<WorkLinesPreview
						filesPage={filesPage}
						setFilesPage={setFilesPage}
						gLoader={gLoader}
						fileRef={fileRef}
						file={chosenFile}
						hideFileList={true}
						filePick={filePick}
					/>
				) : null}

				{filePick.show ? (
					<OptionButtomLine
						callbackArrMain={callbackArrMain}
						filePick={filePick}
						setFilePick={setFilePick}
						actionName={filePick.intoZip ? 'Сжать в Zip' : 'Редактировать'}
						setAction={setAction}
						action={action}
						nullifyFilePick={nullifyFilePick}
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
					name={filePick.show ? 'Удаление файлов' : action.name}
					text={filePick.show ? 'Вы действительно хотите удалить выбранные файлы?' : action.text}
					set={cancelArchive}
					callback={deleteFile}
					approve={'Удалить'}
				>
					<div className={styles.fileActionWrap}>
						<File format={filePick.show ? 'FILES' : chosenFile?.ext} color={chosenFile?.color} />
					</div>
				</ActionApproval>
			) : null}
			{action.type === 'customize' || filePick.customize || fileAddCustomization.several ? <CustomizeFile
            title={filePick.customize ||  fileAddCustomization?.several ? `Редактировать выбранные файлы` : action.name }
            info={chosenFolder}
            file={chosenFile}
            // TODO - Check Cancellation for FilePick
            close={filePick.customize ? nullifyFilePick : fileAddCustomization.several ? nullifyAddingSeveralFiles : nullifyAction}
            filePick={filePick}
            setFilePick={setFilePick}
            fileAddCustomization={fileAddCustomization}
            setFileAddCustomization={setFileAddCustomization}
            saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
            setLoadingType={setLoadingType}
        /> : null}
			{action.type === "intoZip" ? (
				<CreateZip
					close={nullifyAction}
					file={chosenFile}
					title={action.name}
					info={chosenFolder}
					filePick={filePick}
                	nullifyFilePick={nullifyFilePick}
					setShowSuccessMessage={setShowSuccessMessage}
					setLoadingType={setLoadingType}
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
					setLoadingType={setLoadingType}
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
					setLoadingType={setLoadingType}
				/>
			) : null}
			{action.type === "archive" ? (
				<ActionApproval
					name={filePick.show ? 'Архивировать выбранные файлы' : action.name}
					text={filePick.show ? ' Вы действительно хотите переместить в архив выбранные файлы?' : action.text}
					set={cancelArchive}
					callback={archiveFile}
					approve={'Архивировать'}
				>
					<div className={styles.fileActionWrap}>
						<File format={filePick.show ? 'FILES' : chosenFile?.ext} color={chosenFile?.color} />
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
