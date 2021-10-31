import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import styles from "./Safe.module.sass";
import SafeItem from "./SafeItem";
import SafeIcon from "./SafeIcon";
import WorkSpace from "./WorkSpace";
import ShareSafe from "../ContextMenuComponents/ContexMenuSafe/ShareSafe/ShareSafe";
import CustomizeSafe from "../ContextMenuComponents/ContexMenuSafe/CustomizeSafe/CustomizeSafe";
import ActionApproval from "../../../../generalComponents/ActionApproval";
import Loader from "../../../../generalComponents/Loaders/4HUB";
import PreviewSafeFile from "./PreviewSafeFile";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import { contextMenuSafeItem } from "../../../../generalComponents/collections";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import { safeFileDelete } from "../../../../generalComponents/fileMenuHelper";
import classNames from "classnames";
import CodePopup from "./Popups/CodePopup";
import NoSafe from "./Popups/NoSafe";
import CreateSafe from "./Popups/CreateSafe";
import {
	onGetSafes,
	onExitSafe,
	onDeleteSafeFile,
} from "../../../../Store/actions/CabinetActions";
import api from "../../../../api";
import SuccessMessage from "../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage";
import CreateFile from "../CreateFile";
import SafeProperty from "../ContextMenuComponents/ContexMenuSafe/SafeProperty";

