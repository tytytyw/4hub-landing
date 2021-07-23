import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from '../../../../api';
import {previewFormats} from '../../../../generalComponents/collections';
import styles from "./MyFiles.module.sass";
import List from "../List";
import FileItem from "./FileItem/index";
import WorkSpace from "./WorkSpace/index";
import CreateFile from "../CreateFile";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import { fileDelete } from "../../../../generalComponents/fileMenuHelper";
import {onDeleteFile, onAddRecentFiles, onChooseFiles, onChooseAllFiles} from "../../../../Store/actions/PrivateCabinetActions";
import CreateSafePassword from '../CreateSafePassword';
import PreviewFile from '../PreviewFile';
import SuccessMessage from '../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage';
import Loader from '../../../../generalComponents/Loaders/4HUB'

const MyFiles = ({
			 filePreview, setFilePreview, awaitingFiles, setAwaitingFiles, loaded, setFileAddCustomization,
			 setLoaded, loadingFile, fileErrors, fileSelect, fileAddCustomization, setLoadingFile, setMenuItem, nullifyAddingSeveralFiles, saveCustomizeSeveralFiles
}) => {
	const uid = useSelector(state => state.user.uid);
	const dispatch = useDispatch();
	const [chosenFile, setChosenFile] = useState(null);
	const fileList = useSelector((state) => state.PrivateCabinet.fileList);
	const [workElementsView, setWorkElementsView] = useState("bars");
	const [showLoader, setShowLoader] = useState(false)
	const [listCollapsed, setListCollapsed] = useState(false);
	const [chosenFolder] = useState({
		path: "global/all",
		open: false,
		subPath: "",
	});
	const [filePick, setFilePick] = useState({show: false, files: []});
	const [mouseParams, setMouseParams] = useState(null);
	const [showLinkCopy, setShowLinkCopy] = useState(false)
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [action, setAction] = useState({ type: "", name: "", text: "" });
	const nullifyAction = () => setAction({ type: "", name: "", text: "" });
	const nullifyFilePick = () => setFilePick({show: false, files: [], customize: false});
    const callbackArrMain = [
        {type: 'share', name: '', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'copyLink', name: '', text: ``, callback: () => setShowLinkCopy(true)},
        {type: 'customize', name: 'Редактирование файла', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'customizeSeveral', name: `Редактирование файлов`, text: ``, callback: () => setFilePick({...filePick, show: true})},
        {type: 'archive', name: 'Добавить файл в архив', text: `Вы действительно хотите архивировать файл ${chosenFile?.name}?`, callback: (list, index) => setAction(list[index])},
        {type: 'intoZip', name: 'Сжать в ZIP', text: ``, callback: (list, index) => setAction({...action, type: list[index].type, name: list[index].name})},
		{type: 'intoZipSeveral', name: 'Сжать в ZIP', text: ``, callback: () => setFilePick({...filePick, show: true, intoZip: true})},
		{type: 'properties', name: 'Свойства', text: ``, callback: () => setAction({...action, type: 'properties', name: 'Свойства'})},
        {type: 'download', name: 'Загрузка файла', text: ``, callback: () => document.downloadFile.submit()},
        {type: 'print', name: 'Распечатать файл', text: ``, callback: () => checkMimeTypes()},
	]

	const additionalMenuItems = [
		{
			type: "delete",
			name: "Удаление файла",
			text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`,
			callback: (list, index) => setAction(list[index])
		},
	]

	const checkMimeTypes = (file) => {
		setShowLoader(true)
		const mType = file?.mime_type ?? chosenFile?.mime_type;
		const fid = file?.fid ?? chosenFile?.fid;
		const preview = file?.preview ?? chosenFile?.preview;
		const ext = file?.ext ?? chosenFile?.ext;
		if(mType === 'application/pdf') {
			if(mType === 'application/pdf') {
				printFile(`${preview}`);
			} else if(mType.includes('image')) {
				printFile(`${preview}`);
			}
		} else {
			const chosenType = previewFormats.filter(format => ext.toLowerCase().includes(format));
			if(chosenType.length > 0) {
				api.post(`/ajax/file_preview.php?uid=${uid}&fid=${fid}`)
					.then(res => {
						printFile(res.data.file_pdf)
					})
					.catch(err => console.log(err))
			}
		}
	}

	const printFile = (path) => {
		let pri = document.getElementById('frame');
		pri.src = `https://fs2.mh.net.ua/${path}`;
		setTimeout(() => {
			pri.contentWindow.focus();
			pri.contentWindow.print();
		}, 1000);
		setShowLoader(false)
	}

	const [safePassword, setSafePassword] = useState({open: false})
	const renderFileBar = () => {
		if (!fileList?.files) return null;
		return fileList.files.map((file, i) => {
			return (
				<FileItem
					chosenFile={chosenFile}
					setChosenFile={setChosenFile}
					key={i}
					file={file}
					chosen={filePick.show ? filePick.files.findIndex(el => el === file.fid) >= 0 : chosenFile?.fid === file?.fid}
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
	}

	const deleteFile = () => {
        if(filePick.show) {
            const gdir = fileList.path;
            filePick.files.forEach((fid, i, arr) => fileDelete({gdir, fid}, dispatch, uid, i === arr.length - 1 ? setShowSuccessMessage : '', 'Файлы перемещено в корзину'));
            setFilePick({...filePick, files: [], show: false});
        } else{
            fileDelete(chosenFile, dispatch, uid, setShowSuccessMessage, 'Файл перемещен в корзину');
        }
        nullifyAction();
        setChosenFile(null);
        dispatch(onAddRecentFiles());
    }
	
	const addToArchive = (uid, fid, file, options) => {
        api.post(`/ajax/file_archive.php?uid=${uid}&fid=${fid}`)
            .then(res => {
                if (res.data.ok === 1) {
                    dispatch(onDeleteFile(file));
                    if(options.single) setShowSuccessMessage('Файл добавлен в архив');
                    if(options.several) setShowSuccessMessage('Выбранные файлы добавлено в архив');
                } else console.log(res?.error)
            })
            .catch(err => console.log(err))
            .finally(() => {
                nullifyAction();
                setChosenFile(null);
                if(filePick.show) nullifyFilePick();
            })
    }

	const archiveFile = () => {
        if(filePick.show) {
            filePick.files.forEach((fid, i) => {
                const options = {single: false, several: i === filePick.files.length - 1};
                addToArchive(uid, fid, {fid}, options);
            })
        } else {
            addToArchive(uid, chosenFile.fid, chosenFile, {single: true, several: false});
        }
	}
	const onSafePassword = (boolean) => setSafePassword({...safePassword, open: boolean});
	const excessItems = () => {
		if(filePick.show) {
			return ['intoZip', 'properties', 'download', 'print']
		} else {
			if(chosenFile.mime_type) {
				switch (chosenFile.mime_type.split('/')[0]) {
					case 'image': return []
					case 'video': return ['print']
					case 'audio': return ['print']
					case 'application': {
						return chosenFile.mime_type === 'application/x-compressed'
							? ['print', 'intoZip', 'intoZipSeveral']
							: [];
					}
					default: return ['print'];
				}
			}
			if(previewFormats.filter(ext => chosenFile.ext.toLowerCase().includes(ext))[0]) return [];
			return ['print'];
		}
	}
	const renderMenuItems = (target, type) => {
		const eItems = excessItems();
		let filteredMenu = [...target];
		filteredMenu.forEach((el, i, arr) => {
			eItems.forEach(excess => {if(excess === el.type) delete arr[i]});
		});
		return filteredMenu.map((item, i) => {
			return (
				<ContextMenuItem
					key={i}
					width={mouseParams.width}
					height={mouseParams.height}
					text={item.name}
					callback={() => type.forEach((el, index) => {if(el.type === item.type) el.callback(type, index)})}
					imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
				/>
			);
		});
	}

	useEffect(() => {
		setMenuItem('myFiles')
		dispatch(onChooseAllFiles())
		return () => {
			dispatch(onChooseFiles('global/all'));
			setMenuItem('')
	}}, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

	// Change state to default after changing menu params
	// useEffect(() => {
	// 	if(action?.type !== 'customizeSeveral') setFilePick({show: false, files: [], customize: false});
	// }, [action]); // eslint-disable-line react-hooks/exhaustive-deps

	const cancelArchive = () => {
		nullifyFilePick();
		nullifyAction();
	}

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
					<div className={styles.folderListWrap}>{renderFileBar()}</div>
				</List>
			)}
			<WorkSpace
				chosenFolder={chosenFolder}
				workElementsView={workElementsView}
				setWorkElementsView={setWorkElementsView}
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
				setShowLinkCopy ={setShowLinkCopy}
				showLinkCopy={showLinkCopy}
				archiveFile={archiveFile}
				setShowSuccessMessage={setShowSuccessMessage}
				cancelArchive={cancelArchive}
				fileAddCustomization={fileAddCustomization}
            	setFileAddCustomization={setFileAddCustomization}
				nullifyAddingSeveralFiles={nullifyAddingSeveralFiles}
				saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
			/>
			{fileAddCustomization.show && (
				<CreateFile
					title="Добавление файла"
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
				/>
			)}
			{safePassword.open && <CreateSafePassword
                onToggle={onSafePassword}
                title='Создайте пароль для Сейфа с паролями'
            />}
            {filePreview?.view ? <PreviewFile setFilePreview={setFilePreview} file={filePreview?.file} filePreview={filePreview} /> : null}
			{showSuccessMessage && <SuccessMessage showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} />}
			{showLoader && <Loader />}
		</div>
		
	);
};

export default MyFiles;
