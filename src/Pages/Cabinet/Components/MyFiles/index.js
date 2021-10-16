import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../../../api";
import { previewFormats } from "../../../../generalComponents/collections";
import styles from "./MyFiles.module.sass";
import List from "../List";
import FileItem from "./FileItem/index";
import WorkSpace from "./WorkSpace/index";
import CreateFile from "../CreateFile";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import { fileDelete } from "../../../../generalComponents/fileMenuHelper";
import {
	onDeleteFile,
	onAddRecentFiles,
	onChooseAllFiles,
} from "../../../../Store/actions/CabinetActions";
import CreateSafePassword from "../CreateSafePassword";
import PreviewFile from "../PreviewFile";
import SuccessMessage from "../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage";
import {imageSrc} from '../../../../generalComponents/globalVariables';
import Loader from "../../../../generalComponents/Loaders/4HUB";
import {useScrollElementOnScreen} from "../../../../generalComponents/Hooks";

const MyFiles = ({
	filePreview,
	setFilePreview,
	awaitingFiles,
	setAwaitingFiles,
	loaded,
	setFileAddCustomization,
	setLoaded,
	loadingFile,
	fileErrors,
	fileSelect,
	fileAddCustomization,
	setLoadingFile,
	menuItem,
	setMenuItem,
	nullifyAddingSeveralFiles,
	saveCustomizeSeveralFiles,
	setLoadingType,
	filesPage,
	setFilesPage,
}) => {
	const uid = useSelector((state) => state.user.uid);
	const dispatch = useDispatch();
	const [chosenFile, setChosenFile] = useState(null);
	const fileListAll = useSelector((state) => state.Cabinet.fileListAll);
	const workElementsView = useSelector((state) => state.Cabinet.view);
	const search = useSelector(state => state.Cabinet.search);

	const [gLoader, setGLoader] = useState(false);

	const [listCollapsed, setListCollapsed] = useState(false);
	const [chosenFolder] = useState({
		path: "global/all",
		open: false,
		subPath: "",
	});
	const fileRef = useRef(null);
	const [filePick, setFilePick] = useState({ show: false, files: [] });
	const [mouseParams, setMouseParams] = useState(null);
	const [showLinkCopy, setShowLinkCopy] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [action, setAction] = useState({ type: "", name: "", text: "" });
	const nullifyAction = () => setAction({ type: "", name: "", text: "" });
	const nullifyFilePick = () =>
		setFilePick({ show: false, files: [], customize: false });
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

	const checkMimeTypes = (file) => {
		const mType = file?.mime_type ?? chosenFile?.mime_type;
		const isFormat = previewFormats.filter(format => chosenFile.ext.toLowerCase().includes(format)).length > 0;
		const fid = file?.fid ?? chosenFile?.fid;
		const preview = file?.preview ?? chosenFile?.preview;
		if(mType === 'application/pdf' || (mType && mType?.includes('image'))) {
			setLoadingType('bounceDot')
			printFile(`${preview}`)
		} else {
			if(isFormat) {
				setLoadingType('bounceDot')
				api.post(`/ajax/file_preview.php?uid=${uid}&fid=${fid}`)
					.then(res => printFile(res.data.file_pdf))
					.catch(err => console.log(err));
			}
		}
	};

	const printFile = (path) => {
		let pri = document.getElementById("frame");
		pri.src = `https://fs2.mh.net.ua/${path}`;
		setTimeout(() => {
			pri.contentWindow.focus();
			pri.contentWindow.print();
		}, 1000);
		setLoadingType("");
	};

	const [safePassword, setSafePassword] = useState({ open: false });
	const renderFileBar = () => {
		if (!fileListAll?.files) return null;
		return fileListAll.files.map((file, i) => {
			return (
				<FileItem
					chosenFile={chosenFile}
					setChosenFile={setChosenFile}
					key={i}
					file={file}
					chosen={
						filePick.show
							? filePick.files.findIndex((el) => el === file.fid) >= 0
							: chosenFile?.fid === file?.fid
					}
					listCollapsed={listCollapsed}
					renderMenuItems={renderMenuItems}
					mouseParams={mouseParams}
					setMouseParams={setMouseParams}
					action={action}
					setAction={setAction}
					nullifyAction={nullifyAction}
					callbackArrMain={callbackArrMain}
					additionalMenuItems={additionalMenuItems}
					deleteFile={deleteFile}
					setFilePreview={setFilePreview}
					filePreview={filePreview}
					filePick={filePick}
					setFilePick={setFilePick}
				/>
			);
		});
	};

	const deleteFile = () => {
		if (filePick.show) {
			const gdir = fileListAll.path;
			filePick.files.forEach((fid, i, arr) =>
				fileDelete(
					{ gdir, fid },
					dispatch,
					uid,
					i === arr.length - 1 ? setShowSuccessMessage : "",
					"Файлы перемещено в корзину"
				)
			);
			setFilePick({ ...filePick, files: [], show: false });
		} else {
			fileDelete(
				chosenFile,
				dispatch,
				uid,
				setShowSuccessMessage,
				"Файл перемещен в корзину"
			);
		}
		nullifyAction();
		setChosenFile(null);
		dispatch(onAddRecentFiles());
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
	const onSafePassword = (boolean) =>
		setSafePassword({ ...safePassword, open: boolean });
	const excessItems = () => {
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
	useEffect(() => {
		setMenuItem("myFiles");
		setFilesPage(0);
		dispatch(onChooseAllFiles("global/all", "", 1, "", setGLoader));
		return () => setMenuItem("");
	}, []); //eslint-disable-line
	useEffect(() => {
		if (fileListAll?.files.length <= 10) {
			setFilesPage(2);
			if (fileRef.current) {
				fileRef.current.scrollTop = 0;
			}
		}
	}, [fileListAll?.files]); //eslint-disable-line

	const cancelArchive = () => {
		nullifyFilePick();
		nullifyAction();
	};

	const [loadingFilesLocal, setLoadingFilesLocal] = useState(false)
	const onSuccessLoading = (result) => {
		setLoadingFilesLocal(false);
		result > 0 ? setFilesPage(filesPage => filesPage + 1) : setFilesPage(0);
	}

	const options = {
		root: null,
		rootMargin: '0px',
		threshold: 0
	}

	const load = (entry) => {
		if(entry.isIntersecting && !loadingFilesLocal && filesPage !== 0 && window.location.pathname.includes('files')){
			setLoadingFilesLocal(true);
			dispatch(onChooseAllFiles(fileListAll?.path, search, filesPage, onSuccessLoading, ''));
		}
	}

	const [containerRef] = useScrollElementOnScreen(options, load);

	return (
		<div className={styles.workAreaWrap}>
			{workElementsView === "workLinesPreview" && (
				<List
					title="Загрузить файл"
					src="add-file.svg"
					setListCollapsed={setListCollapsed}
					listCollapsed={listCollapsed}
					onCreate={() => fileSelect()}
					chosenFile={chosenFile}
					setChosenFile={setChosenFile}
				>
					<div className={styles.folderListWrap}>
						{renderFileBar()}
						{!gLoader ? <div
							className={`${styles.bottomLine} ${filesPage === 0 ? styles.bottomLineHidden : ''}`}
							style={{height: '100px'}}
							ref={containerRef}
						>
							<Loader
								type='bounceDots'
								position='absolute'
								background='white'
								zIndex={5}
								width='100px'
								height='100px'
								containerType='bounceDots'
							/>
						</div> : null}
					</div>
				</List>
			)}
			<WorkSpace
				chosenFolder={chosenFolder}
				workElementsView={workElementsView}
				renderMenuItems={renderMenuItems}
				mouseParams={mouseParams}
				setMouseParams={setMouseParams}
				action={action}
				setAction={setAction}
				nullifyAction={nullifyAction}
				nullifyFilePick={nullifyFilePick}
				chosenFile={chosenFile}
				setChosenFile={setChosenFile}
				callbackArrMain={callbackArrMain}
				additionalMenuItems={additionalMenuItems}
				deleteFile={deleteFile}
				filePreview={filePreview}
				setFilePreview={setFilePreview}
				setSafePassword={setSafePassword}
				fileSelect={fileSelect}
				filePick={filePick}
				setFilePick={setFilePick}
				setShowLinkCopy={setShowLinkCopy}
				showLinkCopy={showLinkCopy}
				archiveFile={archiveFile}
				setShowSuccessMessage={setShowSuccessMessage}
				cancelArchive={cancelArchive}
				fileAddCustomization={fileAddCustomization}
				setFileAddCustomization={setFileAddCustomization}
				nullifyAddingSeveralFiles={nullifyAddingSeveralFiles}
				saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
				setLoadingType={setLoadingType}
				filesPage={filesPage}
				setFilesPage={setFilesPage}
				gLoader={gLoader}
				setGLoader={setGLoader}
				menuItem={menuItem}
			/>
			{fileAddCustomization.show && (
				<CreateFile
					title={fileAddCustomization.create ? "Создать файл" : "Добавить файл"}
					info={chosenFolder}
					blob={fileAddCustomization.file}
					setBlob={setFileAddCustomization}
					onToggleSafePassword={onSafePassword}
					awaitingFiles={awaitingFiles}
					setAwaitingFiles={setAwaitingFiles}
					loaded={loaded}
					setLoaded={setLoaded}
					loadingFile={loadingFile}
					fileErrors={fileErrors}
					setLoadingFile={setLoadingFile}
					showChoiceFolders={true}
				/>
			)}
			{safePassword.open && (
				<CreateSafePassword
					onToggle={onSafePassword}
					title="Создайте пароль для Сейфа с паролями"
				/>
			)}
			{filePreview?.view ? (
				<PreviewFile
					setFilePreview={setFilePreview}
					file={filePreview?.file}
					filePreview={filePreview}
					setLoadingType={setLoadingType}
				/>
			) : null}
			{showSuccessMessage && (
				<SuccessMessage
					showSuccessMessage={showSuccessMessage}
					setShowSuccessMessage={setShowSuccessMessage}
				/>
			)}
		</div>
	);
};

export default MyFiles;
