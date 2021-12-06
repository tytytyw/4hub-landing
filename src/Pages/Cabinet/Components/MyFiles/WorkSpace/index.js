import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "./WorkSpace.module.sass";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile";
import ServePanel from "../../ServePanel";
import BottomPanel from "../../BottomPanel";
import ContextMenu from "../../../../../generalComponents/ContextMenu";
import { contextMenuFile } from "../../../../../generalComponents/collections";
import ActionApproval from "../../../../../generalComponents/ActionApproval";
import File from "../../../../../generalComponents/Files";
import RecentFiles from "../../RecentFiles";
import CustomizeFile from "../../ContextMenuComponents/ContextMenuFile/CustomizeFile";
import ShareFile from "../../ContextMenuComponents/ContextMenuFile/ShareFile/ShareFile";
import OptionButtomLine from "../../WorkElements/OptionButtomLine";
import CopyLinkShare from '../../ContextMenuComponents/generalContextMenuComponents/CopyLinkShare';
import CreateZip from "../../ContextMenuComponents/ContextMenuFile/CreateZip";
import FileProperty from "../../ContextMenuComponents/ContextMenuFile/FileProperty";
import ItemsList from "../../MyFolders/ItemsList/ItemsList";
import {useElementResize} from "../../../../../generalComponents/Hooks";
import {onAddRecentFiles, onChooseFiles} from "../../../../../Store/actions/CabinetActions";

const WorkSpace = ({
	chosenFile,
	setChosenFile,
	listCollapsed,
	setItem,
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
	const recentFiles = useSelector((state) => state.Cabinet.recentFiles);
	const fileRef = useRef(null);
	const dispatch = useDispatch();
	const [containerRef, width] = useElementResize();

	const successLoad = () => {
		setFilesPage(2)
		setGLoader(false)
	}
	useEffect(() => {
		setFilesPage(0)
		setGLoader(true)
		dispatch(onAddRecentFiles())
		//TODO - Need to change request after server changes
		dispatch(onChooseFiles('global/video', '', 1, '', successLoad, '', 'file_list_all'))
	}, []); //eslint-disable-line

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
				ref={containerRef}
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
						width={width}
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
					setFilesPage={setFilesPage}
				/>
				<ItemsList
					setGLoader={setGLoader}
					setFilesPage={setFilesPage}
					setChosenFile={setChosenFile}
					filePick={filePick}
					setMouseParams={setMouseParams}
					setAction={setAction}
					setFilePreview={setFilePreview}
					filePreview={filePreview}
					setFilePick={setFilePick}
					callbackArrMain={callbackArrMain}
					chosenFile={chosenFile}
					fileLoading={fileLoading}
					fileSelect={fileSelect}
					filesPage={filesPage}
					chosenFolder={chosenFolder}
					gLoader={gLoader}
					fileRef={fileRef}
					width={width}
					menuItem={menuItem}
				/>

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
			{action.type === 'copyLink' ? <CopyLinkShare
                nullifyAction={nullifyAction}
                setShowSuccessMessage={setShowSuccessMessage}
            /> : null}
		</>
	);
};

export default WorkSpace;
