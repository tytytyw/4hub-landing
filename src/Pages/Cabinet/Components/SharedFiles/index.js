import React, { useEffect, useState } from "react";

import styles from "./SharedFiles.module.sass";
import FilesGroup from "./FilesGroup/FilesGroup";
import WorkLinesPreview from "../WorkElements/WorkLinesPreview";
import SideList from "./SideList";
import SearchField from "../SearchField";
import StorageSize from "../StorageSize";
import Notifications from "../Notifications";
import Profile from "../Profile";
import ServePanel from "../ServePanel";
import { useDispatch, useSelector } from "react-redux";
import DateBlock from "./DateBlock";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import { contextMenuFile } from "../../../../generalComponents/collections";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import ActionApproval from "../../../../generalComponents/ActionApproval";
import File from "../../../../generalComponents/Files";
import PreviewFile from "../PreviewFile";
import BottomPanel from "../BottomPanel";
import {
	onGetSharedFiles,
	onDeleteFile,
	onAddRecentFiles,
} from "../../../../Store/actions/CabinetActions";
import { previewFormats } from "../../../../generalComponents/collections";
import api from "../../../../api";
import CustomizeFile from "../ContextMenuComponents/ContextMenuFile/CustomizeFile";
import CreateZip from "../ContextMenuComponents/ContextMenuFile/CreateZip";
import ShareFile from "../ContextMenuComponents/ContextMenuFile/ShareFile/ShareFile";
import FileProperty from "../ContextMenuComponents/ContextMenuFile/FileProperty";
import CopyLink from "../ContextMenuComponents/ContextMenuFile/CopyLink/CopyLink";
import SuccessMessage from "../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage";
import OptionButtomLine from "../WorkElements/OptionButtomLine";
import {imageSrc} from '../../../../generalComponents/globalVariables';

//TODO: заменить при получении сгрупированного на даты списка файлов
import { months } from "../../../../generalComponents/CalendarHelper";

