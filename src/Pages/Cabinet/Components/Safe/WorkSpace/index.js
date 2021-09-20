import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./WorkSpace.module.sass";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile";
import ServePanel from "../../ServePanel";
import BottomPanel from "../../BottomPanel";
import WorkLinesPreview from "../WorkElements/WorkLinesPreview";
import WorkBarsPreview from "../WorkElements/WorkBarsPreview";
import WorkBars from "../WorkElements/WorkBars";
import WorkLines from "../WorkElements/WorkLines";
import FileBar from "../../WorkElements/FileBar";
import FileLine from "../../WorkElements/FileLine";
import FileLineShort from "../FileLineShort";
import ContextMenu from "../../../../../generalComponents/ContextMenu";
import { contextMenuFile } from "../../../../../generalComponents/collections";
import ContextMenuItem from "../../../../../generalComponents/ContextMenu/ContextMenuItem";
import { previewFormats } from "../../../../../generalComponents/collections";
import ActionApproval from "../../../../../generalComponents/ActionApproval";
import File from "../../../../../generalComponents/Files";
import CustomizeFile from "../../ContextMenuComponents/ContextMenuFile/CustomizeFile";
import OptionButtomLine from "../../WorkElements/OptionButtomLine";
import FileProperty from "../../ContextMenuComponents/ContextMenuFile/FileProperty";
import classNames from "classnames";

