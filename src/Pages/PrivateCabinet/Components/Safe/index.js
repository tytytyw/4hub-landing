import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Safe.module.sass";
import SafeItem from "./SafeItem";
import SafeIcon from './SafeIcon'
import WorkSpace from "./WorkSpace";
import ShareSafe from "../ContextMenuComponents/ContexMenuSafe/ShareSafe/ShareSafe";
import ActionApproval from "../../../../generalComponents/ActionApproval";
import PreviewFile from "../PreviewFile";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import { contextMenuSafeItem } from "../../../../generalComponents/collections";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import classNames from "classnames";
import CodePopup from "./Popups/CodePopup";
import NoSafe from "./Popups/NoSafe";
import CreateSafe from "./Popups/CreateSafe";
import { onGetSafes } from "../../../../Store/actions/PrivateCabinetActions";
import api from '../../../../api';
import SuccessMessage from '../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage';

const Safe = ({ filePreview, setFilePreview, fileSelect, setLoadingType }) => {
	const dispatch = useDispatch();
    const uid = useSelector(state => state.user.uid);
	const path = useSelector((state) => state.PrivateCabinet.folderList?.path);
	const [chosenFile, setChosenFile] = useState(null);
	const [mouseParams, setMouseParams] = useState(null);

	const safes = useSelector((state) => state.PrivateCabinet.safes);
	const size = useSelector((state) => state.PrivateCabinet.size);
	const [listCollapsed, setListCollapsed] = useState("");
	const [selectedSafe, setSelectedSafe] = useState(null);
	const [createSafe, setCreateSafe] = useState(false);
	const [codePopup, setCodePopup] = useState(false);
	const [refreshPass, setRefreshPass] = useState(false);
	const [noSafePopup, setNoSafePopup] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const [action, setAction] = useState({ type: "", name: "", text: "" });
	const nullifyAction = () => setAction({ type: "", name: "", text: "" });

	//TODO: fileList get current fileList from api
	// const [FileList, SetFileList] =  useState(false);
	//TODO: fileList get current fileList from api
	const [showFileList, setShowFileList] = useState(false);
	//TODO: fileList get current fileList from api
	useEffect(() => {
		if (showFileList) {
			//TODO: set FileList
			// SetFileList([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showFileList]);

	useEffect(() => {
		setLoadingType (safes === null ? 'squarify' : '')
		setNoSafePopup(safes?.length < 1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [safes]);

	useEffect(() => {
		dispatch(onGetSafes());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//Clear action on change folder
	useEffect(() => {
		nullifyAction();
	}, [path]);

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
						setShowFileList(false);
					}}
				/>
			);
		});
	};

	const callbackArrMain = [
	    {type: 'share', name: 'Предоставить доступ', text: ``, callback: (list, index) => setAction(list[index])},
        // TODO: 
	    // {type: 'customize', name: 'Редактировать', text: ``, callback: (list, index) => setAction(list[index])},
	    // {type: 'settings', name: 'Настроить', text: ``, callback: (list, index) => setAction(list[index])},
	    // {type: 'properties', name: 'Свойства', text: ``, callback: () => setAction({...action, type: 'properties', name: 'Свойства'})},
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
					imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
				/>
			);
		});
	};

    const cancelArchive = () => {
		// nullifyFilePick();
		nullifyAction();
	}

    const deleteSafe = () => {
        nullifyAction();
        api.post(`/ajax/safe_del.php?uid=${uid}&id_safe=${selectedSafe.id}`)
            .then(res => {if(res.data.ok === 1) {
                setShowSuccessMessage('Сейф удален')
                dispatch(onGetSafes());
            } else {
                console.log(res)
            }})
            .catch(err => console.log(err));
    }

	

	return (
		<div className={styles.workAreaWrap}>
			<div
				className={classNames({
					[styles.listWrap]: true,
					[styles.listWrapCollapsed]: !!listCollapsed,
				})}
			>
				<div className={styles.header}>
					{!listCollapsed && <span>Создать сейф</span>}
					<div className={styles.imgWrap}>
						<img
							className={`${styles.playButton} ${
								listCollapsed ? styles.playButtonReverse : undefined
							}`}
							src="./assets/PrivateCabinet/play-grey.svg"
							alt="play"
							onClick={() => setListCollapsed(!listCollapsed)}
						/>
						<img
							onClick={() => setCreateSafe(true)}
							className={styles.icon}
							src={`./assets/PrivateCabinet/add-safe.svg`}
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
								src="./assets/PrivateCabinet/create_arrow.svg"
								alt="Create Arrow"
							/>
							<h4 className={styles.emptyTitle}>СОЗДАЙТЕ Ваш первый СЕЙФ</h4>
						</div>
					) : (
						<div
							className={classNames({
								[styles.folderListWrap]: true,
								[styles?.[`folderListWrap_${size}`]]: !!size,
							})}
						>
							{renderSafesList()}
						</div>
					)}
				</div>
			</div>

			<WorkSpace
				listCollapsed={listCollapsed}
				filePreview={filePreview}
				setFilePreview={setFilePreview}
				chosenFile={chosenFile}
				setChosenFile={setChosenFile}
				fileSelect={fileSelect}
				action={action}
				setAction={setAction}
				fileList={showFileList}
			/>

			{filePreview?.view && (
				<PreviewFile
					setFilePreview={setFilePreview}
					file={filePreview?.file}
					filePreview={filePreview}
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
						{renderMenuItems(contextMenuSafeItem.additional, additionalMenuItems)}
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
					setShowFileList={setShowFileList}
				/>
			)}

			{createSafe && <CreateSafe onCreate={setCreateSafe} setLoadingType={setLoadingType} />}

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

            {showSuccessMessage && <SuccessMessage showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} />}
		</div>
	);
};

export default Safe;