const SharedFiles = ({
	filePreview,
	setFilePreview,
	fileSelect,
	fileAddCustomization,
	nullifyAddingSeveralFiles,
	setFileAddCustomization,
	saveCustomizeSeveralFiles,
	setLoadingType,
}) => {
	const workElementsView = useSelector((state) => state.Cabinet.view);
	const [search, setSearch] = useState(null);
	const fileList = useSelector((state) => state.Cabinet.sharedFiles);
	const user = useSelector((state) => state.user.userInfo);
	const dispatch = useDispatch();

	const [year, setYear] = useState(null);
	const [month, setMonth] = useState("");
	const [chosenFile, setChosenFile] = useState(null);
	const [action, setAction] = useState({ type: "", name: "", text: "" });
	const [mouseParams, setMouseParams] = useState(null);
	const nullifyAction = () => setAction({ type: "", name: "", text: "" });
	const [filePick, setFilePick] = useState({ show: false, files: [] });
	const [showLinkCopy, setShowLinkCopy] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const uid = useSelector((state) => state.user.uid);

	const [filesNotCustomize, setFilesNotCustomize] = useState([]);

	useEffect(() => {
		dispatch(onGetSharedFiles("", month));
	}, [month]); // eslint-disable-line

	useEffect(() => {
		if (filePick.customize) {
			setFilePick({
				show: true,
				files: filePick?.files.filter(
					(fid) => filesNotCustomize.indexOf(fid) === -1
				),
				customize: true,
			});
		}
	}, [filePick.customize]); // eslint-disable-line

	useEffect(() => {
		fileList?.files.forEach((file) => {
			if (
				file.is_write === "0" &&
				filesNotCustomize.indexOf(file.is_write) === -1
			)
				setFilesNotCustomize((state) => [...state, file.fid]);
		});
	}, [fileList]); // eslint-disable-line

	const callbackArrMain = [
		{
			type: "share",
			name: "",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
		{
			type: "copyLink",
			name: "",
			text: ``,
			callback: () => setShowLinkCopy(true),
		},
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
			callback: () => setFilePick({ ...filePick, show: true }),
		},
		{
			type: "archive",
			name: "Добавить файл в архив",
			text: `Вы действительно хотите архивировать файл ${chosenFile?.name}?`,
			callback: (list, index) => setAction(list[index]),
		},
		{
			type: "intoZip",
			name: "Сжать в ZIP",
			text: ``,
			callback: (list, index) =>
				setAction({
					...action,
					type: list[index].type,
					name: list[index].name,
				}),
		},
		{
			type: "intoZipSeveral",
			name: "Сжать в ZIP",
			text: ``,
			callback: () => setFilePick({ ...filePick, show: true, intoZip: true }),
		},
		{
			type: "properties",
			name: "Свойства",
			text: ``,
			callback: () =>
				setAction({ ...action, type: "properties", name: "Свойства" }),
		},
		{
			type: "download",
			name: "Загрузка файла",
			text: ``,
			callback: () => document.downloadFile.submit(),
		},
		{
			type: "print",
			name: "Распечатать файл",
			text: ``,
			callback: () => checkMimeTypes(),
		},
	];
	const additionalMenuItems = [
		{
			type: "delete",
			name: "Удаление файла",
			text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`,
			callback: (list, index) => setAction(list[index]),
		},
	];

	const renderFilesGroup = (mounth, i) => {
		return (
			<FilesGroup
				key={i}
				index={i}
				fileList={fileList}
				filePreview={filePreview}
				setFilePreview={setFilePreview}
				callbackArrMain={callbackArrMain}
				chosenFile={chosenFile}
				setChosenFile={setChosenFile}
				filePick={filePick}
				setFilePick={setFilePick}
				mounthName={mounth}
				setAction={setAction}
				setMouseParams={setMouseParams}
			/>
		);
	};

	const excessItems = () => {
		if (chosenFile.is_write === "0") return ["customize", "customizeSeveral"];
		if (filePick.show) {
			return ["intoZip", "properties", "download", "print"];
		} else {
			if (chosenFile.mime_type) {
				switch (chosenFile.mime_type.split("/")[0]) {
					case "image":
						return [];
					case "video":
						return ["print"];
					case "audio":
						return ["print"];
					case "application": {
						return chosenFile.mime_type === "application/x-compressed"
							? ["print", "intoZip", "intoZipSeveral"]
							: [];
					}
					default:
						return ["print"];
				}
			}
			if (
				previewFormats.filter((ext) =>
					chosenFile.ext.toLowerCase().includes(ext)
				)[0]
			)
				return [];
			return ["print"];
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
					imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
				/>
			);
		});
	};

	const onActiveCallbackArrMain = (type) => {
		let index;
		callbackArrMain.forEach((el, i) =>
			el.type === type ? (index = i) : undefined
		);
		callbackArrMain[index].callback(callbackArrMain, index);
	};

	const checkMimeTypes = (file) => {
		const mType = file?.mime_type ?? chosenFile?.mime_type;
		const fid = file?.fid ?? chosenFile?.fid;
		const preview = file?.preview ?? chosenFile?.preview;
		const ext = file?.ext ?? chosenFile?.ext;
		if (mType === "application/pdf") {
			setLoadingType("squarify");
			if (mType === "application/pdf") {
				printFile(`${preview}`);
			} else if (mType.includes("image")) {
				printFile(`${preview}`);
			}
		} else {
			const chosenType = previewFormats.filter((format) =>
				ext.toLowerCase().includes(format)
			);
			if (chosenType.length > 0) {
				setLoadingType("squarify");
				api
					.post(`/ajax/file_preview.php?uid=${uid}&fid=${fid}`)
					.then((res) => printFile(res.data.file_pdf))
					.catch((err) => console.log(err));
			}
		}
	};

	const printFile = (path) => {
		let pri = document.getElementById("frame");
		pri.src = `https://fs2.mh.net.ua/${path}`;
		setLoadingType("");
		setTimeout(() => {
			pri.contentWindow.focus();
			pri.contentWindow.print();
		}, 1000);
	};

	const nullifyFilePick = () =>
		setFilePick({ show: false, files: [], customize: false });

	const cancelArchive = () => {
		nullifyFilePick();
		nullifyAction();
	};

	const archiveFile = () => {
		if (filePick.show) {
			filePick.files.forEach((fid, i) => {
				const options = {
					single: false,
					several: i === filePick.files.length - 1,
				};
				addToArchive(uid, fid, { fid }, options);
			});
		} else {
			addToArchive(uid, chosenFile.fid, chosenFile, {
				single: true,
				several: false,
			});
		}
	};

	const addToArchive = (uid, fid, file, options) => {
		setLoadingType("squarify");
		api
			.post(`/ajax/file_archive.php?uid=${uid}&fid=${fid}`)
			.then((res) => {
				if (res.data.ok === 1) {
					dispatch(onDeleteFile(file));
					if (options.single) setShowSuccessMessage("Файл добавлен в архив");
					if (options.several)
						setShowSuccessMessage("Выбранные файлы добавлено в архив");
				} else console.log(res?.error);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				nullifyAction();
				setChosenFile(null);
				setLoadingType("");
				if (filePick.show) nullifyFilePick();
			});
	};

	const deleteAccess = (fid, dir, set, msg) => {
		setLoadingType("squarify");
		api
			.post(`/ajax/file_share_del.php`, {
				fids: [fid],
				dir,
				uid,
				user_to: user.name,
			})
			.then((res) => {
				if (res.data.ok) {
					dispatch(onGetSharedFiles());
					if (set) set(msg);
				} else console.log(res?.error);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoadingType(""));
	};

	const deleteFile = () => {
		if (filePick.show) {
			filePick.files.forEach((fid, i, arr) => {
				const file = fileList.files.filter((file) => file.fid === fid);
				deleteAccess(
					fid,
					file[0].dir,
					i === arr.length - 1 ? setShowSuccessMessage : "",
					"Файлы удалены"
				);
			});
			setFilePick({ ...filePick, files: [], show: false });
		} else {
			deleteAccess(
				chosenFile.fid,
				chosenFile.dir,
				setShowSuccessMessage,
				"Файл удален"
			);
		}
		nullifyAction();
		setChosenFile(null);
		dispatch(onAddRecentFiles());
	};

	return (
		<div className={styles.parentWrapper}>
			<div className={styles.header}>
				<SearchField />
				<div className={styles.infoHeader}>
					<StorageSize />
					<Notifications />
					<Profile />
				</div>
			</div>

			<ServePanel
				view={workElementsView}
				chosenFile={chosenFile}
				setAction={setAction}
				fileSelect={fileSelect}
				archive={() => onActiveCallbackArrMain("archive")}
				share={() => onActiveCallbackArrMain("share")}
				chooseSeveral={() =>
					setFilePick({ ...filePick, files: [], show: !filePick.show })
				}
				filePick={filePick}
			/>

			<div
				className={styles.wrapper}
				style={{
					height: `${
						filePick.show ? "calc(100% - 225px)" : "calc(100% - 140px)"
					}`,
				}}
			>
				<DateBlock
					search={search}
					setSearch={setSearch}
					year={year}
					setYear={setYear}
					month={month}
					setMonth={setMonth}
				/>
				<div className={styles.workSpace}>
					{workElementsView === "workLinesPreview" && (
						<>
							<SideList>
								{month
									? renderFilesGroup(months()[month - 1].name, 0)
									: months().map((item, i) => renderFilesGroup(item.name, i))}
							</SideList>
							<div className={styles.filePreviewWrap}>
								<WorkLinesPreview
									file={chosenFile}
									hideFileList={true}
									filePick={filePick}
								/>
							</div>
						</>
					)}
					{/*TODO: заменить при получении сгруппированного на даты списка файлов */}
					{workElementsView !== "workLinesPreview" && (
						<div className={styles.FilesList}>
							{month
								? renderFilesGroup(months()[month - 1].name, 0)
								: months().map((item, i) => renderFilesGroup(item.name, i))}
						</div>
					)}
				</div>
			</div>
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

			{mouseParams !== null && (
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
			)}
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

			<BottomPanel />
			{filePreview?.view ? (
				<PreviewFile
					setFilePreview={setFilePreview}
					file={filePreview?.file}
					filePreview={filePreview}
					setLoadingType={setLoadingType}
				/>
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
				/>
			) : null}
			{action.type === "intoZip" ? (
				<CreateZip
					close={nullifyAction}
					file={chosenFile}
					title={action.name}
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
					name={filePick.show ? "Архивировать выбранные файлы" : action.name}
					text={
						filePick.show
							? " Вы действительно хотите переместить в архив выбранные файлы?"
							: action.text
					}
					set={cancelArchive}
					callback={archiveFile}
					approve={"Архивировать"}
				>
					<div className={styles.fileActionWrap}>
						<File
							format={filePick.show ? "FILES" : chosenFile?.ext}
							color={chosenFile?.color}
						/>
					</div>
				</ActionApproval>
			) : null}
			{action.type === "properties" ? (
				<FileProperty close={nullifyAction} file={chosenFile} />
			) : null}
			{showLinkCopy && (
				<CopyLink fid={chosenFile?.fid} setShowLinkCopy={setShowLinkCopy} />
			)}

			{showSuccessMessage && (
				<SuccessMessage
					showSuccessMessage={showSuccessMessage}
					setShowSuccessMessage={setShowSuccessMessage}
				/>
			)}
		</div>
	);
};

export default SharedFiles;
