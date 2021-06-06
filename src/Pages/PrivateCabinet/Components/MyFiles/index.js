import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MyFiles.module.sass";
import List from "../List";
import FileItem from "./FileItem/index";
import WorkSpace from "./WorkSpace/index";
import { onChooseFiles } from "../../../../Store/actions/PrivateCabinetActions";
import CreateFile from "../CreateFile";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import { fileDelete } from "../../../../generalComponents/fileMenuHelper";
import { onDeleteFile } from "../../../../Store/actions/PrivateCabinetActions";
import CreateSafePassword from '../CreateSafePassword';
import PreviewFile from '../PreviewFile';

const MyFiles = ({
			 filePreview, setFilePreview, awaitingFiles, setAwaitingFiles, loaded, setFileAddCustomization,
			 setLoaded, loadingFile, fileErrors, fileSelect, fileAddCustomization, setLoadingFile
}) => {
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
	const [action, setAction] = useState({ type: "", name: "", text: "" });
	const nullifyAction = () => setAction({ type: "", name: "", text: "" });
    const callbackArrMain = [
        {type: 'resend', name: '', text: ``, callback: ''},
        {type: 'share', name: '', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'openInApp', name: '', text: ``, callback: ''},
        {type: 'copyLink', name: '', text: ``, callback: ''},
        {type: 'customize', name: 'Редактирование файла', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'customizeSeveral', name: 'Редактирование файлов', text: ``, callback: () => setFilePick({...filePick, show: true})},
        {type: 'archive', name: '', text: ``, callback: ''},
        {type: 'intoZip', name: '', text: ``, callback: ''},
        {type: 'info', name: '', text: ``, callback: ''},
        {type: 'download', name: 'Загрузка файла', text: ``, callback: () => document.downloadFile.submit()},
        {type: 'print', name: '', text: ``, callback: ''},
        ];
	const additionalMenuItems = [
		{
			type: "delete",
			name: "Удаление файла",
			text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`,
		},
	];
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
	const deleteFile = () => {
		fileDelete(chosenFile, dispatch, onDeleteFile);
		nullifyAction();
		setChosenFile(null);
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

	useEffect(() => dispatch(onChooseFiles("global/all")), [dispatch]);


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
				chosenFile={chosenFile}
				setChosenFile={setChosenFile}
				callbackArrMain={callbackArrMain}
				additionalMenuItems={additionalMenuItems}
				deleteFile={deleteFile}
				filePreview={filePreview}
				setFilePreview={setFilePreview}
				setSafePassword={setSafePassword}
				fileSelect={fileSelect}
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
		</div>
		
	);
};

export default MyFiles;