const Safe = ({
	menuItem,
	filePreview,
	setFilePreview,
	fileSelect,
	setMenuItem,
	fileAddCustomization,
	setFileAddCustomization,
	setAwaitingFiles,
	awaitingFiles,
	loaded,
	setLoaded,
	loadingFile,
	fileErrors,
	setLoadingFile,
	nullifyAddingSeveralFiles,
	saveCustomizeSeveralFiles,
}) => {
	const dispatch = useDispatch();
	const uid = useSelector((state) => state.user.uid);
	const path = useSelector((state) => state.Cabinet.folderList?.path);
	const [chosenFile, setChosenFile] = useState(null);
	const [mouseParams, setMouseParams] = useState(null);

	const safes = useSelector((state) => state.Cabinet.safes);
	const fileList = useSelector((state) => state.Cabinet.safeFileList);
	const size = useSelector((state) => state.Cabinet.size);
	const authorizedSafe = useSelector((state) => state.Cabinet.authorizedSafe);
	const [listCollapsed, setListCollapsed] = useState("");
	const [selectedSafe, setSelectedSafe] = useState(null);
	const [createSafe, setCreateSafe] = useState(false);
	const [codePopup, setCodePopup] = useState(false);
	const [refreshPass, setRefreshPass] = useState(false);
	const [noSafePopup, setNoSafePopup] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [safePassword, setSafePassword] = useState({ open: false });
	const [action, setAction] = useState({ type: "", name: "", text: "" });
	const [filePick, setFilePick] = useState({ show: false, files: [] });
	const nullifyFilePick = () =>
		setFilePick({ show: false, files: [], customize: false });
	const nullifyAction = () => setAction({ type: "", name: "", text: "" });
	const [filesPage, setFilesPage] = useState(1);
	const [loadingFiles, setLoadingFiles] = useState(false);
	const [loadingType, setLoadingType] = useState("");
	const [gLoader, setGLoader] = useState(false);

	useEffect(() => {
		setLoadingType(safes === null ? "squarify" : "");
		setNoSafePopup(safes?.length < 1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [safes]);

	useEffect(() => {
		dispatch(onGetSafes());
		setMenuItem("safe");
		return () => setMenuItem('')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//Clear action on change folder
	useEffect(() => {
		nullifyAction();
	}, [path]);

	useEffect(() => {
		dispatch(onExitSafe());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedSafe]);

	const renderSafesList = () => {
		if (!safes) return null;
		return safes?.map((safe, i) => {
			return (
				<SafeItem
					key={i + safe.name}
					safe={safe}
					listSize={size}
					chosen={selectedSafe?.id === safe.id}
					setMouseParams={setMouseParams}
					setSelectedSafe={setSelectedSafe}
					onClick={() => {
						setSelectedSafe(safe);
						setCodePopup(true);
					}}
				/>
			);
		});
	};

	const callbackArrMain = [
		{
			type: "share",
			name: "Предоставить доступ",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
		{
			type: "customizeSafe",
			name: "Редактировать",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
		// TODO:
		{
			type: "settings",
			name: "Настроить",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
		{
			type: "propertiesSafe",
			name: "Свойства",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
	];

	const additionalMenuItems = [
		{
			type: "deleteSafe",
			name: "Удаление сейфа",
			text: `Вы действительно хотите удалить сейф ${selectedSafe?.name}?`,
			callback: (list, index) => setAction(list[index]),
		},
	];

	const renderMenuItems = (target, type) => {
		return target.map((item, i) => {
			return (
				<ContextMenuItem
					key={i}
					width={mouseParams.width}
					height={mouseParams.height}
					text={item.name}
					callback={() => type[i]?.callback(type, i)}
					imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
				/>
			);
		});
	};

	const cancelArchive = () => {
		// nullifyFilePick();
		nullifyAction();
	};

	const deleteSafe = () => {
		nullifyAction();
		api
			.post(`/ajax/safe_del.php?uid=${uid}&id_safe=${selectedSafe.id}`)
			.then((res) => {
				if (res.data.ok === 1) {
					setShowSuccessMessage("Сейф удален");
					dispatch(onGetSafes());
				} else {
					console.log(res);
				}
			})
			.catch((err) => console.log(err));
	};

	const onSafePassword = (boolean) =>
		setSafePassword({ ...safePassword, open: boolean });

	const deleteFile = () => {
		if (filePick.show) {
			filePick.files.forEach((fid, i, arr) => {
				safeFileDelete(
					authorizedSafe.id_safe,
					fid,
					dispatch,
					uid,
					i === arr.length - 1 ? setShowSuccessMessage : "",
					"Файлы перемещено в корзину"
				);
			});
			setFilePick({ ...filePick, files: [], show: false });
		} else {
			safeFileDelete(
				authorizedSafe.id_safe,
				chosenFile.fid,
				dispatch,
				uid,
				setShowSuccessMessage,
				"Файл перемещен в корзину"
			);
		}
		nullifyAction();
		setChosenFile(null);
	};

	const addToArchive = (uid, fid, file, options) => {
		setLoadingType("squarify");
		api
			.post(
				`/ajax/safe_file_archive.php?uid=${uid}&fid=${fid}&id_safe=${authorizedSafe.id_safe}`
			)
			.then((res) => {
				if (res.data.ok === 1) {
					dispatch(onDeleteSafeFile(fid));
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
	
	const onSuccessLoading = (result) => {
		setTimeout(() => {
			result > 0 ? setFilesPage((filesPage) => filesPage + 1) : setFilesPage(0);
			setLoadingFiles(false);
		}, 50); // 50ms needed to prevent recursion of ls_json requests
	};

	const successLoad = () => {
        setFilesPage(2)
        setGLoader(false)
    }

	return (
		<div className={styles.workAreaWrap}>
			<div
				className={classNames({
					[styles.listWrap]: true,
					[styles.listWrapCollapsed]: !!listCollapsed,
					[styles?.[`listWrapCollapsed_${size}`]]: !!listCollapsed && !!size,
				})}
			>
				<div className={styles.header}>
					{!listCollapsed && <span>Создать сейф</span>}
					<div className={styles.imgWrap}>
						<img
							className={`${styles.playButton} ${
								listCollapsed ? styles.playButtonReverse : undefined
							}`}
							src={`${imageSrc}/assets/PrivateCabinet/play-grey.svg`}
							alt="play"
							onClick={() => setListCollapsed(!listCollapsed)}
						/>
						<img
							onClick={() => setCreateSafe(true)}
							className={styles.icon}
							src={`${imageSrc}/assets/PrivateCabinet/add-safe.svg`}
							alt="icon"
						/>
					</div>
				</div>
				<div
					className={classNames(styles.children, styles?.[`children_${size}`])}
				>
					{safes?.length < 1 ? (
						<div className={styles.emptyBlock}>
							<img
								className={styles.emptyImg}
								src={`${imageSrc}/assets/PrivateCabinet/create_arrow.svg`}
								alt="Create Arrow"
							/>
							<h4 className={styles.emptyTitle}>СОЗДАЙТЕ Ваш первый СЕЙФ</h4>
						</div>
					) : (
						<div
							className={classNames({
								[styles.folderListWrap]: true,
								[styles?.[`folderListWrap_${size}`]]: !!size,
								[styles?.[`folderListWrapCollapsed_${size}`]]:
									!!listCollapsed && !!size,
							})}
						>
							{renderSafesList()}
						</div>
					)}
				</div>
			</div>
			<WorkSpace
				menuItem={menuItem}
				listCollapsed={listCollapsed}
				filePreview={filePreview}
				setFilePreview={setFilePreview}
				chosenFile={chosenFile}
				setChosenFile={setChosenFile}
				fileSelect={fileSelect}
				action={action}
				setAction={setAction}
				fileList={fileList}
				fileAddCustomization={fileAddCustomization}
				setFileAddCustomization={setFileAddCustomization}
				filePick={filePick}
				setFilePick={setFilePick}
				nullifyFilePick={nullifyFilePick}
				nullifyAddingSeveralFiles={nullifyAddingSeveralFiles}
				setLoadingType={setLoadingType}
				saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
				deleteFile={deleteFile}
				cancelArchive={cancelArchive}
				archiveFile={archiveFile}
				setShowSuccessMessage={setShowSuccessMessage}
				filesPage={filesPage}
				setFilesPage={setFilesPage}
				onSuccessLoading={onSuccessLoading}
				loadingFiles={loadingFiles}
				setLoadingFiles={setLoadingFiles}
				gLoader={gLoader}
				setGLoader={setGLoader}
			/>
			{filePreview?.view && (
				<PreviewSafeFile
					setFilePreview={setFilePreview}
					file={filePreview?.file}
					filePreview={filePreview}
					setLoadingType={setLoadingType}
				/>
			)}
			{mouseParams !== null && (
				<ContextMenu
					params={mouseParams}
					setParams={setMouseParams}
					tooltip={true}
				>
					<div className={styles.mainMenuItems}>
						{renderMenuItems(contextMenuSafeItem.main, callbackArrMain)}
					</div>
					<div style={{ marginTop: "30px" }} className={styles.mainMenuItems}>
						{renderMenuItems(
							contextMenuSafeItem.additional,
							additionalMenuItems
						)}
					</div>
				</ContextMenu>
			)}
			{noSafePopup && (
				<NoSafe setCreateSafe={setCreateSafe} set={setNoSafePopup} />
			)}
			{codePopup && (
				<CodePopup
					refreshPass={refreshPass}
					setRefreshPass={setRefreshPass}
					safe={selectedSafe}
					set={setCodePopup}
					setLoadingType={setLoadingType}
					filesPage={filesPage}
					setFilesPage={setFilesPage}
					successLoad={successLoad}
				/>
			)}
			{createSafe && (
				<CreateSafe onCreate={setCreateSafe} setLoadingType={setLoadingType} />
			)}
			{action.type === "deleteSafe" ? (
				<ActionApproval
					name={action.name}
					text={action.text}
					set={cancelArchive}
					callback={deleteSafe}
					approve={"Удалить"}
				>
					<div className={styles.fileActionWrap}>
						<SafeIcon type={selectedSafe.id_color} />
					</div>
				</ActionApproval>
			) : null}
			{action.type === "share" ? (
				<ShareSafe
					safe={selectedSafe}
					close={nullifyAction}
					action_type={action.type}
					showSuccessMessage={showSuccessMessage}
					setShowSuccessMessage={setShowSuccessMessage}
					setLoadingType={setLoadingType}
				/>
			) : null}
			{action.type === "customizeSafe" ? (
				<CustomizeSafe
					safe={selectedSafe}
					close={nullifyAction}
					action_type={action.type}
					showSuccessMessage={showSuccessMessage}
					setShowSuccessMessage={setShowSuccessMessage}
					setLoadingType={setLoadingType}
				/>
			) : null}
			{action.type === "propertiesSafe" ? (
				<SafeProperty close={nullifyAction} safe={selectedSafe} />
			) : null}
			{showSuccessMessage && (
				<SuccessMessage
					showSuccessMessage={showSuccessMessage}
					setShowSuccessMessage={setShowSuccessMessage}
				/>
			)}
			{fileAddCustomization.show && (
				<CreateFile
					title={fileAddCustomization.create ? "Создать файл" : "Добавить файл"}
					blob={fileAddCustomization.file}
					setBlob={setFileAddCustomization}
					awaitingFiles={awaitingFiles}
					setAwaitingFiles={setAwaitingFiles}
					loaded={loaded}
					setLoaded={setLoaded}
					loadingFile={loadingFile}
					fileErrors={fileErrors}
					setLoadingFile={setLoadingFile}
					onToggleSafePassword={onSafePassword}
					menuItem={menuItem}
				/>
			)}
			'
			{loadingType ? (
				<Loader
					position="absolute"
					zIndex={10000}
					containerType="bounceDots"
					type="bounceDots"
					background="white"
					animation={false}
				/>
			) : null}
		</div>
	);
};

export default Safe;
