import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from '../../../../api';
import {previewTypes} from '../../../../generalComponents/collections';
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

const MyFiles = ({
			 filePreview, setFilePreview, awaitingFiles, setAwaitingFiles, loaded, setFileAddCustomization,
			 setLoaded, loadingFile, fileErrors, fileSelect, fileAddCustomization, setLoadingFile
}) => {
	const uid = useSelector(state => state.user.uid);
	const dispatch = useDispatch();
	const [chosenFile, setChosenFile] = useState(null);
	const fileList = useSelector((state) => state.PrivateCabinet.fileList);
	const [workElementsView, setWorkElementsView] = useState("bars");
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
        {type: 'resend', name: '', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'share', name: '', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'copyLink', name: '', text: ``, callback: () => setShowLinkCopy(true)},
        {type: 'customize', name: 'Редактирование файла', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'customizeSeveral', name: `Редактирование файлов`, text: ``, callback: () => setFilePick({...filePick, show: true})},
        {type: 'archive', name: 'Добавить файл в архив', text: `Вы действительно хотите архивировать файл ${chosenFile?.name}?`, callback: (list, index) => setAction(list[index])},
        {type: 'intoZip', name: 'Сжать в ZIP', text: ``, callback: (list, index) => setAction({...action, type: list[index].type, name: list[index].name})},
        {type: 'properties', name: 'Свойства', text: ``, callback: () => setAction({...action, type: 'properties', name: 'Свойства'})},
        {type: 'download', name: 'Загрузка файла', text: ``, callback: () => document.downloadFile.submit()},
        {type: 'print', name: 'Распечатать файл', text: ``, callback: () => checkMimeTypes()},
        ];
	const additionalMenuItems = [
		{
			type: "delete",
			name: "Удаление файла",
			text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`,
			callback: (list, index) => setAction(list[index])
		},
	];
	const checkMimeTypes = () => {
        if(chosenFile.mime_type) {
            if(chosenFile.mime_type === 'application/pdf') {
                printFile(`${chosenFile.preview}`);
            } else {
                const chosenType = previewTypes.filter(type => type === chosenFile.mime_type);
                if(chosenType.length > 0) {
                    api.post(`/ajax/file_preview.php?uid=${uid}&fid=${chosenFile.fid}`)
                        .then(res => printFile(res.data.file_pdf))
                        .catch(err => console.log(err));
                }
            }
        }
    };
	const printFile = (path) => {
		let pri = document.getElementById('frame');
		pri.src = `https://fs2.mh.net.ua/${path}`;
		setTimeout(() => {
			pri.contentWindow.focus();
			pri.contentWindow.print();
		}, 1000);
	};
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
					chosen={chosenFile?.fid === file?.fid}
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
				/>
			);
		});
	};
	const deleteFile = () => {fileDelete(chosenFile, dispatch, onDeleteFile); nullifyAction(); setChosenFile(null); dispatch(onAddRecentFiles())};
	const archiveFile = () => {
		api.post(`/ajax/file_archive.php?uid=${uid}&fid=${chosenFile.fid}`)
        .then(res => {
			if (res.data.ok === 1) {
				dispatch(onDeleteFile(chosenFile))
				setShowSuccessMessage('Файл добавлен в архив')
			} else console.log(res?.error)
		})
        .catch(err => console.log(err))
		.finally(() => {nullifyAction(); setChosenFile(null)})
	};
	const onSafePassword = (boolean) => setSafePassword({...safePassword, open: boolean});
	const renderMenuItems = (target, type) => {
		return target.map((item, i) => {
			return (
				<ContextMenuItem
					key={i}
					width={mouseParams.width}
					height={mouseParams.height}
					text={item.name}
					callback={() => type[i]?.callback(type, i)}
					imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
				/>
			);
		});
	};

	useEffect(() => {
		dispatch(onChooseAllFiles())
		return () => dispatch(onChooseFiles('global/all'))}, [dispatch]);
	// Change state to default after changing menu params
	useEffect(() => {
		if(action?.type !== 'customizeSeveral') setFilePick({show: false, files: [], customize: false});
	}, [action]); // eslint-disable-line react-hooks/exhaustive-deps


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
		</div>
		
	);
};

export default MyFiles;
