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

const MyFiles = () => {
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
	const [blob, setBlob] = useState({ file: null, show: false });
	const [fileLoading, setFileLoading] = useState({
		isLoading: false,
		percentage: 95,
		file: null,
	});
	const [progress, setProgress] = useState(0);
	const [mouseParams, setMouseParams] = useState(null);
	const [action, setAction] = useState({ type: "", name: "", text: "" });
	const nullifyAction = () => setAction({ type: "", name: "", text: "" });
	const callbackArrMain = ["", "", "", "", "", "", "", "", "", "", "", ""];
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
					callback={() => setAction(type[i])}
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
					onCreate={() => setBlob({ ...blob, show: true })}
				>
					<div className={styles.folderListWrap}>{renderFileBar()}</div>
				</List>
			)}
			<WorkSpace
				setBlob={setBlob}
				blob={blob}
				fileLoading={fileLoading}
				progress={progress}
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
			/>
			{blob.show && (
				<CreateFile
					title="Добавление файла"
					info={chosenFolder}
					blob={blob}
					setBlob={setBlob}
					setFileLoading={setFileLoading}
					fileLoading={fileLoading}
					setProgress={setProgress}
					progress={progress}
				/>
			)}
			{safePassword.open && <CreateSafePassword
                onToggle={onSafePassword}
                title='Создайте пароль для Сейфа с паролями'
            />}
		</div>
	);
};

export default MyFiles;