const WorkSpace = ({
	menuItem,
	chosenFile,
	setChosenFile,
	listCollapsed,
	setFilePreview,
	filePreview,
	fileSelect,
	action,
	setAction,
	fileList,
	filePick,
	setFilePick,
	fileAddCustomization,
	setFileAddCustomization,
	nullifyFilePick,
	nullifyAddingSeveralFiles,
	saveCustomizeSeveralFiles,
	setLoadingType,
	deleteFile,
    cancelArchive,
    archiveFile,
}) => {
	const workElementsView = useSelector((state) => state.Cabinet.view);
	const size = useSelector((state) => state.Cabinet.size);
	const authorizedSafe = useSelector(state => state.Cabinet.authorizedSafe);

	const [mouseParams, setMouseParams] = useState(null);

	const nullifyAction = () => setAction({ type: "", name: "", text: "" });

	const callbackArrMain = [
		{ type: "resend", name: "", text: ``, callback: "" },
		{ type: "share", name: "", text: ``, callback: "" },
		{ type: "openInApp", name: "", text: ``, callback: "" },
		{ type: "copyLink", name: "", text: ``, callback: "" },
		{
			type: "customize",
			name: "Редактирование файла",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
		{
			type: "customizeSeveral",
			name: `Редактирование файлов`,
			text: ``,
			callback: (list, index) => setFilePick({ ...filePick, show: true }),
		},
		{
			type: "archive",
			name: "Добавить файл в архив",
			text: `Вы действительно хотите архивировать файл ${chosenFile?.name}?`,
			callback: (list, index) => setAction(list[index]),
		},
		{ type: "intoZip", name: "", text: ``, callback: "" },
		{ type: "info", name: "", text: ``, callback: "" },
		{
			type: "download",
			name: "Загрузка файла",
			text: ``,
			callback: () => document.downloadFile.submit(),
		},
		{
			type: "properties",
			name: "Свойства",
			text: ``,
			callback: () =>
				setAction({ ...action, type: "properties", name: "Свойства" }),
		},
		{ type: "print", name: "", text: ``, callback: "" },
	];

	const additionalMenuItems = [
		{
			type: "delete",
			name: "Удаление файла",
			text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`,
			callback: (list, index) => setAction(list[index]),
		},
	];

	const onActiveCallbackArrMain = (type) => {
		let index;
		callbackArrMain.forEach((el, i) =>
			el.type === type ? (index = i) : undefined
		);
		callbackArrMain[index].callback(callbackArrMain, index);
	};

	const excessItems = () => {
		if (filePick.show) {
			return [
				"intoZip",
				"properties",
				"download",
				"print",
				"share",
				"copyLink",
			];
		} else {
			if (chosenFile.mime_type) {
				switch (chosenFile.mime_type.split("/")[0]) {
					case "image":
						return ["share", "copyLink"];
					case "video":
						return ["print", "share", "copyLink"];
					case "audio":
						return ["print", "share", "copyLink"];
					case "application": {
						return chosenFile.mime_type === "application/x-compressed"
							? ["print", "intoZip", "intoZipSeveral", "share", "copyLink"]
							: ["share", "copyLink"];
					}
					default:
						return ["print, share", "copyLink"];
				}
			}
			if (
				previewFormats.filter((ext) =>
					chosenFile.ext.toLowerCase().includes(ext)
				)[0]
			)
				return ["share", "copyLink"];
			return ["print", "share", "copyLink"];
		}
	};
	const renderMenuItems = (target, type) => {
		const eItems = excessItems();
		let filteredMenu = [...target];
		filteredMenu.forEach((el, i, arr) => {
			eItems.forEach((excess) => {
				if (excess === el.type) delete arr[i];
			});
		});
		return filteredMenu.map((item, i) => {
			return (
				<ContextMenuItem
					key={i}
					width={mouseParams.width}
					height={mouseParams.height}
					text={item.name}
					callback={() =>
						type.forEach((el, index) => {
							if (el.type === item.type) el.callback(type, index);
						})
					}
					imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
				/>
			);
		});
	};


	// Types of Files view
	const renderFiles = (Type) => {
		if (!fileList) return null;
		return fileList.map((file, i) => {
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
					chosenFile={chosenFile}
					setMouseParams={setMouseParams}
					setAction={setAction}
					setFilePreview={setFilePreview}
					filePreview={filePreview}
					filePick={filePick}
					setFilePick={setFilePick}
					callbackArrMain={callbackArrMain}
					size={size}
				/>
			);
		});
	};

	return (
		<>
			<div
				className={classNames({
					[styles.workSpaceWrap]: true,
					[styles.workSpaceWrapCollapsed]: !!listCollapsed,
					[styles.workSpaceWrapUncollapsed]: !listCollapsed
				})}
			>
				<div className={styles.header}>
					<SearchField />
					<div className={styles.infoHeader}>
						<StorageSize />
						<Notifications />
						<Profile />
					</div>
				</div>
				{authorizedSafe && <ServePanel
					chosenFile={chosenFile}
					setAction={setAction}
					share={() => onActiveCallbackArrMain("share")}
					archive={() => onActiveCallbackArrMain('archive')}
					chooseSeveral={() =>
						setFilePick({ ...filePick, files: [], show: !filePick.show })
					}
					filePick={filePick}
					fileAddCustomization={fileAddCustomization}
					setFileAddCustomization={setFileAddCustomization}
					addFile={fileSelect}
					menuItem={menuItem}
				/>}

				{workElementsView === "bars" && (
					<WorkBars
						file={chosenFile}
						filePick={filePick}
					>
						{renderFiles(FileBar)}
					</WorkBars>
				)}

				{workElementsView === "lines" && (
					<WorkLines
						file={chosenFile}
						filePick={filePick}
					>
						{renderFiles(FileLine)}
					</WorkLines>
				)}

				{workElementsView === "preview" && (
					<WorkBarsPreview file={chosenFile} filePick={filePick}>
						{renderFiles(FileBar)}
					</WorkBarsPreview>
				)}

				{workElementsView === "workLinesPreview" && (
					<WorkLinesPreview file={chosenFile} filePick={filePick}>
						{renderFiles(FileLineShort)}
					</WorkLinesPreview>
				)}

				{filePick.show ? (
					<OptionButtomLine
						callbackArrMain={callbackArrMain}
						filePick={filePick}
						setFilePick={setFilePick}
						actionName={filePick.intoZip ? "Сжать в Zip" : "Редактировать"}
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
					name={filePick.show ? "Удаление файлов" : action.name}
					text={
						filePick.show
							? "Вы действительно хотите удалить выбранные файлы?"
							: action.text
					}
					set={cancelArchive}
					callback={deleteFile}
					approve={"Удалить"}
				>
					<div className={styles.fileActionWrap}>
						<File
							format={filePick.show ? "FILES" : chosenFile?.ext}
							color={chosenFile?.color}
						/>
					</div>
				</ActionApproval>
			) : null}

			{action.type === "customize" ||
			filePick.customize ||
			fileAddCustomization.several ? (
				<CustomizeFile
					title={
						filePick.customize || fileAddCustomization?.several
							? `Редактировать выбранные файлы`
							: action.name
					}
					file={chosenFile}
					close={
						filePick.customize
							? nullifyFilePick
							: fileAddCustomization.several
							? nullifyAddingSeveralFiles
							: nullifyAction
					}
					filePick={filePick}
					setFilePick={setFilePick}
					fileAddCustomization={fileAddCustomization}
					setFileAddCustomization={setFileAddCustomization}
					saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
					setLoadingType={setLoadingType}
					menuItem={menuItem}
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
		</>
	);
};

export default WorkSpace;
